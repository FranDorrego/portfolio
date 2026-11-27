# ************************************************************************** #
#      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     #
#     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    #
#    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       #
#   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       #
#                                                                            #
#   File: descargas.py    Project: portfolio                                 #
#   Created: 2026/11/27 15:24:01  by vm                                      #
#   Updated: 2026/11/27 15:24:01  by vm                                      #
# ************************************************************************** #

"""
Enlaces de descarga firmados: un agente (por MCP) los pide para bajar el CV o la carta en PDF y
subirlos a otra plataforma, sin cookie ni token. Vencen solos y no se pueden falsificar: la firma
es un HMAC con AGENT_TOKEN, asi que cambiar ese token invalida todos los enlaces.
"""

import hashlib
import hmac
import time
from typing import Literal

from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import Response

from app.base_de_datos import BaseDeDatos
from app.configuracion import Configuracion
from app.dependencias import base, config
from app.rutas import cvs

Tipo = Literal["cv", "carta"]
rutas = APIRouter(prefix="/api/descargas", tags=["descargas"])


def _firma(secreto: str, *, tipo: str, id_: int, vence: int) -> str:
    mensaje = f"{tipo}:{id_}:{vence}".encode()
    return hmac.new(secreto.encode(), mensaje, hashlib.sha256).hexdigest()


def enlace_firmado(configuracion: Configuracion, *, tipo: Tipo, id_: int, horas: int) -> str:
    vence = int(time.time()) + max(1, min(horas, 24 * 30)) * 3600
    firma = _firma(configuracion.token_de_agente, tipo=tipo, id_=id_, vence=vence)
    return f"{configuracion.url_publica}/api/descargas/{tipo}/{id_}?vence={vence}&firma={firma}"


@rutas.get("/{tipo}/{id_}", response_model=None)
def descargar(tipo: Tipo, id_: int, vence: int, firma: str, bd: BaseDeDatos = Depends(base),
              configuracion: Configuracion = Depends(config)) -> Response:
    """El PDF con su nombre («<siglas> - <cargo> - Franco Dorrego.pdf»), si la firma vale."""
    if not configuracion.token_de_agente:
        raise HTTPException(404, "No hay descargas firmadas en este servidor")
    esperada = _firma(configuracion.token_de_agente, tipo=tipo, id_=id_, vence=vence)
    if not hmac.compare_digest(firma, esperada):
        raise HTTPException(403, "Enlace invalido")
    if vence < time.time():
        raise HTTPException(410, "El enlace vencio: pedi uno nuevo")
    if tipo == "carta":
        return cvs.carta(id_, descargar=True, bd=bd)
    return cvs.pdf(id_, descargar=True, bd=bd, configuracion=configuracion)
