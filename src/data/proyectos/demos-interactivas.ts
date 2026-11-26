/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: demos-interactivas.ts    Project: portfolio                        */
/*   Created: 2026/11/26 01:37:20  by vm                                      */
/*   Updated: 2026/11/26 01:37:20  by vm                                      */
/* ************************************************************************** */

/** Demos interactivas. */

import type { Proyecto } from '@/types/proyecto';

export const DEMOS_INTERACTIVAS: Proyecto = {
  id: 'demos-interactivas',
  slug: 'demos-interactivas',
  title: 'Demos interactivas',
  category: 'propio',
  shortDescription: {
    es: 'Dos prototipos para presentar ideas a clientes: una PWA de retos deportivos y un motor de moto en 3D.',
    pt: 'Dois protótipos para apresentar ideias a clientes: uma PWA de desafios desportivos e um motor de mota em 3D.',
  },
  fullDescription: {
    es: 'La PWA muestra rankings entre gimnasios y marcas verificadas; la demo 3D tiene vista explosionada, selección de piezas y modo rayos X.',
    pt: 'A PWA mostra rankings entre ginásios e marcas verificadas; a demo 3D tem vista explodida, seleção de peças e modo raios X.',
  },
  role: {
    es: 'Dirección del producto; el código se escribió casi todo con IA.',
    pt: 'Direção do produto; o código foi quase todo escrito com IA.',
  },
  languages: ['TypeScript'],
  technologies: ['React', 'Vite', 'PWA', 'Three.js'],
  cardTags: ['React', 'PWA', 'Three.js'],
  filters: ['react', 'typescript', 'ia'],
  startDate: '2026-11',
  screenshots: [
    {
      src: 'proyectos/demos-interactivas/01.webp',
      alt: { es: 'PWA de retos: mi actividad', pt: 'PWA de desafios: a minha atividade' },
    },
    {
      src: 'proyectos/demos-interactivas/02.webp',
      alt: { es: 'Rankings entre gimnasios', pt: 'Rankings entre ginásios' },
    },
    {
      src: 'proyectos/demos-interactivas/03.webp',
      alt: { es: 'Récords personales', pt: 'Recordes pessoais' },
    },
    {
      src: 'proyectos/demos-interactivas/04.webp',
      alt: { es: 'Motor 3D de una moto', pt: 'Motor 3D de uma mota' },
    },
    {
      src: 'proyectos/demos-interactivas/05.webp',
      alt: { es: 'Motor 3D en vista explosionada', pt: 'Motor 3D em vista explodida' },
    },
  ],
  diagram: [
    { icon: 'usuario', label: { es: 'Idea', pt: 'Ideia' } },
    { icon: 'ia', label: 'IA' },
    { icon: 'juego', label: 'Demo 3D' },
    { icon: 'movil', label: 'PWA' },
  ],
  featured: false,
  visibility: 'privado',
};
