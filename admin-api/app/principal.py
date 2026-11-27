# ************************************************************************** #
#      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     #
#     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    #
#    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       #
#   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       #
#                                                                            #
#   File: principal.py    Project: portfolio                                 #
#   Created: 2026/11/26 21:06:51  by vm                                      #
#   Updated: 2026/11/27 11:33:30  by vm                                      #
# ************************************************************************** #

"""
La API del panel /admin de francodorrego.com: candidaturas, CV y «Sobre mi», con sesion por
cookie. La sirve uvicorn detras del nginx del VPS (ver README.md).
"""

from collections.abc import AsyncIterator
from contextlib import asynccontextmanager
from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.agente import TITULO
from app.base_de_datos import BaseDeDatos
from app.configuracion import Configuracion, configuracion
from app.rutas import candidaturas, cvs, perfil, publico, sesion
from app.seguridad import Freno

CARPETA = Path(__file__).parent
BASES = {"es": "Base ATS · Español", "pt": "Base ATS · Português"}

QUE_BUSCO = (
    "Un puesto Full Stack, Backend Python/Django o de arquitectura de soluciones, en un equipo "
    "consolidado de una empresa mediana o grande, en Porto o remoto. Quiero ver sistemas a mayor "
    "escala, mentoría, revisiones de código y proyectos complejos."
)
SOBRE_MI = (
    "Argentino, hace 3 años en Portugal. Más de 5 años creando aplicaciones web, "
    "automatizaciones e infraestructura cloud, con productos propios y clientes "
    "internacionales. Español nativo y portugués fluido; el inglés todavía no lo manejo y lo "
    "estoy estudiando. Estudio en 42 Porto. Trabajo con IA como compañera: el diseño, la "
    "arquitectura y el criterio los pongo yo."
)

def sembrar(bd: BaseDeDatos, sitio: str) -> None:
    """Lo que tiene que existir siempre: los CV del sitio, los CV base y un «Sobre mi»."""
    # Los CV adaptados llevan el titulo de siempre, aunque el agente lo haya cambiado antes.
    bd.ejecutar(
        "UPDATE cvs SET contenido = jsonb_set(contenido, '{titulo}', to_jsonb(%s::text)) "
        "WHERE tipo = 'generado' AND contenido IS NOT NULL "
        "AND contenido->>'titulo' IS DISTINCT FROM %s",
        (TITULO, TITULO),
    )
    for idioma, sufijo, nombre in (("es", "", "Sitio · Español"), ("pt", "-pt", "Sitio · Português")):
        if not bd.uno("SELECT 1 AS hay FROM cvs WHERE tipo = 'sitio' AND idioma = %s", (idioma,)):
            bd.ejecutar("INSERT INTO cvs (nombre, tipo, idioma, url) VALUES (%s, 'sitio', %s, %s)",
                        (nombre, idioma, f"{sitio}/cv-franco-dorrego{sufijo}.pdf"))
    # Los CV base para ATS salen de base_cv_<idioma>.json: el archivo manda, asi que al
    # arrancar se crean si faltan y se actualizan si cambiaron.
    for idioma, nombre in BASES.items():
        contenido = (CARPETA / f"base_cv_{idioma}.json").read_text(encoding="utf-8")
        existe = bd.uno("SELECT id FROM cvs WHERE tipo = 'base' AND idioma = %s", (idioma,))
        if existe:
            bd.ejecutar("UPDATE cvs SET contenido = %s WHERE id = %s", (contenido, existe["id"]))
        else:
            bd.ejecutar(
                "INSERT INTO cvs (nombre, tipo, idioma, contenido) VALUES (%s, 'base', %s, %s)",
                (nombre, idioma, contenido),
            )
    bd.ejecutar(
        "UPDATE perfil SET que_busco = %s, sobre_mi = %s "
        "WHERE id = 1 AND que_busco = '' AND sobre_mi = ''",
        (QUE_BUSCO, SOBRE_MI),
    )

def crear_app(ajustes: Configuracion | None = None) -> FastAPI:
    ajustes = ajustes or configuracion()

    @asynccontextmanager
    async def vida(app: FastAPI) -> AsyncIterator[None]:
        ajustes.datos.mkdir(parents=True, exist_ok=True)
        app.state.base.abrir()
        sembrar(app.state.base, ajustes.sitio)
        yield
        app.state.base.cerrar()

    app = FastAPI(title="francodorrego.com · admin", lifespan=vida, docs_url=None,
                  redoc_url=None, openapi_url=None)
    app.state.configuracion = ajustes
    app.state.base = BaseDeDatos(ajustes.base_de_datos)
    app.state.freno = Freno()
    app.add_middleware(
        CORSMiddleware,
        allow_origins=ajustes.origenes,
        allow_credentials=True,
        allow_methods=["GET", "POST", "PATCH", "PUT", "DELETE"],
        allow_headers=["Content-Type"],
    )
    for modulo in (sesion, candidaturas, cvs, perfil, publico):
        app.include_router(modulo.rutas)

    @app.get("/api/salud")
    def salud() -> dict[str, str]:
        app.state.base.uno("SELECT 1")
        return {"estado": "ok"}

    return app

app = crear_app()
