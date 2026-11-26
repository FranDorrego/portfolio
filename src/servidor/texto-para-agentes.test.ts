/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: texto-para-agentes.test.ts    Project: portfolio                   */
/*   Created: 2026/11/26 22:04:58  by vm                                      */
/*   Updated: 2026/11/26 22:05:10  by vm                                      */
/* ************************************************************************** */

/** Lo que va al curriculum: el agente que adapta los CV lee solo esto. */

import { describe, expect, it } from 'vitest';
import { PARA_EL_CURRICULUM, textoParaAgentes } from './texto-para-agentes';

describe('curriculum', () => {
  it('deja afuera los proyectos marcados como fuera del curriculum', () => {
    expect(PARA_EL_CURRICULUM.some((uno) => uno.id === 'java-academico')).toBe(false);
    for (const idioma of ['es', 'pt'] as const) {
      const texto = textoParaAgentes({ sitio: '', completo: true, idioma });
      expect(texto).not.toMatch(/Java \(Swing/);
      expect(texto).toContain('ViveNadando');
    }
  });
});
