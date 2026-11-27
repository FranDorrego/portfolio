# ************************************************************************** #
#      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     #
#     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    #
#    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       #
#   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       #
#                                                                            #
#   File: test_pdf.py    Project: portfolio                                  #
#   Created: 2026/11/26 21:07:25  by vm                                      #
#   Updated: 2026/11/27 10:40:15  by vm                                      #
# ************************************************************************** #

"""El PDF del CV: una pagina, texto extraible y los datos de contacto del perfil."""

import json
from pathlib import Path

from app.pdf import cv_en_pdf

BASE = json.loads((Path(__file__).parents[1] / "app" / "base_cv_es.json").read_text("utf-8"))


def test_el_cv_base_entra_en_una_pagina() -> None:
    pdf = cv_en_pdf(BASE, {"telefono": "+351 1", "email": "a@b.com"})
    assert pdf.startswith(b"%PDF")
    assert pdf.count(b"/Type /Page\n") + pdf.count(b"/Type /Page ") + pdf.count(b"/Type /Page/") <= 1


def test_el_cv_base_en_portugues_tambien() -> None:
    base_pt = json.loads((Path(__file__).parents[1] / "app" / "base_cv_pt.json").read_text("utf-8"))
    assert base_pt["idioma"] == "pt"
    assert cv_en_pdf(base_pt).startswith(b"%PDF")


def test_el_portafolio_va_en_el_contacto_aunque_el_cv_no_lo_traiga() -> None:
    from app.pdf import _enlace

    assert _enlace("francodorrego.com") == "https://francodorrego.com"
    assert _enlace("github.com/FranDorrego") == "https://github.com/FranDorrego"
    assert _enlace("+351 962 310 060") is None
    assert _enlace("Porto, Portugal") is None
    sin_portafolio = {**BASE, "enlaces": ["github.com/FranDorrego"]}
    assert b"https://francodorrego.com" in cv_en_pdf(sin_portafolio, {})
