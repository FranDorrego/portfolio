/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: formacion.ts    Project: portfolio                                 */
/*   Created: 2026/11/26 01:41:07  by vm                                      */
/*   Updated: 2026/11/26 22:20:03  by vm                                      */
/* ************************************************************************** */

/** Donde estudie y estudio. Los nombres de las instituciones no se traducen. */

import type { Texto } from '@/i18n/idiomas';

export interface Estudio {
  institucion: string;
  /** El logo, en public/formacion/. */
  logo: string;
  /** El sitio oficial de la institucion. */
  sitio: string;
  titulo: Texto;
  lugar: Texto;
  /** AAAA-MM. Sin fecha conocida, no se muestra ninguna. */
  desde?: string;
  hasta?: string;
  enCurso: boolean;
}

export const FORMACION: Estudio[] = [
  {
    institucion: '42 Porto',
    logo: 'formacion/42-porto.webp',
    sitio: 'https://www.42porto.com',
    titulo: {
      es: 'Linux, C/C++ y desarrollo de software',
      pt: 'Linux, C/C++ e desenvolvimento de software',
    },
    lugar: { es: 'Porto, Portugal', pt: 'Porto, Portugal' },
    desde: '2025-01',
    enCurso: true,
  },
  {
    institucion: 'Instituto Tecnológico de Buenos Aires (ITBA)',
    logo: 'formacion/itba.webp',
    sitio: 'https://www.itba.edu.ar',
    titulo: { es: 'Desarrollo web Full Stack', pt: 'Desenvolvimento web Full Stack' },
    lugar: { es: 'Buenos Aires, Argentina', pt: 'Buenos Aires, Argentina' },
    desde: '2023-08',
    hasta: '2023-12',
    enCurso: false,
  },
  {
    institucion: 'Universidad Tecnológica Nacional (UTN)',
    logo: 'formacion/utn.webp',
    sitio: 'https://www.frc.utn.edu.ar',
    titulo: { es: 'Técnico en Mecatrónica', pt: 'Técnico de Mecatrónica' },
    lugar: { es: 'Córdoba, Argentina', pt: 'Córdoba, Argentina' },
    desde: '2018-02',
    hasta: '2019-01',
    enCurso: false,
  },
  {
    institucion: 'Academia Santo Domingo',
    logo: 'formacion/santo-domingo.webp',
    sitio: 'https://www.asd.edu.ar',
    titulo: { es: 'Mecánica automotriz general', pt: 'Mecânica automóvel geral' },
    lugar: { es: 'Córdoba, Argentina', pt: 'Córdoba, Argentina' },
    enCurso: false,
  },
];
