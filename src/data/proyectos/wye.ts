/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: wye.ts    Project: portfolio                                       */
/*   Created: 2026/11/26 01:37:20  by vm                                      */
/*   Updated: 2026/11/26 01:37:20  by vm                                      */
/* ************************************************************************** */

/** Portal de salones para eventos. */

import type { Proyecto } from '@/types/proyecto';

export const WYE: Proyecto = {
  id: 'wye',
  slug: 'wye',
  title: 'Portal de salones para eventos',
  category: 'cliente',
  shortDescription: {
    es: 'Mantenimiento de una plataforma Django heredada de anuncios de salones y servicios para fiestas.',
    pt: 'Manutenção de uma plataforma Django herdada de anúncios de salões e serviços para festas.',
  },
  fullDescription: {
    es: 'Sistema de terceros en Django 1.11, importado del servidor del cliente para corregir la carga de anuncios y los errores de fotos.',
    pt: 'Sistema de terceiros em Django 1.11, importado do servidor do cliente para corrigir o carregamento de anúncios e os erros de fotos.',
  },
  role: {
    es: 'Mantenimiento puntual de un sistema heredado.',
    pt: 'Manutenção pontual de um sistema herdado.',
  },
  languages: ['Python'],
  technologies: ['Django 1.11', 'Celery', 'PostgreSQL', 'Gunicorn'],
  cardTags: ['Django', 'Celery', 'Legacy'],
  filters: ['python', 'django'],
  startDate: '2025-11',
  endDate: '2026-04',
  screenshots: [],
  diagram: [
    { icon: 'nube', label: 'Servidor' },
    { icon: 'codigo', label: 'Django legacy' },
    { icon: 'datos', label: 'PostgreSQL' },
    { icon: 'web', label: 'Portal' },
  ],
  featured: false,
  visibility: 'privado',
};
