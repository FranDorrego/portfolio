/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: sha256.ts    Project: portfolio                                    */
/*   Created: 2026/11/26 01:37:20  by vm                                      */
/*   Updated: 2026/11/26 01:37:20  by vm                                      */
/* ************************************************************************** */

/** SHA-256 para minería. */

import type { Proyecto } from '@/types/proyecto';

export const SHA256: Proyecto = {
  id: 'sha256',
  slug: 'sha256',
  title: 'SHA-256 para minería',
  category: 'sistemas',
  shortDescription: {
    es: 'Implementación propia de SHA-256 en C para buscar el nonce de una cabecera de bloque, repartida en procesos.',
    pt: 'Implementação própria de SHA-256 em C para procurar o nonce de um cabeçalho de bloco, repartida por processos.',
  },
  fullDescription: {
    es: 'SHA-256 según el estándar, búsqueda de nonce contra un objetivo, reparto de rangos con fork y caché del estado intermedio, con pruebas en Python.',
    pt: 'SHA-256 segundo a norma, pesquisa de nonce contra um alvo, repartição de intervalos com fork e cache do estado intermédio, com testes em Python.',
  },
  role: {
    es: 'Autor único.',
    pt: 'Autor único.',
  },
  languages: ['C', 'Python'],
  technologies: ['Makefile', 'fork', 'SHA-256'],
  cardTags: ['C', 'Makefile', 'Procesos'],
  filters: ['c'],
  startDate: '2025-11',
  endDate: '2025-11',
  screenshots: [],
  diagram: [
    { icon: 'documento', label: { es: 'Cabecera', pt: 'Cabeçalho' } },
    { icon: 'codigo', label: 'SHA-256' },
    { icon: 'consola', label: 'fork' },
    { icon: 'grafico', label: 'Nonce' },
  ],
  featured: false,
  visibility: 'privado',
};
