# ************************************************************************** #
#      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     #
#     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    #
#    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       #
#   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       #
#                                                                            #
#   File: archivos.py    Project: portfolio                                  #
#   Created: 2026/11/26 21:06:07  by vm                                      #
#   Updated: 2026/11/26 21:06:07  by vm                                      #
# ************************************************************************** #

"""
Archivos subidos (videos y PDF) en trozos: cada pedido trae un trozo de hasta unos MB, asi nada
choca con el limite de tamano del proxy y un video grande se puede subir igual. Se guardan en
DATA_DIR, fuera del repositorio, para que sobrevivan a cada despliegue.
"""

import re
from pathlib import Path

from fastapi import HTTPException

TROZO_MAXIMO = 8 * 1024 * 1024
TAMANO_MAXIMO = 3 * 1024 * 1024 * 1024
EXTENSIONES = {
    "videos": {".mp4", ".webm", ".mov", ".mkv", ".m4v"},
    "cvs": {".pdf"},
}


def extension(nombre: str, carpeta: str) -> str:
    sufijo = Path(nombre).suffix.lower()
    if sufijo not in EXTENSIONES[carpeta]:
        permitidas = ", ".join(sorted(EXTENSIONES[carpeta]))
        raise HTTPException(400, f"Formato no permitido. Usa: {permitidas}")
    return sufijo


def nombre_limpio(nombre: str) -> str:
    return re.sub(r"[^\w.\- ]", "_", Path(nombre).name)[:120] or "archivo"


def guardar_trozo(*, datos: Path, carpeta: str, base: str, parte: int, trozo: bytes) -> Path:
    """Agrega un trozo al archivo temporal. La parte 0 lo empieza de cero."""
    if len(trozo) > TROZO_MAXIMO:
        raise HTTPException(413, "Trozo demasiado grande")
    destino = datos / carpeta
    destino.mkdir(parents=True, exist_ok=True)
    temporal = destino / f"{base}.subiendo"
    if parte == 0:
        temporal.write_bytes(b"")
    elif not temporal.exists():
        raise HTTPException(409, "La subida no empezo por la parte 0")
    if temporal.stat().st_size + len(trozo) > TAMANO_MAXIMO:
        temporal.unlink(missing_ok=True)
        raise HTTPException(413, "El archivo supera los 3 GB")
    with temporal.open("ab") as archivo:
        archivo.write(trozo)
    return temporal


def terminar(temporal: Path, final: Path) -> Path:
    temporal.replace(final)
    return final


def ruta_segura(datos: Path, relativa: str) -> Path:
    """La ruta guardada en la base, siempre adentro de DATA_DIR."""
    ruta = (datos / relativa).resolve()
    if datos.resolve() not in ruta.parents:
        raise HTTPException(400, "Ruta invalida")
    return ruta
