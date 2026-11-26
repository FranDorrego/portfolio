/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: sitio-ardumaker.ts    Project: portfolio                           */
/*   Created: 2026/11/26 01:37:20  by vm                                      */
/*   Updated: 2026/11/26 01:37:20  by vm                                      */
/* ************************************************************************** */

/** ArduMaker · sitio público. */

import type { Proyecto } from '@/types/proyecto';

export const SITIO_ARDUMAKER: Proyecto = {
  id: 'sitio-ardumaker',
  slug: 'sitio-ardumaker',
  title: 'ArduMaker · sitio público',
  category: 'propio',
  shortDescription: {
    es: 'El sitio público de ArduMaker: portadas por producto, precios, blog y documentación, en tres idiomas.',
    pt: 'O site público da ArduMaker: páginas por produto, preços, blog e documentação, em três línguas.',
  },
  fullDescription: {
    es: 'Cada ruta se pre-renderiza por idioma, con sitemap y un índice para agentes de IA. Hay pruebas por página y una base de diseño compartida con el resto de los fronts.',
    pt: 'Cada rota é pré-renderizada por língua, com sitemap e um índice para agentes de IA. Há testes por página e uma base de design partilhada com os restantes frontends.',
  },
  role: {
    es: 'Arquitectura y desarrollo; la base inicial se generó con IA.',
    pt: 'Arquitetura e desenvolvimento; a base inicial foi gerada com IA.',
  },
  languages: ['TypeScript'],
  technologies: ['React', 'Vite', 'Vitest', 'Pre-render', 'SEO', 'Nginx'],
  cardTags: ['React', 'TypeScript', 'SEO', 'Vitest'],
  filters: ['react', 'typescript', 'cloud'],
  startDate: '2026-01',
  status: 'activo',
  screenshots: [
    {
      src: 'proyectos/ardumaker-developer/inicio.webp',
      alt: { es: 'Inicio del sitio de ArduMaker', pt: 'Início do site da ArduMaker' },
    },
    {
      src: 'proyectos/ardumaker-developer/servicios.webp',
      alt: { es: 'Página de servicios', pt: 'Página de serviços' },
    },
    {
      src: 'proyectos/ardumaker-mcp/mcp.webp',
      alt: { es: 'Página del producto MCP', pt: 'Página do produto MCP' },
    },
  ],
  diagram: [
    { icon: 'codigo', label: 'React' },
    { icon: 'consola', label: 'Pre-render' },
    { icon: 'web', label: { es: '3 idiomas', pt: '3 línguas' } },
    { icon: 'grafico', label: 'SEO' },
  ],
  demoUrl: 'https://ardumaker.com',
  featured: false,
  visibility: 'privado',
};
