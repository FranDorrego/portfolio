# ************************************************************************** #
#      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     #
#     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    #
#    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       #
#   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       #
#                                                                            #
#   File: publico.py    Project: portfolio                                   #
#   Created: 2026/11/26 21:34:31  by vm                                      #
#   Updated: 2026/11/26 21:34:31  by vm                                      #
# ************************************************************************** #

"""
Lo unico publico de la API: los CV para ATS en PDF, en espanol y en portugues, que el sitio
ofrece para descargar. Llevan el telefono y el email de «Sobre mi».
"""

from typing import Literal

from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import Response

from app.base_de_datos import BaseDeDatos
from app.dependencias import base
from app.pdf import cv_en_pdf

rutas = APIRouter(prefix="/api/publico", tags=["publico"])


@rutas.get("/cv-ats-{idioma}.pdf")
def cv_para_ats(idioma: Literal["es", "pt"], bd: BaseDeDatos = Depends(base)) -> Response:
    fila = bd.uno(
        "SELECT contenido FROM cvs WHERE tipo = 'base' AND idioma = %s ORDER BY id LIMIT 1",
        (idioma,),
    )
    if not fila or not fila["contenido"]:
        raise HTTPException(404, "No hay CV para ese idioma")
    perfil = bd.uno("SELECT telefono, email FROM perfil WHERE id = 1") or {}
    nombre = f"Franco-Dorrego-CV-{idioma.upper()}.pdf"
    return Response(
        cv_en_pdf(fila["contenido"], perfil),
        media_type="application/pdf",
        headers={
            "Content-Disposition": f'inline; filename="{nombre}"',
            "Cache-Control": "public, max-age=300",
        },
    )
