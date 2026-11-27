# ************************************************************************** #
#      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     #
#     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    #
#    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       #
#   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       #
#                                                                            #
#   File: test_api.py    Project: portfolio                                  #
#   Created: 2026/11/26 21:07:25  by vm                                      #
#   Updated: 2026/11/27 15:00:26  by vm                                      #
# ************************************************************************** #

"""El panel de punta a punta: cuenta, candidaturas, video, CV y «Sobre mi»."""

import json
from typing import Any

import pytest
from fastapi.testclient import TestClient

from app.configuracion import Configuracion

import app.rutas.cvs as rutas_de_cvs


def test_sin_sesion_no_hay_datos(cliente: TestClient) -> None:
    assert cliente.get("/api/candidaturas").status_code == 401
    assert cliente.get("/api/sesion").json() == {"hay_cuenta": False, "email": None}


def test_alta_solo_con_token_y_una_vez(cliente: TestClient) -> None:
    datos = {"token": "otro", "email": "yo@ejemplo.com", "clave": "una clave larga"}
    assert cliente.post("/api/sesion/alta", json=datos).status_code == 403
    datos["token"] = "token-de-prueba"
    assert cliente.post("/api/sesion/alta", json=datos).status_code == 200
    assert cliente.post("/api/sesion/alta", json=datos).status_code == 409


def test_entrar_salir_y_freno(con_sesion: TestClient) -> None:
    con_sesion.delete("/api/sesion")
    assert con_sesion.get("/api/candidaturas").status_code == 401
    malo = {"email": "yo@ejemplo.com", "clave": "mala"}
    assert con_sesion.post("/api/sesion", json=malo).status_code == 401
    bueno = {"email": "YO@ejemplo.com", "clave": "una clave larga"}
    assert con_sesion.post("/api/sesion", json=bueno).status_code == 200
    assert con_sesion.get("/api/candidaturas").status_code == 200
    con_sesion.delete("/api/sesion")
    for _ in range(8):
        con_sesion.post("/api/sesion", json=malo)
    assert con_sesion.post("/api/sesion", json=bueno).status_code == 429


def test_candidatura_estado_e_historial(con_sesion: TestClient) -> None:
    cvs = con_sesion.get("/api/cvs").json()
    assert [cv["tipo"] for cv in cvs] == ["sitio", "sitio", "base", "base"]
    nueva = con_sesion.post("/api/candidaturas", json={
        "empresa": "Acme", "cargo": "Backend", "descripcion": "Python", "cv_id": cvs[2]["id"],
        "enlace": "https://acme.pt/vaga", "idioma": "pt"}).json()
    assert nueva["estado"] == "sin_contacto" and nueva["con_ia"] is False
    assert nueva["cv_nombre"] == "Base ATS · Español"
    cambiada = con_sesion.patch(f"/api/candidaturas/{nueva['id']}", json={
        "estado": "videollamada", "nota_del_cambio": "Con RRHH"}).json()
    assert cambiada["estado"] == "videollamada"
    assert [h["estado"] for h in cambiada["historial"]] == ["videollamada", "sin_contacto"]
    assert len(con_sesion.get("/api/candidaturas").json()) == 1


def test_video_en_trozos(con_sesion: TestClient) -> None:
    id_ = con_sesion.post("/api/candidaturas", json={"empresa": "A", "cargo": "B"}).json()["id"]
    url = f"/api/candidaturas/{id_}/video"
    assert con_sesion.post(url, params={"parte": 0, "final": False, "nombre": "x.exe"},
                           content=b"a").status_code == 400
    con_sesion.post(url, params={"parte": 0, "final": False, "nombre": "call.mp4"},
                    content=b"hola ")
    fin = con_sesion.post(url, params={"parte": 1, "final": True, "nombre": "call.mp4"},
                          content=b"mundo").json()
    assert fin["tiene_video"] and fin["video_nombre"] == "call.mp4"
    assert con_sesion.get(url).content == b"hola mundo"
    assert con_sesion.get(url, headers={"Range": "bytes=0-3"}).content == b"hola"


def test_cv_base_en_pdf_y_perfil(con_sesion: TestClient) -> None:
    con_sesion.put("/api/perfil", json={"que_busco": "Backend", "sobre_mi": "Yo",
                                        "telefono": "+351 1", "email": "yo@ejemplo.com"})
    assert con_sesion.get("/api/perfil").json()["telefono"] == "+351 1"
    base = next(cv for cv in con_sesion.get("/api/cvs").json() if cv["tipo"] == "base")
    pdf = con_sesion.get(f"/api/cvs/{base['id']}/pdf")
    assert pdf.headers["content-type"] == "application/pdf" and pdf.content[:4] == b"%PDF"
    sitio = con_sesion.get("/api/cvs").json()[0]
    destino = con_sesion.get(f"/api/cvs/{sitio['id']}/pdf", follow_redirects=False)
    assert destino.headers["location"] == "https://francodorrego.com/cv-franco-dorrego.pdf"


def test_cv_subido(con_sesion: TestClient) -> None:
    cv = con_sesion.post("/api/cvs", json={"nombre": "Mi CV", "idioma": "pt"}).json()
    con_sesion.post(f"/api/cvs/{cv['id']}/archivo",
                    params={"parte": 0, "final": True, "nombre": "cv.pdf"}, content=b"%PDF-1.4")
    assert con_sesion.get(f"/api/cvs/{cv['id']}/pdf").content == b"%PDF-1.4"
    assert con_sesion.delete(f"/api/cvs/{cv['id']}").status_code == 200


def test_adaptar_guarda_el_cv_y_la_carta(
    con_sesion: TestClient, monkeypatch: pytest.MonkeyPatch
) -> None:
    def falso(
        _config: object, *, vacante: str, idioma: str, base: dict[str, Any],
        perfil: dict[str, Any],
    ) -> dict[str, Any]:
        assert "Django" in vacante and base["idioma"] == "pt"
        return {"empresa": "Acme", "cargo": "Backend Django",
                "cv": {**base, "idioma": idioma, "resumen": "Adaptado"},
                "carta": "Hola.\n\nSaludos, Franco Dorrego", "notas": "Destaque Django"}

    monkeypatch.setattr(rutas_de_cvs, "adaptar", falso)
    hecho = con_sesion.post("/api/cvs/adaptar", json={
        "vacante": "Buscamos backend con Django y PostgreSQL en Porto, híbrido.",
        "idioma": "pt"})
    assert hecho.status_code == 201
    cuerpo = hecho.json()
    assert cuerpo["nombre"] == "Acme · Backend Django" and cuerpo["tipo"] == "generado"
    assert cuerpo["contenido"]["resumen"] == "Adaptado"
    # Con un CV adaptado, pero cargada a mano: no es «Con IA».
    candidatura = con_sesion.post("/api/candidaturas", json={
        "empresa": "Acme", "cargo": "Backend", "cv_id": cuerpo["id"]}).json()
    assert candidatura["con_ia"] is False
    carta = con_sesion.get(f"/api/cvs/{cuerpo['id']}/carta.pdf", params={"descargar": True})
    assert carta.content[:4] == b"%PDF"
    assert 'attachment; filename="Acme - Backend Django - Franco Dorrego - Carta.pdf"' in (
        carta.headers["content-disposition"])
    cv = con_sesion.get(f"/api/cvs/{cuerpo['id']}/pdf", params={"descargar": True})
    assert 'filename="Acme - Backend Django - Franco Dorrego.pdf"' in (
        cv.headers["content-disposition"])
    assert json.dumps(cuerpo["contenido"])


def test_los_cv_para_ats_son_publicos(cliente: TestClient) -> None:
    for idioma in ("es", "pt"):
        pdf = cliente.get(f"/api/publico/cv-ats-{idioma}.pdf")
        assert pdf.status_code == 200 and pdf.content[:4] == b"%PDF"
        assert f"CV-{idioma.upper()}.pdf" in pdf.headers["content-disposition"]
    assert cliente.get("/api/publico/cv-ats-en.pdf").status_code == 422


def test_rehacer_con_una_indicacion(con_sesion: TestClient,
                                    monkeypatch: pytest.MonkeyPatch) -> None:
    llamadas: list[dict[str, Any]] = []

    def falso(
        _config: object, *, vacante: str, idioma: str, base: dict[str, Any],
        perfil: dict[str, Any], rehacer: dict[str, Any] | None = None,
    ) -> dict[str, Any]:
        llamadas.append({"rehacer": rehacer})
        resumen = "Mas corto" if rehacer else "Primero"
        return {"empresa": "Acme", "cargo": "Backend", "siglas": "ACME",
                "cv": {**base, "resumen": resumen}, "carta": f"Carta {resumen}", "notas": "n"}

    monkeypatch.setattr(rutas_de_cvs, "adaptar", falso)
    hecho = con_sesion.post("/api/cvs/adaptar", json={
        "vacante": "Buscamos backend con Django y PostgreSQL en Porto, híbrido.", "idioma": "es",
    }).json()
    rehecho = con_sesion.post(f"/api/cvs/{hecho['id']}/rehacer",
                              json={"indicacion": "Hacelo mas corto"})
    assert rehecho.status_code == 200
    cuerpo = rehecho.json()
    assert cuerpo["id"] == hecho["id"] and cuerpo["contenido"]["resumen"] == "Mas corto"
    assert cuerpo["carta"] == "Carta Mas corto" and cuerpo["siglas"] == "ACME"
    assert llamadas[1]["rehacer"]["indicacion"] == "Hacelo mas corto"
    assert llamadas[1]["rehacer"]["cv"]["resumen"] == "Primero"
    base = next(cv for cv in con_sesion.get("/api/cvs").json() if cv["tipo"] == "base")
    assert con_sesion.post(f"/api/cvs/{base['id']}/rehacer",
                           json={"indicacion": "algo"}).status_code == 400


def test_el_titulo_del_cv_es_siempre_el_de_siempre(cliente: TestClient) -> None:
    from app.principal import sembrar

    base = cliente.app.state.base  # type: ignore[attr-defined]
    base.ejecutar(
        "INSERT INTO cvs (nombre, tipo, idioma, contenido) VALUES ('X', 'generado', 'pt', %s)",
        ('{"titulo": "Software Developer Júnior | Full Stack Web", "resumen": "r"}',),
    )
    sembrar(base, "https://francodorrego.com")
    fila = base.uno("SELECT contenido FROM cvs WHERE nombre = 'X'")
    assert fila and fila["contenido"]["titulo"] == "Developer Full Stack Web"


def test_la_ia_con_su_token_registra_candidaturas_con_ia(cliente: TestClient) -> None:
    cliente.app.state.configuracion = Configuracion(  # type: ignore[attr-defined]
        **{**vars(cliente.app.state.configuracion), "token_de_agente": "token-agente"})
    sin_token = cliente.post("/api/candidaturas", json={"empresa": "A", "cargo": "B"})
    assert sin_token.status_code == 401
    malo = cliente.post("/api/candidaturas", json={"empresa": "A", "cargo": "B"},
                        headers={"Authorization": "Bearer otro"})
    assert malo.status_code == 401
    hecha = cliente.post("/api/candidaturas", json={"empresa": "Acme", "cargo": "Backend"},
                         headers={"Authorization": "Bearer token-agente"}).json()
    assert hecha["con_ia"] is True
    assert hecha["historial"][0]["nota"] == "Enviada por la IA, sin intervencion"
