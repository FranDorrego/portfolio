# ************************************************************************** #
#      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     #
#     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    #
#    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       #
#   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       #
#                                                                            #
#   File: test_agente.py    Project: portfolio                               #
#   Created: 2026/11/26 21:07:25  by vm                                      #
#   Updated: 2026/11/27 20:39:55  by vm                                      #
# ************************************************************************** #

"""Lo que el agente acepta como respuesta."""

import json

import pytest

from app.agente import ErrorDelAgente, armar_pedido, leer_respuesta


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


def test_el_pedido_lleva_el_contexto_en_cache_y_la_vacante() -> None:
    instrucciones, bloques = armar_pedido(vacante="Vaga X", idioma="pt", base={"nombre": "F"},
                                          perfil={"que_busco": "Backend"},
                                          catalogo="### ViveNadando")
    assert "portugués de Portugal" in instrucciones
    assert "no conoce los proyectos" in instrucciones
    assert "Backend" in bloques[0]["text"] and "ViveNadando" in bloques[0]["text"]
    assert bloques[0]["cache_control"] == {"type": "ephemeral"}
    assert bloques[1]["text"].endswith("Vaga X") and "cache_control" not in bloques[1]


def test_rehacer_lleva_la_version_actual_y_la_indicacion() -> None:
    _, bloques = armar_pedido(vacante="Vaga X", idioma="es", base={}, perfil={}, catalogo="",
                              rehacer={"cv": {"resumen": "Viejo"}, "carta": "Hola",
                                       "indicacion": "Mas corto"})
    assert len(bloques) == 3
    assert "Viejo" in bloques[2]["text"] and "Mas corto" in bloques[2]["text"]


def test_el_titulo_no_se_adapta(monkeypatch: pytest.MonkeyPatch) -> None:
    import json

    import app.agente as agente
    from app.configuracion import Configuracion

    respuesta_del_modelo = json.dumps({
        "empresa": "NTT DATA", "cargo": "Software Developer Júnior",
        "cv": {"titulo": "Software Developer Júnior | Full Stack Web", "resumen": "R"},
        "carta": "C",
    })
    monkeypatch.setattr(agente, "llamar_a_claude", lambda *a: respuesta_del_modelo)
    monkeypatch.setattr(agente, "catalogo", lambda *a: "")
    hecho = agente.adaptar(Configuracion(clave_de_ia="x"), vacante="V", idioma="pt",
                           base={"titulo": "Full Stack Web Developer"}, perfil={})
    assert hecho["cv"]["titulo"] == "Full Stack Web Developer"


def test_saca_los_terminos_prohibidos() -> None:
    texto = json.dumps({
        "cv": {"resumen": "Plataforma de miniVPS y mini VPS.", "experiencia": [{"puntos": [
            "Liderei o backend (97 % dos commits): integração.",
            "Lideré el backend (97% de los commits) con Django.",
            "Minishell: builtins (97 de 201 commits)."]}],
            "formacion": [{"detalle": "Full stack Java, POO"}]},
        "carta": "Administro 49 miniVPS.",
    })
    leido = leer_respuesta(texto, "es")
    assert leido["cv"]["resumen"] == "Plataforma de VPS y VPS."
    assert leido["cv"]["experiencia"][0]["puntos"] == [
        "Liderei o backend: integração.", "Lideré el backend con Django.", "Minishell: builtins."]
    assert leido["cv"]["formacion"][0]["detalle"] == "Fundamentos de Java, POO"
    assert leido["carta"] == "Administro 49 VPS."
