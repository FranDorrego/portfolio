/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: github.service.test.ts    Project: portfolio                       */
/*   Created: 2026/11/25 21:30:00  by claude                                  */
/*   Updated: 2026/11/25 21:30:00  by claude                                  */
/* ************************************************************************** */

/** Como se lee la respuesta del proveedor: tolerante con la forma, estricto con los datos. */

import { describe, expect, it } from 'vitest';
import { estaVacia } from '@/hooks/use-actividad-de-github';
import { armarSemanas, nivelDe, totalDeContribuciones } from '@/utils/mapa-de-contribuciones';
import { interpretarActividad, leerContribuciones } from './github.service';

describe('interpretarActividad', () => {
  it('lee el sobre { success, data } con claves en snake_case', () => {
    const actividad = interpretarActividad(
      {
        success: true,
        data: {
          username: 'FranDorrego',
          commits: 10,
          pull_requests: 4,
          merges: 3,
          contributions: [{ date: '2026-01-02', count: 5 }],
        },
      },
      'otro',
    );
    expect(actividad).toEqual({
      username: 'FranDorrego',
      commits: 10,
      pullRequests: 4,
      merges: 3,
      contributions: [{ date: '2026-01-02', count: 5 }],
      updatedAt: null,
      includesPrivate: null,
    });
  });

  it('lo que no viene queda en null: no se inventa un cero', () => {
    const actividad = interpretarActividad({ commits: 7, merges: 'muchos' }, 'FranDorrego');
    expect(actividad.commits).toBe(7);
    expect(actividad.pullRequests).toBeNull();
    expect(actividad.merges).toBeNull();
    expect(actividad.contributions).toEqual([]);
    expect(estaVacia(actividad)).toBe(false);
  });

  it('sin cifras ni mapa esta vacia', () => {
    expect(estaVacia(interpretarActividad({}, 'FranDorrego'))).toBe(true);
  });

  it('rechaza lo que no es un objeto o viene marcado como error', () => {
    expect(() => interpretarActividad('<html>', 'x')).toThrow();
    expect(() => interpretarActividad(null, 'x')).toThrow();
    expect(() => interpretarActividad({ success: false }, 'x')).toThrow();
  });
});

describe('leerContribuciones', () => {
  it('acepta una lista o un diccionario por fecha, y ordena', () => {
    expect(leerContribuciones({ '2026-03-02': 2, '2026-03-01': 1 })).toEqual([
      { date: '2026-03-01', count: 1 },
      { date: '2026-03-02', count: 2 },
    ]);
    expect(leerContribuciones([{ date: '2026-03-01T10:00:00Z', count: 1 }])).toEqual([
      { date: '2026-03-01', count: 1 },
    ]);
  });

  it('descarta filas invalidas', () => {
    expect(
      leerContribuciones([{ date: 'ayer', count: 1 }, { date: '2026-03-01', count: -2 }, 5]),
    ).toEqual([]);
  });
});

describe('mapa de contribuciones', () => {
  it('rellena con cero los dias que faltan y arma semanas de siete', () => {
    const semanas = armarSemanas([
      { date: '2026-03-02', count: 4 },
      { date: '2026-03-12', count: 8 },
    ]);
    expect(semanas.every((semana) => semana.length === 7)).toBe(true);
    const celdas = semanas.flat().filter((celda) => celda !== null);
    expect(celdas).toHaveLength(11);
    expect(celdas[1]).toEqual({ date: '2026-03-03', count: 0, nivel: 0 });
    expect(celdas[0]?.nivel).toBe(2);
    expect(celdas[10]?.nivel).toBe(4);
    // 2026-03-02 es lunes: el domingo anterior queda como hueco, no como fecha inventada.
    expect(semanas[0][0]).toBeNull();
  });

  it('calcula niveles y totales', () => {
    expect(nivelDe(0, 10)).toBe(0);
    expect(nivelDe(1, 100)).toBe(1);
    expect(nivelDe(100, 100)).toBe(4);
    expect(
      totalDeContribuciones([
        { date: '2026-01-01', count: 2 },
        { date: '2026-01-02', count: 3 },
      ]),
    ).toBe(5);
    expect(armarSemanas([])).toEqual([]);
  });
});
