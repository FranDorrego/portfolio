# ************************************************************************** #
#      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     #
#     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    #
#    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       #
#   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       #
#                                                                            #
#   File: agente.py    Project: portfolio                                    #
#   Created: 2026/11/26 21:05:20  by vm                                      #
#   Updated: 2026/11/27 18:25:52  by vm                                      #
# ************************************************************************** #

"""
El mini agente, con la API de Claude: recibe el texto de una vacante y devuelve el CV adaptado y
una carta de presentacion. Trabaja con tres fuentes, y solo con ellas: el CV base, «Sobre mi» y el catalogo
completo de proyectos del sitio (llms-full.txt). Nunca inventa experiencia, fechas ni cifras.
"""

import json
import time
from typing import Any

import anthropic
import httpx

from app.configuracion import Configuracion

# Como se presenta Franco en todos sus CV, sea cual sea la vacante.
TITULO = "Developer Full Stack Web"

IDIOMAS = {"es": "español", "pt": "portugués de Portugal", "en": "inglés"}

INSTRUCCIONES = """Sos un asistente que adapta el CV de Franco Dorrego a una vacante concreta.

Reglas, sin excepciones:
- Usá SOLO la información del CV base, de «Sobre mí» y del catálogo de proyectos. No inventes
  empresas, cargos, fechas, cifras, tecnologías ni logros. Si la vacante pide algo que Franco no
  tiene, no lo agregues.
- El título del CV («titulo») es siempre «Developer Full Stack Web», igual que en el CV base,
  sea cual sea el puesto de la vacante: no lo cambies ni le agregues nada.
- Reescribí el resumen (3 a 4 frases) enfocado en lo que pide la vacante.
- Mantené la experiencia laboral del CV base: podés reordenar y reformular un poco los puntos
  para destacar lo relevante, sin cambiar los hechos. Máximo 5 puntos por bloque.
- Elegí los 2 o 3 proyectos más relevantes para la vacante, del CV base o del catálogo, con 2 o 3
  puntos cada uno, sacados de su descripción. Usá el período del catálogo si lo tiene.
- Ordená las habilidades poniendo primero las que pide la vacante; solo habilidades reales.
- Inglés: Franco no lo maneja. No digas lo contrario.
- La carta de presentación: directa, 150 a 220 palabras, 3 o 4 párrafos separados por una línea
  en blanco, sin frases hechas, firmada «Franco Dorrego». Dirigida a la empresa y al cargo.
- Quien lee la carta no conoce los proyectos de Franco: un nombre suelto (ArduCloud,
  ViveNadando, Minishell, ITBANK...) no le dice nada. Contá QUÉ es y QUÉ hizo Franco, en
  palabras que entienda cualquiera: «una plataforma cloud para freelancers, con su propia API en
  Django», «el sistema de atención por WhatsApp de una academia de natación», «una shell tipo
  bash escrita en C». El nombre propio va como mucho entre paréntesis, y solo si suma (un cliente
  o un producto real). Nada de jerga interna ni de métricas sin contexto: «97 % de los commits»
  se dice «fui el autor principal del backend».
- Todo el CV y la carta en {idioma}, incluidos los títulos de los puestos cuando corresponda.
- El CV tiene que entrar en una página A4.
- Compatible con cualquier ATS: cada bloque de experiencia y de proyecto lleva su período con el
  formato «MM/AAAA – MM/AAAA» (o «MM/AAAA – Actualidad» / «Atualidade» / «Present»); nunca un
  bloque sin fecha. Títulos de puesto claros y estándar, sin emojis, tablas ni símbolos raros.
  Las palabras clave de la vacante que Franco SÍ tiene, escritas igual que en la vacante.

Respondé SOLO con un JSON con esta forma:
{{
  "empresa": "nombre de la empresa, o vacío si no aparece",
  "siglas": "como se conoce a la empresa, corto: sus siglas o su marca (NTT DATA, BPI, EDP)",
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


def armar_pedido(
    *,
    vacante: str,
    idioma: str,
    base: dict[str, Any],
    perfil: dict[str, Any],
    catalogo: str,
    rehacer: dict[str, Any] | None = None,
) -> tuple[str, list[dict[str, Any]]]:
    """
    Las instrucciones (system) y los bloques del pedido. El contexto (Sobre mi, CV base y
    catalogo) va primero y marcado para la cache de Claude: es casi igual en cada pedido. Despues,
    la vacante y, para rehacer, la version actual con la indicacion de Franco.
    """
    contexto = (
        f"## Sobre mí\n\nQué busco: {perfil.get('que_busco', '')}\n\n"
        f"Sobre mí: {perfil.get('sobre_mi', '')}\n\n"
        f"## CV base (JSON)\n\n{json.dumps(base, ensure_ascii=False)}\n\n"
        f"## Catálogo de proyectos\n\n{catalogo}"
    )
    bloques: list[dict[str, Any]] = [
        {"type": "text", "text": contexto, "cache_control": {"type": "ephemeral"}},
        {"type": "text", "text": f"## Vacante\n\n{vacante}"},
    ]
    if rehacer:
        anterior = json.dumps({"cv": rehacer["cv"], "carta": rehacer["carta"]}, ensure_ascii=False)
        bloques.append({"type": "text", "text": (
            f"## Versión actual (JSON)\n\n{anterior}\n\n"
            f"## Indicación de Franco para rehacerla\n\n{rehacer['indicacion']}\n\n"
            "Rehacé el CV y la carta partiendo de la versión actual y aplicando la indicación. "
            "Cambiá solo lo que la indicación pide (y lo que haga falta para que todo cierre). "
            "La indicación manda sobre las reglas de forma de arriba (largo de la carta, "
            "cantidad de frases, de puntos o de proyectos, tono, orden): cumplila al pie de la "
            "letra, contando palabras y frases si las pide. Nunca manda sobre la verdad: si pide "
            "inventar algo, no lo hagas y explicalo en «notas»."
        )})
    instrucciones = INSTRUCCIONES.format(idioma=IDIOMAS.get(idioma, "español"))
    return instrucciones, bloques


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
        "siglas": str(datos.get("siglas") or ""),
        "cargo": str(datos.get("cargo") or ""),
        "cv": cv,
        "carta": datos["carta"].strip(),
        "notas": str(datos.get("notas") or ""),
    }


def llamar_a_claude(configuracion: Configuracion, instrucciones: str,
                    bloques: list[dict[str, Any]]) -> str:
    """
    Un pedido a la API de Claude y su texto. Si Claude declina por sus reglas de seguridad, la
    API lo reintenta sola con otro modelo (fallbacks «default»).
    """
    cliente = anthropic.Anthropic(api_key=configuracion.clave_de_ia, timeout=300, max_retries=2)
    try:
        respuesta = cliente.beta.messages.create(
            model=configuracion.modelo,
            max_tokens=16000,
            output_config={"effort": configuracion.esfuerzo},
            betas=["server-side-fallback-2026-07-01"],
            fallbacks="default",
            system=instrucciones,
            messages=[{"role": "user", "content": bloques}],
        )
    except anthropic.AuthenticationError as error:
        raise ErrorDelAgente("La clave de la API de Claude no es valida.") from error
    except anthropic.RateLimitError as error:
        raise ErrorDelAgente("La API de Claude pidio esperar: proba en un rato.") from error
    except anthropic.APIStatusError as error:
        raise ErrorDelAgente(f"La API de Claude respondio {error.status_code}: "
                             f"{error.message}") from error
    except anthropic.APIConnectionError as error:
        raise ErrorDelAgente("No se pudo conectar con la API de Claude.") from error
    if respuesta.stop_reason == "refusal":
        raise ErrorDelAgente("Claude no quiso responder este pedido.")
    if respuesta.stop_reason == "max_tokens":
        raise ErrorDelAgente("La respuesta de Claude quedo cortada: proba de nuevo.")
    return "".join(bloque.text for bloque in respuesta.content if bloque.type == "text")


def adaptar(
    configuracion: Configuracion,
    *,
    vacante: str,
    idioma: str,
    base: dict[str, Any],
    perfil: dict[str, Any],
    rehacer: dict[str, Any] | None = None,
) -> dict[str, Any]:
    """Arma el CV y la carta para la vacante; con `rehacer`, rehace una version anterior."""
    if not configuracion.clave_de_ia:
        raise ErrorDelAgente("Falta ANTHROPIC_API_KEY en el servidor.")
    instrucciones, bloques = armar_pedido(
        vacante=vacante, idioma=idioma, base=base, perfil=perfil,
        catalogo=catalogo(configuracion, idioma), rehacer=rehacer,
    )
    resultado = leer_respuesta(llamar_a_claude(configuracion, instrucciones, bloques), idioma)
    # El titulo del CV no se adapta: es siempre el del CV base.
    resultado["cv"]["titulo"] = base.get("titulo") or TITULO
    return resultado
