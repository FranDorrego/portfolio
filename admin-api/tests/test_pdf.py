# ************************************************************************** #
#      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     #
#     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    #
#    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       #
#   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       #
#                                                                            #
#   File: test_pdf.py    Project: portfolio                                  #
#   Created: 2026/11/26 21:07:25  by vm                                      #
#   Updated: 2026/11/26 21:34:31  by vm                                      #
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
