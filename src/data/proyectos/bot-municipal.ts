/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: bot-municipal.ts    Project: portfolio                             */
/*   Created: 2026/11/26 01:37:20  by vm                                      */
/*   Updated: 2026/11/26 01:37:20  by vm                                      */
/* ************************************************************************** */

/** Bot de atención ciudadana. */

import type { Proyecto } from '@/types/proyecto';

export const BOT_MUNICIPAL: Proyecto = {
  id: 'bot-municipal',
  slug: 'bot-municipal',
  title: 'Bot de atención ciudadana',
  category: 'cliente',
  country: { es: 'Argentina', pt: 'Argentina' },
  shortDescription: {
    es: 'Bot de WhatsApp para una municipalidad: trámites, servicios y reclamos, con un agente de IA.',
    pt: 'Bot de WhatsApp para um município: trâmites, serviços e reclamações, com um agente de IA.',
  },
  fullDescription: {
    es: 'Flujo de n8n con entradas de WhatsApp y Telegram, un agente con memoria de conversación y herramientas HTTP, más la propuesta de arquitectura.',
    pt: 'Fluxo de n8n com entradas de WhatsApp e Telegram, um agente com memória de conversa e ferramentas HTTP, mais a proposta de arquitetura.',
  },
  role: {
    es: 'Autor único.',
    pt: 'Autor único.',
  },
  languages: [],
  technologies: ['n8n', 'OpenAI', 'WhatsApp Business', 'Telegram'],
  cardTags: ['n8n', 'IA', 'WhatsApp'],
  filters: ['ia'],
  startDate: '2025-06',
  endDate: '2025-06',
  screenshots: [],
  diagram: [
    { icon: 'chat', label: 'WhatsApp' },
    { icon: 'flujo', label: 'n8n' },
    { icon: 'ia', label: 'Agente de IA' },
    { icon: 'usuario', label: { es: 'Vecino', pt: 'Munícipe' } },
  ],
  featured: false,
  visibility: 'privado',
};
