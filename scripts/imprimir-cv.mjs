/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: imprimir-cv.mjs    Project: portfolio                              */
/*   Created: 2026/11/26 16:57:59  by vm                                      */
/*   Updated: 2026/11/26 16:57:59  by vm                                      */
/* ************************************************************************** */

/**
 * El CV en PDF, que es lo que suben y leen los ATS: imprime dist/cv/index.html y
 * dist/pt/cv/index.html (despues de `npm run build`) en public/cv-franco-dorrego.pdf y
 * public/cv-franco-dorrego-pt.pdf. El PDF sale con texto real, no una imagen.
 *
 * Solo se vuelve a imprimir si el curriculum cambio: la huella del texto queda en
 * public/cv-franco-dorrego.sha256. Asi la accion no sube un PDF nuevo en cada corrida.
 * Necesita Playwright con Chromium; la accion lo instala solo para este paso.
 */

import { createHash } from 'node:crypto';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const RAIZ = path.resolve(import.meta.dirname, '..');
const VERSIONES = [
  { html: 'dist/cv/index.html', pdf: 'public/cv-franco-dorrego.pdf' },
  { html: 'dist/pt/cv/index.html', pdf: 'public/cv-franco-dorrego-pt.pdf' },
];
const HUELLA = path.join(RAIZ, 'public/cv-franco-dorrego.sha256');

/** La huella de los HTML del CV: cambia solo si cambia el curriculum. */
function huella(textos) {
  const suma = createHash('sha256');
  for (const texto of textos) suma.update(texto);
  return suma.digest('hex');
}

if (process.argv[1] && path.resolve(process.argv[1]) === import.meta.filename) {
  const textos = VERSIONES.map(({ html }) => readFileSync(path.join(RAIZ, html), 'utf8'));
  const nueva = huella(textos);
  const anterior = existsSync(HUELLA) ? readFileSync(HUELLA, 'utf8').trim() : '';
  const estan = VERSIONES.every(({ pdf }) => existsSync(path.join(RAIZ, pdf)));
  if (nueva === anterior && estan) {
    console.log('imprimir-cv: el curriculum no cambio; los PDF quedan como estan.');
  } else {
    const { chromium } = createRequire(import.meta.url)('playwright');
    const navegador = await chromium.launch();
    await Promise.all(
      VERSIONES.map(async ({ html, pdf }) => {
        const pagina = await navegador.newPage();
        await pagina.goto(pathToFileURL(path.join(RAIZ, html)).href);
        await pagina.pdf({
          path: path.join(RAIZ, pdf),
          format: 'A4',
          printBackground: true,
          margin: { top: '16mm', bottom: '16mm', left: '16mm', right: '16mm' },
        });
      }),
    );
    await navegador.close();
    writeFileSync(HUELLA, `${nueva}\n`);
    console.log('imprimir-cv: PDF escritos en public/.');
  }
}
