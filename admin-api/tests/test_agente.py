# ************************************************************************** #
#      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     #
#     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    #
#    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       #
#   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       #
#                                                                            #
#   File: test_agente.py    Project: portfolio                               #
#   Created: 2026/11/26 21:07:25  by vm                                      #
#   Updated: 2026/11/26 21:07:25  by vm                                      #
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
    assert "Backend" in lista[1]["content"] and "ViveNadando" in lista[1]["content"]
    assert lista[2]["content"].endswith("Vaga X")
