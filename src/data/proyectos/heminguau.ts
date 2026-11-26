/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: heminguau.ts    Project: portfolio                                 */
/*   Created: 2026/11/26 01:37:20  by vm                                      */
/*   Updated: 2026/11/26 01:37:20  by vm                                      */
/* ************************************************************************** */

/** Heminguau. */

import type { Proyecto } from '@/types/proyecto';

export const HEMINGUAU: Proyecto = {
  id: 'heminguau',
  slug: 'heminguau',
  title: 'Heminguau',
  category: 'cliente',
  country: { es: 'España', pt: 'Espanha' },
  shortDescription: {
    es: 'Sitio de una peluquería canina y tienda de mascotas, con contenido editable y formularios de contacto.',
    pt: 'Site de um salão de tosquia canina e loja de animais, com conteúdo editável e formulários de contacto.',
  },
  fullDescription: {
    es: 'Landing con servicios, galería y ubicación, y un panel que edita el contenido y las fotos y guarda los mensajes que llegan.',
    pt: 'Landing com serviços, galeria e localização, e um painel que edita o conteúdo e as fotos e guarda as mensagens recebidas.',
  },
  role: {
    es: 'Autor único del backend; el frontend partió de una base generada con IA y lo integré yo.',
    pt: 'Autor único do backend; o frontend partiu de uma base gerada com IA e fui eu a integrá-lo.',
  },
  languages: ['Python', 'TypeScript'],
  technologies: ['FastAPI', 'JWT', 'React', 'Vite', 'Tailwind CSS'],
  cardTags: ['FastAPI', 'React', 'CMS'],
  filters: ['python', 'react', 'typescript'],
  startDate: '2025-10',
  endDate: '2026-02',
  status: 'finalizado',
  screenshots: [
    {
      src: 'proyectos/heminguau/01.webp',
      alt: { es: 'Portada de la peluquería canina', pt: 'Página inicial do salão de tosquia' },
    },
    { src: 'proyectos/heminguau/02.webp', alt: { es: 'Sobre nosotros', pt: 'Sobre nós' } },
    {
      src: 'proyectos/heminguau/03.webp',
      alt: { es: 'Servicios con fotos', pt: 'Serviços com fotos' },
    },
    {
      src: 'proyectos/heminguau/04.webp',
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
