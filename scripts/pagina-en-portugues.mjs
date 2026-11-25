/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: pagina-en-portugues.mjs    Project: portfolio                      */
/*   Created: 2026/11/25 22:25:17  by claude                                  */
/*   Updated: 2026/11/25 22:25:18  by claude                                  */
/* ************************************************************************** */

/**
 * Escribe dist/pt/index.html: la misma pagina con su direccion propia, y con el idioma, el titulo
 * y la descripcion ya en portugues en el HTML. Asi un buscador ve dos paginas distintas (/ y
 * /pt/) y no una sola en dos idiomas. Corre despues de `vite build`.
 */

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const RAIZ = path.resolve(import.meta.dirname, '..');

/** El titulo y la descripcion de un idioma, leidos de su archivo de textos. */
export function metadatos(fuente) {
  const title = fuente.match(/title: '([^']+)'/)?.[1];
  const description = fuente.match(/description:\s*'([^']+)'/)?.[1];
  if (!title || !description) throw new Error('No se encontraron title y description');
  return { title, description };
}

/** La pagina en portugues a partir de la pagina en espanol ya compilada. */
export function enPortugues({ html, es, pt }) {
  return html
    .replaceAll(es.title, pt.title)
    .replaceAll(es.description, pt.description)
    .replace('<html lang="es"', '<html lang="pt-PT"')
    .replace(/(<link rel="canonical" href="[^"]*?)"/, '$1pt/"')
    .replace(/(<meta property="og:url" content="[^"]*?)"/, '$1pt/"')
    .replace('property="og:locale" content="es"', 'property="og:locale" content="pt_PT"')
    .replace(
      'property="og:locale:alternate" content="pt_PT"',
      'property="og:locale:alternate" content="es"',
    )
    .replaceAll('="./', '="../');
}

if (process.argv[1] && path.resolve(process.argv[1]) === import.meta.filename) {
  const leer = (archivo) => readFileSync(path.join(RAIZ, archivo), 'utf8');
  const html = enPortugues({
    html: leer('dist/index.html'),
    es: metadatos(leer('src/i18n/es.ts')),
    pt: metadatos(leer('src/i18n/pt.ts')),
  });
  mkdirSync(path.join(RAIZ, 'dist/pt'), { recursive: true });
  writeFileSync(path.join(RAIZ, 'dist/pt/index.html'), html);
  console.log('pagina-en-portugues: dist/pt/index.html escrito');
}
