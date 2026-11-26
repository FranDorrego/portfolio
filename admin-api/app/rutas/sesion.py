# ************************************************************************** #
#      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     #
#     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    #
#    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       #
#   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       #
#                                                                            #
#   File: sesion.py    Project: portfolio                                    #
#   Created: 2026/11/26 21:05:38  by vm                                      #
#   Updated: 2026/11/26 21:05:38  by vm                                      #
# ************************************************************************** #

"""Entrar, salir, crear la primera cuenta y cambiar la clave."""

import hmac
from typing import Any

from fastapi import APIRouter, Depends, HTTPException, Request, Response
from pydantic import BaseModel, Field

from app.base_de_datos import BaseDeDatos
from app.configuracion import Configuracion
from app.dependencias import base, config, ip_de, sesion
from app.seguridad import (
    COOKIE,
    DURACION,
    cifrar_clave,
    clave_correcta,
    huella_del_token,
    nuevo_token,
    vencimiento,
)

rutas = APIRouter(prefix="/api/sesion", tags=["sesion"])


class Credenciales(BaseModel):
    email: str = Field(min_length=3, max_length=200)
    clave: str = Field(min_length=1, max_length=200)


class Alta(Credenciales):
    token: str
    clave: str = Field(min_length=10, max_length=200)


class CambioDeClave(BaseModel):
    actual: str
    nueva: str = Field(min_length=10, max_length=200)


def _abrir_sesion(respuesta: Response, *, bd: BaseDeDatos, cuenta_id: int,
                  segura: bool) -> None:
    token = nuevo_token()
    bd.ejecutar(
        "INSERT INTO sesiones (huella, cuenta_id, vence) VALUES (%s, %s, %s)",
        (huella_del_token(token), cuenta_id, vencimiento()),
    )
    respuesta.set_cookie(
        COOKIE,
        token,
        max_age=int(DURACION.total_seconds()),
        httponly=True,
        secure=segura,
        samesite="lax",
        path="/",
    )


@rutas.get("")
def estado(request: Request, bd: BaseDeDatos = Depends(base)) -> dict[str, Any]:
    hay_cuenta = bd.uno("SELECT 1 AS hay FROM cuentas LIMIT 1") is not None
    try:
        cuenta = sesion(request, bd)
    except HTTPException:
        cuenta = None
    return {"hay_cuenta": hay_cuenta, "email": cuenta["email"] if cuenta else None}


@rutas.post("/alta")
def alta(datos: Alta, respuesta: Response, bd: BaseDeDatos = Depends(base),
         configuracion: Configuracion = Depends(config)) -> dict[str, str]:
    """La primera cuenta, con el token de alta del servidor. Despues queda cerrada."""
    if bd.uno("SELECT 1 AS hay FROM cuentas LIMIT 1"):
        raise HTTPException(409, "Ya hay una cuenta")
    esperado = configuracion.token_de_alta
    if not esperado or not hmac.compare_digest(datos.token, esperado):
        raise HTTPException(403, "Token de alta incorrecto")
    cuenta = bd.uno(
        "INSERT INTO cuentas (email, clave) VALUES (%s, %s) RETURNING id",
        (datos.email.strip().lower(), cifrar_clave(datos.clave)),
    )
    assert cuenta
    _abrir_sesion(respuesta, bd=bd, cuenta_id=cuenta["id"], segura=configuracion.cookie_segura)
    return {"email": datos.email.strip().lower()}


@rutas.post("")
def entrar(datos: Credenciales, request: Request, respuesta: Response,
           bd: BaseDeDatos = Depends(base),
           configuracion: Configuracion = Depends(config)) -> dict[str, str]:
    freno = request.app.state.freno
    ip = ip_de(request)
    if freno.bloqueado(ip):
        raise HTTPException(429, "Demasiados intentos. Proba en 15 minutos.")
    cuenta = bd.uno(
        "SELECT id, email, clave FROM cuentas WHERE email = %s", (datos.email.strip().lower(),)
    )
    if not cuenta or not clave_correcta(datos.clave, cuenta["clave"]):
        freno.fallo(ip)
        raise HTTPException(401, "Email o clave incorrectos")
    freno.acierto(ip)
    _abrir_sesion(respuesta, bd=bd, cuenta_id=cuenta["id"], segura=configuracion.cookie_segura)
    return {"email": cuenta["email"]}


@rutas.delete("")
def salir(request: Request, respuesta: Response,
          bd: BaseDeDatos = Depends(base)) -> dict[str, bool]:
    token = request.cookies.get(COOKIE)
    if token:
        bd.ejecutar("DELETE FROM sesiones WHERE huella = %s", (huella_del_token(token),))
    respuesta.delete_cookie(COOKIE, path="/")
    return {"ok": True}


@rutas.post("/clave")
def cambiar_clave(datos: CambioDeClave, cuenta: dict[str, Any] = Depends(sesion),
                  bd: BaseDeDatos = Depends(base)) -> dict[str, bool]:
    guardada = bd.uno("SELECT clave FROM cuentas WHERE id = %s", (cuenta["id"],))
    if not guardada or not clave_correcta(datos.actual, guardada["clave"]):
        raise HTTPException(400, "La clave actual no es correcta")
    bd.ejecutar("UPDATE cuentas SET clave = %s WHERE id = %s",
                (cifrar_clave(datos.nueva), cuenta["id"]))
    return {"ok": True}
