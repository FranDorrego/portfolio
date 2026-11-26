/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: asistente-ecommerce.ts    Project: portfolio                       */
/*   Created: 2026/11/26 01:37:20  by vm                                      */
/*   Updated: 2026/11/26 01:37:20  by vm                                      */
/* ************************************************************************** */

/** Asistente comercial con IA para e-commerce. */

import type { Proyecto } from '@/types/proyecto';

export const ASISTENTE_ECOMMERCE: Proyecto = {
  id: 'asistente-ecommerce',
  slug: 'asistente-comercial-ecommerce',
  title: 'Asistente comercial con IA para e-commerce',
  category: 'cliente',
  shortDescription: {
    es: 'Chat de ventas con IA sobre un catálogo sincronizado desde WooCommerce, con análisis de compatibilidad entre productos y equipos.',
    pt: 'Chat de vendas com IA sobre um catálogo sincronizado a partir do WooCommerce, com análise de compatibilidade entre produtos e equipamentos.',
  },
  fullDescription: {
    es: 'Un chat público para clientes y otro interno para vendedores responden sobre stock, especificaciones y compatibilidad. La compra se cierra en la tienda del cliente.',
    pt: 'Um chat público para clientes e outro interno para vendedores respondem sobre stock, especificações e compatibilidade. A compra é concluída na loja do cliente.',
  },
  solution: {
    es: 'Backend Django con búsqueda de texto completo y por trigramas, sincronización con WordPress, tareas asíncronas con Celery y agentes en n8n que consultan la API.',
    pt: 'Backend Django com pesquisa de texto completo e por trigramas, sincronização com o WordPress, tarefas assíncronas com Celery e agentes em n8n que consultam a API.',
  },
  role: {
    es: 'Segunda etapa del backend y flujos de IA, en equipo.',
    pt: 'Segunda etapa do backend e fluxos de IA, em equipa.',
  },
  responsibilities: [
    {
      es: 'La base del backend la construyó otro desarrollador. Yo tomé la segunda etapa: sincronización de productos, chat, prompts y flujos de n8n (84 de 224 commits).',
      pt: 'A base do backend foi construída por outro programador. Eu assumi a segunda etapa: sincronização de produtos, chat, prompts e fluxos de n8n (84 de 224 commits).',
    },
  ],
  languages: ['Python', 'TypeScript'],
  technologies: [
    'Django',
    'DRF',
    'Celery',
    'Redis',
    'Channels',
    'PostgreSQL',
    'WooCommerce',
    'n8n',
  ],
  cardTags: ['Django', 'Celery', 'WooCommerce', 'n8n'],
  filters: ['python', 'django', 'ia'],
  startDate: '2026-01',
  endDate: '2026-06',
  screenshots: [
    {
      src: 'proyectos/asistente-ecommerce/01.webp',
      alt: { es: 'Acceso al panel', pt: 'Acesso ao painel' },
    },
    {
      src: 'proyectos/asistente-ecommerce/02.webp',
      alt: {
        es: 'Panel con indicadores y consultas al chatbot',
        pt: 'Painel com indicadores e pedidos ao chatbot',
      },
    },
    {
      src: 'proyectos/asistente-ecommerce/03.webp',
      alt: { es: 'Catálogo de productos', pt: 'Catálogo de produtos' },
    },
  ],
  diagram: [
    { icon: 'web', label: 'WooCommerce' },
    { icon: 'api', label: 'API Django' },
    { icon: 'flujo', label: 'n8n + IA' },
    { icon: 'chat', label: { es: 'Chat de ventas', pt: 'Chat de vendas' } },
  ],
  featured: false,
  visibility: 'privado',
};
