/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: ancla.test.ts    Project: portfolio                                */
/*   Created: 2026/11/26 13:56:51  by vm                                      */
/*   Updated: 2026/11/26 13:56:51  by vm                                      */
/* ************************************************************************** */

// @vitest-environment jsdom
/** El destino de un ancla. */

import { describe, expect, it } from 'vitest';
import { destinoDelAncla } from './ancla';

describe('destinoDelAncla', () => {
  it('encuentra la seccion del ancla', () => {
    document.body.innerHTML = '<section id="clientes"></section>';
    expect(destinoDelAncla('#clientes', document)?.id).toBe('clientes');
  });

  it('sin ancla, o con una que no existe, no hay destino', () => {
    expect(destinoDelAncla('', document)).toBeNull();
    expect(destinoDelAncla('#nada', document)).toBeNull();
  });
});
