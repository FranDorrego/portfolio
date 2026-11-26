/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: testimonios.test.ts    Project: portfolio                          */
/*   Created: 2026/11/26 13:34:21  by vm                                      */
/*   Updated: 2026/11/26 13:56:14  by vm                                      */
/* ************************************************************************** */

/** Los testimonios: promedio y enlaces a proyectos que existen. */

import { describe, expect, it } from 'vitest';
import { PROYECTOS } from './proyectos';
import { TESTIMONIOS, promedio } from './testimonios';

describe('testimonios', () => {
  it('calcula el promedio con un decimal', () => {
    expect(promedio(TESTIMONIOS)).toBe(4.9);
    expect(promedio([])).toBe(0);
  });

  it('cada proyecto enlazado existe en el catalogo', () => {
    const ids = new Set(PROYECTOS.map((proyecto) => proyecto.id));
    for (const uno of TESTIMONIOS) {
      if (uno.proyecto) expect(ids.has(uno.proyecto), uno.trabajo).toBe(true);
    }
  });
});
