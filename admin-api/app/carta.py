# ************************************************************************** #
#      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     #
#     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    #
#    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       #
#   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       #
#                                                                            #
#   File: carta.py    Project: portfolio                                     #
#   Created: 2026/11/27 19:47:25  by vm                                      #
#   Updated: 2026/11/27 20:40:26  by vm                                      #
# ************************************************************************** #

"""
La carta de presentacion en PDF, con forma de carta: nombre y contacto arriba, lugar y fecha, y
el texto (saludo, parrafos, despedida y firma) con margenes de carta. Comparte las fuentes y el
estilo del CV (app/pdf.py).
"""

from datetime import date
from typing import Any

from app.terminos import sin_terminos_prohibidos
from app.pdf import GRIS, LINEA, NEGRO, PORTAFOLIO, _Documento, _enlace, _telefono

_MESES = {
    "es": ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto",
           "septiembre", "octubre", "noviembre", "diciembre"],
    "pt": ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto",
           "setembro", "outubro", "novembro", "dezembro"],
    "en": ["January", "February", "March", "April", "May", "June", "July", "August",
           "September", "October", "November", "December"],
}


def fecha_larga(dia: date, idioma: str) -> str:
    """«27 de noviembre de 2026», «27 de novembro de 2026» o «27 November 2026»."""
    mes = _MESES.get(idioma, _MESES["es"])[dia.month - 1]
    return f"{dia.day} {mes} {dia.year}" if idioma == "en" else f"{dia.day} de {mes} de {dia.year}"


def carta_en_pdf(texto: str, nombre: str, *, perfil: dict[str, Any] | None = None,
                 idioma: str = "es", dia: date | None = None) -> bytes:
    """
    La carta de presentacion como una carta: el nombre y los datos de contacto arriba, el lugar y
    la fecha, y despues el texto (saludo, parrafos, despedida y firma) con margenes de carta.
    """
    perfil = perfil or {}
    texto = sin_terminos_prohibidos(texto)
    documento = _Documento()
    documento.set_margins(22, 20, 22)
    documento.set_auto_page_break(auto=True, margin=20)
    documento.set_xy(22, 20)
    documento.set_title(f"{nombre} - Carta")
    documento.set_author(nombre)
    documento.set_lang({"pt": "pt-PT", "en": "en"}.get(idioma, "es"))
    documento.letra(20, negrita=True)
    documento.set_text_color(*NEGRO)
    documento.cell(0, 10, nombre, new_x="LMARGIN", new_y="NEXT")
    contacto = [_telefono(perfil.get("telefono", "")), perfil.get("email", ""), PORTAFOLIO,
                "linkedin.com/in/francodorrego"]
    documento.set_font("Sans", "", 9.5)
    for indice, parte in enumerate(p for p in contacto if p):
        if indice:
            documento.set_text_color(*LINEA)
            documento.write(5, "  |  ")
        enlace = _enlace(parte)
        documento.set_text_color(*(NEGRO if enlace else GRIS))
        documento.write(5, parte, link=enlace or "")
    documento.ln(7)
    documento.set_draw_color(*LINEA)
    documento.line(documento.l_margin, documento.get_y(), documento.w - documento.r_margin,
                   documento.get_y())
    documento.ln(8)
    documento.letra(10.5)
    documento.set_text_color(*GRIS)
    documento.cell(0, 6, f"Porto, {fecha_larga(dia or date.today(), idioma)}", align="R",
                   new_x="LMARGIN", new_y="NEXT")
    documento.ln(6)
    documento.set_text_color(*NEGRO)
    for parrafo in texto.split("\n\n"):
        documento.multi_cell(0, 5.8, parrafo.strip(), align="L", new_x="LMARGIN", new_y="NEXT")
        documento.ln(3.5)
    return bytes(documento.output())
