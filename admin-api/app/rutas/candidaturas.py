# ************************************************************************** #
#      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     #
#     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    #
#    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       #
#   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       #
#                                                                            #
#   File: candidaturas.py    Project: portfolio                              #
#   Created: 2026/11/26 21:06:07  by vm                                      #
#   Updated: 2026/11/27 15:00:26  by vm                                      #
# ************************************************************************** #

"""Las candidaturas: a donde me postule, con que CV, y como va."""

from typing import Any, Literal

from fastapi import APIRouter, Depends, HTTPException, Request
from fastapi.responses import FileResponse
from pydantic import BaseModel, Field

from app.archivos import extension, guardar_trozo, nombre_limpio, ruta_segura, terminar
from app.base_de_datos import BaseDeDatos
from app.configuracion import Configuracion
from app.dependencias import base, config, sesion

rutas = APIRouter(prefix="/api/candidaturas", tags=["candidaturas"],
                  dependencies=[Depends(sesion)])

Estado = Literal["sin_contacto", "contacto", "videollamada", "oferta", "rechazada"]
Idioma = Literal["es", "pt", "en"]

COLUMNAS = (
    "c.id, c.empresa, c.cargo, c.descripcion, c.cv_id, c.enlace, c.idioma, c.estado, c.notas, "
    "c.video_nombre, (c.video IS NOT NULL) AS tiene_video, c.creada, c.actualizada, "
    "v.nombre AS cv_nombre, c.con_ia"
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


@rutas.post("", status_code=201)
def crear(datos: NuevaCandidatura, bd: BaseDeDatos = Depends(base),
          quien: dict[str, Any] = Depends(sesion)) -> dict[str, Any]:
    """
    Una candidatura nueva. Si la registra la IA con su token, queda marcada «Con IA»: la
    encontro, preparo y envio sola. Las que carga la persona desde el panel, nunca.
    """
    con_ia = bool(quien.get("agente"))
    fila = bd.uno(
        "INSERT INTO candidaturas (empresa, cargo, descripcion, cv_id, enlace, idioma, con_ia) "
        "VALUES (%s, %s, %s, %s, %s, %s, %s) RETURNING id",
        (datos.empresa.strip(), datos.cargo.strip(), datos.descripcion, datos.cv_id,
         datos.enlace.strip(), datos.idioma, con_ia),
    )
    assert fila
    nota = "Enviada por la IA, sin intervencion" if con_ia else "Candidatura enviada"
    bd.ejecutar("INSERT INTO historial (candidatura_id, estado, nota) VALUES (%s, %s, %s)",
                (fila["id"], "sin_contacto", nota))
    return _una(bd, fila["id"])


@rutas.get("/{id_}")
def ver(id_: int, bd: BaseDeDatos = Depends(base)) -> dict[str, Any]:
    return _una(bd, id_)


@rutas.patch("/{id_}")
def cambiar(id_: int, datos: Cambios, bd: BaseDeDatos = Depends(base)) -> dict[str, Any]:
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
    return _una(bd, id_)


@rutas.delete("/{id_}")
def borrar(id_: int, bd: BaseDeDatos = Depends(base),
           configuracion: Configuracion = Depends(config)) -> dict[str, bool]:
    fila = bd.uno("SELECT video FROM candidaturas WHERE id = %s", (id_,))
    if not fila:
        raise HTTPException(404, "No existe esa candidatura")
    if fila["video"]:
        ruta_segura(configuracion.datos, fila["video"]).unlink(missing_ok=True)
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
