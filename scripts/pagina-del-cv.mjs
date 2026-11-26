/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: pagina-del-cv.mjs    Project: portfolio                            */
/*   Created: 2026/11/26 16:57:59  by vm                                      */
/*   Updated: 2026/11/26 16:57:59  by vm                                      */
/* ************************************************************************** */

/**
 * La pagina /cv/: el curriculum completo en HTML simple, una sola columna, sin JavaScript. Es lo
 * que leen sin esfuerzo los ATS, los scripts y los agentes, y de ella sale el PDF
 * (scripts/imprimir-cv.mjs). El contenido es el mismo Markdown de llms-full.txt, pasado a HTML: un
 * solo origen para todo.
 */

const escapar = (texto) =>
  texto.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Negritas y enlaces dentro de un renglon, despues de escapar. */
function enLinea(texto) {
  return escapar(texto)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/(https?:\/\/[^\s<)]+[^\s<).,;:])/g, '<a href="$1">$1</a>')
    .replace(/([\w.+-]+@[\w-]+\.[\w.]+)/g, '<a href="mailto:$1">$1</a>');
}

/** El Markdown que escribe texto-para-agentes.ts (titulos, citas, listas y parrafos) a HTML. */
export function markdownAHtml(markdown) {
  const salida = [];
  let lista = false;
  const cerrarLista = () => {
    if (lista) salida.push('</ul>');
    lista = false;
  };
  for (const renglon of markdown.split('\n')) {
    const titulo = renglon.match(/^(#{1,3}) (.+)$/);
    if (titulo) {
      cerrarLista();
      const nivel = titulo[1].length;
      salida.push(`<h${nivel}>${enLinea(titulo[2])}</h${nivel}>`);
    } else if (renglon.startsWith('- ')) {
      if (!lista) salida.push('<ul>');
      lista = true;
      salida.push(`<li>${enLinea(renglon.slice(2))}</li>`);
    } else if (renglon.startsWith('> ')) {
      cerrarLista();
      salida.push(`<p class="resumen">${enLinea(renglon.slice(2))}</p>`);
    } else if (renglon.trim() === '') {
      cerrarLista();
    } else {
      cerrarLista();
      salida.push(`<p>${enLinea(renglon)}</p>`);
    }
  }
  cerrarLista();
  return salida.join('\n');
}

const ESTILO = `
:root { color-scheme: dark; --fondo: #151619; --texto: #e6e7ea; --suave: #a1a4ab; --linea: #2b2d33;
  --acento: #5aa2ff; }
* { box-sizing: border-box; }
body { margin: 0; background: var(--fondo); color: var(--texto);
  font: 16px/1.6 Inter, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif; }
main { max-width: 52rem; margin: 0 auto; padding: 2rem 1rem 4rem; }
nav { display: flex; flex-wrap: wrap; gap: .5rem 1rem; font-size: .9rem; margin-bottom: 1.5rem; }
h1 { font-size: 2rem; margin: 0 0 .25rem; }
h2 { font-size: 1.25rem; margin: 2rem 0 .5rem; padding-bottom: .25rem;
  border-bottom: 1px solid var(--linea); }
h3 { font-size: 1.05rem; margin: 1.5rem 0 .25rem; }
p, li { margin: .25rem 0; }
ul { padding-left: 1.25rem; }
.resumen { color: var(--suave); font-size: 1.05rem; }
a { color: var(--acento); overflow-wrap: anywhere; }
@media print {
  :root { color-scheme: light; --fondo: #fff; --texto: #111; --suave: #444; --linea: #ccc;
    --acento: #0b57d0; }
  body { font-size: 10.5pt; }
  main { padding: 0; max-width: none; }
  nav { display: none; }
  h2, h3 { break-after: avoid; }
  li, p { break-inside: avoid; }
}`;

/** El documento entero de /cv/ (o /pt/cv/). */
export function paginaDelCv({ markdown, idioma, sitio }) {
  const pt = idioma === 'pt';
  const prefijo = pt ? '/pt' : '';
  const sufijo = pt ? '-pt' : '';
  const titulo = 'Franco Dorrego · CV · Developer Full Stack Web';
  const descripcion = markdown.match(/^> (.+)$/m)?.[1] ?? '';
  const enlaces = [
    [`${prefijo}/`, pt ? 'Portfólio' : 'Portafolio'],
    [`/cv-franco-dorrego${sufijo}.pdf`, 'PDF'],
    [`/resume${sufijo}.json`, 'JSON Resume'],
    [`${prefijo}/llms-full.txt`, 'Markdown'],
    [pt ? '/cv/' : '/pt/cv/', pt ? 'Español' : 'Português'],
  ];
  return `<!doctype html>
<html lang="${pt ? 'pt-PT' : 'es'}">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${escapar(titulo)}</title>
<meta name="description" content="${escapar(descripcion)}" />
<meta name="robots" content="index, follow" />
<link rel="canonical" href="${sitio}${prefijo}/cv/" />
<link rel="alternate" hreflang="es" href="${sitio}/cv/" />
<link rel="alternate" hreflang="pt-PT" href="${sitio}/pt/cv/" />
<link rel="alternate" type="application/pdf" href="${sitio}/cv-franco-dorrego${sufijo}.pdf" />
<link rel="alternate" type="application/json" href="${sitio}/resume${sufijo}.json" />
<link rel="alternate" type="text/markdown" href="${sitio}${prefijo}/llms-full.txt" />
<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
<style>${ESTILO}</style>
</head>
<body>
<main>
<nav aria-label="${pt ? 'Outros formatos' : 'Otros formatos'}">
${enlaces.map(([href, texto]) => `<a href="${href}">${texto}</a>`).join('\n')}
</nav>
<article>
${markdownAHtml(markdown)}
</article>
</main>
</body>
</html>
`;
}
