# ************************************************************************** #
#      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     #
#     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    #
#    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       #
#   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       #
#                                                                            #
#   File: pdf.py    Project: portfolio                                       #
#   Created: 2026/11/26 21:04:28  by vm                                      #
#   Updated: 2026/11/26 21:19:06  by vm                                      #
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
    """
    Una pagina A4 con las piezas del CV. `escala` achica letra y renglones a la vez: con 1 es el
    formato del CV para ATS; si el contenido no entra en una pagina, se prueba con menos.
    """

    def __init__(self, escala: float = 1.0) -> None:
        super().__init__(format="A4")
        self.escala = escala
        self.set_margins(16, 13, 16)
        self.set_auto_page_break(auto=True, margin=13)
        self.add_font("Sans", "", str(FUENTES / "liberation-sans-regular.ttf"))
        self.add_font("Sans", "B", str(FUENTES / "liberation-sans-bold.ttf"))
        self.add_page()

    def letra(self, tamano: float, *, negrita: bool = False) -> None:
        self.set_font("Sans", "B" if negrita else "", tamano * self.escala)

    @property
    def renglon(self) -> float:
        return 4.6 * self.escala

    def titulo_de_seccion(self, texto: str) -> None:
        self.ln(2 * self.escala)
        self.letra(13)
        self.set_text_color(*NEGRO)
        self.cell(0, 6.5 * self.escala, texto, new_x="LMARGIN", new_y="NEXT")

    def entrada(self, partes: list[str]) -> None:
        self.letra(9.5, negrita=True)
        self.set_text_color(*NEGRO)
        self.multi_cell(0, self.renglon, " | ".join(p for p in partes if p), align="L",
                        new_x="LMARGIN", new_y="NEXT")

    def vineta(self, texto: str) -> None:
        self.letra(9.5)
        self.set_text_color(*NEGRO)
        izquierda = self.l_margin
        self.set_x(izquierda + 1.5)
        self.cell(4, self.renglon, "•")
        self.set_left_margin(izquierda + 5.5)
        self.multi_cell(0, self.renglon, texto, align="L", new_x="LMARGIN", new_y="NEXT")
        self.set_left_margin(izquierda)

    def parrafo(self, texto: str) -> None:
        self.letra(9.5)
        self.set_text_color(*NEGRO)
        self.multi_cell(0, self.renglon, texto, align="L", new_x="LMARGIN", new_y="NEXT")

    def rotulado(self, rotulo: str, texto: str) -> None:
        """«Rotulo: texto», con el rotulo en negrita, en el mismo renglon."""
        self.set_text_color(*NEGRO)
        self.letra(9.5, negrita=True)
        self.write(self.renglon, f"{rotulo}: ")
        self.letra(9.5)
        self.write(self.renglon, texto)
        self.ln(self.renglon)


def _cabecera(documento: _Documento, cv: dict[str, Any], contacto: list[str]) -> None:
    escala = documento.escala
    documento.letra(22)
    documento.set_text_color(*NEGRO)
    documento.cell(0, 10 * escala, cv.get("nombre", ""), new_x="LMARGIN", new_y="NEXT")
    documento.letra(12)
    documento.set_text_color(*GRIS)
    documento.cell(0, 6 * escala, cv.get("titulo", ""), new_x="LMARGIN", new_y="NEXT")
    documento.letra(8.5)
    for indice, parte in enumerate(contacto):
        if indice:
            documento.write(4.5 * escala, " | ")
        enlace = _enlace(parte)
        documento.set_text_color(*(NEGRO if enlace else GRIS))
        documento.write(4.5 * escala, parte, link=enlace or "")
        documento.set_text_color(*GRIS)
    documento.ln(6 * escala)
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
        documento.ln(documento.escala)


def _dibujar(cv: dict[str, Any], contacto: list[str], escala: float) -> _Documento:
    rotulos = SECCIONES.get(cv.get("idioma", "es"), SECCIONES["es"])
    documento = _Documento(escala)
    documento.set_title(f"{cv.get('nombre', '')} - CV")
    documento.set_author(cv.get("nombre", ""))
    _cabecera(documento, cv, contacto)
    if cv.get("resumen"):
        documento.titulo_de_seccion(rotulos["resumen"])
        documento.parrafo(cv["resumen"])
    _bloques(documento, rotulos["experiencia"], cv.get("experiencia", []))
    _bloques(documento, rotulos["proyectos"], cv.get("proyectos", []))
    if cv.get("formacion"):
        documento.titulo_de_seccion(rotulos["formacion"])
        for estudio in cv["formacion"]:
            documento.letra(9.5, negrita=True)
            documento.write(documento.renglon, estudio.get("institucion", ""))
            documento.letra(9.5)
            resto = [estudio.get(dato, "") for dato in ("detalle", "lugar", "estado")]
            documento.write(documento.renglon, "".join(f" | {parte}" for parte in resto if parte))
            documento.ln(documento.renglon)
    if cv.get("habilidades"):
        documento.titulo_de_seccion(rotulos["habilidades"])
        for grupo in cv["habilidades"]:
            documento.rotulado(grupo.get("categoria", ""), grupo.get("items", ""))
    if cv.get("idiomas"):
        documento.ln(escala)
        documento.rotulado(rotulos["idiomas"].upper(), cv["idiomas"])
    return documento


# De la escala del CV para ATS a la mas chica que se sigue leyendo bien (9.5 pt -> 8.1 pt).
ESCALAS = (1.0, 0.96, 0.92, 0.89, 0.86)


def cv_en_pdf(cv: dict[str, Any], perfil: dict[str, Any] | None = None) -> bytes:
    """
    `cv` es el contenido estructurado (ver base_cv.json). Del `perfil` salen el telefono y el
    email, que no viven en el repositorio publico. Si no entra en una pagina, se achica un poco;
    si ni asi entra, queda en dos.
    """
    perfil = perfil or {}
    contacto = [cv.get("ubicacion", "")]
    contacto += [perfil.get(dato, "") for dato in ("telefono", "email")]
    contacto += cv.get("enlaces", [])
    contacto = [parte for parte in contacto if parte]
    for escala in ESCALAS:
        documento = _dibujar(cv, contacto, escala)
        if documento.page == 1:
            break
    return bytes(documento.output())


def carta_en_pdf(texto: str, nombre: str) -> bytes:
    """La carta de presentacion, en una pagina simple."""
    documento = _Documento()
    documento.set_title(f"{nombre} - Carta")
    documento.letra(10.5)
    documento.set_text_color(*NEGRO)
    for parrafo in texto.split("\n\n"):
        documento.multi_cell(0, 5.5, parrafo.strip(), align="L", new_x="LMARGIN", new_y="NEXT")
        documento.ln(3)
    return bytes(documento.output())
