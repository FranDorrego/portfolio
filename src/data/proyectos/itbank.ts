/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: itbank.ts    Project: portfolio                                    */
/*   Created: 2026/11/26 01:37:20  by vm                                      */
/*   Updated: 2026/11/26 01:37:20  by vm                                      */
/* ************************************************************************** */

/** ITBANK. */

import type { Proyecto } from '@/types/proyecto';

export const ITBANK: Proyecto = {
  id: 'itbank',
  slug: 'itbank',
  title: 'ITBANK',
  category: 'educacion',
  categoryNote: { es: 'Académico · ITBA', pt: 'Académico · ITBA' },
  shortDescription: {
    es: 'Aplicación de home banking con Django y Next.js, construida en ocho sprints.',
    pt: 'Aplicação de home banking com Django e Next.js, construída em oito sprints.',
  },
  fullDescription: {
    es: 'Proyecto del curso de desarrollo Full Stack del ITBA, hecho en pareja. Empezó en HTML, CSS y JavaScript y terminó como una aplicación completa: API REST en Django con permisos y un frontend en Next.js con login, movimientos, tarjetas y divisas.',
    pt: 'Projeto do curso de desenvolvimento Full Stack do ITBA, feito em par. Começou em HTML, CSS e JavaScript e terminou como uma aplicação completa: API REST em Django com permissões e um frontend em Next.js com login, movimentos, cartões e divisas.',
  },
  role: {
    es: 'Desarrollo Full Stack en pareja (230 de 318 commits).',
    pt: 'Desenvolvimento Full Stack em par (230 de 318 commits).',
  },
  languages: ['Python', 'JavaScript'],
  technologies: ['Django', 'DRF', 'Next.js', 'React', 'SQLite', 'Tailwind CSS'],
  cardTags: ['Django', 'Next.js', 'React', 'SQLite'],
  filters: ['python', 'django', 'react'],
  startDate: '2023-08',
  endDate: '2023-12',
  status: 'finalizado',
  screenshots: [
    {
      src: 'proyectos/itbank/01.webp',
      alt: { es: 'Acceso al home banking', pt: 'Acesso ao home banking' },
    },
    {
      src: 'proyectos/itbank/02.webp',
      alt: { es: 'Inicio con saldo y movimientos', pt: 'Início com saldo e movimentos' },
    },
    {
      src: 'proyectos/itbank/03.webp',
      alt: { es: 'Actividad de la cuenta', pt: 'Atividade da conta' },
    },
    { src: 'proyectos/itbank/04.webp', alt: { es: 'Datos de la cuenta', pt: 'Dados da conta' } },
    {
      src: 'proyectos/itbank/05.webp',
      alt: { es: 'Cambio de divisas', pt: 'Câmbio de divisas' },
    },
  ],
  diagram: [
    { icon: 'usuario', label: 'Cliente' },
    { icon: 'web', label: 'Next.js' },
    { icon: 'api', label: 'API Django' },
    { icon: 'datos', label: 'SQLite' },
  ],
  repositoryUrl: 'https://github.com/FranDorrego/ITBA',
  featured: false,
  visibility: 'publico',
};
