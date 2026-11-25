/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: raiz.test.ts    Project: portfolio                                 */
/*   Created: 2026/11/25 22:25:17  by claude                                  */
/*   Updated: 2026/11/25 22:25:17  by claude                                  */
/* ************************************************************************** */

/** La raiz del sitio se deduce bien desde la pagina en espanol y desde la de portugues. */

import { describe, expect, it } from 'vitest';
import { idiomaDeLaRuta, raizDesde } from './raiz';

describe('raiz del sitio', () => {
  it('reconoce la ruta en portugues', () => {
    expect(idiomaDeLaRuta('/portfolio/pt/')).toBe('pt');
    expect(idiomaDeLaRuta('/pt')).toBe('pt');
    expect(idiomaDeLaRuta('/pt/index.html')).toBe('pt');
    expect(idiomaDeLaRuta('/portfolio/')).toBeNull();
    expect(idiomaDeLaRuta('/script/')).toBeNull();
  });

  it('la raiz es la misma desde los dos idiomas', () => {
    expect(raizDesde('https://sitio.test/portfolio/')).toBe('https://sitio.test/portfolio/');
    expect(raizDesde('https://sitio.test/portfolio/pt/')).toBe('https://sitio.test/portfolio/');
    expect(raizDesde('https://sitio.test/portfolio/pt')).toBe('https://sitio.test/portfolio/');
    expect(raizDesde('https://sitio.test/pt/#contacto')).toBe('https://sitio.test/');
  });
});
