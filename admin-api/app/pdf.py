# ************************************************************************** #
#      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     #
#     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    #
#    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       #
#   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       #
#                                                                            #
#   File: pdf.py    Project: portfolio                                       #
#   Created: 2026/11/26 21:04:28  by vm                                      #
#   Updated: 2026/11/26 21:15:10  by vm                                      #
# ************************************************************************** #

"""
El CV en PDF con el formato del CV para ATS: una columna, texto real (no imagenes), titulos
claros y vinetas. Los ATS lo leen de arriba abajo, asi que no hay tablas ni columnas.
"""

from pathlib import Path
from typing import Any

from fpdf import FPDF

FUENTES = Path(__file__).parent / "fuentes"
GRIS = (90, 90, 90)
NEGRO = (20, 20, 20)
LINEA = (190, 190, 190)

SECCIONES = {
    "es": {
        "resumen": "Resumen",
        "experiencia": "Experiencia Laboral",
        "proyectos": "Proyectos destacados",
        "formacion": "Formación",
        "habilidades": "Habilidades",
        "idiomas": "Idiomas",
    },
    "pt": {
        "resumen": "Resumo",
        "experiencia": "Experiência Profissional",
        "proyectos": "Projetos em destaque",
        "formacion": "Formação",
        "habilidades": "Competências",
        "idiomas": "Idiomas",
    },
    "en": {
        "resumen": "Summary",
        "experiencia": "Work Experience",
        "proyectos": "Featured Projects",
        "formacion": "Education",
        "habilidades": "Skills",
        "idiomas": "Languages",
    },
}


def _enlace(texto: str) -> str | None:
    if "@" in texto and " " not in texto:
        return f"mailto:{texto}"
    if texto.startswith(("github.com", "linkedin.com", "http", "www.")):
        return texto if texto.startswith("http") else f"https://{texto}"
    return None


class _Documento(FPDF):
    def __init__(self) -> None:
        super().__init__(format="A4")
        self.set_margins(16, 13, 16)
        self.set_auto_page_break(auto=True, margin=13)
        self.add_font("Sans", "", str(FUENTES / "liberation-sans-regular.ttf"))
        self.add_font("Sans", "B", str(FUENTES / "liberation-sans-bold.ttf"))
        self.add_page()

    def titulo_de_seccion(self, texto: str) -> None:
        self.ln(2)
        self.set_font("Sans", "", 13)
        self.set_text_color(*NEGRO)
        self.cell(0, 6.5, texto, new_x="LMARGIN", new_y="NEXT")

    def entrada(self, partes: list[str]) -> None:
        self.set_font("Sans", "B", 9.5)
        self.set_text_color(*NEGRO)
        self.multi_cell(0, 4.6, " | ".join(p for p in partes if p), align="L",
                        new_x="LMARGIN", new_y="NEXT")

    def vineta(self, texto: str) -> None:
        self.set_font("Sans", "", 9.5)
        self.set_text_color(*NEGRO)
        izquierda = self.l_margin
        self.set_x(izquierda + 1.5)
        self.cell(4, 4.6, "•")
        self.set_left_margin(izquierda + 5.5)
        self.multi_cell(0, 4.6, texto, align="L", new_x="LMARGIN", new_y="NEXT")
        self.set_left_margin(izquierda)

    def parrafo(self, texto: str) -> None:
        self.set_font("Sans", "", 9.5)
        self.set_text_color(*NEGRO)
        self.multi_cell(0, 4.6, texto, align="L", new_x="LMARGIN", new_y="NEXT")

    def rotulado(self, rotulo: str, texto: str) -> None:
        """«Rotulo: texto», con el rotulo en negrita, en el mismo renglon."""
        self.set_text_color(*NEGRO)
        self.set_font("Sans", "B", 9.5)
        self.write(4.6, f"{rotulo}: ")
        self.set_font("Sans", "", 9.5)
        self.write(4.6, texto)
        self.ln(4.6)


def _cabecera(documento: _Documento, cv: dict[str, Any], contacto: list[str]) -> None:
    documento.set_font("Sans", "", 22)
    documento.set_text_color(*NEGRO)
    documento.cell(0, 10, cv.get("nombre", ""), new_x="LMARGIN", new_y="NEXT")
    documento.set_font("Sans", "", 12)
    documento.set_text_color(*GRIS)
    documento.cell(0, 6, cv.get("titulo", ""), new_x="LMARGIN", new_y="NEXT")
    documento.set_font("Sans", "", 8.5)
    for indice, parte in enumerate(contacto):
        if indice:
            documento.write(4.5, " | ")
        enlace = _enlace(parte)
        documento.set_text_color(*(NEGRO if enlace else GRIS))
        documento.write(4.5, parte, link=enlace or "")
        documento.set_text_color(*GRIS)
    documento.ln(6)
    documento.set_draw_color(*LINEA)
    documento.line(documento.l_margin, documento.get_y(), documento.w - documento.r_margin,
                   documento.get_y())
    documento.ln(1)


def _bloques(documento: _Documento, titulo: str, bloques: list[dict[str, Any]]) -> None:
    if not bloques:
        return
    documento.titulo_de_seccion(titulo)
    for bloque in bloques:
        documento.entrada([bloque.get("titulo", ""), bloque.get("rol", ""),
                           bloque.get("periodo", "")])
        for punto in bloque.get("puntos", []):
            documento.vineta(punto)
        documento.ln(1)


def cv_en_pdf(cv: dict[str, Any], perfil: dict[str, Any] | None = None) -> bytes:
    """
    `cv` es el contenido estructurado (ver base_cv.json). Del `perfil` salen el telefono y el
    email, que no viven en el repositorio publico.
    """
    idioma = cv.get("idioma", "es")
    rotulos = SECCIONES.get(idioma, SECCIONES["es"])
    perfil = perfil or {}
    contacto = [cv.get("ubicacion", "")]
    contacto += [perfil.get(dato, "") for dato in ("telefono", "email")]
    contacto += cv.get("enlaces", [])
    documento = _Documento()
    documento.set_title(f"{cv.get('nombre', '')} - CV")
    documento.set_author(cv.get("nombre", ""))
    _cabecera(documento, cv, [parte for parte in contacto if parte])

    if cv.get("resumen"):
        documento.titulo_de_seccion(rotulos["resumen"])
        documento.parrafo(cv["resumen"])
    _bloques(documento, rotulos["experiencia"], cv.get("experiencia", []))
    _bloques(documento, rotulos["proyectos"], cv.get("proyectos", []))

    if cv.get("formacion"):
        documento.titulo_de_seccion(rotulos["formacion"])
        for estudio in cv["formacion"]:
            documento.set_font("Sans", "B", 9.5)
            documento.write(4.6, estudio.get("institucion", ""))
            documento.set_font("Sans", "", 9.5)
            resto = [estudio.get(dato, "") for dato in ("detalle", "lugar", "estado")]
            documento.write(4.6, "".join(f" | {parte}" for parte in resto if parte))
            documento.ln(4.6)

    if cv.get("habilidades"):
        documento.titulo_de_seccion(rotulos["habilidades"])
        for grupo in cv["habilidades"]:
            documento.rotulado(grupo.get("categoria", ""), grupo.get("items", ""))
    if cv.get("idiomas"):
        documento.ln(1)
        documento.rotulado(rotulos["idiomas"].upper(), cv["idiomas"])
    return bytes(documento.output())


def carta_en_pdf(texto: str, nombre: str) -> bytes:
    """La carta de presentacion, en una pagina simple."""
    documento = _Documento()
    documento.set_title(f"{nombre} - Carta")
    documento.set_font("Sans", "", 10.5)
    documento.set_text_color(*NEGRO)
    for parrafo in texto.split("\n\n"):
        documento.multi_cell(0, 5.5, parrafo.strip(), new_x="LMARGIN", new_y="NEXT")
        documento.ln(3)
    return bytes(documento.output())
