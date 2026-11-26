/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: chatbots-demo.ts    Project: portfolio                             */
/*   Created: 2026/11/26 01:37:20  by vm                                      */
/*   Updated: 2026/11/26 01:37:20  by vm                                      */
/* ************************************************************************** */

/** Demos de chatbots con IA. */

import type { Proyecto } from '@/types/proyecto';

export const CHATBOTS_DEMO: Proyecto = {
  id: 'chatbots-demo',
  slug: 'chatbots-demo',
  title: 'Demos de chatbots con IA',
  category: 'propio',
  shortDescription: {
    es: 'Seis chatbots configurables por el visitante: atención, reservas, ventas, leads y preguntas sobre un PDF.',
    pt: 'Seis chatbots configuráveis pelo visitante: atendimento, reservas, vendas, leads e perguntas sobre um PDF.',
  },
  fullDescription: {
    es: 'Cada demo tiene vista de administrador y de cliente, sin registro: sesión anónima, límite de uso y datos que se borran a las 24 horas.',
    pt: 'Cada demo tem vista de administrador e de cliente, sem registo: sessão anónima, limite de utilização e dados que se apagam ao fim de 24 horas.',
  },
  role: {
    es: 'Autor único.',
    pt: 'Autor único.',
  },
  languages: ['TypeScript'],
  technologies: ['Next.js', 'Prisma', 'PostgreSQL', 'Docker', 'OpenRouter'],
  cardTags: ['Next.js', 'Prisma', 'PostgreSQL', 'IA'],
  filters: ['react', 'typescript', 'ia', 'cloud'],
  startDate: '2026-11',
  screenshots: [
    {
      src: 'proyectos/chatbots-demo/01.webp',
      alt: { es: 'Portada con los seis chatbots', pt: 'Página inicial com os seis chatbots' },
    },
    {
      src: 'proyectos/chatbots-demo/02.webp',
      alt: { es: 'Chatbot de atención al cliente', pt: 'Chatbot de atendimento' },
    },
    {
      src: 'proyectos/chatbots-demo/03.webp',
      alt: { es: 'Chatbot de reservas', pt: 'Chatbot de reservas' },
    },
    {
      src: 'proyectos/chatbots-demo/04.webp',
      alt: {
        es: 'Configuración del asistente de ventas',
        pt: 'Configuração do assistente de vendas',
      },
    },
    {
      src: 'proyectos/chatbots-demo/05.webp',
      alt: { es: 'Todas las demos', pt: 'Todas as demos' },
    },
  ],
  diagram: [
    { icon: 'usuario', label: 'Visitante' },
    { icon: 'web', label: 'Next.js' },
    { icon: 'ia', label: 'OpenRouter' },
    { icon: 'datos', label: 'PostgreSQL' },
  ],
  featured: false,
  visibility: 'privado',
};
