# ************************************************************************** #
#      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     #
#     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    #
#    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       #
#   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       #
#                                                                            #
#   File: base_de_datos.py    Project: portfolio                             #
#   Created: 2026/11/26 21:04:03  by vm                                      #
#   Updated: 2026/11/26 22:38:16  by vm                                      #
# ************************************************************************** #

"""La conexion a PostgreSQL y el esquema. El esquema se crea solo al arrancar (sin borrar nada)."""

from collections.abc import Iterator
from contextlib import contextmanager
from typing import Any

from psycopg import Connection
from psycopg.rows import dict_row
from psycopg_pool import ConnectionPool

ESQUEMA = """
CREATE TABLE IF NOT EXISTS cuentas (
    id SERIAL PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    clave TEXT NOT NULL,
    creada TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sesiones (
    huella TEXT PRIMARY KEY,
    cuenta_id INTEGER NOT NULL REFERENCES cuentas(id) ON DELETE CASCADE,
    vence TIMESTAMPTZ NOT NULL
);

CREATE TABLE IF NOT EXISTS perfil (
    id INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
    que_busco TEXT NOT NULL DEFAULT '',
    sobre_mi TEXT NOT NULL DEFAULT '',
    telefono TEXT NOT NULL DEFAULT '',
    email TEXT NOT NULL DEFAULT '',
    actualizado TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS cvs (
    id SERIAL PRIMARY KEY,
    nombre TEXT NOT NULL,
    tipo TEXT NOT NULL CHECK (tipo IN ('sitio', 'base', 'subido', 'generado')),
    idioma TEXT NOT NULL DEFAULT 'es',
    contenido JSONB,
    archivo TEXT,
    url TEXT,
    vacante TEXT,
    carta TEXT,
    notas TEXT,
    creado TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS candidaturas (
    id SERIAL PRIMARY KEY,
    empresa TEXT NOT NULL,
    cargo TEXT NOT NULL,
    descripcion TEXT NOT NULL DEFAULT '',
    cv_id INTEGER REFERENCES cvs(id) ON DELETE SET NULL,
    enlace TEXT NOT NULL DEFAULT '',
    idioma TEXT NOT NULL DEFAULT 'es',
    estado TEXT NOT NULL DEFAULT 'sin_contacto',
    notas TEXT NOT NULL DEFAULT '',
    video TEXT,
    video_nombre TEXT,
    creada TIMESTAMPTZ NOT NULL DEFAULT now(),
    actualizada TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS historial (
    id SERIAL PRIMARY KEY,
    candidatura_id INTEGER NOT NULL REFERENCES candidaturas(id) ON DELETE CASCADE,
    estado TEXT NOT NULL,
    nota TEXT NOT NULL DEFAULT '',
    fecha TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE cvs ADD COLUMN IF NOT EXISTS empresa TEXT;
ALTER TABLE cvs ADD COLUMN IF NOT EXISTS siglas TEXT;
ALTER TABLE cvs ADD COLUMN IF NOT EXISTS cargo TEXT;

INSERT INTO perfil (id) VALUES (1) ON CONFLICT DO NOTHING;
"""


class BaseDeDatos:
    """Un pool chico: el panel lo usa una sola persona."""

    def __init__(self, url: str) -> None:
        self._pool = ConnectionPool(
            url, min_size=1, max_size=4, kwargs={"row_factory": dict_row}, open=False
        )

    def abrir(self) -> None:
        self._pool.open(wait=True)
        with self.conexion() as conexion:
            conexion.execute(ESQUEMA)

    def cerrar(self) -> None:
        self._pool.close()

    @contextmanager
    def conexion(self) -> Iterator[Connection[Any]]:
        with self._pool.connection() as conexion:
            yield conexion

    def uno(self, sql: str, parametros: Any = None) -> dict[str, Any] | None:
        with self.conexion() as conexion:
            return conexion.execute(sql, parametros).fetchone()

    def todos(self, sql: str, parametros: Any = None) -> list[dict[str, Any]]:
        with self.conexion() as conexion:
            return conexion.execute(sql, parametros).fetchall()

    def ejecutar(self, sql: str, parametros: Any = None) -> None:
        with self.conexion() as conexion:
            conexion.execute(sql, parametros)
