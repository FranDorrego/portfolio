/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: plataforma-ingles.ts    Project: portfolio                         */
/*   Created: 2026/11/26 01:37:20  by vm                                      */
/*   Updated: 2026/11/26 01:37:20  by vm                                      */
/* ************************************************************************** */

/** Plataforma de aprendizaje de inglés. */

import type { Proyecto } from '@/types/proyecto';

export const PLATAFORMA_INGLES: Proyecto = {
  id: 'plataforma-ingles',
  slug: 'plataforma-de-ingles',
  title: 'Plataforma de aprendizaje de inglés',
  category: 'cliente',
  shortDescription: {
    es: 'Frontend de una academia en línea: embudo de captación, ejercicios interactivos, progreso y facturación.',
    pt: 'Frontend de uma academia online: funil de captação, exercícios interativos, progresso e faturação.',
  },
  fullDescription: {
    es: 'Una parte pública (landing, inscripción y webinar) y una plataforma privada con unidades, árbol de habilidades en tres niveles, decenas de tipos de ejercicio, biblioteca, estadísticas y pagos.',
    pt: 'Uma parte pública (landing, inscrição e webinar) e uma plataforma privada com unidades, árvore de competências em três níveis, dezenas de tipos de exercício, biblioteca, estatísticas e pagamentos.',
  },
  problem: {
    es: 'Había que reemplazar un frontend anterior sin perder su lógica de ejercicios, vídeo y facturación.',
    pt: 'Era preciso substituir um frontend anterior sem perder a sua lógica de exercícios, vídeo e faturação.',
  },
  solution: {
    es: 'Documentar primero la lógica del frontend viejo y portarla después a una SPA nueva, con vídeos protegidos y pagos integrados.',
    pt: 'Documentar primeiro a lógica do frontend antigo e portá-la depois para uma SPA nova, com vídeos protegidos e pagamentos integrados.',
  },
  role: { es: 'Único desarrollador del frontend.', pt: 'Único programador do frontend.' },
  responsibilities: [
    {
      es: 'La base visual se generó con una herramienta de IA; la integración con la API, los ejercicios, la facturación y las correcciones son míos (253 de 559 commits).',
      pt: 'A base visual foi gerada com uma ferramenta de IA; a integração com a API, os exercícios, a faturação e as correções são meus (253 de 559 commits).',
    },
  ],
  languages: ['TypeScript'],
  technologies: ['React', 'Vite', 'Tailwind CSS', 'TanStack Query', 'Stripe', 'Auth0', 'Git LFS'],
  cardTags: ['React', 'TypeScript', 'Stripe', 'Auth0'],
  filters: ['react', 'typescript'],
  startDate: '2025-10',
  endDate: '2026-04',
  screenshots: [
    {
      src: 'proyectos/plataforma-ingles/01.webp',
      alt: { es: 'Landing del método VSF Inglés', pt: 'Landing do método VSF Inglés' },
    },
    {
      src: 'proyectos/plataforma-ingles/02.webp',
      alt: { es: 'Inscripción al programa', pt: 'Inscrição no programa' },
    },
    {
      src: 'proyectos/plataforma-ingles/03.webp',
      alt: { es: 'Página de la clase gratuita', pt: 'Página da aula gratuita' },
    },
  ],
  diagram: [
    { icon: 'web', label: 'Landing' },
    { icon: 'pago', label: 'Stripe' },
    { icon: 'usuario', label: { es: 'Alumno', pt: 'Aluno' } },
    { icon: 'juego', label: { es: 'Ejercicios', pt: 'Exercícios' } },
    { icon: 'grafico', label: { es: 'Progreso', pt: 'Progresso' } },
  ],
  featured: false,
  visibility: 'privado',
};
