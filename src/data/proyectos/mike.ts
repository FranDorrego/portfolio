/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: mike.ts    Project: portfolio                                      */
/*   Created: 2026/11/26 01:37:20  by vm                                      */
/*   Updated: 2026/11/26 01:37:20  by vm                                      */
/* ************************************************************************** */

/** MIKE. */

import type { Proyecto } from '@/types/proyecto';

export const MIKE: Proyecto = {
  id: 'mike',
  slug: 'mike',
  title: 'MIKE',
  category: 'cliente',
  shortDescription: {
    es: 'Venta de suscripciones a un asistente financiero por WhatsApp, con cobro online y panel de configuración.',
    pt: 'Venda de subscrições de um assistente financeiro por WhatsApp, com pagamento online e painel de configuração.',
  },
  fullDescription: {
    es: 'Landing con planes y un backend que crea los pagos en MercadoPago, recibe su webhook, verifica el estado y avisa al bot. El contenido y los planes se editan desde un panel.',
    pt: 'Landing com planos e um backend que cria os pagamentos no MercadoPago, recebe o webhook, verifica o estado e avisa o bot. O conteúdo e os planos editam-se a partir de um painel.',
  },
  role: {
    es: 'Autor único del backend; el frontend partió de una base generada con IA y lo integré yo.',
    pt: 'Autor único do backend; o frontend partiu de uma base gerada com IA e fui eu a integrá-lo.',
  },
  languages: ['Python', 'TypeScript'],
  technologies: ['Flask', 'MercadoPago', 'SQLite', 'JWT', 'React', 'Vite'],
  cardTags: ['Flask', 'MercadoPago', 'React'],
  filters: ['python', 'react', 'typescript'],
  startDate: '2025-06',
  endDate: '2026-01',
  status: 'finalizado',
  screenshots: [
    {
      src: 'proyectos/mike/01.webp',
      alt: {
        es: 'Portada: asistente financiero en WhatsApp',
        pt: 'Página inicial: assistente financeiro no WhatsApp',
      },
    },
    {
      src: 'proyectos/mike/02.webp',
      alt: {
        es: 'Cómo funciona, con el chat simulado',
        pt: 'Como funciona, com o chat simulado',
      },
    },
    { src: 'proyectos/mike/03.webp', alt: { es: 'Plan y precio', pt: 'Plano e preço' } },
    { src: 'proyectos/mike/04.webp', alt: { es: 'Acceso al panel', pt: 'Acesso ao painel' } },
    {
      src: 'proyectos/mike/05.webp',
      alt: { es: 'Panel de contenido: banners', pt: 'Painel de conteúdo: banners' },
    },
  ],
  diagram: [
    { icon: 'web', label: 'Landing' },
    { icon: 'pago', label: 'MercadoPago' },
    { icon: 'api', label: 'API Flask' },
    { icon: 'chat', label: 'Bot WhatsApp' },
  ],
  featured: false,
  visibility: 'privado',
};
