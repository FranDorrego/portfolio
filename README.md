<!-- ************************************************************************** -->
<!--      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     -->
<!--     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    -->
<!--    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       -->
<!--   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       -->
<!--                                                                            -->
<!--   File: README.md    Project: portfolio                                    -->
<!--   Created: 2026/11/25 22:17:56  by claude                                  -->
<!--   Updated: 2026/11/25 22:26:30  by claude                                  -->
<!-- ************************************************************************** -->

# Portfolio · Franco Dorrego

Programador Full Stack en Porto, Portugal. Quién soy, mi actividad en GitHub, mi experiencia, lo
bueno y lo que tengo que mejorar, preguntas frecuentes y cómo contactarme.

- 🌐 **Sitio:** <https://frandorrego.github.io/portfolio/> (español) ·
  [`/pt/`](https://frandorrego.github.io/portfolio/pt/) (portugués)
- 📦 **Repositorio:** <https://github.com/FranDorrego/portfolio>
- 🛠️ **Stack:** React · Vite · TypeScript · Tailwind CSS
- ✅ **Estándar:** revisado con el checker de [ArduMaker](https://ardumaker.com):
  `ardumaker check` sin errores ni advertencias

## Correrlo

```bash
npm install
```

```bash
npm run dev
```

| Comando | Qué hace |
|---|---|
| `npm run build` | Compila el sitio en `dist/`, con la página en portugués y el sitemap |
| `npm test` | Corre las pruebas |
| `npm run lint` · `npm run typecheck` | Reglas de ESLint y tipos |
| `npm run estadisticas` | Escribe `public/github-stats.json` (pide `GITHUB_TOKEN`) |

## Despliegue (deploy)

Se despliega solo: cada `push` a `main` y una vez por día, la acción [`sitio.yml`](.github/workflows/sitio.yml)
verifica el código, vuelve a leer la actividad de GitHub y publica en GitHub Pages.

Para activarlo la primera vez: **Settings → Pages → Source → GitHub Actions**.

### Estadísticas de GitHub

El widget lee `github-stats.json`, que la acción genera con la API de GitHub. Nunca muestra una
cifra inventada: si el archivo no está, lo dice.

- Sin configurar nada, cuenta **solo la actividad pública**.
- Para sumar los repositorios privados: crear un token personal (permisos `read:user` y `repo`) y
  guardarlo como secreto del repositorio con el nombre `GH_STATS_TOKEN`.

## Qué editar

| Para cambiar | Archivo |
|---|---|
| Proyectos del catálogo | `src/data/proyectos/` |
| Textos (español y portugués) | `src/i18n/es.ts` · `src/i18n/pt.ts` |
| Contacto y roles del inicio | `src/data/perfil.ts` |
| Capturas de un proyecto | `public/proyectos/<slug>/` y el campo `screenshots` |
| CV | Dejar el PDF en `public/cv-franco-dorrego.pdf`: el botón aparece solo |

Reglas del contenido: cada texto existe en los dos idiomas o no compila; una métrica lleva su
fuente; un proyecto con código privado no enlaza repositorio.

## Estructura

```
src/
  components/   layout · hero · proyectos · sobre-mi · preguntas · contacto · ui
  data/         catálogo de proyectos, perfil y navegación
  hooks/        proyectos, actividad de GitHub, sección activa
  i18n/         español y portugués, con la misma forma
  services/     de dónde salen las estadísticas de GitHub
  utils/ lib/   filtros, mapa de contribuciones, textos y rutas
scripts/        estadísticas de GitHub, página en portugués y sitemap
```
