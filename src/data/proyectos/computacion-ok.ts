/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: computacion-ok.ts    Project: portfolio                            */
/*   Created: 2026/11/26 01:37:20  by vm                                      */
/*   Updated: 2026/11/26 01:37:20  by vm                                      */
/* ************************************************************************** */

/** Computación OK. */

import type { Proyecto } from '@/types/proyecto';

export const COMPUTACION_OK: Proyecto = {
  id: 'computacion-ok',
  slug: 'computacion-ok',
  title: 'Computación OK',
  category: 'cliente',
  country: { es: 'Argentina', pt: 'Argentina' },
  shortDescription: {
    es: 'Tienda online para armar PCs gaming paso a paso, con verificación de compatibilidad y catálogo sincronizado con el proveedor.',
    pt: 'Loja online para montar PCs gaming passo a passo, com verificação de compatibilidade e catálogo sincronizado com o fornecedor.',
  },
  fullDescription: {
    es: 'E-commerce con armado de PC por pasos, carrito, pedidos y panel de administración. El catálogo, el stock, los precios y las fotos se sincronizan solos desde el servicio SOAP del proveedor.',
    pt: 'E-commerce com montagem de PC por passos, carrinho, encomendas e painel de administração. O catálogo, o stock, os preços e as fotos sincronizam-se sozinhos a partir do serviço SOAP do fornecedor.',
  },
  role: {
    es: 'Autor único del backend; el frontend partió de una base generada con IA y lo integré yo.',
    pt: 'Autor único do backend; o frontend partiu de uma base gerada com IA e fui eu a integrá-lo.',
  },
  languages: ['Python', 'TypeScript'],
  technologies: ['Django', 'DRF', 'PostgreSQL', 'Docker Compose', 'SOAP', 'React', 'Vite', 'Nginx'],
  cardTags: ['Django', 'PostgreSQL', 'Docker', 'React'],
  filters: ['python', 'django', 'react', 'typescript', 'cloud'],
  startDate: '2025-06',
  endDate: '2025-08',
  status: 'finalizado',
  screenshots: [
    {
      src: 'proyectos/computacion-ok/01.webp',
      alt: { es: 'Portada: arma tu PC', pt: 'Página inicial: monta o teu PC' },
    },
    {
      src: 'proyectos/computacion-ok/02.webp',
      alt: {
        es: 'Catálogo de componentes con precio y stock',
        pt: 'Catálogo de componentes com preço e stock',
      },
    },
    {
      src: 'proyectos/computacion-ok/03.webp',
      alt: {
        es: 'Armador de PC paso a paso con carrito',
        pt: 'Montagem do PC passo a passo com carrinho',
      },
    },
    {
      src: 'proyectos/computacion-ok/04.webp',
      alt: { es: 'Guía con builds por presupuesto', pt: 'Guia com builds por orçamento' },
    },
    {
      src: 'proyectos/computacion-ok/05.webp',
      alt: { es: 'Acceso al panel de administración', pt: 'Acesso ao painel de administração' },
    },
  ],
  diagram: [
    { icon: 'externo', label: { es: 'Proveedor SOAP', pt: 'Fornecedor SOAP' } },
    { icon: 'api', label: 'API Django' },
    { icon: 'datos', label: 'PostgreSQL' },
    { icon: 'web', label: { es: 'Tienda', pt: 'Loja' } },
    { icon: 'pago', label: { es: 'Pedido', pt: 'Encomenda' } },
  ],
  featured: false,
  visibility: 'privado',
};
