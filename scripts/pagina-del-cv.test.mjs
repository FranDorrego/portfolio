/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: pagina-del-cv.test.mjs    Project: portfolio                       */
/*   Created: 2026/11/26 16:57:59  by vm                                      */
/*   Updated: 2026/11/26 16:57:59  by vm                                      */
/* ************************************************************************** */

/** El Markdown del curriculum pasado a HTML. */

import { describe, expect, it } from 'vitest';
import { markdownAHtml, paginaDelCv } from './pagina-del-cv.mjs';

describe('markdownAHtml', () => {
  it('pasa titulos, listas, citas, negritas y enlaces, escapando el resto', () => {
    const html = markdownAHtml(
      '# Nombre\n\n> Resumen\n\n## Contacto\n\n- Email: a@b.com\n- Web: https://x.com/\n\n**¿P?** R <b>',
    );
    expect(html).toContain('<h1>Nombre</h1>');
    expect(html).toContain('<p class="resumen">Resumen</p>');
    expect(html).toContain('<h2>Contacto</h2>');
    expect(html).toContain('<li>Email: <a href="mailto:a@b.com">a@b.com</a></li>');
    expect(html).toContain('<a href="https://x.com/">https://x.com/</a>');
    expect(html).toContain('<p><strong>¿P?</strong> R &lt;b&gt;</p>');
    expect(html.match(/<ul>/g)).toHaveLength(1);
  });
});

describe('paginaDelCv', () => {
  it('arma el documento con idioma, canonica y los otros formatos', () => {
    const html = paginaDelCv({ markdown: '# X\n\n> Hola', idioma: 'pt', sitio: 'https://s.com' });
    expect(html).toContain('<html lang="pt-PT">');
    expect(html).toContain('<link rel="canonical" href="https://s.com/pt/cv/" />');
    expect(html).toContain('href="/cv-franco-dorrego-pt.pdf"');
    expect(html).toContain('<meta name="description" content="Hola" />');
  });
});
