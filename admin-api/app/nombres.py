# ************************************************************************** #
#      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     #
#     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    #
#    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       #
#   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       #
#                                                                            #
#   File: nombres.py    Project: portfolio                                   #
#   Created: 2026/11/26 22:38:16  by vm                                      #
#   Updated: 2026/11/27 15:26:17  by vm                                      #
# ************************************************************************** #

"""
El nombre con que se descargan los PDF: «<siglas de la empresa> - <cargo> - Franco Dorrego.pdf»,
para encontrar despues que CV y que carta se mando a cada empresa.
"""

import re
import unicodedata
from urllib.parse import quote

AUTOR = "Franco Dorrego"

# Lo que acompana al nombre de una empresa y no es parte de como se la conoce.
_SOCIEDADES = re.compile(
    r"[,\s]+(s\.?\s?a\.?|s\.?\s?l\.?|lda\.?|ltda\.?|inc\.?|llc|gmbh|s\.?\s?a\.?\s?u\.?|"
    r"unipessoal|sgps)\.?$",
    re.IGNORECASE,
)
_MENORES = {"de", "da", "do", "das", "dos", "del", "la", "el", "e", "y", "and", "of", "the"}


def siglas(empresa: str) -> str:
    """
    Como se la conoce: un nombre corto queda igual («NTT DATA», «Talkdesk»); uno largo, en
    iniciales («Banco Portugues de Investimento» -> «BPI»).
    """
    nombre = empresa.strip()
    while _SOCIEDADES.search(nombre):
        nombre = _SOCIEDADES.sub("", nombre).strip()
    palabras = nombre.split()
    if len(nombre) <= 16 or len(palabras) < 3:
        return nombre
    return "".join(p[0].upper() for p in palabras if p.lower() not in _MENORES)


def _limpio(texto: str) -> str:
    """Sin los caracteres que un sistema de archivos no acepta."""
    sin_raros = re.sub(r'[\\/:*?"<>|\n\r\t]+', " ", texto)
    return re.sub(r"\s+", " ", sin_raros).strip(" .")


def nombre_de_archivo(*, sigla: str, cargo: str, extra: str = "") -> str:
    partes = [_limpio(p) for p in (sigla, cargo, AUTOR, extra) if p and _limpio(p)]
    return " - ".join(partes) + ".pdf"


def disposicion(nombre: str, *, descargar: bool) -> str:
    """Content-Disposition con el nombre en ASCII y en UTF-8 (tildes y n incluidas)."""
    sin_tildes = unicodedata.normalize("NFKD", nombre.replace("·", "-"))
    ascii_ = sin_tildes.encode("ascii", "ignore").decode() or "cv.pdf"
    modo = "attachment" if descargar else "inline"
    return f"{modo}; filename=\"{ascii_}\"; filename*=UTF-8''{quote(nombre)}"
