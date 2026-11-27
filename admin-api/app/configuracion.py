# ************************************************************************** #
#      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     #
#     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    #
#    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       #
#   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       #
#                                                                            #
#   File: configuracion.py    Project: portfolio                             #
#   Created: 2026/11/26 21:03:43  by vm                                      #
#   Updated: 2026/11/27 18:25:52  by vm                                      #
# ************************************************************************** #

"""La configuracion sale del entorno: la carga ArduMaker en el despliegue (nada va en el codigo)."""

import os
from dataclasses import dataclass, field
from pathlib import Path


def _lista(valor: str) -> list[str]:
    return [parte.strip() for parte in valor.split(",") if parte.strip()]


@dataclass(frozen=True)
class Configuracion:
    base_de_datos: str = field(default_factory=lambda: os.environ.get("DATABASE_URL", ""))
    datos: Path = field(
        default_factory=lambda: Path(os.environ.get("DATA_DIR", "./datos")).resolve()
    )
    # Solo sirve para crear la primera cuenta; despues de eso no abre nada.
    token_de_alta: str = field(default_factory=lambda: os.environ.get("SETUP_TOKEN", ""))
    # Para una IA que busca trabajo y se postula sola: entra con «Authorization: Bearer <token>»
    # y lo que registra queda marcado «Con IA». Sin el, no hay acceso para agentes.
    token_de_agente: str = field(default_factory=lambda: os.environ.get("AGENT_TOKEN", ""))
    # El agente que adapta los CV usa la API de Claude (Anthropic).
    clave_de_ia: str = field(default_factory=lambda: os.environ.get("ANTHROPIC_API_KEY", ""))
    modelo: str = field(default_factory=lambda: os.environ.get("LLM_MODEL", "claude-opus-5-5"))
    # Cuanto piensa el modelo: low, medium, high, xhigh o max (en Claude Opus 5.5 por defecto,
    # medium).
    esfuerzo: str = field(default_factory=lambda: os.environ.get("LLM_EFFORT", "medium"))
    origenes: list[str] = field(
        default_factory=lambda: _lista(os.environ.get("ALLOWED_ORIGINS", ""))
    )
    sitio: str = field(
        default_factory=lambda: os.environ.get("SITE_URL", "https://francodorrego.com").rstrip("/")
    )
    # La direccion publica de la API: con ella se arman los enlaces de descarga firmados.
    url_publica: str = field(
        default_factory=lambda: os.environ.get(
            "PUBLIC_API_URL", "https://api.francodorrego.com"
        ).rstrip("/")
    )
    cookie_segura: bool = field(
        default_factory=lambda: os.environ.get("COOKIE_SECURE", "true").lower() != "false"
    )


def configuracion() -> Configuracion:
    return Configuracion()
