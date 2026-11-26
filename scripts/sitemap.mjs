/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: sitemap.mjs    Project: portfolio                                  */
/*   Created: 2026/11/25 21:30:00  by claude                                  */
/*   Updated: 2026/11/26 16:55:58  by vm                                      */
/* ************************************************************************** */

/**
 * Escribe dist/sitemap.xml y completa dist/robots.txt con la direccion publica del sitio
 * (VITE_SITE_URL). Corre despues de `vite build`. Sin esa variable no escribe nada y avisa:
 * un sitemap con una direccion inventada es peor que no tener sitemap.
 */

import { appendFileSync, existsSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const RAIZ = path.resolve(import.meta.dirname, '..');

/** Lee VITE_SITE_URL del entorno o de los .env del proyecto, sin barra final. */
export function direccionDelSitio(entorno = process.env) {
  let valor = entorno.VITE_SITE_URL;
  for (const archivo of ['.env.production.local', '.env.production', '.env.local', '.env']) {
    if (valor) break;
    const ruta = path.join(RAIZ, archivo);
    if (!existsSync(ruta)) continue;
    valor = readFileSync(ruta, 'utf8').match(/^VITE_SITE_URL=(.+)$/m)?.[1];
  }
  return (valor || 'https://francodorrego.com').trim().replace(/\/+$/, '');
}

/** El inicio y el CV, cada uno en espanol y en portugues. */
export function sitemap(sitio, hoy) {
  const filas = ['', 'cv/']
    .map((ruta) => {
      const paginas = [
        { loc: `${sitio}/${ruta}`, idioma: 'es' },
        { loc: `${sitio}/pt/${ruta}`, idioma: 'pt-PT' },
      ];
      const alternativas = paginas
        .map((p) => `    <xhtml:link rel="alternate" hreflang="${p.idioma}" href="${p.loc}"/>`)
        .join('\n');
      return paginas
        .map(
          (p) =>
            `  <url>\n    <loc>${p.loc}</loc>\n    <lastmod>${hoy}</lastmod>\n` +
            `${alternativas}\n  </url>`,
        )
        .join('\n');
    })
    .join('\n');
  return (
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" ' +
    'xmlns:xhtml="http://www.w3.org/1999/xhtml">\n' +
    `${filas}\n</urlset>\n`
  );
}

if (process.argv[1] && path.resolve(process.argv[1]) === import.meta.filename) {
  const sitio = direccionDelSitio();
  if (!sitio) {
    console.warn('sitemap: falta VITE_SITE_URL; no se escribio sitemap.xml (ver README.md).');
  } else {
    const dist = path.join(RAIZ, 'dist');
    writeFileSync(
      path.join(dist, 'sitemap.xml'),
      sitemap(sitio, new Date().toISOString().slice(0, 10)),
    );
    appendFileSync(path.join(dist, 'robots.txt'), `\nSitemap: ${sitio}/sitemap.xml\n`);
    console.log(`sitemap: dist/sitemap.xml escrito para ${sitio}`);
  }
}
