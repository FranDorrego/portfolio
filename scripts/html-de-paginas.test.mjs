/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: html-de-paginas.test.mjs    Project: portfolio                     */
/*   Created: 2026/11/25 22:25:17  by claude                                  */
/*   Updated: 2026/11/26 02:16:09  by vm                                      */
/* ************************************************************************** */

/** La pagina en portugues: idioma, textos, direccion canonica y rutas un nivel mas arriba. */

import { describe, expect, it } from 'vitest';
import { conActividad, conContenido, enPortugues, metadatos } from './html-de-paginas.mjs';

const html = `<html lang="es"><head><title>Hola</title>
<meta name="description" content="Una descripcion" />
<link rel="canonical" href="https://sitio.test/" />
<meta property="og:url" content="https://sitio.test/" />
<meta property="og:locale" content="es" />
<script type="module" src="./assets/a.js"></script></head></html>`;

describe('pagina en portugues', () => {
  it('lee titulo y descripcion de un archivo de textos', () => {
    expect(metadatos("meta: {\n title: 'T',\n description:\n  'D',\n }")).toEqual({
      title: 'T',
      description: 'D',
    });
  });

  it('traduce, cambia la canonica y sube un nivel las rutas', () => {
    const salida = enPortugues({
      html,
      es: { title: 'Hola', description: 'Una descripcion' },
      pt: { title: 'Olá', description: 'Uma descrição' },
    });
    expect(salida).toContain('<html lang="pt-PT"');
    expect(salida).toContain('<title>Olá</title>');
    expect(salida).toContain('content="Uma descrição"');
    expect(salida).toContain('rel="canonical" href="https://sitio.test/pt/"');
    expect(salida).toContain('property="og:url" content="https://sitio.test/pt/"');
    expect(salida).toContain('content="pt_PT"');
    expect(salida).toContain('src="../assets/a.js"');
  });
});

describe('prerender', () => {
  it('llena #root y falla si no lo encuentra', () => {
    expect(conContenido('<body><div id="root"></div></body>', '<h1>Hola</h1>')).toBe(
      '<body><div id="root"><h1>Hola</h1></div></body>',
    );
    expect(() => conContenido('<body></body>', 'x')).toThrow();
  });
});

describe('actividad en la pagina', () => {
  it('la escribe antes de cerrar head y sin poder cerrar el script', () => {
    const html = conActividad('<head></head>', { texto: '</script><b>' });
    expect(html).toContain('window.__ACTIVIDAD__=');
    expect(html).not.toContain('</script><b>');
    expect(html.endsWith('</head>')).toBe(true);
  });
});
