/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: cryptoexcel.ts    Project: portfolio                               */
/*   Created: 2026/11/26 01:37:20  by vm                                      */
/*   Updated: 2026/11/26 01:37:20  by vm                                      */
/* ************************************************************************** */

/** CryptoExcel. */

import type { Proyecto } from '@/types/proyecto';

export const CRYPTOEXCEL: Proyecto = {
  id: 'cryptoexcel',
  slug: 'cryptoexcel',
  title: 'CryptoExcel',
  category: 'propio',
  shortDescription: {
    es: 'Registro y análisis de operaciones de criptomonedas con integración a Binance, webhooks y generación de informes en Excel.',
    pt: 'Registo e análise de operações de criptomoedas com integração com a Binance, webhooks e geração de relatórios em Excel.',
  },
  fullDescription: {
    es: 'Aplicación web para registrar y ordenar operaciones de arbitraje: movimientos, balances, comprobantes y estadísticas, con exportación a Excel enviada por correo. La construí desde cero en unos tres meses, entre 2023 y 2024.',
    pt: 'Aplicação web para registar e organizar operações de arbitragem: movimentos, saldos, comprovativos e estatísticas, com exportação para Excel enviada por email. Construí-a de raiz em cerca de três meses, entre 2023 e 2024.',
  },
  problem: {
    es: 'Quien hace arbitraje lleva sus operaciones en planillas armadas a mano, con errores y sin una vista clara del rendimiento.',
    pt: 'Quem faz arbitragem regista as operações em folhas de cálculo feitas à mão, com erros e sem uma visão clara do rendimento.',
  },
  solution: {
    es: 'Un backend Django con una app por área (autenticación, movimientos, estadísticas, pagos, exportaciones) y tres microservicios para Binance, exportaciones y comprobantes, con un frontend en Next.js.',
    pt: 'Um backend Django com uma app por área (autenticação, movimentos, estatísticas, pagamentos, exportações) e três microsserviços para a Binance, exportações e comprovativos, com um frontend em Next.js.',
  },
  role: {
    es: 'Autor único: producto, backend, frontend y despliegue.',
    pt: 'Autor único: produto, backend, frontend e deploy.',
  },
  languages: ['Python', 'JavaScript'],
  technologies: [
    'Django',
    'DRF',
    'Next.js',
    'React',
    'PostgreSQL',
    'Binance API',
    'openpyxl',
    'Google Drive API',
  ],
  cardTags: ['Django', 'Next.js', 'Binance API', 'Excel'],
  filters: ['python', 'django', 'react'],
  startDate: '2023-12',
  status: 'mantenimiento',
  metrics: [
    {
      value: '564',
      label: { es: 'commits entre backend y frontend', pt: 'commits entre backend e frontend' },
      source: {
        es: 'Historial de los dos repositorios principales.',
        pt: 'Histórico dos dois repositórios principais.',
      },
    },
  ],
  screenshots: [
    {
      src: 'proyectos/cryptoexcel/01.webp',
      alt: { es: 'Portada de CryptoExcel', pt: 'Página inicial da CryptoExcel' },
    },
    {
      src: 'proyectos/cryptoexcel/02.webp',
      alt: { es: 'Panel de estadísticas', pt: 'Painel de estatísticas' },
    },
    { src: 'proyectos/cryptoexcel/03.webp', alt: { es: 'Qué resuelve', pt: 'O que resolve' } },
    {
      src: 'proyectos/cryptoexcel/04.webp',
      alt: { es: 'Monedas y preguntas frecuentes', pt: 'Moedas e perguntas frequentes' },
    },
    {
      src: 'proyectos/cryptoexcel/05.webp',
      alt: { es: 'Acceso con Google', pt: 'Acesso com Google' },
    },
  ],
  diagram: [
    { icon: 'externo', label: 'Binance' },
    { icon: 'api', label: 'API Django' },
    { icon: 'grafico', label: { es: 'Estadísticas', pt: 'Estatísticas' } },
    { icon: 'planilla', label: 'Excel' },
    { icon: 'correo', label: 'Email' },
  ],
  featured: false,
  visibility: 'privado',
};
