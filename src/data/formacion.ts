/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: formacion.ts    Project: portfolio                                 */
/*   Created: 2026/11/26 01:41:07  by vm                                      */
/*   Updated: 2026/11/26 01:41:07  by vm                                      */
/* ************************************************************************** */

/** Donde estudie y estudio. Los nombres de las instituciones no se traducen. */

import type { Texto } from '@/i18n/idiomas';

export interface Estudio {
  institucion: string;
  titulo: Texto;
  lugar: Texto;
  enCurso: boolean;
}

export const FORMACION: Estudio[] = [
  {
    institucion: '42 Porto',
    titulo: {
      es: 'Linux, C/C++ y desarrollo de software',
      pt: 'Linux, C/C++ e desenvolvimento de software',
    },
    lugar: { es: 'Porto, Portugal', pt: 'Porto, Portugal' },
    enCurso: true,
  },
  {
    institucion: 'Instituto Tecnológico de Buenos Aires (ITBA)',
    titulo: { es: 'Desarrollo web Full Stack', pt: 'Desenvolvimento web Full Stack' },
    lugar: { es: 'Buenos Aires, Argentina', pt: 'Buenos Aires, Argentina' },
    enCurso: false,
  },
  {
    institucion: 'Universidad Tecnológica Nacional (UTN)',
    titulo: { es: 'Técnico en Mecatrónica', pt: 'Técnico de Mecatrónica' },
    lugar: { es: 'Córdoba, Argentina', pt: 'Córdoba, Argentina' },
    enCurso: false,
  },
  {
    institucion: 'Academia Santo Domingo',
    titulo: { es: 'Mecánica automotriz general', pt: 'Mecânica automóvel geral' },
    lugar: { es: 'Córdoba, Argentina', pt: 'Córdoba, Argentina' },
    enCurso: false,
  },
];
