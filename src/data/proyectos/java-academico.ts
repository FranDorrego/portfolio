/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: java-academico.ts    Project: portfolio                            */
/*   Created: 2026/11/26 01:37:20  by vm                                      */
/*   Updated: 2026/11/26 22:04:35  by vm                                      */
/* ************************************************************************** */

/** Software de ventas en Java. */

import type { Proyecto } from '@/types/proyecto';

export const JAVA_ACADEMICO: Proyecto = {
  id: 'java-academico',
  slug: 'java-academico',
  title: 'Software de ventas en Java',
  category: 'educacion',
  categoryNote: { es: 'Académico', pt: 'Académico' },
  shortDescription: {
    es: 'Aplicación de escritorio para gestionar clientes, productos y ventas, hecha en grupo.',
    pt: 'Aplicação de desktop para gerir clientes, produtos e vendas, feita em grupo.',
  },
  fullDescription: {
    es: 'Altas, bajas y modificaciones de clientes, empleados y productos, y consultas de ventas por fecha y por producto.',
    pt: 'Criação, edição e remoção de clientes, colaboradores e produtos, e consultas de vendas por data e por produto.',
  },
  role: {
    es: 'Principal contribuyente en un grupo de cuatro.',
    pt: 'Principal contribuidor num grupo de quatro.',
  },
  languages: ['Java'],
  technologies: ['Swing', 'MySQL', 'POO'],
  cardTags: ['Java', 'MySQL'],
  filters: [],
  startDate: '2023-09',
  endDate: '2023-11',
  status: 'finalizado',
  screenshots: [],
  diagram: [
    { icon: 'usuario', label: 'Vendedor' },
    { icon: 'codigo', label: 'Java Swing' },
    { icon: 'datos', label: 'MySQL' },
  ],
  repositoryUrl: 'https://github.com/FranDorrego/SoftwareVentas',
  featured: false,
  enElCurriculum: false,
  visibility: 'publico',
};
