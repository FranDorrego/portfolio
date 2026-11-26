# ************************************************************************** #
#      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     #
#     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    #
#    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       #
#   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       #
#                                                                            #
#   File: dependencias.py    Project: portfolio                              #
#   Created: 2026/11/26 21:05:38  by vm                                      #
#   Updated: 2026/11/26 21:05:38  by vm                                      #
# ************************************************************************** #

"""Lo que comparten las rutas: la base, la configuracion y la sesion obligatoria."""

from typing import Any

from fastapi import Depends, HTTPException, Request

from app.base_de_datos import BaseDeDatos
from app.configuracion import Configuracion
from app.seguridad import COOKIE, huella_del_token


def base(request: Request) -> BaseDeDatos:
    return request.app.state.base


def config(request: Request) -> Configuracion:
    return request.app.state.configuracion


def ip_de(request: Request) -> str:
    """Detras de nginx, la IP real viene en X-Real-IP."""
    return request.headers.get("x-real-ip") or (request.client.host if request.client else "")


def sesion(request: Request, bd: BaseDeDatos = Depends(base)) -> dict[str, Any]:
    token = request.cookies.get(COOKIE)
    if not token:
        raise HTTPException(401, "Sin sesion")
    cuenta = bd.uno(
        "SELECT c.id, c.email FROM sesiones s JOIN cuentas c ON c.id = s.cuenta_id "
        "WHERE s.huella = %s AND s.vence > now()",
        (huella_del_token(token),),
    )
    if not cuenta:
        raise HTTPException(401, "Sesion vencida")
    return cuenta
