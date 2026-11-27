# ************************************************************************** #
#      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     #
#     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    #
#    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       #
#   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       #
#                                                                            #
#   File: terminos.py    Project: portfolio                                  #
#   Created: 2026/11/27 20:40:26  by vm                                      #
#   Updated: 2026/11/27 20:40:26  by vm                                      #
# ************************************************************************** #

"""
Lo que nunca va en un CV ni en una carta: se limpia en lo que devuelve el agente y otra vez al
dibujar cada PDF, asi tambien quedan bien los CV hechos antes de cada regla.
"""

import re
from typing import Any

# Lo que nunca va en un CV ni en una carta, aunque el modelo lo escriba: «miniVPS» se dice «VPS»,
# los porcentajes de commits se quitan y el Java de la ULP no es «Full Stack Java».
_REEMPLAZOS = (
    (re.compile(r"\bmini\s?VPS\b", re.IGNORECASE), "VPS"),
    (re.compile(r"\s*\(\s*\d+(?:[.,]\d+)?\s*%\s*d[eo]s?\s+(?:los\s+|os\s+|the\s+)?commits\s*\)",
                re.IGNORECASE), ""),
    (re.compile(r"\s*\(\s*\d+\s+(?:de|of)\s+\d+\s+commits\s*\)", re.IGNORECASE), ""),
    (re.compile(r"\bFull\s?Stack\s+Java\b", re.IGNORECASE), "Fundamentos de Java"),
)


def sin_terminos_prohibidos(valor: Any) -> Any:
    """Aplica _REEMPLAZOS a todo el texto del CV o de la carta, recorriendo listas y objetos."""
    if isinstance(valor, str):
        for patron, reemplazo in _REEMPLAZOS:
            valor = patron.sub(reemplazo, valor)
        return valor
    if isinstance(valor, list):
        return [sin_terminos_prohibidos(item) for item in valor]
    if isinstance(valor, dict):
        return {clave: sin_terminos_prohibidos(item) for clave, item in valor.items()}
    return valor
