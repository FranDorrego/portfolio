/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: comandera.ts    Project: portfolio                                 */
/*   Created: 2026/11/26 01:37:20  by vm                                      */
/*   Updated: 2026/11/26 01:37:20  by vm                                      */
/* ************************************************************************** */

/** Comandera para restaurante. */

import type { Proyecto } from '@/types/proyecto';

export const COMANDERA: Proyecto = {
  id: 'comandera',
  slug: 'comandera',
  title: 'Comandera para restaurante',
  category: 'cliente',
  country: { es: 'Colombia', pt: 'Colômbia' },
  shortDescription: {
    es: 'Toma de pedidos por mesa desde el navegador, sobre la base de datos Access que el restaurante ya usaba.',
    pt: 'Registo de pedidos por mesa a partir do navegador, sobre a base de dados Access que o restaurante já usava.',
  },
  fullDescription: {
    es: 'Una API lee y escribe en la base Access existente y un frontend muestra mesas, productos y carrito. Un lanzador instala lo necesario, actualiza y arranca todo en la PC del local.',
    pt: 'Uma API lê e escreve na base Access existente e um frontend mostra mesas, produtos e carrinho. Um lançador instala o necessário, atualiza e arranca tudo no PC do restaurante.',
  },
  role: {
    es: 'Autor único.',
    pt: 'Autor único.',
  },
  languages: ['Python', 'JavaScript'],
  technologies: ['FastAPI', 'Next.js', 'Microsoft Access', 'Windows', 'Instalador propio'],
  cardTags: ['FastAPI', 'Next.js', 'Access'],
  filters: ['python', 'react'],
  startDate: '2025-05',
  endDate: '2025-06',
  status: 'finalizado',
  screenshots: [
    {
      src: 'proyectos/comandera/01.webp',
      alt: { es: 'Ingreso de meseros', pt: 'Entrada dos empregados de mesa' },
    },
    {
      src: 'proyectos/comandera/02.webp',
      alt: { es: 'Mesas libres y ocupadas', pt: 'Mesas livres e ocupadas' },
    },
    {
      src: 'proyectos/comandera/03.webp',
      alt: { es: 'Pedido de una mesa', pt: 'Pedido de uma mesa' },
    },
  ],
  diagram: [
    { icon: 'movil', label: { es: 'Mesero', pt: 'Empregado' } },
    { icon: 'web', label: 'Next.js' },
    { icon: 'api', label: 'API FastAPI' },
    { icon: 'datos', label: 'Access' },
  ],
  featured: false,
  visibility: 'privado',
};
