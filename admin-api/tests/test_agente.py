# ************************************************************************** #
#      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     #
#     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    #
#    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       #
#   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       #
#                                                                            #
#   File: test_agente.py    Project: portfolio                               #
#   Created: 2026/11/26 21:07:25  by vm                                      #
#   Updated: 2026/11/27 11:33:45  by vm                                      #
# ************************************************************************** #

"""Lo que el agente acepta como respuesta."""

import pytest

from app.agente import ErrorDelAgente, leer_respuesta, mensajes


def test_lee_el_json_aunque_venga_entre_bloques() -> None:
    texto = '```json\n{"empresa": "A", "cargo": "B", "cv": {"resumen": "R"}, "carta": " C "}\n```'
    leido = leer_respuesta(texto, "pt")
    assert leido["cv"]["idioma"] == "pt" and leido["cv"]["experiencia"] == []
    assert leido["carta"] == "C"


def test_rechaza_respuestas_sin_cv_o_carta() -> None:
    with pytest.raises(ErrorDelAgente):
        leer_respuesta("no hay json", "es")
    with pytest.raises(ErrorDelAgente):
        leer_respuesta('{"cv": {}, "carta": "x"}', "es")


def test_los_mensajes_llevan_el_contexto_y_la_vacante() -> None:
    lista = mensajes(vacante="Vaga X", idioma="pt", base={"nombre": "F"},
                     perfil={"que_busco": "Backend"}, catalogo="### ViveNadando")
    assert "portugués de Portugal" in lista[0]["content"]
    assert "no conoce los proyectos" in lista[0]["content"]
    assert "Backend" in lista[1]["content"] and "ViveNadando" in lista[1]["content"]
    assert lista[2]["content"].endswith("Vaga X")


def test_rehacer_lleva_la_version_actual_y_la_indicacion() -> None:
    lista = mensajes(vacante="Vaga X", idioma="es", base={}, perfil={}, catalogo="",
                     rehacer={"cv": {"resumen": "Viejo"}, "carta": "Hola", "indicacion": "Mas corto"})
    assert len(lista) == 4
    assert "Viejo" in lista[3]["content"] and "Mas corto" in lista[3]["content"]


def test_el_titulo_no_se_adapta(monkeypatch: pytest.MonkeyPatch) -> None:
    import json

    import app.agente as agente
    from app.configuracion import Configuracion

    respuesta_del_modelo = json.dumps({
        "empresa": "NTT DATA", "cargo": "Software Developer Júnior",
        "cv": {"titulo": "Software Developer Júnior | Full Stack Web", "resumen": "R"},
        "carta": "C",
    })

    class Respuesta:
        def raise_for_status(self) -> None:
            return None

        def json(self) -> dict[str, object]:
            return {"choices": [{"message": {"content": respuesta_del_modelo}}]}

    monkeypatch.setattr(agente.httpx, "post", lambda *a, **k: Respuesta())
    monkeypatch.setattr(agente, "catalogo", lambda *a: "")
    hecho = agente.adaptar(Configuracion(clave_de_ia="x"), vacante="V", idioma="pt",
                           base={"titulo": "Developer Full Stack Web"}, perfil={})
    assert hecho["cv"]["titulo"] == "Developer Full Stack Web"
