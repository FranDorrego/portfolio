/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: arbiplus.ts    Project: portfolio                                  */
/*   Created: 2026/11/26 01:37:20  by vm                                      */
/*   Updated: 2026/11/26 01:37:20  by vm                                      */
/* ************************************************************************** */

/** ArbiPlus y SQLBinance. */

import type { Proyecto } from '@/types/proyecto';

export const ARBIPLUS: Proyecto = {
  id: 'arbiplus',
  slug: 'arbiplus',
  title: 'ArbiPlus y SQLBinance',
  category: 'propio',
  shortDescription: {
    es: 'Mi primer producto: una app de escritorio para registrar operaciones P2P de Binance y exportarlas a Excel.',
    pt: 'O meu primeiro produto: uma app de desktop para registar operações P2P da Binance e exportá-las para Excel.',
  },
  fullDescription: {
    es: 'Leía las operaciones por API y los comprobantes en PDF, y exportaba a Excel. De ahí salieron una librería Python publicada y, después, CryptoExcel.',
    pt: 'Lia as operações via API e os comprovativos em PDF, e exportava para Excel. Daí saíram uma biblioteca Python publicada e, depois, a CryptoExcel.',
  },
  role: {
    es: 'Autor único.',
    pt: 'Autor único.',
  },
  languages: ['Python'],
  technologies: ['Tkinter', 'Flet', 'SQLite', 'python-binance', 'Excel', 'Telegram'],
  cardTags: ['Python', 'SQLite', 'Desktop'],
  filters: ['python'],
  startDate: '2023-07',
  endDate: '2023-11',
  status: 'finalizado',
  screenshots: [],
  diagram: [
    { icon: 'externo', label: 'Binance P2P' },
    { icon: 'codigo', label: { es: 'App de escritorio', pt: 'App de desktop' } },
    { icon: 'datos', label: 'SQLite' },
    { icon: 'planilla', label: 'Excel' },
  ],
  repositoryUrl: 'https://github.com/FranDorrego/SQLbinance',
  featured: false,
  visibility: 'publico',
};
