# ************************************************************************** #
#      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     #
#     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    #
#    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       #
#   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       #
#                                                                            #
#   File: pdf.py    Project: portfolio                                       #
#   Created: 2026/11/26 21:04:28  by vm                                      #
#   Updated: 2026/11/27 19:47:25  by vm                                      #
# ************************************************************************** #

"""
El CV en PDF con el formato del CV para ATS: una columna, texto real (no imagenes), titulos
claros y vinetas. Los ATS lo leen de arriba abajo, asi que no hay tablas ni columnas.
"""

import re
from pathlib import Path
from typing import Any

from fpdf import FPDF

FUENTES = Path(__file__).parent / "fuentes"
GRIS = (95, 99, 104)
NEGRO = (24, 24, 27)
ACENTO = (11, 87, 208)
LINEA = (205, 208, 213)

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


PORTAFOLIO = "francodorrego.com"


def _enlace(texto: str) -> str | None:
    """Un email, una web o un perfil del contacto, como enlace que se puede tocar en el PDF."""
    if " " in texto:
        return None
    if "@" in texto:
        return f"mailto:{texto}"
    if texto.startswith("http"):
        return texto
    if "." in texto.split("/")[0] and not texto.replace("+", "").replace(".", "").isdigit():
        return f"https://{texto}"
    return None


def _telefono(numero: str) -> str:
    """Un movil portugues sin formato («351962310060») se escribe «+351 962 310 060»."""
    digitos = re.sub(r"\D", "", numero)
    if len(digitos) == 12 and digitos.startswith("351"):
        return f"+351 {digitos[3:6]} {digitos[6:9]} {digitos[9:]}"
    if len(digitos) == 9 and digitos[0] in "29":
        return f"+351 {digitos[:3]} {digitos[3:6]} {digitos[6:]}"
    return numero.strip()


def _fecha_entera(periodo: str) -> str:
    """«12/2022 – 12/2023» no se corta entre dos renglones: los espacios pasan a no separables."""
    return periodo.replace(" ", "\u00a0")


def _sin_marcas(texto: str) -> str:
    """El texto va con negritas de markdown: un `**` suelto del contenido lo romperia."""
    return texto.replace("**", "*").replace("__", "_")


class _Documento(FPDF):
    """
    Una pagina A4 con las piezas del CV. `escala` agranda o achica letra y renglones a la vez;
    `aire` son los milimetros que se suman antes de cada seccion y entre bloques, para que el CV
    ocupe la pagina entera en lugar de quedar apretado arriba.
    """

    def __init__(self, escala: float = 1.0, aire: float = 0.0) -> None:
        super().__init__(format="A4")
        self.escala = escala
        self.aire = aire
        # 1 cm en los cuatro lados: mas ancho para el texto, y la letra puede ser mas grande.
        self.set_margins(10, 10, 10)
        self.set_auto_page_break(auto=True, margin=10)
        self.add_font("Sans", "", str(FUENTES / "liberation-sans-regular.ttf"))
        self.add_font("Sans", "B", str(FUENTES / "liberation-sans-bold.ttf"))
        self.add_page()

    @property
    def ancho(self) -> float:
        return self.w - self.l_margin - self.r_margin

    @property
    def renglon(self) -> float:
        return 4.45 * self.escala

    def letra(self, tamano: float, *, negrita: bool = False) -> None:
        self.set_font("Sans", "B" if negrita else "", tamano * self.escala)

    def titulo_de_seccion(self, texto: str) -> None:
        self.ln(3.2 * self.escala + self.aire)
        self.letra(12.5, negrita=True)
        self.set_text_color(*ACENTO)
        self.cell(0, 6 * self.escala, texto.upper(), new_x="LMARGIN", new_y="NEXT")
        self.set_draw_color(*LINEA)
        self.set_line_width(0.2)
        self.line(self.l_margin, self.get_y(), self.w - self.r_margin, self.get_y())
        self.ln(1.6 * self.escala)

    def entrada(self, titulo: str, rol: str, periodo: str) -> None:
        """
        «Empresa | Rol | Periodo» en un solo renglon, con la empresa en negrita: el formato que
        cualquier ATS separa sin errores (la fecha al lado de lo que fecha, nunca en otra columna).
        """
        self.letra(9.5)
        self.set_text_color(*NEGRO)
        partes = [f"**{_sin_marcas(titulo)}**", _sin_marcas(rol), _fecha_entera(periodo)]
        self.multi_cell(0, self.renglon, "  |  ".join(p for p in partes if p.strip("*")),
                        markdown=True, align="L", new_x="LMARGIN", new_y="NEXT")
        self.ln(0.5 * self.escala)

    def vineta(self, texto: str) -> None:
        self.letra(9.5)
        self.set_text_color(*NEGRO)
        izquierda = self.l_margin
        self.set_x(izquierda + 1)
        self.set_text_color(*ACENTO)
        self.cell(4, self.renglon, "•")
        self.set_text_color(*NEGRO)
        self.set_left_margin(izquierda + 5)
        self.multi_cell(0, self.renglon, texto, align="L", new_x="LMARGIN", new_y="NEXT")
        self.set_left_margin(izquierda)
        self.ln(0.35 * self.escala)

    def parrafo(self, texto: str) -> None:
        self.letra(9.5)
        self.set_text_color(*NEGRO)
        self.multi_cell(0, self.renglon, texto, align="L", new_x="LMARGIN", new_y="NEXT")

    def rotulado(self, rotulo: str, texto: str) -> None:
        """«Rotulo: texto», con el rotulo en negrita, que sigue en el mismo renglon."""
        self.letra(9.5)
        self.set_text_color(*NEGRO)
        self.multi_cell(0, self.renglon, f"**{_sin_marcas(rotulo)}:** {_sin_marcas(texto)}",
                        markdown=True, align="L", new_x="LMARGIN", new_y="NEXT")
        self.ln(0.3 * self.escala)


def _cabecera(documento: _Documento, cv: dict[str, Any], contacto: list[str]) -> None:
    escala = documento.escala
    documento.letra(24, negrita=True)
    documento.set_text_color(*NEGRO)
    documento.cell(0, 10 * escala, cv.get("nombre", ""), new_x="LMARGIN", new_y="NEXT")
    documento.letra(12.5)
    documento.set_text_color(*ACENTO)
    documento.cell(0, 6.5 * escala, cv.get("titulo", ""), new_x="LMARGIN", new_y="NEXT")
    documento.ln(1)
    # Tamano fijo, sin escala: el contacto entra en un solo renglon aunque la letra crezca.
    documento.set_font("Sans", "", 9)
    alto, separador = 4.8 * escala, "  |  "
    borde = documento.w - documento.r_margin
    for indice, parte in enumerate(contacto):
        # Cada dato entra entero en su renglon: un enlace nunca se corta por la mitad.
        if indice and documento.get_x() + documento.get_string_width(separador + parte) > borde:
            documento.ln(alto)
        elif indice:
            documento.set_text_color(*LINEA)
            documento.write(alto, separador)
        enlace = _enlace(parte)
        documento.set_text_color(*(NEGRO if enlace else GRIS))
        documento.write(alto, parte, link=enlace or "")
    documento.ln(alto)


def _bloques(documento: _Documento, titulo: str, bloques: list[dict[str, Any]]) -> None:
    if not bloques:
        return
    documento.titulo_de_seccion(titulo)
    for indice, bloque in enumerate(bloques):
        if indice:
            documento.ln(1.6 * documento.escala + documento.aire / 2)
        documento.entrada(bloque.get("titulo", ""), bloque.get("rol", ""),
                          bloque.get("periodo", ""))
        for punto in bloque.get("puntos", []):
            documento.vineta(punto)


def _metadatos(documento: _Documento, cv: dict[str, Any], contacto: list[str]) -> None:
    """
    Todo lo relevante tambien en las propiedades del PDF, que leen algunos ATS y buscadores:
    puesto, contacto, enlaces, resumen, empresas, habilidades e idiomas.
    """
    nombre, titulo = cv.get("nombre", ""), cv.get("titulo", "")
    empresas = [b.get("titulo", "") for b in cv.get("experiencia", []) + cv.get("proyectos", [])]
    estudios = [e.get("institucion", "") for e in cv.get("formacion", [])]
    habilidades = [i.strip() for g in cv.get("habilidades", [])
                   for i in g.get("items", "").split(",") if i.strip()]
    documento.set_title(f"{nombre} - CV - {titulo}")
    documento.set_author(nombre)
    documento.set_creator(f"{nombre} · {PORTAFOLIO}")
    documento.set_lang({"pt": "pt-PT", "en": "en"}.get(cv.get("idioma", "es"), "es"))
    documento.set_subject(" | ".join(p for p in [titulo, cv.get("ubicacion", ""), *contacto,
                                                 cv.get("resumen", ""),
                                                 cv.get("idiomas", "")] if p))
    claves = [titulo, *habilidades, *empresas, *estudios, cv.get("ubicacion", "")]
    vistas: set[str] = set()
    documento.set_keywords(", ".join(c for c in claves
                                     if c and not (c.lower() in vistas or vistas.add(c.lower()))))


def _dibujar(cv: dict[str, Any], contacto: list[str], escala: float, aire: float) -> _Documento:
    rotulos = SECCIONES.get(cv.get("idioma", "es"), SECCIONES["es"])
    documento = _Documento(escala, aire)
    _metadatos(documento, cv, contacto)
    _cabecera(documento, cv, contacto)
    if cv.get("resumen"):
        documento.titulo_de_seccion(rotulos["resumen"])
        documento.parrafo(cv["resumen"])
    _bloques(documento, rotulos["experiencia"], cv.get("experiencia", []))
    _bloques(documento, rotulos["proyectos"], cv.get("proyectos", []))
    if cv.get("formacion"):
        documento.titulo_de_seccion(rotulos["formacion"])
        for estudio in cv["formacion"]:
            # La fecha (o «En curso») va al lado de cada estudio, como en la experiencia.
            resto = [estudio.get(dato, "") for dato in ("detalle", "lugar")]
            resto += [_fecha_entera(estudio.get("periodo", "")), estudio.get("estado", "")]
            documento.rotulado(estudio.get("institucion", ""),
                               "  |  ".join(parte for parte in resto if parte))
    if cv.get("habilidades"):
        documento.titulo_de_seccion(rotulos["habilidades"])
        for grupo in cv["habilidades"]:
            documento.rotulado(grupo.get("categoria", ""), grupo.get("items", ""))
    # Los idiomas en su propia seccion, con titulo estandar: asi los encuentra cualquier ATS.
    if cv.get("idiomas"):
        documento.titulo_de_seccion(rotulos["idiomas"])
        documento.parrafo(cv["idiomas"])
    return documento


def _huecos(cv: dict[str, Any]) -> float:
    """Cuantos huecos reparten el aire: uno por seccion y medio entre bloques."""
    secciones = sum(1 for clave in ("resumen", "formacion", "habilidades", "idiomas")
                    if cv.get(clave))
    medios = 0
    for clave in ("experiencia", "proyectos"):
        bloques = cv.get(clave) or []
        secciones += 1 if bloques else 0
        medios += max(0, len(bloques) - 1)
    return max(1.0, secciones + medios / 2)


ESCALA_MAXIMA = 1.12
# La mas chica que se sigue leyendo bien (9.5 pt -> 8.1 pt).
ESCALA_MINIMA = 0.86
AIRE_MAXIMO = 7.0


def _entra(documento: _Documento) -> bool:
    return documento.page == 1


def cv_en_pdf(cv: dict[str, Any], perfil: dict[str, Any] | None = None) -> bytes:
    """
    `cv` es el contenido estructurado (ver base_cv_es.json); del `perfil` salen telefono y email.
    Una pagina y llena: la letra mas grande que entra (8,1 a 10,6 pt) y el espacio que sobra,
    repartido entre las secciones. Si ni con la mas chica entra, dos paginas antes que ilegible.
    """
    perfil = perfil or {}
    # La ubicacion no va en la cabecera (asi el contacto entra en un renglon); si va en los
    # metadatos del PDF.
    contacto = [_telefono(perfil.get("telefono", "")), perfil.get("email", "")]
    # El portafolio va siempre, junto a GitHub y LinkedIn (tambien en los CV ya adaptados).
    enlaces = [e for e in cv.get("enlaces", []) if e]
    if not any(PORTAFOLIO in enlace for enlace in enlaces):
        enlaces = [PORTAFOLIO, *enlaces]
    contacto += enlaces
    contacto = [parte for parte in contacto if parte]

    if not _entra(_dibujar(cv, contacto, ESCALA_MINIMA, 0)):
        return bytes(_dibujar(cv, contacto, ESCALA_MINIMA, 0).output())
    chica, grande = ESCALA_MINIMA, ESCALA_MAXIMA
    if _entra(_dibujar(cv, contacto, grande, 0)):
        chica = grande
    else:
        for _ in range(7):
            medio = (chica + grande) / 2
            if _entra(_dibujar(cv, contacto, medio, 0)):
                chica = medio
            else:
                grande = medio

    documento = _dibujar(cv, contacto, chica, 0)
    sobra = documento.h - documento.b_margin - documento.get_y()
    aire = min(AIRE_MAXIMO, max(0.0, sobra - 1) / _huecos(cv))
    while aire > 0.2:
        con_aire = _dibujar(cv, contacto, chica, aire)
        if _entra(con_aire):
            return bytes(con_aire.output())
        aire *= 0.85
    return bytes(documento.output())
