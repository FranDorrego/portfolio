<!-- ************************************************************************** -->
<!--      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     -->
<!--     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    -->
<!--    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       -->
<!--   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       -->
<!--                                                                            -->
<!--   File: README.md    Project: portfolio                                    -->
<!--   Created: 2026/11/25 22:17:56  by claude                                  -->
<!--   Updated: 2026/11/26 02:19:42  by vm                                      -->
<!-- ************************************************************************** -->

# Portfolio · Franco Dorrego

Programador Full Stack en Porto, Portugal. Quién soy, mi actividad en GitHub, mi experiencia, lo
bueno y lo que tengo que mejorar, preguntas frecuentes y cómo contactarme.

- 📦 **Repositorio:** <https://github.com/FranDorrego/portfolio>
- 🛠️ **Stack:** React · Vite · TypeScript · Tailwind CSS
- 🎨 **Diseño:** el estilo de los fronts de ArduMaker, en tema oscuro
- 🌐 **Sitio:** <https://francodorrego.com> (español) · <https://francodorrego.com/pt/> (portugués)
- 🌍 **Idiomas:** portugués por defecto; español si el equipo de la persona está en español
- ⭐ **Clientes:** opiniones de Workana en `src/data/testimonios.ts`
- 🤖 **Para máquinas (bots, agentes de IA, ATS, APIs):** el HTML sale pre-renderizado con todo
  el contenido (los 45 proyectos incluidos) y el CV está además en:
  - HTML simple: [`/cv/`](https://francodorrego.com/cv/) · [`/pt/cv/`](https://francodorrego.com/pt/cv/)
  - PDF con texto real: `/cv-franco-dorrego.pdf` · `/cv-franco-dorrego-pt.pdf` (lo reimprime la
    acción de GitHub cuando cambia el contenido)
  - JSON Resume: `/resume.json` · `/resume-pt.json`
  - Markdown: [`/llms.txt`](https://francodorrego.com/llms.txt), `/llms-full.txt` y sus versiones en `/pt/`
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
| `npm run build` | Compila el sitio en `dist/`: pre-renderiza la página en los dos idiomas y escribe `llms.txt`, `llms-full.txt` y el sitemap |
| `npm test` | Corre las pruebas |
| `npm run lint` · `npm run typecheck` | Reglas de ESLint y tipos |
| `npm run estadisticas` | Escribe `public/github-stats.json` (pide `GITHUB_TOKEN`) |

## Despliegue (deploy)

Se despliega solo, en un VPS de [ArduMaker](https://ardumaker.com) como app de tipo git publicada
en `francodorrego.com`: cada `push` a `main` vuelve a compilar y publicar el sitio.

La acción [`sitio.yml`](.github/workflows/sitio.yml) verifica el código en cada `push` y, una vez
por día, vuelve a leer la actividad de GitHub y guarda `public/github-stats.json` en el
repositorio. Ese commit dispara un despliegue nuevo, así las cifras están siempre al día.

### Estadísticas de GitHub

Son del último año y de cada año desde 2023 (con selector, como en GitHub), y nunca se inventan:
si el archivo no está, el widget lo dice.

- Sin configurar nada, el total y el mapa incluyen lo privado, pero commits, pull requests,
  merges y repositorios cuentan solo lo público (el sitio lo aclara).
- Con el secreto `GH_STATS_TOKEN` esas cifras suman también los repositorios privados. Es un
  token personal clásico con permisos `read:user` y `repo`.

## Qué editar

| Para cambiar | Archivo |
|---|---|
| Proyectos del catálogo (un archivo por proyecto) | `src/data/proyectos/` y el orden en `src/data/proyectos.ts` |
| Textos (español y portugués) | `src/i18n/es.ts` · `src/i18n/pt.ts` |
| Contacto, foto y títulos que se escriben en el inicio | `src/data/perfil.ts` |
| Formación | `src/data/formacion.ts` |
| Tecnologías (con su ícono en `public/tecnologias/`) | `src/data/tecnologias.ts` |
| Capturas de un proyecto | `public/proyectos/<slug>/` y el campo `screenshots` |
| Diagrama de un proyecto | El campo `diagram`: tres a cinco pasos con icono |
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
