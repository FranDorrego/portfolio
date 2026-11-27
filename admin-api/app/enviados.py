# ************************************************************************** #
#      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     #
#     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    #
#    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       #
#   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       #
#                                                                            #
#   File: enviados.py    Project: portfolio                                  #
#   Created: 2026/11/27 17:36:55  by vm                                      #
#   Updated: 2026/11/27 17:37:49  by vm                                      #
# ************************************************************************** #

"""
Lo que se envio en cada candidatura, congelado en el momento de registrarla: el PDF del CV, el de
la carta y los datos (CV usado, empresa, cargo, enlace, idioma, la carta en texto). Asi la
candidatura conserva exactamente lo que se mando aunque despues el CV se rehaga o se borre.
"""

import json
import shutil
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

from app.base_de_datos import BaseDeDatos
from app.nombres import siglas
from app.pdf import carta_en_pdf, cv_en_pdf

CARPETA = "enviados"


def guardar_envio(bd: BaseDeDatos, datos: Path, candidatura_id: int) -> None:
    """Copia el CV (y la carta) que tiene ahora la candidatura. Sin CV, guarda solo los datos."""
    fila = bd.uno(
        "SELECT c.empresa, c.cargo, c.enlace, c.idioma, c.descripcion, c.cv_id, v.nombre, "
        "v.tipo, v.url, v.archivo, v.contenido, v.carta, v.siglas FROM candidaturas c "
        "LEFT JOIN cvs v ON v.id = c.cv_id WHERE c.id = %s",
        (candidatura_id,),
    )
    if not fila:
        return
    perfil = bd.uno("SELECT telefono, email FROM perfil WHERE id = 1") or {}
    carpeta = datos / CARPETA
    carpeta.mkdir(parents=True, exist_ok=True)
    cv_rel = carta_rel = None
    if fila["archivo"]:
        cv_rel = f"{CARPETA}/c{candidatura_id}-cv.pdf"
        shutil.copyfile(datos / fila["archivo"], datos / cv_rel)
    elif fila["contenido"]:
        cv_rel = f"{CARPETA}/c{candidatura_id}-cv.pdf"
        (datos / cv_rel).write_bytes(cv_en_pdf(fila["contenido"], perfil))
    if fila["carta"]:
        carta_rel = f"{CARPETA}/c{candidatura_id}-carta.pdf"
        nombre = (fila["contenido"] or {}).get("nombre", "Franco Dorrego")
        (datos / carta_rel).write_bytes(carta_en_pdf(fila["carta"], nombre))
    envio: dict[str, Any] = {
        "fecha": datetime.now(timezone.utc).isoformat(),
        "empresa": fila["empresa"],
        # Para el nombre de los PDF: las siglas que dio el agente o, si no, las armadas.
        "siglas": fila["siglas"] or siglas(fila["empresa"]),
        "cargo": fila["cargo"],
        "enlace": fila["enlace"],
        "idioma": fila["idioma"],
        "cv_id": fila["cv_id"],
        "cv_nombre": fila["nombre"],
        "cv_tipo": fila["tipo"],
        # Los CV del sitio no se copian: son publicos y quedan en su direccion.
        "cv_url": fila["url"],
        "carta": fila["carta"],
        "resumen": (fila["contenido"] or {}).get("resumen"),
    }
    bd.ejecutar(
        "UPDATE candidaturas SET enviado = %s, enviado_cv = %s, enviado_carta = %s WHERE id = %s",
        (json.dumps(envio, ensure_ascii=False), cv_rel, carta_rel, candidatura_id),
    )


def completar_envios(bd: BaseDeDatos, datos: Path) -> None:
    """Las candidaturas de antes de este cambio: se guarda lo que tienen ahora."""
    for fila in bd.todos("SELECT id FROM candidaturas WHERE enviado IS NULL"):
        try:
            guardar_envio(bd, datos, fila["id"])
        except OSError:
            continue
