/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: tema.test.ts    Project: portfolio                                 */
/*   Created: 2026/11/25 22:29:31  by vm                                      */
/*   Updated: 2026/11/25 22:29:31  by vm                                      */
/* ************************************************************************** */

// @vitest-environment jsdom
/** El tema: oscuro por defecto, se aplica a la pagina y se recuerda. */

import { describe, expect, it } from 'vitest';
import { CLAVE_DE_TEMA, aplicarTema, temaActual, temaGuardado } from './tema';

describe('tema', () => {
  it('sin eleccion es el oscuro', () => {
    expect(temaGuardado(null)).toBe('dark');
    expect(temaGuardado('cualquiera')).toBe('dark');
    expect(temaGuardado('light')).toBe('light');
  });

  it('se aplica a la pagina y queda guardado', () => {
    aplicarTema('light');
    expect(temaActual()).toBe('light');
    expect(window.localStorage.getItem(CLAVE_DE_TEMA)).toBe('light');
    aplicarTema('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });
});
