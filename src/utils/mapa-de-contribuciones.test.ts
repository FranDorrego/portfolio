/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: mapa-de-contribuciones.test.ts    Project: portfolio               */
/*   Created: 2026/11/25 23:21:38  by vm                                      */
/*   Updated: 2026/11/25 23:21:38  by vm                                      */
/* ************************************************************************** */

/** El mapa de contribuciones: el nivel de GitHub manda y los meses van donde empiezan. */

import { describe, expect, it } from 'vitest';
import { armarSemanas, etiquetasDeMes } from './mapa-de-contribuciones';

describe('mapa de contribuciones', () => {
  it('usa el nivel que da GitHub cuando viene', () => {
    const [semana] = armarSemanas([
      { date: '2026-03-01', count: 1, level: 3 },
      { date: '2026-03-02', count: 9 },
    ]);
    expect(semana[0]?.nivel).toBe(3);
    expect(semana[1]?.nivel).toBe(4);
  });

  it('escribe cada mes en la primera semana que empieza en el', () => {
    const dias = [];
    for (let dia = 1; dia <= 60; dia++) {
      const fecha = new Date(Date.UTC(2026, 0, dia)).toISOString().slice(0, 10);
      dias.push({ date: fecha, count: 0 });
    }
    const meses = etiquetasDeMes(armarSemanas(dias), 'es').map((etiqueta) => etiqueta.texto);
    expect(meses).toEqual(['ene', 'feb', 'mar']);
  });
});
