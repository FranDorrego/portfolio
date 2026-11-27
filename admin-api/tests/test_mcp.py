# ************************************************************************** #
#      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     #
#     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    #
#    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       #
#   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       #
#                                                                            #
#   File: test_mcp.py    Project: portfolio                                  #
#   Created: 2026/11/27 15:25:18  by vm                                      #
#   Updated: 2026/11/27 15:25:37  by vm                                      #
# ************************************************************************** #

"""El servidor MCP: la puerta con token, las herramientas y los enlaces de descarga firmados."""

import json
from collections.abc import Iterator
from pathlib import Path
from typing import Any
from urllib.parse import urlparse

import pytest
from fastapi.testclient import TestClient

from app.configuracion import Configuracion
from app.principal import crear_app
from tests.conftest import URL

TOKEN = "token-de-agente-de-prueba"
CABECERAS = {"Accept": "application/json, text/event-stream",
             "Content-Type": "application/json"}


@pytest.fixture()
def mcp(tmp_path: Path) -> Iterator[TestClient]:
    if not URL:
        pytest.skip("Falta TEST_DATABASE_URL")
    import psycopg

    with psycopg.connect(URL, autocommit=True) as conexion:
        conexion.execute("DROP SCHEMA public CASCADE; CREATE SCHEMA public;")
    ajustes = Configuracion(base_de_datos=URL, datos=tmp_path, token_de_agente=TOKEN,
                            url_publica="http://testserver", cookie_segura=False)
    with TestClient(crear_app(ajustes)) as cliente:
        yield cliente


def llamar(cliente: TestClient, metodo: str, parametros: dict[str, Any] | None = None, *,
           ruta: str = "/mcp/", token: bool = True) -> Any:
    cabeceras = {**CABECERAS, **({"Authorization": f"Bearer {TOKEN}"} if token else {})}
    cuerpo = {"jsonrpc": "2.0", "id": 1, "method": metodo, "params": parametros or {}}
    return cliente.post(ruta, json=cuerpo, headers=cabeceras)


def herramienta(cliente: TestClient, nombre: str, **argumentos: Any) -> Any:
    respuesta = llamar(cliente, "tools/call", {"name": nombre, "arguments": argumentos}).json()
    resultado = respuesta["result"]
    assert not resultado.get("isError"), resultado
    estructurado = resultado.get("structuredContent")
    if estructurado is not None:
        return estructurado["result"] if set(estructurado) == {"result"} else estructurado
    return json.loads(resultado["content"][0]["text"])


def test_sin_token_no_entra(mcp: TestClient) -> None:
    assert llamar(mcp, "tools/list", token=False).status_code == 401
    assert llamar(mcp, "tools/list", ruta="/mcp/otro/", token=False).status_code == 401


def test_el_token_va_en_la_cabecera_o_en_la_direccion(mcp: TestClient) -> None:
    por_cabecera = llamar(mcp, "tools/list").json()["result"]["tools"]
    por_direccion = llamar(mcp, "tools/list", ruta=f"/mcp/{TOKEN}/", token=False).json()
    nombres = {t["name"] for t in por_cabecera}
    assert {t["name"] for t in por_direccion["result"]["tools"]} == nombres
    assert {"registrar_candidatura", "adaptar_cv", "rehacer_cv", "enlaces_de_descarga",
            "guardar_sobre_mi", "subir_cv_pdf"} <= nombres


def test_registrar_por_mcp_y_descargar(mcp: TestClient) -> None:
    cvs = herramienta(mcp, "listar_cvs")
    base = next(cv for cv in cvs if cv["tipo"] == "base")
    hecha = herramienta(mcp, "registrar_candidatura", empresa="Acme", cargo="Backend",
                        cv_id=base["id"], idioma="pt")
    assert hecha["origen"] == "mcp" and hecha["con_ia"] is False
    sola = herramienta(mcp, "registrar_candidatura", empresa="B", cargo="C", enviada_sola=True)
    assert sola["con_ia"] is True and "MCP" in sola["historial"][0]["nota"]
    cambiada = herramienta(mcp, "actualizar_candidatura", candidatura_id=hecha["id"],
                           estado="contacto", nota_del_cambio="Respondieron por email")
    assert cambiada["estado"] == "contacto"

    enlaces = herramienta(mcp, "enlaces_de_descarga", cv_id=base["id"], horas=1)
    direccion = urlparse(enlaces["cv_pdf"])
    pdf = mcp.get(f"{direccion.path}?{direccion.query}")
    assert pdf.status_code == 200 and pdf.content[:4] == b"%PDF"
    assert "attachment" in pdf.headers["content-disposition"]
    falsa = direccion.query.replace("firma=", "firma=0")
    assert mcp.get(f"{direccion.path}?{falsa}").status_code == 403

    perfil = herramienta(mcp, "guardar_sobre_mi", telefono="+351 1")
    assert perfil["telefono"] == "+351 1" and perfil["que_busco"]
