/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: prerender.mjs    Project: portfolio                                */
/*   Created: 2026/11/26 01:43:49  by vm                                      */
/*   Updated: 2026/11/26 01:45:44  by vm                                      */
/* ************************************************************************** */

/**
 * Despues de `vite build`: compila src/servidor/entrada.tsx para node, dibuja la pagina en
 * espanol (dist/index.html) y en portugues (dist/pt/index.html) adentro de `#root`, y escribe
 * llms.txt y llms-full.txt para los agentes de IA. Asi el contenido esta en el HTML desde el
 * primer byte: lo leen los buscadores y los agentes sin ejecutar JavaScript, y se ve antes.
 */

import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { build } from 'vite';
import { conContenido, enPortugues, metadatos } from './html-de-paginas.mjs';

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
  const plantilla = leer('dist/index.html');

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

  writeFileSync(
    path.join(RAIZ, 'dist/llms.txt'),
    entrada.textoParaAgentes({ sitio: SITIO, completo: false }),
  );
  writeFileSync(
    path.join(RAIZ, 'dist/llms-full.txt'),
    entrada.textoParaAgentes({ sitio: SITIO, completo: true }),
  );
  rmSync(SERVIDOR, { recursive: true, force: true });
  console.log('prerender: dist/index.html, dist/pt/index.html, llms.txt y llms-full.txt');
}
