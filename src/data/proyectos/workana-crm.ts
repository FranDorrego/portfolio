/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: workana-crm.ts    Project: portfolio                               */
/*   Created: 2026/11/26 01:37:20  by vm                                      */
/*   Updated: 2026/11/26 01:37:20  by vm                                      */
/* ************************************************************************** */

/** Workana CRM. */

import type { Proyecto } from '@/types/proyecto';

export const WORKANA_CRM: Proyecto = {
  id: 'workana-crm',
  slug: 'workana-crm',
  title: 'Workana CRM',
  category: 'propio',
  shortDescription: {
    es: 'Extensión de Chrome y central web que conectan varias cuentas de Workana con un proyecto, con propuestas redactadas por IA.',
    pt: 'Extensão do Chrome e central web que ligam várias contas da Workana a um projeto, com propostas redigidas por IA.',
  },
  fullDescription: {
    es: 'Sincroniza propuestas y chats, programa seguimientos, marca los proyectos ya propuestos y redacta con IA. Es la cuarta versión: antes fue un bot de alertas y un CRM en Django.',
    pt: 'Sincroniza propostas e chats, agenda seguimentos, marca os projetos já propostos e redige com IA. É a quarta versão: antes foi um bot de alertas e um CRM em Django.',
  },
  role: {
    es: 'Autor único, con parte del código asistido por IA.',
    pt: 'Autor único, com parte do código assistido por IA.',
  },
  languages: ['JavaScript', 'Python'],
  technologies: ['Chrome Manifest V3', 'Node', 'PWA', 'OpenRouter', 'Django', 'n8n', 'Vitest'],
  cardTags: ['Chrome MV3', 'Node', 'IA', 'Vitest'],
  filters: ['python', 'django', 'ia'],
  startDate: '2025-05',
  status: 'activo',
  screenshots: [
    {
      src: 'proyectos/workana-crm/01.webp',
      alt: { es: 'Proyectos nuevos de Workana', pt: 'Projetos novos da Workana' },
    },
    {
      src: 'proyectos/workana-crm/02.webp',
      alt: { es: 'Cuentas conectadas', pt: 'Contas ligadas' },
    },
    {
      src: 'proyectos/workana-crm/03.webp',
      alt: { es: 'Detalle de un proyecto', pt: 'Detalhe de um projeto' },
    },
    {
      src: 'proyectos/workana-crm/04.webp',
      alt: { es: 'Acceso a la central', pt: 'Acesso à central' },
    },
  ],
  diagram: [
    { icon: 'web', label: 'Workana' },
    { icon: 'extension', label: { es: 'Extensión', pt: 'Extensão' } },
    { icon: 'ia', label: 'IA' },
    { icon: 'api', label: 'ArduMaker' },
    { icon: 'movil', label: 'Central PWA' },
  ],
  featured: false,
  visibility: 'privado',
};
