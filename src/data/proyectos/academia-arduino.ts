/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: academia-arduino.ts    Project: portfolio                          */
/*   Created: 2026/11/26 01:37:20  by vm                                      */
/*   Updated: 2026/11/26 01:37:20  by vm                                      */
/* ************************************************************************** */

/** Academia de Arduino. */

import type { Proyecto } from '@/types/proyecto';

export const ACADEMIA_ARDUINO: Proyecto = {
  id: 'academia-arduino',
  slug: 'academia-de-arduino',
  title: 'Academia de Arduino',
  category: 'educacion',
  categoryNote: { es: 'Proyecto propio', pt: 'Projeto próprio' },
  shortDescription: {
    es: 'Formación en programación, Arduino, C y electrónica, con cursos, material propio y kits físicos.',
    pt: 'Formação em programação, Arduino, C e eletrónica, com cursos, material próprio e kits físicos.',
  },
  fullDescription: {
    es: 'Academia creada entre 2019 y 2020 para enseñar Arduino, programación en C y electrónica básica. Hoy no recibe alumnos nuevos; los contenidos siguen disponibles.',
    pt: 'Academia criada entre 2019 e 2020 para ensinar Arduino, programação em C e eletrónica básica. Hoje não recebe novos alunos; os conteúdos continuam disponíveis.',
  },
  role: {
    es: 'Fundador: contenidos, cursos y kits.',
    pt: 'Fundador: conteúdos, cursos e kits.',
  },
  languages: ['C', 'C++'],
  technologies: ['Arduino', 'Electrónica'],
  cardTags: ['Arduino', 'C', 'Electrónica'],
  filters: ['c'],
  startDate: '2019',
  status: 'finalizado',
  metrics: [
    {
      value: '≈ 3.000',
      label: { es: 'alumnos', pt: 'alunos' },
      source: { es: 'Dato del autor.', pt: 'Dado do autor.' },
    },
  ],
  screenshots: [],
  diagram: [
    { icon: 'documento', label: 'Cursos' },
    { icon: 'codigo', label: 'C / Arduino' },
    { icon: 'externo', label: 'Kits' },
    { icon: 'usuario', label: '≈ 3.000' },
  ],
  featured: false,
  visibility: 'privado',
};
