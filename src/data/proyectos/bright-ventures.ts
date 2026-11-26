/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: bright-ventures.ts    Project: portfolio                           */
/*   Created: 2026/11/26 01:37:20  by vm                                      */
/*   Updated: 2026/11/26 01:37:20  by vm                                      */
/* ************************************************************************** */

/** Bright Ventures. */

import type { Proyecto } from '@/types/proyecto';

export const BRIGHT_VENTURES: Proyecto = {
  id: 'bright-ventures',
  slug: 'bright-ventures',
  title: 'Bright Ventures',
  category: 'cliente',
  country: { es: 'EE. UU.', pt: 'EUA' },
  shortDescription: {
    es: 'Sitio de venta de terrenos con un panel para editar todo el contenido, las fotos y el SEO.',
    pt: 'Site de venda de terrenos com um painel para editar todo o conteúdo, as fotos e o SEO.',
  },
  fullDescription: {
    es: 'Catálogo y detalle de terrenos en varios idiomas, con un panel de administración que edita cada sección del sitio sin tocar código.',
    pt: 'Catálogo e detalhe de terrenos em várias línguas, com um painel de administração que edita cada secção do site sem tocar no código.',
  },
  role: {
    es: 'Autor único del backend; el frontend partió de una base generada con IA y lo integré yo.',
    pt: 'Autor único do backend; o frontend partiu de uma base gerada com IA e fui eu a integrá-lo.',
  },
  languages: ['Python', 'TypeScript'],
  technologies: ['FastAPI', 'JWT', 'React', 'Vite', 'Tailwind CSS'],
  cardTags: ['FastAPI', 'React', 'CMS'],
  filters: ['python', 'react', 'typescript'],
  startDate: '2025-09',
  endDate: '2026-01',
  status: 'finalizado',
  screenshots: [
    {
      src: 'proyectos/bright-ventures/01.webp',
      alt: {
        es: 'Portada: inversión inmobiliaria en EE. UU.',
        pt: 'Página inicial: investimento imobiliário nos EUA',
      },
    },
    { src: 'proyectos/bright-ventures/02.webp', alt: { es: 'Servicios', pt: 'Serviços' } },
    {
      src: 'proyectos/bright-ventures/03.webp',
      alt: { es: 'Terrenos disponibles', pt: 'Terrenos disponíveis' },
    },
    {
      src: 'proyectos/bright-ventures/04.webp',
      alt: { es: 'Detalle de un terreno con galería', pt: 'Detalhe de um terreno com galeria' },
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
