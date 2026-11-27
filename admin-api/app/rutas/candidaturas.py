# ************************************************************************** #
#      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     #
#     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    #
#    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       #
#   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       #
#                                                                            #
#   File: candidaturas.py    Project: portfolio                              #
#   Created: 2026/11/26 21:06:07  by vm                                      #
#   Updated: 2026/11/27 17:37:49  by vm                                      #
# ************************************************************************** #

"""Las candidaturas: a donde me postule, con que CV, y como va."""

from pathlib import Path
from typing import Any, Literal

from fastapi import APIRouter, Depends, HTTPException, Request
from fastapi.responses import FileResponse, RedirectResponse, Response
from pydantic import BaseModel, Field

from app.archivos import extension, guardar_trozo, nombre_limpio, ruta_segura, terminar
from app.base_de_datos import BaseDeDatos
from app.enviados import guardar_envio
from app.nombres import disposicion, nombre_de_archivo, siglas
from app.configuracion import Configuracion
from app.dependencias import base, config, sesion

rutas = APIRouter(prefix="/api/candidaturas", tags=["candidaturas"],
                  dependencies=[Depends(sesion)])

Estado = Literal["sin_contacto", "contacto", "videollamada", "oferta", "rechazada"]
Idioma = Literal["es", "pt", "en"]

COLUMNAS = (
    "c.id, c.empresa, c.cargo, c.descripcion, c.cv_id, c.enlace, c.idioma, c.estado, c.notas, "
    "c.video_nombre, (c.video IS NOT NULL) AS tiene_video, c.creada, c.actualizada, "
    "v.nombre AS cv_nombre, c.con_ia, c.origen, c.enviado, "
    "(c.enviado_cv IS NOT NULL) AS tiene_cv_enviado, "
    "(c.enviado_carta IS NOT NULL) AS tiene_carta_enviada"
)


class NuevaCandidatura(BaseModel):
    empresa: str = Field(min_length=1, max_length=200)
    cargo: str = Field(min_length=1, max_length=200)
    descripcion: str = Field(default="", max_length=50000)
    cv_id: int | None = None
    enlace: str = Field(default="", max_length=1000)
    idioma: Idioma = "es"


class Cambios(BaseModel):
    empresa: str | None = Field(default=None, min_length=1, max_length=200)
    cargo: str | None = Field(default=None, min_length=1, max_length=200)
    descripcion: str | None = Field(default=None, max_length=50000)
    cv_id: int | None = None
    enlace: str | None = Field(default=None, max_length=1000)
    idioma: Idioma | None = None
    estado: Estado | None = None
    notas: str | None = Field(default=None, max_length=20000)
    nota_del_cambio: str = Field(default="", max_length=2000)


def _una(bd: BaseDeDatos, id_: int) -> dict[str, Any]:
    fila = bd.uno(
        f"SELECT {COLUMNAS} FROM candidaturas c LEFT JOIN cvs v ON v.id = c.cv_id "
        "WHERE c.id = %s",
        (id_,),
    )
    if not fila:
        raise HTTPException(404, "No existe esa candidatura")
    fila["historial"] = bd.todos(
        "SELECT estado, nota, fecha FROM historial WHERE candidatura_id = %s ORDER BY fecha DESC",
        (id_,),
    )
    return fila


@rutas.get("")
def listar(bd: BaseDeDatos = Depends(base)) -> list[dict[str, Any]]:
    return bd.todos(
        f"SELECT {COLUMNAS} FROM candidaturas c LEFT JOIN cvs v ON v.id = c.cv_id "
        "ORDER BY c.creada DESC"
    )


def registrar(bd: BaseDeDatos, datos: NuevaCandidatura, *, origen: str, con_ia: bool,
              carpeta: Path) -> dict[str, Any]:
    """
    Guarda una candidatura nueva. `origen`: «panel», «api» (con AGENT_TOKEN) o «mcp». `con_ia`:
    la encontro, preparo y envio una IA sola, sin intervencion.
    """
    fila = bd.uno(
        "INSERT INTO candidaturas (empresa, cargo, descripcion, cv_id, enlace, idioma, con_ia, "
        "origen) VALUES (%s, %s, %s, %s, %s, %s, %s, %s) RETURNING id",
        (datos.empresa.strip(), datos.cargo.strip(), datos.descripcion, datos.cv_id,
         datos.enlace.strip(), datos.idioma, con_ia, origen),
    )
    assert fila
    nota = "Enviada por la IA, sin intervencion" if con_ia else "Candidatura enviada"
    if origen == "mcp":
        nota += " (registrada por MCP)"
    bd.ejecutar("INSERT INTO historial (candidatura_id, estado, nota) VALUES (%s, %s, %s)",
                (fila["id"], "sin_contacto", nota))
    guardar_envio(bd, carpeta, fila["id"])
    return _una(bd, fila["id"])


@rutas.post("", status_code=201)
def crear(datos: NuevaCandidatura, bd: BaseDeDatos = Depends(base),
          quien: dict[str, Any] = Depends(sesion),
          configuracion: Configuracion = Depends(config)) -> dict[str, Any]:
    """
    Una candidatura nueva. Si la registra la IA con su token, queda marcada «Con IA»: la
    encontro, preparo y envio sola. Las que carga la persona desde el panel, nunca.
    """
    agente = bool(quien.get("agente"))
    return registrar(bd, datos, origen="api" if agente else "panel", con_ia=agente,
                     carpeta=configuracion.datos)


@rutas.get("/{id_}")
def ver(id_: int, bd: BaseDeDatos = Depends(base)) -> dict[str, Any]:
    return _una(bd, id_)


@rutas.patch("/{id_}")
def cambiar(id_: int, datos: Cambios, bd: BaseDeDatos = Depends(base),
            configuracion: Configuracion = Depends(config)) -> dict[str, Any]:
    actual = _una(bd, id_)
    cambios = datos.model_dump(exclude_unset=True, exclude={"nota_del_cambio"})
    if cambios:
        columnas = ", ".join(f"{columna} = %s" for columna in cambios)
        bd.ejecutar(
            f"UPDATE candidaturas SET {columnas}, actualizada = now() WHERE id = %s",
            (*cambios.values(), id_),
        )
    if datos.estado and datos.estado != actual["estado"]:
        bd.ejecutar("INSERT INTO historial (candidatura_id, estado, nota) VALUES (%s, %s, %s)",
                    (id_, datos.estado, datos.nota_del_cambio))
    # Si se corrige con que CV se mando, se vuelve a guardar lo enviado.
    if "cv_id" in cambios and cambios["cv_id"] != actual["cv_id"]:
        guardar_envio(bd, configuracion.datos, id_)
    return _una(bd, id_)


@rutas.delete("/{id_}")
def borrar(id_: int, bd: BaseDeDatos = Depends(base),
           configuracion: Configuracion = Depends(config)) -> dict[str, bool]:
    fila = bd.uno("SELECT video, enviado_cv, enviado_carta FROM candidaturas WHERE id = %s",
                  (id_,))
    if not fila:
        raise HTTPException(404, "No existe esa candidatura")
    for archivo in (fila["video"], fila["enviado_cv"], fila["enviado_carta"]):
        if archivo:
            ruta_segura(configuracion.datos, archivo).unlink(missing_ok=True)
    bd.ejecutar("DELETE FROM candidaturas WHERE id = %s", (id_,))
    return {"ok": True}


@rutas.post("/{id_}/video")
async def subir_video(id_: int, parte: int, final: bool, nombre: str, request: Request,
                      bd: BaseDeDatos = Depends(base),
                      configuracion: Configuracion = Depends(config)) -> dict[str, Any]:
    """El video de la videollamada, en trozos (?parte=0,1,... y final=true en el ultimo)."""
    _una(bd, id_)
    sufijo = extension(nombre, "videos")
    temporal = guardar_trozo(datos=configuracion.datos, carpeta="videos", base=f"c{id_}",
                             parte=parte, trozo=await request.body())
    if not final:
        return {"parte": parte}
    anterior = bd.uno("SELECT video FROM candidaturas WHERE id = %s", (id_,))
    if anterior and anterior["video"]:
        ruta_segura(configuracion.datos, anterior["video"]).unlink(missing_ok=True)
    relativa = f"videos/c{id_}{sufijo}"
    terminar(temporal, configuracion.datos / relativa)
    bd.ejecutar(
        "UPDATE candidaturas SET video = %s, video_nombre = %s, actualizada = now() WHERE id = %s",
        (relativa, nombre_limpio(nombre), id_),
    )
    return _una(bd, id_)


@rutas.get("/{id_}/video")
def ver_video(id_: int, bd: BaseDeDatos = Depends(base),
              configuracion: Configuracion = Depends(config)) -> FileResponse:
    fila = bd.uno("SELECT video, video_nombre FROM candidaturas WHERE id = %s", (id_,))
    if not fila or not fila["video"]:
        raise HTTPException(404, "Sin video")
    return FileResponse(ruta_segura(configuracion.datos, fila["video"]),
                        filename=fila["video_nombre"], content_disposition_type="inline")


@rutas.delete("/{id_}/video")
def borrar_video(id_: int, bd: BaseDeDatos = Depends(base),
                 configuracion: Configuracion = Depends(config)) -> dict[str, Any]:
    fila = bd.uno("SELECT video FROM candidaturas WHERE id = %s", (id_,))
    if fila and fila["video"]:
        ruta_segura(configuracion.datos, fila["video"]).unlink(missing_ok=True)
    bd.ejecutar("UPDATE candidaturas SET video = NULL, video_nombre = NULL WHERE id = %s", (id_,))
    return _una(bd, id_)


@rutas.get("/{id_}/enviado/{que}.pdf", response_model=None)
def enviado(id_: int, que: Literal["cv", "carta"], *, descargar: bool = False,
            bd: BaseDeDatos = Depends(base),
            configuracion: Configuracion = Depends(config)) -> Response:
    """El CV o la carta tal como se enviaron en esta candidatura."""
    fila = bd.uno("SELECT empresa, cargo, enviado, enviado_cv, enviado_carta FROM candidaturas "
                  "WHERE id = %s", (id_,))
    if not fila:
        raise HTTPException(404, "No existe esa candidatura")
    archivo = fila["enviado_cv"] if que == "cv" else fila["enviado_carta"]
    if not archivo:
        url = (fila["enviado"] or {}).get("cv_url")
        if que == "cv" and url:
            return RedirectResponse(url)
        raise HTTPException(404, "No se envio ese PDF")
    sigla = (fila["enviado"] or {}).get("siglas") or siglas(fila["empresa"])
    nombre = nombre_de_archivo(sigla=sigla, cargo=fila["cargo"],
                               extra="Carta" if que == "carta" else "")
    return FileResponse(ruta_segura(configuracion.datos, archivo), media_type="application/pdf",
                        headers={"Content-Disposition": disposicion(nombre, descargar=descargar)})
