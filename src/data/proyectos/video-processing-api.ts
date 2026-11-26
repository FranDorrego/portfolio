/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: video-processing-api.ts    Project: portfolio                      */
/*   Created: 2026/11/26 01:37:20  by vm                                      */
/*   Updated: 2026/11/26 01:37:20  by vm                                      */
/* ************************************************************************** */

/** Video Processing API. */

import type { Proyecto } from '@/types/proyecto';

export const VIDEO_PROCESSING_API: Proyecto = {
  id: 'video-processing-api',
  slug: 'video-processing-api',
  title: 'Video Processing API',
  category: 'educacion',
  categoryNote: { es: 'Hackathon Seguranza', pt: 'Hackathon Seguranza' },
  shortDescription: {
    es: 'Procesamiento de vídeo en tiempo real: recibe vídeos o fotogramas en vivo, los envía a un detector y publica las detecciones por WebSocket.',
    pt: 'Processamento de vídeo em tempo real: recebe vídeos ou fotogramas em direto, envia-os para um detetor e publica as deteções por WebSocket.',
  },
  fullDescription: {
    es: 'Backend escrito durante un hackathon. Trocea cada vídeo en fotogramas, los manda a un servicio de detección externo y entrega los resultados por REST y por salas de Socket.IO, con varios clientes a la vez.',
    pt: 'Backend escrito durante um hackathon. Divide cada vídeo em fotogramas, envia-os para um serviço de deteção externo e entrega os resultados por REST e por salas de Socket.IO, com vários clientes em simultâneo.',
  },
  solution: {
    es: 'Un hilo por vídeo con estados (en cola, esperando espectadores, procesando, terminado). El procesamiento se pausa si nadie está mirando y los fotogramas por segundo se cambian en caliente.',
    pt: 'Uma thread por vídeo com estados (em fila, à espera de espectadores, a processar, terminado). O processamento pausa se ninguém estiver a ver e os fotogramas por segundo mudam-se a quente.',
  },
  role: { es: 'Autor del backend.', pt: 'Autor do backend.' },
  languages: ['Python'],
  technologies: ['Flask', 'Socket.IO', 'OpenCV', 'SQLite', 'WebSocket'],
  cardTags: ['Python', 'Flask', 'OpenCV', 'WebSocket'],
  filters: ['python', 'ia'],
  startDate: '2026-04',
  endDate: '2026-04',
  status: 'finalizado',
  screenshots: [
    {
      src: 'proyectos/video-processing-api/01.webp',
      alt: {
        es: 'Presentación del proyecto en el hackathon',
        pt: 'Apresentação do projeto no hackathon',
      },
    },
    {
      src: 'proyectos/video-processing-api/02.webp',
      alt: { es: 'El problema', pt: 'O problema' },
    },
    {
      src: 'proyectos/video-processing-api/03.webp',
      alt: { es: 'La solución', pt: 'A solução' },
    },
    {
      src: 'proyectos/video-processing-api/04.webp',
      alt: { es: 'El cuello de botella', pt: 'O estrangulamento' },
    },
    {
      src: 'proyectos/video-processing-api/05.webp',
      alt: { es: 'El enfoque', pt: 'A abordagem' },
    },
  ],
  diagram: [
    { icon: 'video', label: 'Vídeo' },
    { icon: 'api', label: 'Flask' },
    { icon: 'ia', label: 'Detector' },
    { icon: 'datos', label: 'SQLite' },
    { icon: 'web', label: 'WebSocket' },
  ],
  repositoryUrl: 'https://github.com/FranDorrego/Hackaton---Seguranza',
  featured: false,
  visibility: 'publico',
};
