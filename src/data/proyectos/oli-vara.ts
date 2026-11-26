/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: oli-vara.ts    Project: portfolio                                  */
/*   Created: 2026/11/26 01:37:20  by vm                                      */
/*   Updated: 2026/11/26 01:37:20  by vm                                      */
/* ************************************************************************** */

/** Oli Vara Inmobiliaria. */

import type { Proyecto } from '@/types/proyecto';

export const OLI_VARA: Proyecto = {
  id: 'oli-vara',
  slug: 'oli-vara',
  title: 'Oli Vara Inmobiliaria',
  category: 'cliente',
  country: { es: 'México', pt: 'México' },
  shortDescription: {
    es: 'Landing de una agente de bienes raíces: servicios, vídeo, Instagram y contacto por WhatsApp.',
    pt: 'Landing de uma agente imobiliária: serviços, vídeo, Instagram e contacto por WhatsApp.',
  },
  fullDescription: {
    es: 'Sitio de una página con vídeo, servicios, feed de Instagram y páginas legales.',
    pt: 'Site de uma página com vídeo, serviços, feed do Instagram e páginas legais.',
  },
  role: {
    es: 'Ajuste de estilo y contenido sobre una base generada con IA.',
    pt: 'Ajuste de estilo e conteúdo sobre uma base gerada com IA.',
  },
  languages: ['TypeScript'],
  technologies: ['React', 'Vite', 'Tailwind CSS'],
  cardTags: ['React', 'Tailwind'],
  filters: ['react', 'typescript'],
  startDate: '2025-08',
  endDate: '2025-11',
  status: 'finalizado',
  screenshots: [
    {
      src: 'proyectos/oli-vara/01.webp',
      alt: { es: 'Portada del sitio', pt: 'Página inicial do site' },
    },
    { src: 'proyectos/oli-vara/02.webp', alt: { es: 'Servicios', pt: 'Serviços' } },
    { src: 'proyectos/oli-vara/03.webp', alt: { es: 'Sobre mí', pt: 'Sobre mim' } },
  ],
  diagram: [
    { icon: 'web', label: 'Landing' },
    { icon: 'video', label: 'Vídeo' },
    { icon: 'chat', label: 'WhatsApp' },
  ],
  featured: false,
  visibility: 'privado',
};
