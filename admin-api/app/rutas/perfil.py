# ************************************************************************** #
#      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     #
#     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    #
#    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       #
#   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       #
#                                                                            #
#   File: perfil.py    Project: portfolio                                    #
#   Created: 2026/11/26 21:06:35  by vm                                      #
#   Updated: 2026/11/26 21:06:35  by vm                                      #
# ************************************************************************** #

"""«Sobre mi»: lo que busco y quien soy. Es el contexto del agente; el telefono y el email van al CV."""

from typing import Any

from fastapi import APIRouter, Depends
from pydantic import BaseModel, Field

from app.base_de_datos import BaseDeDatos
from app.dependencias import base, sesion

rutas = APIRouter(prefix="/api/perfil", tags=["perfil"], dependencies=[Depends(sesion)])


class Perfil(BaseModel):
    que_busco: str = Field(default="", max_length=10000)
    sobre_mi: str = Field(default="", max_length=20000)
    telefono: str = Field(default="", max_length=60)
    email: str = Field(default="", max_length=200)


@rutas.get("")
def ver(bd: BaseDeDatos = Depends(base)) -> dict[str, Any]:
    return bd.uno("SELECT que_busco, sobre_mi, telefono, email, actualizado FROM perfil") or {}


@rutas.put("")
def guardar(datos: Perfil, bd: BaseDeDatos = Depends(base)) -> dict[str, Any]:
    bd.ejecutar(
        "UPDATE perfil SET que_busco = %s, sobre_mi = %s, telefono = %s, email = %s, "
        "actualizado = now() WHERE id = 1",
        (datos.que_busco, datos.sobre_mi, datos.telefono.strip(), datos.email.strip()),
    )
    return ver(bd)
