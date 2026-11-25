/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: maquina-de-escribir.test.ts    Project: portfolio                  */
/*   Created: 2026/11/25 23:23:44  by claude                                  */
/*   Updated: 2026/11/25 23:31:45  by vm                                      */
/* ************************************************************************** */

/** El guion de la maquina de escribir: un titulo por vez, en ronda. */

import { describe, expect, it } from 'vitest';
import { guionRotativo, unaLetraHacia } from './maquina-de-escribir';

describe('maquina de escribir', () => {
  it('escribe cada titulo y lo borra antes del siguiente', () => {
    expect(guionRotativo(['A', 'B'])).toEqual(['A', '', 'B', '']);
    expect(guionRotativo([])).toEqual([]);
  });

  it('avanza de a una letra, borrando lo que sobra', () => {
    expect(unaLetraHacia('', 'Hola')).toBe('H');
    expect(unaLetraHacia('Hol', 'Hola')).toBe('Hola');
    expect(unaLetraHacia('Hola', '')).toBe('Hol');
    expect(unaLetraHacia('Hola', 'Hola')).toBe('Hola');
  });
});
