/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: botminero.ts    Project: portfolio                                 */
/*   Created: 2026/11/26 01:37:20  by vm                                      */
/*   Updated: 2026/11/26 01:37:20  by vm                                      */
/* ************************************************************************** */

/** BotMinero. */

import type { Proyecto } from '@/types/proyecto';

export const BOTMINERO: Proyecto = {
  id: 'botminero',
  slug: 'botminero',
  title: 'BotMinero',
  category: 'cliente',
  shortDescription: {
    es: 'Trading automatizado: conecta las alertas de TradingView con órdenes en Binance.',
    pt: 'Trading automatizado: liga os alertas do TradingView a ordens na Binance.',
  },
  fullDescription: {
    es: 'Plataforma de bots de trading sobre futuros de Binance. Cada bot recibe alertas, abre la orden con su stop loss y su take profit, y permite que otros usuarios se sumen.',
    pt: 'Plataforma de bots de trading sobre futuros da Binance. Cada bot recebe alertas, abre a ordem com o seu stop loss e take profit, e permite que outros utilizadores se juntem.',
  },
  solution: {
    es: 'Un backend Django con una biblioteca interna para Binance (crear y cerrar órdenes, apalancamiento, validación de claves y saldo), pagos en cripto y avisos por Telegram.',
    pt: 'Um backend Django com uma biblioteca interna para a Binance (criar e fechar ordens, alavancagem, validação de chaves e saldo), pagamentos em cripto e avisos por Telegram.',
  },
  role: { es: 'Desarrollo completo del backend.', pt: 'Desenvolvimento completo do backend.' },
  languages: ['Python'],
  technologies: ['Django', 'DRF', 'Binance API', 'TradingView', 'Telegram'],
  cardTags: ['Django', 'Binance API', 'TradingView'],
  filters: ['python', 'django'],
  startDate: '2024-05',
  endDate: '2025-02',
  status: 'finalizado',
  screenshots: [
    {
      src: 'proyectos/botminero/01.webp',
      alt: { es: 'Portada de BotMinero', pt: 'Página inicial da BotMinero' },
    },
    {
      src: 'proyectos/botminero/02.webp',
      alt: { es: 'Bots oficiales y de la comunidad', pt: 'Bots oficiais e da comunidade' },
    },
    {
      src: 'proyectos/botminero/03.webp',
      alt: { es: 'Rendimiento de un bot', pt: 'Desempenho de um bot' },
    },
    { src: 'proyectos/botminero/04.webp', alt: { es: 'Planes', pt: 'Planos' } },
    { src: 'proyectos/botminero/05.webp', alt: { es: 'Acceso', pt: 'Acesso' } },
  ],
  diagram: [
    { icon: 'grafico', label: 'TradingView' },
    { icon: 'api', label: 'API Django' },
    { icon: 'externo', label: 'Binance Futures' },
    { icon: 'chat', label: 'Telegram' },
  ],
  featured: false,
  visibility: 'privado',
};
