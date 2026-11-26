/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: voto-escondido.ts    Project: portfolio                            */
/*   Created: 2026/11/26 01:37:20  by vm                                      */
/*   Updated: 2026/11/26 01:37:20  by vm                                      */
/* ************************************************************************** */

/** Voto Escondido. */

import type { Proyecto } from '@/types/proyecto';

export const VOTO_ESCONDIDO: Proyecto = {
  id: 'voto-escondido',
  slug: 'voto-escondido',
  title: 'Voto Escondido',
  category: 'cliente',
  country: { es: 'Perú', pt: 'Peru' },
  shortDescription: {
    es: 'Portal público que muestra cómo votó cada senador, con un panel para cargar y versionar los datos.',
    pt: 'Portal público que mostra como votou cada senador, com um painel para carregar e versionar os dados.',
  },
  fullDescription: {
    es: 'Home y detalle de cada votación, con un panel de administración que guarda las últimas versiones de los datos y las imágenes.',
    pt: 'Home e detalhe de cada votação, com um painel de administração que guarda as últimas versões dos dados e as imagens.',
  },
  role: {
    es: 'Autor único del backend; el frontend partió de una base generada con IA y lo integré yo.',
    pt: 'Autor único do backend; o frontend partiu de uma base gerada com IA e fui eu a integrá-lo.',
  },
  languages: ['Python', 'TypeScript'],
  technologies: ['FastAPI', 'JWT', 'React', 'Vite'],
  cardTags: ['FastAPI', 'React'],
  filters: ['python', 'react', 'typescript'],
  startDate: '2025-09',
  endDate: '2025-09',
  screenshots: [
    {
      src: 'proyectos/voto-escondido/01.webp',
      alt: {
        es: 'Portada: transparencia en cada voto',
        pt: 'Página inicial: transparência em cada voto',
      },
    },
    {
      src: 'proyectos/voto-escondido/02.webp',
      alt: { es: 'Votaciones por categoría', pt: 'Votações por categoria' },
    },
    {
      src: 'proyectos/voto-escondido/03.webp',
      alt: {
        es: 'Detalle de una votación y el voto de cada senador',
        pt: 'Detalhe de uma votação e o voto de cada senador',
      },
    },
    {
      src: 'proyectos/voto-escondido/04.webp',
      alt: { es: 'Acceso administrativo', pt: 'Acesso administrativo' },
    },
  ],
  diagram: [
    { icon: 'usuario', label: 'Admin' },
    { icon: 'api', label: 'API FastAPI' },
    { icon: 'documento', label: { es: 'Votaciones', pt: 'Votações' } },
    { icon: 'web', label: 'Portal' },
  ],
  featured: false,
  visibility: 'privado',
};
