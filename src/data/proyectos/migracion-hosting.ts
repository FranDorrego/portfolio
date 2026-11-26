/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: migracion-hosting.ts    Project: portfolio                         */
/*   Created: 2026/11/26 01:37:20  by vm                                      */
/*   Updated: 2026/11/26 01:37:20  by vm                                      */
/* ************************************************************************** */

/** Migración de hosting a Raspberry Pi. */

import type { Proyecto } from '@/types/proyecto';

export const MIGRACION_HOSTING: Proyecto = {
  id: 'migracion-hosting',
  slug: 'migracion-hosting',
  title: 'Migración de hosting a Raspberry Pi',
  category: 'cliente',
  shortDescription: {
    es: 'Migración de un sitio WordPress y su correo a un servidor propio, documentada paso a paso.',
    pt: 'Migração de um site WordPress e do respetivo email para um servidor próprio, documentada passo a passo.',
  },
  fullDescription: {
    es: 'Instalación del servidor web y la base de datos, migración del sitio, certificados SSL, cortafuegos y correo con webmail.',
    pt: 'Instalação do servidor web e da base de dados, migração do site, certificados SSL, firewall e email com webmail.',
  },
  role: {
    es: 'Administración de sistemas, de punta a punta.',
    pt: 'Administração de sistemas, de ponta a ponta.',
  },
  languages: ['Bash'],
  technologies: ['Linux', 'Apache', 'MariaDB', 'WordPress', 'SSL', 'Roundcube'],
  cardTags: ['Linux', 'Apache', 'WordPress'],
  filters: ['cloud'],
  startDate: '2025-06',
  endDate: '2025-06',
  status: 'finalizado',
  screenshots: [],
  diagram: [
    { icon: 'nube', label: 'Hosting' },
    { icon: 'consola', label: { es: 'Migración', pt: 'Migração' } },
    { icon: 'nube', label: 'Raspberry Pi' },
    { icon: 'correo', label: 'Email' },
  ],
  featured: false,
  visibility: 'privado',
};
