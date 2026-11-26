/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: prerender.mjs    Project: portfolio                                */
/*   Created: 2026/11/26 01:43:49  by vm                                      */
/*   Updated: 2026/11/26 16:58:15  by vm                                      */
/* ************************************************************************** */

/**
 * Despues de `vite build`: compila src/servidor/entrada.tsx para node, dibuja la pagina en
 * espanol (dist/index.html) y en portugues (dist/pt/index.html) adentro de `#root`, y escribe en
 * los dos idiomas lo que leen las maquinas: llms.txt y llms-full.txt (agentes de IA), /cv/ (el
 * curriculum en HTML simple, para ATS y scripts) y resume.json (JSON Resume, para APIs). Asi
 * el contenido esta en el HTML desde el primer byte: lo leen los buscadores y los agentes sin
 * ejecutar JavaScript, y se ve antes.
 */

import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { build } from 'vite';
import { paginaDelCv } from './pagina-del-cv.mjs';
import { conActividad, conContenido, enPortugues, metadatos } from './html-de-paginas.mjs';

const RAIZ = path.resolve(import.meta.dirname, '..');
const SERVIDOR = path.join(RAIZ, 'dist-servidor');
const SITIO = (process.env.VITE_SITE_URL || 'https://francodorrego.com').replace(/\/+$/, '');

if (process.argv[1] && path.resolve(process.argv[1]) === import.meta.filename) {
  await build({
    root: RAIZ,
    logLevel: 'warn',
    build: { ssr: 'src/servidor/entrada.tsx', outDir: SERVIDOR, emptyOutDir: true },
  });
  const entrada = await import(pathToFileURL(path.join(SERVIDOR, 'entrada.js')).href);
  const leer = (archivo) => readFileSync(path.join(RAIZ, archivo), 'utf8');
  // La actividad de GitHub va escrita en la pagina: se dibuja con ella y el navegador la toma
  // sin pedirla otra vez (src/hooks/use-actividad-de-github.ts).
  const actividad = JSON.parse(leer('dist/github-stats.json'));
  globalThis.__ACTIVIDAD__ = actividad;
  const plantilla = conActividad(leer('dist/index.html'), actividad);

  writeFileSync(
    path.join(RAIZ, 'dist/index.html'),
    conContenido(plantilla, entrada.dibujarPagina('es')),
  );
  const enPt = enPortugues({
    html: conContenido(plantilla, entrada.dibujarPagina('pt')),
    es: metadatos(leer('src/i18n/es.ts')),
    pt: metadatos(leer('src/i18n/pt.ts')),
  });
  mkdirSync(path.join(RAIZ, 'dist/pt'), { recursive: true });
  writeFileSync(path.join(RAIZ, 'dist/pt/index.html'), enPt);

  for (const idioma of ['es', 'pt']) {
    const carpeta = path.join(RAIZ, 'dist', idioma === 'pt' ? 'pt' : '');
    const escribir = (archivo, contenido) => {
      mkdirSync(path.dirname(path.join(carpeta, archivo)), { recursive: true });
      writeFileSync(path.join(carpeta, archivo), contenido);
    };
    const resumen = entrada.textoParaAgentes({ sitio: SITIO, completo: false, idioma });
    const completo = entrada.textoParaAgentes({ sitio: SITIO, completo: true, idioma });
    escribir('llms.txt', resumen);
    escribir('llms-full.txt', completo);
    escribir('cv/index.html', paginaDelCv({ markdown: completo, idioma, sitio: SITIO }));
    const resume = entrada.resumeJson({ sitio: SITIO, idioma });
    writeFileSync(
      path.join(RAIZ, 'dist', `resume${idioma === 'pt' ? '-pt' : ''}.json`),
      JSON.stringify(resume, null, 2) + '\n',
    );
  }
  rmSync(SERVIDOR, { recursive: true, force: true });
  console.log('prerender: paginas, llms.txt, llms-full.txt, /cv/ y resume.json en es y pt');
}
