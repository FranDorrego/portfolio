# ************************************************************************** #
#      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     #
#     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    #
#    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       #
#   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       #
#                                                                            #
#   File: conftest.py    Project: portfolio                                  #
#   Created: 2026/11/26 21:07:25  by vm                                      #
#   Updated: 2026/11/26 21:07:25  by vm                                      #
# ************************************************************************** #

"""Pruebas contra un PostgreSQL de verdad (TEST_DATABASE_URL); sin el, se saltean."""

import os
from collections.abc import Iterator
from pathlib import Path

import pytest
from fastapi.testclient import TestClient

from app.configuracion import Configuracion
from app.principal import crear_app

URL = os.environ.get("TEST_DATABASE_URL", "")


@pytest.fixture()
def cliente(tmp_path: Path) -> Iterator[TestClient]:
    if not URL:
        pytest.skip("Falta TEST_DATABASE_URL")
    import psycopg

    with psycopg.connect(URL, autocommit=True) as conexion:
        conexion.execute("DROP SCHEMA public CASCADE; CREATE SCHEMA public;")
    ajustes = Configuracion(base_de_datos=URL, datos=tmp_path, token_de_alta="token-de-prueba",
                            clave_de_ia="", origenes=["https://francodorrego.com"],
                            sitio="https://francodorrego.com", cookie_segura=False)
    with TestClient(crear_app(ajustes)) as cliente:
        yield cliente


@pytest.fixture()
def con_sesion(cliente: TestClient) -> TestClient:
    respuesta = cliente.post("/api/sesion/alta", json={
        "token": "token-de-prueba", "email": "yo@ejemplo.com", "clave": "una clave larga"})
    assert respuesta.status_code == 200
    return cliente
