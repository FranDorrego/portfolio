/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: maquina-de-escribir.test.ts    Project: portfolio                  */
/*   Created: 2026/11/25 23:19:33  by vm                                      */
/*   Updated: 2026/11/25 23:19:33  by vm                                      */
/* ************************************************************************** */

/** El guion de la maquina de escribir: acumula los titulos hasta mostrarlos todos. */

import { describe, expect, it } from 'vitest';
import { guionAcumulado, unaLetraHacia } from './maquina-de-escribir';

describe('maquina de escribir', () => {
  it('escribe, borra y acumula hasta el total', () => {
    expect(guionAcumulado(['A', 'B', 'C'])).toEqual(['A', '', 'A, B', 'A', 'A, B, C']);
    expect(guionAcumulado(['A'])).toEqual(['A']);
    expect(guionAcumulado([])).toEqual([]);
  });

  it('avanza de a una letra, borrando lo que sobra', () => {
    expect(unaLetraHacia('', 'Hola')).toBe('H');
    expect(unaLetraHacia('Hol', 'Hola')).toBe('Hola');
    expect(unaLetraHacia('A, B', 'A')).toBe('A, ');
    expect(unaLetraHacia('Hola', 'Hola')).toBe('Hola');
  });

  it('siguiendo el guion se llega a cada paso', () => {
    let texto = '';
    for (const destino of guionAcumulado(['Uno', 'Dos'])) {
      for (let golpes = 0; texto !== destino && golpes < 50; golpes++) {
        texto = unaLetraHacia(texto, destino);
      }
      expect(texto).toBe(destino);
    }
    expect(texto).toBe('Uno, Dos');
  });
});
