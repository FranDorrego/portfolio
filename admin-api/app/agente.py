# ************************************************************************** #
#      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     #
#     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    #
#    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       #
#   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       #
#                                                                            #
#   File: agente.py    Project: portfolio                                    #
#   Created: 2026/11/26 21:05:20  by vm                                      #
#   Updated: 2026/11/26 22:16:13  by vm                                      #
# ************************************************************************** #

"""
El mini agente: recibe el texto de una vacante y devuelve el CV adaptado y una carta de
presentacion. Trabaja con tres fuentes, y solo con ellas: el CV base, «Sobre mi» y el catalogo
completo de proyectos del sitio (llms-full.txt). Nunca inventa experiencia, fechas ni cifras.
"""

import json
import time
from typing import Any

import httpx

from app.configuracion import Configuracion

IDIOMAS = {"es": "español", "pt": "portugués de Portugal", "en": "inglés"}

INSTRUCCIONES = """Sos un asistente que adapta el CV de Franco Dorrego a una vacante concreta.

Reglas, sin excepciones:
- Usá SOLO la información del CV base, de «Sobre mí» y del catálogo de proyectos. No inventes
  empresas, cargos, fechas, cifras, tecnologías ni logros. Si la vacante pide algo que Franco no
  tiene, no lo agregues.
- Reescribí el resumen (3 a 4 frases) enfocado en lo que pide la vacante.
- Mantené la experiencia laboral del CV base: podés reordenar y reformular un poco los puntos
  para destacar lo relevante, sin cambiar los hechos. Máximo 5 puntos por bloque.
- Elegí los 2 o 3 proyectos más relevantes para la vacante, del CV base o del catálogo, con 2 o 3
  puntos cada uno, sacados de su descripción. Usá el período del catálogo si lo tiene.
- Ordená las habilidades poniendo primero las que pide la vacante; solo habilidades reales.
- Inglés: Franco no lo maneja. No digas lo contrario.
- La carta de presentación: directa, 150 a 220 palabras, 3 o 4 párrafos separados por una línea
  en blanco, sin frases hechas, firmada «Franco Dorrego». Dirigida a la empresa y al cargo.
- Todo el CV y la carta en {idioma}, incluidos los títulos de los puestos cuando corresponda.
- El CV tiene que entrar en una página A4.
- Compatible con cualquier ATS: cada bloque de experiencia y de proyecto lleva su período con el
  formato «MM/AAAA – MM/AAAA» (o «MM/AAAA – Actualidad» / «Atualidade» / «Present»); nunca un
  bloque sin fecha. Títulos de puesto claros y estándar, sin emojis, tablas ni símbolos raros.
  Las palabras clave de la vacante que Franco SÍ tiene, escritas igual que en la vacante.

Respondé SOLO con un JSON con esta forma:
{{
  "empresa": "nombre de la empresa, o vacío si no aparece",
  "cargo": "nombre del puesto",
  "cv": {{ mismas claves que el CV base: idioma, nombre, titulo, ubicacion, enlaces, resumen,
          experiencia, proyectos, formacion, habilidades, idiomas }},
  "carta": "la carta",
  "notas": "en 2 o 3 frases, qué destacaste y por qué"
}}"""

_CATALOGO: dict[str, tuple[float, str]] = {}


class ErrorDelAgente(Exception):
    """El modelo no respondio o respondio algo que no sirve."""


def catalogo(configuracion: Configuracion, idioma: str) -> str:
    """El llms-full.txt del sitio, guardado una hora: es el catalogo completo de proyectos."""
    ruta = "/pt/llms-full.txt" if idioma == "pt" else "/llms-full.txt"
    guardado = _CATALOGO.get(ruta)
    if guardado and time.monotonic() - guardado[0] < 3600:
        return guardado[1]
    try:
        texto = httpx.get(f"{configuracion.sitio}{ruta}", timeout=20).text
    except httpx.HTTPError:
        return guardado[1] if guardado else ""
    _CATALOGO[ruta] = (time.monotonic(), texto)
    return texto


def mensajes(
    *, vacante: str, idioma: str, base: dict[str, Any], perfil: dict[str, Any], catalogo: str
) -> list[dict[str, str]]:
    contexto = (
        f"## Sobre mí\n\nQué busco: {perfil.get('que_busco', '')}\n\n"
        f"Sobre mí: {perfil.get('sobre_mi', '')}\n\n"
        f"## CV base (JSON)\n\n{json.dumps(base, ensure_ascii=False)}\n\n"
        f"## Catálogo de proyectos\n\n{catalogo}"
    )
    return [
        {"role": "system", "content": INSTRUCCIONES.format(idioma=IDIOMAS.get(idioma, "español"))},
        {"role": "user", "content": contexto},
        {"role": "user", "content": f"## Vacante\n\n{vacante}"},
    ]


def leer_respuesta(texto: str, idioma: str) -> dict[str, Any]:
    """Saca el JSON de la respuesta (aunque venga entre ```) y revisa lo minimo."""
    inicio, fin = texto.find("{"), texto.rfind("}")
    if inicio < 0 or fin < inicio:
        raise ErrorDelAgente("La respuesta no trae JSON.")
    try:
        datos = json.loads(texto[inicio : fin + 1])
    except json.JSONDecodeError as error:
        raise ErrorDelAgente(f"JSON invalido: {error}") from error
    cv = datos.get("cv")
    if not isinstance(cv, dict) or not cv.get("resumen") or not isinstance(datos.get("carta"), str):
        raise ErrorDelAgente("Faltan el CV o la carta en la respuesta.")
    cv["idioma"] = idioma
    for clave in ("experiencia", "proyectos", "formacion", "habilidades", "enlaces"):
        if not isinstance(cv.get(clave), list):
            cv[clave] = []
    return {
        "empresa": str(datos.get("empresa") or ""),
        "cargo": str(datos.get("cargo") or ""),
        "cv": cv,
        "carta": datos["carta"].strip(),
        "notas": str(datos.get("notas") or ""),
    }


def adaptar(
    configuracion: Configuracion,
    *,
    vacante: str,
    idioma: str,
    base: dict[str, Any],
    perfil: dict[str, Any],
) -> dict[str, Any]:
    if not configuracion.clave_de_ia:
        raise ErrorDelAgente("Falta OPENROUTER_API_KEY en el servidor.")
    cuerpo = {
        "model": configuracion.modelo,
        "temperature": 0.3,
        "response_format": {"type": "json_object"},
        "messages": mensajes(
            vacante=vacante,
            idioma=idioma,
            base=base,
            perfil=perfil,
            catalogo=catalogo(configuracion, idioma),
        ),
    }
    try:
        respuesta = httpx.post(
            configuracion.url_de_ia,
            json=cuerpo,
            headers={"Authorization": f"Bearer {configuracion.clave_de_ia}"},
            timeout=180,
        )
        respuesta.raise_for_status()
        texto = respuesta.json()["choices"][0]["message"]["content"]
    except (httpx.HTTPError, KeyError, IndexError, ValueError) as error:
        raise ErrorDelAgente(f"No respondio el modelo: {error}") from error
    return leer_respuesta(texto, idioma)
