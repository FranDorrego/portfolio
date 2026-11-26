/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: trading-bots.ts    Project: portfolio                              */
/*   Created: 2026/11/26 01:37:20  by vm                                      */
/*   Updated: 2026/11/26 01:37:20  by vm                                      */
/* ************************************************************************** */

/** Bots de trading en Binance. */

import type { Proyecto } from '@/types/proyecto';

export const TRADING_BOTS: Proyecto = {
  id: 'trading-bots',
  slug: 'trading-bots',
  title: 'Bots de trading en Binance',
  category: 'propio',
  shortDescription: {
    es: 'Arbitraje triangular, scalping y grid sobre Binance, con un servidor de precios compartido y avisos por Telegram.',
    pt: 'Arbitragem triangular, scalping e grid na Binance, com um servidor de preços partilhado e avisos por Telegram.',
  },
  fullDescription: {
    es: 'Generan rutas de arbitraje, ejecutan y siguen las órdenes por hilos, registran todo en SQLite y se reinician solos. Un servidor Django cachea precios y libro de órdenes para todos.',
    pt: 'Geram rotas de arbitragem, executam e acompanham as ordens por threads, registam tudo em SQLite e reiniciam-se sozinhos. Um servidor Django faz cache de preços e livro de ordens para todos.',
  },
  role: {
    es: 'Autor único.',
    pt: 'Autor único.',
  },
  languages: ['Python'],
  technologies: ['python-binance', 'WebSocket', 'SQLite', 'Django', 'Telegram'],
  cardTags: ['Python', 'WebSocket', 'Binance API'],
  filters: ['python', 'django'],
  startDate: '2024-08',
  endDate: '2025-03',
  status: 'finalizado',
  screenshots: [],
  diagram: [
    { icon: 'externo', label: 'Binance' },
    { icon: 'api', label: { es: 'Precios', pt: 'Preços' } },
    { icon: 'codigo', label: { es: 'Estrategia', pt: 'Estratégia' } },
    { icon: 'datos', label: 'SQLite' },
    { icon: 'chat', label: 'Telegram' },
  ],
  featured: false,
  visibility: 'privado',
};
