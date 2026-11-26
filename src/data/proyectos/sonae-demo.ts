/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: sonae-demo.ts    Project: portfolio                                */
/*   Created: 2026/11/26 01:37:20  by vm                                      */
/*   Updated: 2026/11/26 01:37:20  by vm                                      */
/* ************************************************************************** */

/** Gestión de frescos con visión por IA. */

import type { Proyecto } from '@/types/proyecto';

export const SONAE_DEMO: Proyecto = {
  id: 'sonae-demo',
  slug: 'sonae-demo',
  title: 'Gestión de frescos con visión por IA',
  category: 'educacion',
  categoryNote: { es: 'Demo', pt: 'Demo' },
  shortDescription: {
    es: 'Demo para supermercados: una foto de la góndola y la IA dice qué falta y crea la tarea de reposición.',
    pt: 'Demo para supermercados: uma foto da prateleira e a IA diz o que falta e cria a tarefa de reposição.',
  },
  fullDescription: {
    es: 'API que clasifica la foto con un modelo de visión, consulta el estado por tienda vía n8n y gestiona las tareas; el frontend muestra mapas de tienda y estadísticas.',
    pt: 'API que classifica a foto com um modelo de visão, consulta o estado por loja via n8n e gere as tarefas; o frontend mostra mapas da loja e estatísticas.',
  },
  role: {
    es: 'Autor único del backend; el frontend se generó con IA y lo ajusté yo.',
    pt: 'Autor único do backend; o frontend foi gerado com IA e ajustado por mim.',
  },
  languages: ['Python', 'TypeScript'],
  technologies: ['FastAPI', 'OpenAI', 'n8n', 'React', 'Vite'],
  cardTags: ['FastAPI', 'IA', 'n8n', 'React'],
  filters: ['python', 'react', 'typescript', 'ia'],
  startDate: '2025-11',
  endDate: '2025-11',
  screenshots: [
    {
      src: 'proyectos/sonae-demo/01.webp',
      alt: {
        es: 'Mapa de la tienda con el estado de cada zona',
        pt: 'Mapa da loja com o estado de cada zona',
      },
    },
    {
      src: 'proyectos/sonae-demo/02.webp',
      alt: { es: 'Sugerencias de la IA', pt: 'Sugestões da IA' },
    },
    {
      src: 'proyectos/sonae-demo/03.webp',
      alt: { es: 'Estadísticas de ventas', pt: 'Estatísticas de vendas' },
    },
    {
      src: 'proyectos/sonae-demo/04.webp',
      alt: { es: 'Eficiencia por producto', pt: 'Eficiência por produto' },
    },
    {
      src: 'proyectos/sonae-demo/05.webp',
      alt: { es: 'Selección de vista por rol', pt: 'Seleção de vista por função' },
    },
  ],
  diagram: [
    { icon: 'movil', label: 'Foto' },
    { icon: 'api', label: 'API FastAPI' },
    { icon: 'ia', label: { es: 'Visión', pt: 'Visão' } },
    { icon: 'flujo', label: 'n8n' },
    { icon: 'web', label: { es: 'Panel', pt: 'Painel' } },
  ],
  repositoryUrl: 'https://github.com/FranDorrego/front-task-manage',
  featured: false,
  visibility: 'publico',
};
