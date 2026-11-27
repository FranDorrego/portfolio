<!-- ************************************************************************** -->
<!--      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     -->
<!--     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    -->
<!--    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       -->
<!--   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       -->
<!--                                                                            -->
<!--   File: README.md    Project: portfolio                                    -->
<!--   Created: 2026/11/26 21:12:46  by vm                                      -->
<!--   Updated: 2026/11/27 15:00:47  by vm                                      -->
<!-- ************************************************************************** -->

# API del panel `/admin/`

FastAPI + PostgreSQL. Guarda las candidaturas, los CV y «Sobre mí»; imprime los CV en PDF con
formato para ATS (`app/pdf.py`) y adapta un CV a una vacante con un modelo de IA vía OpenRouter
(`app/agente.py`).

## Variables de entorno

| Variable | Para qué |
|---|---|
| `DATABASE_URL` | La base PostgreSQL (`postgresql://usuario:clave@host/base`) |
| `DATA_DIR` | Dónde se guardan los videos y los PDF subidos. Fuera del repositorio, para que sobrevivan a cada despliegue |
| `SETUP_TOKEN` | Solo para crear la primera cuenta desde el panel; después el alta queda cerrada |
| `AGENT_TOKEN` | Para una IA que busca trabajo y se postula sola (ver abajo). Sin él, no hay acceso para agentes |
| `ALLOWED_ORIGINS` | Los orígenes que pueden llamar a la API con la cookie (`https://francodorrego.com`) |
| `OPENROUTER_API_KEY` | La clave del modelo de IA del agente |
| `LLM_MODEL` | El modelo de OpenRouter que usa el agente |
| `SITE_URL` | El sitio, de donde el agente lee el catálogo completo de proyectos (`llms-full.txt`) |
| `COOKIE_SECURE` | `false` solo en local, sin HTTPS |

## Correrlo en local

```bash
python3 -m venv .venv && . .venv/bin/activate && pip install -r requirements-dev.txt
```

```bash
DATABASE_URL=postgresql://... SETUP_TOKEN=local ALLOWED_ORIGINS=http://localhost:5173 \
  COOKIE_SECURE=false uvicorn app.principal:app --port 8000
```

Y el panel, desde la raíz del repositorio: `VITE_ADMIN_API=http://localhost:8000 npm run dev`,
en `http://localhost:5173/admin/`.

## Pruebas

```bash
TEST_DATABASE_URL=postgresql://... python -m pytest
```

Corren contra un PostgreSQL de verdad (la base de prueba se vacía en cada prueba).

## Candidaturas enviadas por una IA

Una IA que encuentra la vacante, arma el CV y se postula sola usa la misma API con
`Authorization: Bearer <AGENT_TOKEN>`. Lo que registra así queda marcado **Con IA** en el panel;
lo que se carga a mano desde el panel, nunca.

```bash
curl -X POST https://api.francodorrego.com/api/candidaturas \
  -H "Authorization: Bearer $AGENT_TOKEN" -H "Content-Type: application/json" \
  -d '{"empresa": "Acme", "cargo": "Backend Developer", "enlace": "https://...", "idioma": "pt"}'
```

Con el mismo token puede adaptar un CV (`POST /api/cvs/adaptar`) y pasar su `id` como `cv_id`.

## Seguridad

- La contraseña se guarda con scrypt; las sesiones, como huella SHA-256 del token.
- La cookie es `HttpOnly`, `Secure` y `SameSite=Lax`; CORS solo acepta `ALLOWED_ORIGINS`.
- Después de 8 intentos fallidos, la IP espera 15 minutos.
- El teléfono y el email del CV viven en la base («Sobre mí»), no en este repositorio público.
