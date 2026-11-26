/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: bbloom.ts    Project: portfolio                                    */
/*   Created: 2026/11/26 01:37:20  by vm                                      */
/*   Updated: 2026/11/26 01:37:20  by vm                                      */
/* ************************************************************************** */

/** BBloom. */

import type { Proyecto } from '@/types/proyecto';

export const BBLOOM: Proyecto = {
  id: 'bbloom',
  slug: 'bbloom',
  title: 'BBloom',
  category: 'cliente',
  shortDescription: {
    es: 'Frontend de una plataforma para conocer pareja: perfiles, filtros, mensajes y membresías.',
    pt: 'Frontend de uma plataforma de encontros: perfis, filtros, mensagens e subscrições.',
  },
  fullDescription: {
    es: 'Registro, perfil por pasos, tarjetas de perfiles con filtros, mensajes y planes de pago, sobre el diseño entregado por el cliente.',
    pt: 'Registo, perfil por passos, cartões de perfis com filtros, mensagens e planos de pagamento, sobre o design entregue pelo cliente.',
  },
  role: {
    es: 'Desarrollo del frontend a partir de una base generada con IA.',
    pt: 'Desenvolvimento do frontend a partir de uma base gerada com IA.',
  },
  languages: ['TypeScript'],
  technologies: ['React', 'Vite', 'Tailwind CSS', 'React Query'],
  cardTags: ['React', 'TypeScript', 'Tailwind'],
  filters: ['react', 'typescript'],
  startDate: '2025-07',
  endDate: '2025-07',
  screenshots: [
    {
      src: 'proyectos/bbloom/01.webp',
      alt: { es: 'Carga de fotos del perfil', pt: 'Carregamento de fotos do perfil' },
    },
  ],
  diagram: [
    { icon: 'usuario', label: { es: 'Registro', pt: 'Registo' } },
    { icon: 'movil', label: 'Perfil' },
    { icon: 'chat', label: { es: 'Mensajes', pt: 'Mensagens' } },
    { icon: 'pago', label: { es: 'Membresía', pt: 'Subscrição' } },
  ],
  featured: false,
  visibility: 'privado',
};
