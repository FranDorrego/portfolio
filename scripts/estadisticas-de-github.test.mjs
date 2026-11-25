/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: estadisticas-de-github.test.mjs    Project: portfolio              */
/*   Created: 2026/11/25 22:22:29  by claude                                  */
/*   Updated: 2026/11/25 22:22:35  by claude                                  */
/* ************************************************************************** */

/** El resumen de las estadisticas: suma los anios y dice si incluye lo privado. */

import { describe, expect, it } from 'vitest';
import { consulta, resumir } from './estadisticas-de-github.mjs';

const respuesta = (viewer) => ({
  viewer: { login: viewer },
  user: {
    a2025: { totalCommitContributions: 10 },
    a2026: { totalCommitContributions: 32 },
    contributionsCollection: {
      contributionCalendar: {
        weeks: [{ contributionDays: [{ date: '2026-11-24', contributionCount: 3 }] }],
      },
    },
  },
  prs: { issueCount: 7 },
  merges: { issueCount: 5 },
});

describe('estadisticas de GitHub', () => {
  it('pide un tramo por anio', () => {
    const texto = consulta(2023, 2025);
    expect(texto.match(/a\d{4}: contributionsCollection/g)).toHaveLength(3);
  });

  it('suma los commits de todos los anios y arma el mapa', () => {
    const resumen = resumir({
      datos: respuesta('otro'),
      usuario: 'FranDorrego',
      ahora: new Date('2026-11-25T06:00:00Z'),
    });
    expect(resumen).toEqual({
      username: 'FranDorrego',
      updated_at: '2026-11-25T06:00:00.000Z',
      includes_private: false,
      commits: 42,
      pull_requests: 7,
      merges: 5,
      contributions: [{ date: '2026-11-24', count: 3 }],
    });
  });

  it('con el token del propio usuario incluye lo privado', () => {
    expect(
      resumir({ datos: respuesta('frandorrego'), usuario: 'FranDorrego', ahora: new Date() })
        .includes_private,
    ).toBe(true);
  });
});
