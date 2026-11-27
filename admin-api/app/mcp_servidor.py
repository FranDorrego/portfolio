# ************************************************************************** #
#      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     #
#     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    #
#    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       #
#   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       #
#                                                                            #
#   File: mcp_servidor.py    Project: portfolio                              #
#   Created: 2026/11/27 15:24:38  by vm                                      #
#   Updated: 2026/11/27 15:26:47  by vm                                      #
# ************************************************************************** #

"""
El servidor MCP del panel: cualquier agente que hable MCP (Claude, ChatGPT, Cursor, n8n...) se
conecta a https://api.francodorrego.com/mcp/ con el token de agente y hace lo mismo que la pagina:
leer y guardar «Sobre mi», registrar y seguir candidaturas, adaptar y rehacer CV, subir PDF y
pedir enlaces de descarga firmados para llevarlos a otras plataformas. Lo que registra queda
marcado «MCP» en el panel.

Las herramientas llaman a las mismas funciones que las rutas de la API: una sola logica.
"""

import base64
import hmac
from collections.abc import Callable
from typing import Any, Literal

import httpx
from fastapi import HTTPException
from fastapi.encoders import jsonable_encoder
from mcp.server.fastmcp import FastMCP
from mcp.server.transport_security import TransportSecuritySettings
from starlette.types import ASGIApp, Receive, Scope, Send

from app.archivos import TAMANO_MAXIMO
from app.base_de_datos import BaseDeDatos
from app.configuracion import Configuracion
from app.descargas import enlace_firmado
from app.rutas import candidaturas, cvs, perfil

Idioma = Literal["es", "pt", "en"]
Estado = Literal["sin_contacto", "contacto", "videollamada", "oferta", "rechazada"]
PDF_MAXIMO = 20 * 1024 * 1024

INSTRUCCIONES = """Panel de candidaturas de Franco Dorrego (developer Full Stack Web, Porto).
Flujo habitual: leer «Sobre mí» (ver_sobre_mi), adaptar el CV a la vacante (adaptar_cv), pedir los
enlaces de descarga del PDF y la carta (enlaces_de_descarga) para subirlos a la plataforma de la
vacante, y registrar la candidatura (registrar_candidatura) con el cv_id usado. Si la candidatura
la encontraste, preparaste y enviaste vos solo, sin que Franco intervenga, pasá enviada_sola=true.
Nunca inventes experiencia: el agente de CV ya cuida eso."""


def _resultado(funcion: Callable[[], Any]) -> Any:
    """Corre una funcion de las rutas y devuelve JSON simple; un error de la API, como mensaje."""
    try:
        return jsonable_encoder(funcion())
    except HTTPException as error:
        raise ValueError(str(error.detail)) from error


def crear_mcp(bd: BaseDeDatos, configuracion: Configuracion) -> FastMCP:
    """El servidor MCP con sus herramientas, sobre la base y la configuracion de la API."""
    servidor = FastMCP(
        "francodorrego-candidaturas",
        instructions=INSTRUCCIONES,
        stateless_http=True,
        json_response=True,
        streamable_http_path="/",
        # Lo protege el token de agente (ConToken); el Host es el dominio publico de la API.
        transport_security=TransportSecuritySettings(enable_dns_rebinding_protection=False),
    )

    def enlaces(cv_id: int, horas: int = 72) -> dict[str, Any]:
        fila = bd.uno("SELECT tipo, url, carta FROM cvs WHERE id = %s", (cv_id,))
        if not fila:
            raise ValueError("No existe ese CV")
        if fila["tipo"] == "sitio":
            return {"cv_pdf": fila["url"]}
        salida = {"cv_pdf": enlace_firmado(configuracion, tipo="cv", id_=cv_id, horas=horas)}
        if fila["carta"]:
            salida["carta_pdf"] = enlace_firmado(configuracion, tipo="carta", id_=cv_id,
                                                 horas=horas)
        salida["vence_en_horas"] = horas
        return salida

    @servidor.tool()
    def ver_sobre_mi() -> dict[str, Any]:
        """Qué busca Franco, quién es y sus datos de contacto del CV."""
        return _resultado(lambda: perfil.ver(bd))

    @servidor.tool()
    def guardar_sobre_mi(que_busco: str | None = None, sobre_mi: str | None = None,
                         telefono: str | None = None, email: str | None = None) -> dict[str, Any]:
        """Cambia «Sobre mí»: solo los campos que se pasan; el resto queda igual."""
        actual = perfil.ver(bd)
        cambios = {"que_busco": que_busco, "sobre_mi": sobre_mi, "telefono": telefono,
                   "email": email}
        datos = perfil.Perfil(**{clave: actual.get(clave) or "" for clave in cambios} | {
            clave: valor for clave, valor in cambios.items() if valor is not None})
        return _resultado(lambda: perfil.guardar(datos, bd))

    @servidor.tool()
    def listar_candidaturas(estado: Estado | None = None,
                            buscar: str | None = None) -> list[dict[str, Any]]:
        """Las candidaturas, la última primero. Filtra por estado y por texto en empresa o cargo."""
        filas = candidaturas.listar(bd)
        if estado:
            filas = [fila for fila in filas if fila["estado"] == estado]
        if buscar:
            texto = buscar.lower()
            filas = [f for f in filas if texto in f"{f['empresa']} {f['cargo']}".lower()]
        return _resultado(lambda: filas)

    @servidor.tool()
    def ver_candidatura(candidatura_id: int) -> dict[str, Any]:
        """Una candidatura con su historial de estados."""
        return _resultado(lambda: candidaturas.ver(candidatura_id, bd))

    @servidor.tool()
    def registrar_candidatura(empresa: str, cargo: str, descripcion: str = "",
                              cv_id: int | None = None, enlace: str = "", idioma: Idioma = "es",
                              *, enviada_sola: bool = False) -> dict[str, Any]:
        """
        Registra una candidatura enviada (queda «Sin contacto» y con la etiqueta MCP).
        `enviada_sola=true` si la encontraste, preparaste y enviaste vos, sin intervención de
        Franco: queda además marcada «Con IA».
        """
        datos = candidaturas.NuevaCandidatura(empresa=empresa, cargo=cargo,
                                              descripcion=descripcion, cv_id=cv_id,
                                              enlace=enlace, idioma=idioma)
        return _resultado(lambda: candidaturas.registrar(bd, datos, origen="mcp",
                                                         con_ia=enviada_sola))

    @servidor.tool()
    def actualizar_candidatura(candidatura_id: int, estado: Estado | None = None,
                               nota_del_cambio: str = "", notas: str | None = None,
                               enlace: str | None = None,
                               cv_id: int | None = None) -> dict[str, Any]:
        """Cambia el estado (con una nota que queda en el historial), las notas, el enlace o el CV."""
        cambios: dict[str, Any] = {"nota_del_cambio": nota_del_cambio}
        for clave, valor in (("estado", estado), ("notas", notas), ("enlace", enlace),
                             ("cv_id", cv_id)):
            if valor is not None:
                cambios[clave] = valor
        datos = candidaturas.Cambios(**cambios)
        return _resultado(lambda: candidaturas.cambiar(candidatura_id, datos, bd))

    @servidor.tool()
    def borrar_candidatura(candidatura_id: int) -> dict[str, Any]:
        """Borra una candidatura (y su video). No se puede deshacer."""
        return _resultado(lambda: candidaturas.borrar(candidatura_id, bd, configuracion))

    @servidor.tool()
    def listar_cvs(buscar: str | None = None) -> list[dict[str, Any]]:
        """
        Todos los CV: los del sitio, las bases para ATS, los subidos y los adaptados (los más
        nuevos primero). Filtra por texto en el nombre, la empresa o el cargo.
        """
        filas = cvs.listar(bd)
        if buscar:
            texto = buscar.lower()
            filas = [f for f in filas if texto in " ".join(
                str(f.get(c) or "") for c in ("nombre", "empresa", "siglas", "cargo")).lower()]
        return _resultado(lambda: filas)

    @servidor.tool()
    def ver_cv(cv_id: int) -> dict[str, Any]:
        """Un CV con su contenido, la carta (si tiene) y enlaces de descarga de 72 horas."""
        return {**_resultado(lambda: cvs.ver(cv_id, bd)), "descargas": enlaces(cv_id)}

    @servidor.tool()
    def adaptar_cv(vacante: str, idioma: Idioma = "pt",
                   base_id: int | None = None) -> dict[str, Any]:
        """
        Adapta el CV a una vacante (texto completo del aviso) y escribe la carta de presentación.
        Tarda 20 a 60 segundos. Devuelve el CV nuevo y sus enlaces de descarga.
        """
        pedido = cvs.PedidoAlAgente(vacante=vacante, idioma=idioma, base_id=base_id)
        hecho = _resultado(lambda: cvs.adaptar_a_vacante(pedido, bd, configuracion))
        return {**hecho, "descargas": enlaces(hecho["id"])}

    @servidor.tool()
    def rehacer_cv(cv_id: int, indicacion: str) -> dict[str, Any]:
        """Rehace un CV adaptado y su carta con una indicación («más corto», «destacá Docker»)."""
        pedido = cvs.Indicacion(indicacion=indicacion)
        hecho = _resultado(lambda: cvs.rehacer(cv_id, pedido, bd, configuracion))
        return {**hecho, "descargas": enlaces(cv_id)}

    @servidor.tool()
    def subir_cv_pdf(nombre: str, idioma: Idioma = "es", pdf_base64: str | None = None,
                     url: str | None = None) -> dict[str, Any]:
        """Sube un CV propio en PDF: en base64 o desde una URL pública (hasta 20 MB)."""
        if bool(pdf_base64) == bool(url):
            raise ValueError("Pasá el PDF en pdf_base64 o en url (uno de los dos)")
        if url:
            respuesta = httpx.get(url, timeout=60, follow_redirects=True)
            respuesta.raise_for_status()
            contenido = respuesta.content
        else:
            contenido = base64.b64decode(pdf_base64 or "", validate=True)
        if not contenido.startswith(b"%PDF") or len(contenido) > min(PDF_MAXIMO, TAMANO_MAXIMO):
            raise ValueError("No es un PDF, o pasa de 20 MB")
        cv = _resultado(lambda: cvs.crear(cvs.NuevoCv(nombre=nombre, idioma=idioma), bd))
        relativa = f"cvs/cv{cv['id']}.pdf"
        (configuracion.datos / "cvs").mkdir(parents=True, exist_ok=True)
        (configuracion.datos / relativa).write_bytes(contenido)
        bd.ejecutar("UPDATE cvs SET archivo = %s WHERE id = %s", (relativa, cv["id"]))
        return {**_resultado(lambda: cvs.ver(cv["id"], bd)), "descargas": enlaces(cv["id"])}

    @servidor.tool()
    def borrar_cv(cv_id: int) -> dict[str, Any]:
        """Borra un CV subido o adaptado (los del sitio y las bases no se borran)."""
        return _resultado(lambda: cvs.borrar(cv_id, bd, configuracion))

    @servidor.tool()
    def enlaces_de_descarga(cv_id: int, horas: int = 72) -> dict[str, Any]:
        """
        Enlaces directos al PDF del CV y de la carta, sin login, para bajarlos y subirlos a otra
        plataforma. Vencen a las `horas` indicadas (máximo 720).
        """
        return enlaces(cv_id, horas)

    return servidor


class ConToken:
    """
    La puerta del MCP: deja pasar con «Authorization: Bearer <AGENT_TOKEN>» o con el token en la
    direccion (/mcp/<token>/), para los clientes que no permiten cabeceras.
    """

    def __init__(self, app: ASGIApp, configuracion: Configuracion) -> None:
        self.app = app
        self.configuracion = configuracion

    async def __call__(self, scope: Scope, receive: Receive, send: Send) -> None:
        if scope["type"] != "http":
            await self.app(scope, receive, send)
            return
        esperado = self.configuracion.token_de_agente
        cabeceras = dict(scope.get("headers") or [])
        cabecera = cabeceras.get(b"authorization", b"").decode()
        # Montado en /mcp, Starlette pasa la ruta entera y el prefijo en root_path.
        prefijo: str = scope.get("root_path", "")
        ruta: str = scope.get("path", "/")
        relativa = ruta[len(prefijo):] if prefijo and ruta.startswith(prefijo) else ruta
        partes = relativa.strip("/").split("/", 1)
        permitido = False
        if esperado and cabecera.lower().startswith("bearer "):
            permitido = hmac.compare_digest(cabecera[7:].strip(), esperado)
        elif esperado and partes[0] and hmac.compare_digest(partes[0], esperado):
            permitido = True
            resto = prefijo + "/" + (partes[1] if len(partes) > 1 else "")
            scope = {**scope, "path": resto, "raw_path": resto.encode()}
        if not permitido:
            await send({"type": "http.response.start", "status": 401,
                        "headers": [(b"content-type", b"application/json")]})
            await send({"type": "http.response.body", "body": b'{"detail":"Token de agente"}'})
            return
        await self.app(scope, receive, send)
