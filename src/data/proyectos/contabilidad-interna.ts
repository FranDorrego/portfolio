/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: contabilidad-interna.ts    Project: portfolio                      */
/*   Created: 2026/11/26 01:37:20  by vm                                      */
/*   Updated: 2026/11/26 01:37:20  by vm                                      */
/* ************************************************************************** */

/** Contabilidad interna. */

import type { Proyecto } from '@/types/proyecto';

export const CONTABILIDAD_INTERNA: Proyecto = {
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
};
