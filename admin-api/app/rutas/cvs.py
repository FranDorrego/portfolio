# ************************************************************************** #
#      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     #
#     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    #
#    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       #
#   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       #
#                                                                            #
#   File: cvs.py    Project: portfolio                                       #
#   Created: 2026/11/26 21:06:35  by vm                                      #
#   Updated: 2026/11/27 10:39:32  by vm                                      #
# ************************************************************************** #

"""
Los CV: los dos del sitio (automaticos), los base para ATS (espanol y portugues), los que subo yo en PDF y los que
arma el agente para cada vacante. Los que tienen contenido estructurado se imprimen al pedirlos.
"""

import json
from typing import Any, Literal

from fastapi import APIRouter, Depends, HTTPException, Request
from fastapi.responses import FileResponse, RedirectResponse, Response
from pydantic import BaseModel, Field

from app.agente import ErrorDelAgente, adaptar
from app.archivos import extension, guardar_trozo, ruta_segura, terminar
from app.base_de_datos import BaseDeDatos
from app.configuracion import Configuracion
from app.dependencias import base, config, sesion
from app.nombres import disposicion, nombre_de_archivo, siglas
from app.pdf import carta_en_pdf, cv_en_pdf

rutas = APIRouter(prefix="/api/cvs", tags=["cvs"], dependencies=[Depends(sesion)])

Idioma = Literal["es", "pt", "en"]
COLUMNAS = (
    "id, nombre, tipo, idioma, url, vacante, carta, notas, creado, empresa, siglas, cargo, "
    "(contenido IS NOT NULL) AS tiene_contenido, (archivo IS NOT NULL) AS tiene_archivo"
)


class NuevoCv(BaseModel):
    nombre: str = Field(min_length=1, max_length=200)
    idioma: Idioma = "es"


class Cambios(BaseModel):
    nombre: str | None = Field(default=None, min_length=1, max_length=200)
    contenido: dict[str, Any] | None = None
    carta: str | None = Field(default=None, max_length=20000)


class Indicacion(BaseModel):
    indicacion: str = Field(min_length=3, max_length=4000)


class PedidoAlAgente(BaseModel):
    vacante: str = Field(min_length=30, max_length=50000)
    idioma: Idioma = "es"
    base_id: int | None = None


def _perfil(bd: BaseDeDatos) -> dict[str, Any]:
    return bd.uno("SELECT que_busco, sobre_mi, telefono, email FROM perfil WHERE id = 1") or {}


def _uno(bd: BaseDeDatos, id_: int) -> dict[str, Any]:
    fila = bd.uno(f"SELECT {COLUMNAS}, contenido FROM cvs WHERE id = %s", (id_,))
    if not fila:
        raise HTTPException(404, "No existe ese CV")
    return fila


@rutas.get("")
def listar(bd: BaseDeDatos = Depends(base)) -> list[dict[str, Any]]:
    return bd.todos(
        f"SELECT {COLUMNAS} FROM cvs ORDER BY "
        "CASE tipo WHEN 'sitio' THEN 0 WHEN 'base' THEN 1 ELSE 2 END, "
        "CASE WHEN tipo IN ('sitio', 'base') THEN id ELSE -id END"
    )


@rutas.get("/{id_}")
def ver(id_: int, bd: BaseDeDatos = Depends(base)) -> dict[str, Any]:
    return _uno(bd, id_)


@rutas.post("", status_code=201)
def crear(datos: NuevoCv, bd: BaseDeDatos = Depends(base)) -> dict[str, Any]:
    """Un CV propio: se crea vacio y despues se le sube el PDF."""
    fila = bd.uno("INSERT INTO cvs (nombre, tipo, idioma) VALUES (%s, 'subido', %s) RETURNING id",
                  (datos.nombre.strip(), datos.idioma))
    assert fila
    return _uno(bd, fila["id"])


@rutas.patch("/{id_}")
def cambiar(id_: int, datos: Cambios, bd: BaseDeDatos = Depends(base)) -> dict[str, Any]:
    actual = _uno(bd, id_)
    if actual["tipo"] == "sitio":
        raise HTTPException(400, "Los CV del sitio se editan en el sitio")
    cambios = datos.model_dump(exclude_unset=True)
    if "contenido" in cambios and cambios["contenido"] is not None:
        cambios["contenido"] = json.dumps(cambios["contenido"], ensure_ascii=False)
    if cambios:
        columnas = ", ".join(f"{columna} = %s" for columna in cambios)
        bd.ejecutar(f"UPDATE cvs SET {columnas} WHERE id = %s", (*cambios.values(), id_))
    return _uno(bd, id_)


@rutas.delete("/{id_}")
def borrar(id_: int, bd: BaseDeDatos = Depends(base),
           configuracion: Configuracion = Depends(config)) -> dict[str, bool]:
    fila = _uno(bd, id_)
    if fila["tipo"] in ("sitio", "base"):
        raise HTTPException(400, "Este CV no se borra")
    archivo = bd.uno("SELECT archivo FROM cvs WHERE id = %s", (id_,))
    if archivo and archivo["archivo"]:
        ruta_segura(configuracion.datos, archivo["archivo"]).unlink(missing_ok=True)
    bd.ejecutar("DELETE FROM cvs WHERE id = %s", (id_,))
    return {"ok": True}


@rutas.post("/{id_}/archivo")
async def subir(id_: int, parte: int, final: bool, nombre: str, request: Request,
                bd: BaseDeDatos = Depends(base),
                configuracion: Configuracion = Depends(config)) -> dict[str, Any]:
    _uno(bd, id_)
    extension(nombre, "cvs")
    temporal = guardar_trozo(datos=configuracion.datos, carpeta="cvs", base=f"cv{id_}",
                             parte=parte, trozo=await request.body())
    if not final:
        return {"parte": parte}
    relativa = f"cvs/cv{id_}.pdf"
    terminar(temporal, configuracion.datos / relativa)
    bd.ejecutar("UPDATE cvs SET archivo = %s WHERE id = %s", (relativa, id_))
    return _uno(bd, id_)


def _archivo(fila: dict[str, Any], *, extra: str = "") -> str:
    """
    «<siglas> - <cargo> - Franco Dorrego.pdf». Los CV adaptados guardan empresa y cargo; los
    anteriores los sacan de su nombre («Empresa · Cargo»); el resto usa su nombre.
    """
    empresa, cargo = fila.get("empresa"), fila.get("cargo")
    if not empresa and fila.get("tipo") == "generado" and " · " in fila["nombre"]:
        empresa, cargo = fila["nombre"].split(" · ", 1)
    if empresa:
        return nombre_de_archivo(sigla=fila.get("siglas") or siglas(empresa), cargo=cargo or "",
                                 extra=extra)
    return nombre_de_archivo(sigla="CV", cargo=fila["nombre"], extra=extra)


_FILA = "SELECT nombre, tipo, url, archivo, contenido, carta, empresa, siglas, cargo FROM cvs"


@rutas.get("/{id_}/pdf", response_model=None)
def pdf(id_: int, *, descargar: bool = False, bd: BaseDeDatos = Depends(base),
        configuracion: Configuracion = Depends(config)) -> Response:
    """El CV en PDF; con ?descargar=true baja como archivo con su nombre."""
    fila = bd.uno(f"{_FILA} WHERE id = %s", (id_,))
    if not fila:
        raise HTTPException(404, "No existe ese CV")
    cabecera = {"Content-Disposition": disposicion(_archivo(fila), descargar=descargar)}
    if fila["archivo"]:
        return FileResponse(ruta_segura(configuracion.datos, fila["archivo"]),
                            media_type="application/pdf", headers=cabecera)
    if fila["contenido"]:
        documento = cv_en_pdf(fila["contenido"], _perfil(bd))
        return Response(documento, media_type="application/pdf", headers=cabecera)
    if fila["url"]:
        return RedirectResponse(fila["url"])
    raise HTTPException(404, "Este CV no tiene PDF")


@rutas.get("/{id_}/carta.pdf")
def carta(id_: int, *, descargar: bool = False, bd: BaseDeDatos = Depends(base)) -> Response:
    fila = bd.uno(f"{_FILA} WHERE id = %s", (id_,))
    if not fila or not fila["carta"]:
        raise HTTPException(404, "Este CV no tiene carta")
    nombre = (fila["contenido"] or {}).get("nombre", "Franco Dorrego")
    cabecera = disposicion(_archivo(fila, extra="Carta"), descargar=descargar)
    return Response(carta_en_pdf(fila["carta"], nombre), media_type="application/pdf",
                    headers={"Content-Disposition": cabecera})


@rutas.post("/adaptar", status_code=201)
def adaptar_a_vacante(pedido: PedidoAlAgente, bd: BaseDeDatos = Depends(base),
                      configuracion: Configuracion = Depends(config)) -> dict[str, Any]:
    """El agente arma un CV y una carta para la vacante, y los guarda como un CV nuevo."""
    if pedido.base_id:
        origen = bd.uno("SELECT contenido FROM cvs WHERE id = %s AND contenido IS NOT NULL",
                        (pedido.base_id,))
    else:
        # Sin base elegida, la del idioma pedido (para ingles, la de espanol).
        idioma_base = pedido.idioma if pedido.idioma in ("es", "pt") else "es"
        origen = bd.uno("SELECT contenido FROM cvs WHERE tipo = 'base' AND idioma = %s "
                        "ORDER BY id LIMIT 1", (idioma_base,))
    if not origen:
        raise HTTPException(400, "Ese CV no tiene contenido para adaptar")
    try:
        resultado = adaptar(configuracion, vacante=pedido.vacante, idioma=pedido.idioma,
                            base=origen["contenido"], perfil=_perfil(bd))
    except ErrorDelAgente as error:
        raise HTTPException(502, str(error)) from error
    nombre = " · ".join(p for p in (resultado["empresa"], resultado["cargo"]) if p) or "Vacante"
    sigla = resultado.get("siglas") or siglas(resultado["empresa"])
    fila = bd.uno(
        "INSERT INTO cvs (nombre, tipo, idioma, contenido, vacante, carta, notas, empresa, "
        "siglas, cargo) VALUES (%s, 'generado', %s, %s, %s, %s, %s, %s, %s, %s) RETURNING id",
        (nombre, pedido.idioma, json.dumps(resultado["cv"], ensure_ascii=False), pedido.vacante,
         resultado["carta"], resultado["notas"], resultado["empresa"], sigla,
         resultado["cargo"]),
    )
    assert fila
    return {**_uno(bd, fila["id"]), "empresa": resultado["empresa"], "cargo": resultado["cargo"]}


@rutas.post("/{id_}/rehacer")
def rehacer(id_: int, pedido: Indicacion, bd: BaseDeDatos = Depends(base),
            configuracion: Configuracion = Depends(config)) -> dict[str, Any]:
    """
    Rehace un CV adaptado y su carta con una indicacion («mas corto», «destaca Docker»...). Queda
    en el mismo CV: misma empresa, cargo y nombre de archivo.
    """
    fila = bd.uno("SELECT tipo, idioma, contenido, carta, vacante FROM cvs WHERE id = %s", (id_,))
    if not fila:
        raise HTTPException(404, "No existe ese CV")
    if fila["tipo"] != "generado" or not fila["contenido"] or not fila["vacante"]:
        raise HTTPException(400, "Solo se rehacen los CV adaptados a una vacante")
    idioma_base = fila["idioma"] if fila["idioma"] in ("es", "pt") else "es"
    origen = bd.uno("SELECT contenido FROM cvs WHERE tipo = 'base' AND idioma = %s "
                    "ORDER BY id LIMIT 1", (idioma_base,))
    try:
        resultado = adaptar(
            configuracion, vacante=fila["vacante"], idioma=fila["idioma"],
            base=(origen or {}).get("contenido") or fila["contenido"], perfil=_perfil(bd),
            rehacer={"cv": fila["contenido"], "carta": fila["carta"] or "",
                     "indicacion": pedido.indicacion},
        )
    except ErrorDelAgente as error:
        raise HTTPException(502, str(error)) from error
    bd.ejecutar(
        "UPDATE cvs SET contenido = %s, carta = %s, notas = %s WHERE id = %s",
        (json.dumps(resultado["cv"], ensure_ascii=False), resultado["carta"], resultado["notas"],
         id_),
    )
    return _uno(bd, id_)
