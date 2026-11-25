/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: estadisticas-de-github.test.mjs    Project: portfolio              */
/*   Created: 2026/11/25 22:27:55  by claude                                  */
/*   Updated: 2026/11/25 22:40:59  by vm                                      */
/* ************************************************************************** */

/** El resumen de las estadisticas del ultimo anio, y si incluye lo privado. */

import { describe, expect, it } from 'vitest';
import { haceUnAnio, resumir } from './estadisticas-de-github.mjs';

const respuesta = (viewer) => ({
  viewer: { login: viewer },
  user: {
    contributionsCollection: {
      totalCommitContributions: 42,
      contributionCalendar: {
        totalContributions: 90,
        weeks: [{ contributionDays: [{ date: '2026-11-24', contributionCount: 3 }] }],
      },
    },
  },
  prs: { issueCount: 7 },
  merges: { issueCount: 5 },
});

describe('estadisticas de GitHub', () => {
  it('cuenta los pull requests desde hace un anio', () => {
    expect(haceUnAnio(new Date('2026-11-25T06:00:00Z'))).toBe('2025-11-25');
  });

  it('arma el archivo que lee el sitio', () => {
    const resumen = resumir({
      datos: respuesta('otro'),
      usuario: 'FranDorrego',
      ahora: new Date('2026-11-25T06:00:00Z'),
    });
    expect(resumen).toEqual({
      username: 'FranDorrego',
      updated_at: '2026-11-25',
      includes_private: false,
      total_contributions: 90,
      commits: 42,
      pull_requests: 7,
      merges: 5,
      contributions: [{ date: '2026-11-24', count: 3 }],
    });
  });

  it('con el token del propio usuario incluye lo privado', () => {
    const resumen = resumir({
      datos: respuesta('frandorrego'),
      usuario: 'FranDorrego',
      ahora: new Date(),
    });
    expect(resumen.includes_private).toBe(true);
  });
});
