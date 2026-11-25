<!-- ************************************************************************** -->
<!--      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     -->
<!--     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    -->
<!--    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       -->
<!--   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       -->
<!--                                                                            -->
<!--   File: README.md    Project: portfolio                                    -->
<!--   Created: 2026/11/25 22:17:56  by claude                                  -->
<!--   Updated: 2026/11/25 22:29:50  by vm                                      -->
<!-- ************************************************************************** -->

# Portfolio · Franco Dorrego

Programador Full Stack en Porto, Portugal. Quién soy, mi actividad en GitHub, mi experiencia, lo
bueno y lo que tengo que mejorar, preguntas frecuentes y cómo contactarme.

- 📦 **Repositorio:** <https://github.com/FranDorrego/portfolio>
- 🛠️ **Stack:** React · Vite · TypeScript · Tailwind CSS
- 🎨 **Diseño:** el estilo de los fronts de ArduMaker, con tema claro y oscuro
- 🌍 **Idiomas:** español (`/`) y portugués (`/pt/`)
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

Se despliega solo, en un VPS de [ArduMaker](https://ardumaker.com) como app de tipo git: cada
`push` a `main` vuelve a compilar y publicar el sitio.

La acción [`sitio.yml`](.github/workflows/sitio.yml) verifica el código en cada `push` y, una vez
por día, vuelve a leer la actividad de GitHub y guarda `public/github-stats.json` en el
repositorio. Ese commit dispara un despliegue nuevo, así las cifras están siempre al día.

### Estadísticas de GitHub

El widget nunca muestra una cifra inventada: si el archivo no está, lo dice.

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
