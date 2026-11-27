# ************************************************************************** #
#      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     #
#     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    #
#    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       #
#   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       #
#                                                                            #
#   File: agente.py    Project: portfolio                                    #
#   Created: 2026/11/26 21:05:20  by vm                                      #
#   Updated: 2026/11/27 19:50:20  by vm                                      #
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
TITULO = "Full Stack Web Developer"

IDIOMAS = {"es": "español", "pt": "portugués de Portugal", "en": "inglés"}

INSTRUCCIONES = """Sos un asistente que adapta el CV de Franco Dorrego a una vacante concreta.

Reglas, sin excepciones:
- Usá SOLO la información del CV base, de «Sobre mí» y del catálogo de proyectos. No inventes
  empresas, cargos, fechas, cifras, tecnologías ni logros. Si la vacante pide algo que Franco no
  tiene, no lo agregues.
- El título del CV («titulo») es siempre «Full Stack Web Developer», igual que en el CV base,
  sea cual sea el puesto de la vacante: no lo cambies ni le agregues nada.

El CV:
- Resumen de 3 frases y 60 palabras como mucho, enfocado en la vacante. Para la experiencia no digas «más de 5 años»:
  decí que programa y da formación desde 2019 y que desarrolla Full Stack web desde 2023.
- En la formación de 42 Porto va siempre «Common Core – Milestone 5». Si la vacante es para
  alumnos de la 42 o pide un milestone, nombralo también en el resumen.
- Experiencia profesional: los trabajos para clientes (ViveNadando, Distrivalto, BotMinero y
  otros del catálogo con cliente) van en Experiencia, no en Proyectos. Mantené los bloques del
  CV base con sus fechas; podés reordenar y reformular un poco los puntos para destacar lo
  relevante, sin cambiar los hechos. Máximo 4 puntos por bloque; conservá las cifras de ArduCloud.
- Proyectos: 1 bloque (2 solo si los demás bloques quedaron cortos), el más relevante, del CV
  base o del catálogo (no trabajos para clientes), con 2 puntos.
  Para vacantes que piden algoritmos, estructuras de datos o C, los de la 42 (push_swap,
  Minishell). Usá el período del catálogo si lo tiene.
- Habilidades: Java va siempre en Lenguajes (lo estudió en la ULP). Mantené la categoría
  «Fundamentos» (algoritmos y estructuras de datos, programación orientada a objetos,
  programación de sistemas en C). Poné primero las que pide la vacante; solo habilidades reales.
- Idiomas: español nativo, portugués B2 (sin «fluido») e inglés A1 en estudio. No digas que
  maneja inglés.
- Nada de detalles triviales: ni flags de compilación (-Wall -Wextra -Werror), ni Makefiles, ni
  nombres de librerías internas sin contexto.
- El CV tiene que entrar en una página A4 (con todos los bloques del CV base ya está al
  límite): no agregues bloques ni puntos, como mucho 6 líneas de habilidades; si hace falta,
  recortá puntos, nunca bloques con fecha.
- Compatible con cualquier ATS: cada bloque de experiencia y de proyecto lleva su período con el
  formato «MM/AAAA – MM/AAAA» (o «MM/AAAA – Actualidad» / «Atualidade» / «Present»); nunca un
  bloque sin fecha. Títulos de puesto claros y estándar, sin emojis, tablas ni símbolos raros.
  Las palabras clave de la vacante que Franco SÍ tiene (algoritmos, estructuras de datos,
  programación orientada a objetos, Java...), escritas igual que en la vacante.

La carta de presentación:
- Directa, 150 a 220 palabras, 3 o 4 párrafos separados por una línea en blanco, sin frases
  hechas. Empieza con el saludo («Exmos. Senhores da <empresa>,» / «Estimados <empresa>:») y
  termina con una despedida en su propia línea («Com os melhores cumprimentos,» / «Saludos
  cordiales,» / «Best regards,») y debajo «Franco Dorrego». La fecha y los datos de contacto los
  agrega el PDF: no los escribas.
- Primer párrafo: el puesto dicho con claridad (por ejemplo «a vaga de Software Developer Júnior
  para alunos da 42», no «da Escola 42») y, si estudia en la 42 y viene al caso, que es alumno
  de la 42 Porto en el Milestone 5.
- Una frase concreta de por qué elige esa empresa, sacada de lo que dice la vacante (el programa
  de formación y mentoría, el tipo de proyectos, la tecnología). No inventes datos de la empresa.
- Todo en positivo: nunca «trabajé solo», «hasta ahora solo...» ni nada que suene a debilidad.
  Decilo como lo que quiere: «después de desarrollar productos de punta a punta para clientes,
  quiero crecer en un equipo más grande, con revisiones de código y proyectos complejos».
- Quien lee la carta no conoce los proyectos de Franco: un nombre suelto (ArduCloud,
  ViveNadando, Minishell, ITBANK...) no le dice nada. Contá QUÉ es y QUÉ hizo Franco, en
  palabras que entienda cualquiera: «una plataforma cloud para freelancers, con su propia API en
  Django», «el sistema de atención por WhatsApp de una academia de natación», «una shell tipo
  bash escrita en C». El nombre propio va como mucho entre paréntesis, y solo si suma (un cliente
  o un producto real). Nada de jerga interna ni de métricas sin contexto: «97 % de los commits»
  se dice «fui el autor principal del backend».
- Todo el CV y la carta en {idioma}, incluidos los títulos de los puestos cuando corresponda.

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
