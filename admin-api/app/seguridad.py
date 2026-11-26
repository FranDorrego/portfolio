# ************************************************************************** #
#      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     #
#     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    #
#    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       #
#   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       #
#                                                                            #
#   File: seguridad.py    Project: portfolio                                 #
#   Created: 2026/11/26 21:04:03  by vm                                      #
#   Updated: 2026/11/26 21:04:03  by vm                                      #
# ************************************************************************** #

"""Claves, sesiones por cookie y un freno a los intentos de entrar a la fuerza."""

import hashlib
import hmac
import secrets
import time
from collections import defaultdict, deque
from datetime import datetime, timedelta, timezone

COOKIE = "fd_sesion"
DURACION = timedelta(days=30)
_INTENTOS_PERMITIDOS = 8
_VENTANA_DE_INTENTOS = 15 * 60


def cifrar_clave(clave: str) -> str:
    """scrypt de la biblioteca estandar, con sal propia: `scrypt$sal$huella`."""
    sal = secrets.token_bytes(16)
    huella = hashlib.scrypt(clave.encode(), salt=sal, n=2**14, r=8, p=1, dklen=32)
    return f"scrypt${sal.hex()}${huella.hex()}"


def clave_correcta(clave: str, guardada: str) -> bool:
    try:
        metodo, sal, huella = guardada.split("$")
    except ValueError:
        return False
    if metodo != "scrypt":
        return False
    calculada = hashlib.scrypt(
        clave.encode(), salt=bytes.fromhex(sal), n=2**14, r=8, p=1, dklen=32
    )
    return hmac.compare_digest(calculada.hex(), huella)


def nuevo_token() -> str:
    return secrets.token_urlsafe(32)


def huella_del_token(token: str) -> str:
    """En la base va la huella: si alguien lee la tabla, no puede usar las sesiones."""
    return hashlib.sha256(token.encode()).hexdigest()


def vencimiento() -> datetime:
    return datetime.now(timezone.utc) + DURACION


class Freno:
    """Cuenta los intentos fallidos por IP en una ventana de tiempo."""

    def __init__(self) -> None:
        self._fallos: dict[str, deque[float]] = defaultdict(deque)

    def _limpiar(self, ip: str, ahora: float) -> deque[float]:
        fallos = self._fallos[ip]
        while fallos and ahora - fallos[0] > _VENTANA_DE_INTENTOS:
            fallos.popleft()
        return fallos

    def bloqueado(self, ip: str) -> bool:
        return len(self._limpiar(ip, time.monotonic())) >= _INTENTOS_PERMITIDOS

    def fallo(self, ip: str) -> None:
        self._limpiar(ip, time.monotonic()).append(time.monotonic())

    def acierto(self, ip: str) -> None:
        self._fallos.pop(ip, None)
