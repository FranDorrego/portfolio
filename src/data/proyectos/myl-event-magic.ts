/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: myl-event-magic.ts    Project: portfolio                           */
/*   Created: 2026/11/26 01:37:20  by vm                                      */
/*   Updated: 2026/11/26 01:37:20  by vm                                      */
/* ************************************************************************** */

/** MYL Event Magic. */

import type { Proyecto } from '@/types/proyecto';

export const MYL_EVENT_MAGIC: Proyecto = {
  id: 'myl-event-magic',
  slug: 'myl-event-magic',
  title: 'MYL Event Magic',
  category: 'cliente',
  country: { es: 'Argentina', pt: 'Argentina' },
  shortDescription: {
    es: 'Sitio de servicios para eventos con fotos, vídeo y contenido editable desde un panel.',
    pt: 'Site de serviços para eventos com fotos, vídeo e conteúdo editável a partir de um painel.',
  },
  fullDescription: {
    es: 'Landing con carrusel, grilla de servicios y detalle con fotos y vídeo; el panel edita todo el contenido del sitio.',
    pt: 'Landing com carrossel, grelha de serviços e detalhe com fotos e vídeo; o painel edita todo o conteúdo do site.',
  },
  role: {
    es: 'Autor único del backend; el frontend partió de una base generada con IA y lo integré yo.',
    pt: 'Autor único do backend; o frontend partiu de uma base gerada com IA e fui eu a integrá-lo.',
  },
  languages: ['Python', 'TypeScript'],
  technologies: ['FastAPI', 'JWT', 'React', 'Vite'],
  cardTags: ['FastAPI', 'React', 'CMS'],
  filters: ['python', 'react', 'typescript'],
  startDate: '2025-09',
  endDate: '2026-01',
  status: 'finalizado',
  screenshots: [
    {
      src: 'proyectos/myl-event-magic/01.webp',
      alt: { es: 'Portada de MYL Event Magic', pt: 'Página inicial da MYL Event Magic' },
    },
    {
      src: 'proyectos/myl-event-magic/02.webp',
      alt: { es: 'Servicios para eventos', pt: 'Serviços para eventos' },
    },
    {
      src: 'proyectos/myl-event-magic/03.webp',
      alt: { es: 'Detalle de un servicio con galería', pt: 'Detalhe de um serviço com galeria' },
    },
    {
      src: 'proyectos/myl-event-magic/04.webp',
      alt: { es: 'Acceso al panel', pt: 'Acesso ao painel' },
    },
  ],
  diagram: [
    { icon: 'usuario', label: 'Admin' },
    { icon: 'api', label: 'API FastAPI' },
    { icon: 'documento', label: { es: 'Contenido', pt: 'Conteúdo' } },
    { icon: 'web', label: { es: 'Sitio', pt: 'Site' } },
  ],
  featured: false,
  visibility: 'privado',
};
