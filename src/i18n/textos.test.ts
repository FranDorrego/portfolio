/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: textos.test.ts    Project: portfolio                               */
/*   Created: 2026/11/25 21:30:00  by claude                                  */
/*   Updated: 2026/11/25 23:21:38  by vm                                      */
/* ************************************************************************** */

/** Los dos idiomas tienen exactamente las mismas claves y ningun texto vacio. */

import { describe, expect, it } from 'vitest';
import { es } from './es';
import { pt } from './pt';

function claves(valor: unknown, prefijo = ''): string[] {
  if (Array.isArray(valor)) return valor.flatMap((uno, i) => claves(uno, `${prefijo}[${i}]`));
  if (typeof valor === 'object' && valor !== null) {
    return Object.entries(valor).flatMap(([clave, uno]) => claves(uno, `${prefijo}.${clave}`));
  }
  return [prefijo];
}

function textos(valor: unknown): string[] {
  if (typeof valor === 'string') return [valor];
  if (typeof valor === 'object' && valor !== null) return Object.values(valor).flatMap(textos);
  return [];
}

describe('textos de la interfaz', () => {
  it('es y pt tienen las mismas claves', () => {
    expect(claves(pt)).toEqual(claves(es));
  });

  it('no hay textos vacios', () => {
    for (const texto of [...textos(es), ...textos(pt)]) expect(texto.trim()).not.toBe('');
  });

  it('los huecos {{...}} coinciden entre idiomas', () => {
    const huecos = (texto: string): string[] => (texto.match(/\{\{\w+\}\}/g) ?? []).sort();
    const enEs = textos(es);
    const enPt = textos(pt);
    enEs.forEach((texto, i) => expect(huecos(enPt[i]), texto).toEqual(huecos(texto)));
  });

  it('el portugues no quedo en espanol', () => {
    const iguales = textos(es).filter((texto, i) => texto === textos(pt)[i] && texto.includes(' '));
    // Solo pueden coincidir nombres propios y expresiones identicas en los dos idiomas.
    expect(iguales).toEqual([
      'Porto, Portugal',
      'Pull requests',
      'Cloud / Linux',
      'IA & n8n',
      'C / C++',
      '42 Porto / Sistemas',
      'Código privado',
      '{{actual}} / {{total}}',
      '42 Porto · Common Core',
      'Franco Dorrego · Software Developer · Porto, Portugal',
    ]);
  });
});
