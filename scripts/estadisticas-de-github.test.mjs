/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: estadisticas-de-github.test.mjs    Project: portfolio              */
/*   Created: 2026/11/25 22:27:55  by claude                                  */
/*   Updated: 2026/11/26 01:38:49  by vm                                      */
/* ************************************************************************** */

/** Las estadisticas: periodos, resumen de cada uno y el archivo que lee el sitio. */

import { describe, expect, it } from 'vitest';
import { armarArchivo, periodos, resumirPeriodo } from './estadisticas-de-github.mjs';

const respuesta = {
  viewer: { login: 'otro' },
  user: {
    createdAt: '2023-06-07T13:06:11Z',
    contributionsCollection: {
      totalCommitContributions: 42,
      commitContributionsByRepository: [
        { repository: { nameWithOwner: 'a/uno' } },
        { repository: { nameWithOwner: 'a/dos' } },
      ],
      pullRequestContributionsByRepository: [{ repository: { nameWithOwner: 'a/uno' } }],
      contributionCalendar: {
        totalContributions: 90,
        weeks: [
          {
            contributionDays: [
              { date: '2026-11-24', contributionCount: 3, contributionLevel: 'SECOND_QUARTILE' },
            ],
          },
        ],
      },
    },
  },
  prs: { issueCount: 7 },
  merges: { issueCount: 5 },
};

describe('estadisticas de GitHub', () => {
  it('pide el ultimo anio y cada anio desde que existe la cuenta', () => {
    const lista = periodos({ ahora: new Date('2026-11-25T06:00:00Z'), primerAnio: 2023 });
    expect(lista.map((periodo) => periodo.clave)).toEqual([
      'ultimo',
      '2026',
      '2025',
      '2024',
      '2023',
    ]);
    expect(lista[0].desde.toISOString().slice(0, 10)).toBe('2025-11-25');
    expect(lista[2].hasta.toISOString().slice(0, 10)).toBe('2025-12-31');
  });

  it('resume un periodo y cuenta cada repositorio una sola vez', () => {
    expect(resumirPeriodo(respuesta)).toEqual({
      total_contributions: 90,
      commits: 42,
      pull_requests: 7,
      merges: 5,
      repos: 2,
      contributions: [{ date: '2026-11-24', count: 3, level: 2 }],
    });
  });

  it('arma el archivo con el ultimo anio arriba y todos los periodos adentro', () => {
    const ultimo = resumirPeriodo(respuesta);
    const archivo = armarArchivo({
      usuario: 'FranDorrego',
      ahora: new Date('2026-11-25T06:00:00Z'),
      incluyePrivados: false,
      resumenes: { ultimo, 2026: ultimo },
    });
    expect(archivo.updated_at).toBe('2026-11-25');
    expect(archivo.total_contributions).toBe(90);
    expect(Object.keys(archivo.periods)).toEqual(['2026', 'ultimo']);
  });
});
