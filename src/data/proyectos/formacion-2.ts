/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: formacion-2.ts    Project: portfolio                               */
/*   Created: 2026/11/25 22:46:26  by vm                                      */
/*   Updated: 2026/11/25 22:46:46  by vm                                      */
/* ************************************************************************** */

/** Mas proyectos de 42 Porto, demos y formacion. */

import type { Proyecto } from '@/types/proyecto';

export const MAS_FORMACION: Proyecto[] = [
  {
    id: 'meeting-room-42',
    slug: 'meeting-room-42',
    title: '42 Meeting Room',
    category: 'sistemas',
    categoryNote: { es: '42 Porto', pt: '42 Porto' },
    shortDescription: {
      es: 'Reserva de la sala de reuniones de 42 Porto en menos de 20 segundos, actualizada en tiempo real.',
      pt: 'Reserva da sala de reuniões da 42 Porto em menos de 20 segundos, atualizada em tempo real.',
    },
    fullDescription: {
      es: 'Línea de tiempo del día con los huecos libres, reglas validadas en el servidor con bloqueo por sala y un panel de administración. Los cambios llegan a todos sin recargar.',
      pt: 'Linha de tempo do dia com os espaços livres, regras validadas no servidor com bloqueio por sala e um painel de administração. As alterações chegam a todos sem recarregar.',
    },
    role: {
      es: 'Autor único.',
      pt: 'Autor único.',
    },
    languages: ['TypeScript'],
    technologies: ['Next.js', 'PostgreSQL', 'SSE', 'LISTEN / NOTIFY', 'Docker', 'Vitest'],
    cardTags: ['Next.js', 'PostgreSQL', 'Tiempo real'],
    filters: ['react', 'typescript', 'cloud'],
    startDate: '2026-11',
    endDate: '2026-11',
    status: 'finalizado',
    screenshots: [],
    diagram: [
      { icon: 'usuario', label: { es: 'Estudiante', pt: 'Estudante' } },
      { icon: 'web', label: 'Next.js' },
      { icon: 'datos', label: 'PostgreSQL' },
      { icon: 'nube', label: { es: 'Tiempo real', pt: 'Tempo real' } },
    ],
    featured: false,
    visibility: 'privado',
  },
  {
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
  },
  {
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
    screenshots: [],
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
  },
  {
    id: 'java-academico',
    slug: 'java-academico',
    title: 'Software de ventas en Java',
    category: 'educacion',
    categoryNote: { es: 'Académico', pt: 'Académico' },
    shortDescription: {
      es: 'Aplicación de escritorio para gestionar clientes, productos y ventas, hecha en grupo.',
      pt: 'Aplicação de desktop para gerir clientes, produtos e vendas, feita em grupo.',
    },
    fullDescription: {
      es: 'Altas, bajas y modificaciones de clientes, empleados y productos, y consultas de ventas por fecha y por producto.',
      pt: 'Criação, edição e remoção de clientes, colaboradores e produtos, e consultas de vendas por data e por produto.',
    },
    role: {
      es: 'Principal contribuyente en un grupo de cuatro.',
      pt: 'Principal contribuidor num grupo de quatro.',
    },
    languages: ['Java'],
    technologies: ['Swing', 'MySQL', 'POO'],
    cardTags: ['Java', 'MySQL'],
    filters: [],
    startDate: '2023-09',
    endDate: '2023-11',
    status: 'finalizado',
    screenshots: [],
    diagram: [
      { icon: 'usuario', label: 'Vendedor' },
      { icon: 'codigo', label: 'Java Swing' },
      { icon: 'datos', label: 'MySQL' },
    ],
    repositoryUrl: 'https://github.com/FranDorrego/SoftwareVentas',
    featured: false,
    visibility: 'publico',
  },
];
