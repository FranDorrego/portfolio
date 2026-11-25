/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: propios-3.ts    Project: portfolio                                 */
/*   Created: 2026/11/25 22:46:46  by vm                                      */
/*   Updated: 2026/11/25 22:46:46  by vm                                      */
/* ************************************************************************** */

/** Mas herramientas propias, hasta mi primer producto. */

import type { Proyecto } from '@/types/proyecto';

export const OTROS_PROPIOS: Proyecto[] = [
  {
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
  },
  {
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
  },
  {
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
    screenshots: [],
    diagram: [
      { icon: 'usuario', label: 'Visitante' },
      { icon: 'web', label: 'Next.js' },
      { icon: 'ia', label: 'OpenRouter' },
      { icon: 'datos', label: 'PostgreSQL' },
    ],
    featured: false,
    visibility: 'privado',
  },
  {
    id: 'contabilidad-interna',
    slug: 'contabilidad-interna',
    title: 'Contabilidad interna',
    category: 'propio',
    shortDescription: {
      es: 'Sistema interno de ArduMaker para movimientos, saldos, deudas y empleados.',
      pt: 'Sistema interno da ArduMaker para movimentos, saldos, dívidas e colaboradores.',
    },
    fullDescription: {
      es: 'API con movimientos, monedas y deudas, alta de empleados, login con Google y archivos en Google Drive, con un panel en Next.js.',
      pt: 'API com movimentos, moedas e dívidas, registo de colaboradores, login com Google e ficheiros no Google Drive, com um painel em Next.js.',
    },
    role: {
      es: 'Autor único.',
      pt: 'Autor único.',
    },
    languages: ['Python', 'JavaScript'],
    technologies: ['Django', 'DRF', 'Next.js', 'Google Drive API'],
    cardTags: ['Django', 'Next.js'],
    filters: ['python', 'django', 'react'],
    startDate: '2024-08',
    endDate: '2024-12',
    status: 'finalizado',
    screenshots: [],
    diagram: [
      { icon: 'usuario', label: { es: 'Equipo', pt: 'Equipa' } },
      { icon: 'web', label: 'Next.js' },
      { icon: 'api', label: 'API Django' },
      { icon: 'nube', label: 'Google Drive' },
    ],
    featured: false,
    visibility: 'privado',
  },
  {
    id: 'demos-interactivas',
    slug: 'demos-interactivas',
    title: 'Demos interactivas',
    category: 'propio',
    shortDescription: {
      es: 'Dos prototipos para presentar ideas a clientes: una PWA de retos deportivos y un motor de moto en 3D.',
      pt: 'Dois protótipos para apresentar ideias a clientes: uma PWA de desafios desportivos e um motor de mota em 3D.',
    },
    fullDescription: {
      es: 'La PWA muestra rankings entre gimnasios y marcas verificadas; la demo 3D tiene vista explosionada, selección de piezas y modo rayos X.',
      pt: 'A PWA mostra rankings entre ginásios e marcas verificadas; a demo 3D tem vista explodida, seleção de peças e modo raios X.',
    },
    role: {
      es: 'Dirección del producto; el código se escribió casi todo con IA.',
      pt: 'Direção do produto; o código foi quase todo escrito com IA.',
    },
    languages: ['TypeScript'],
    technologies: ['React', 'Vite', 'PWA', 'Three.js'],
    cardTags: ['React', 'PWA', 'Three.js'],
    filters: ['react', 'typescript', 'ia'],
    startDate: '2026-11',
    screenshots: [],
    diagram: [
      { icon: 'usuario', label: { es: 'Idea', pt: 'Ideia' } },
      { icon: 'ia', label: 'IA' },
      { icon: 'juego', label: 'Demo 3D' },
      { icon: 'movil', label: 'PWA' },
    ],
    featured: false,
    visibility: 'privado',
  },
];
