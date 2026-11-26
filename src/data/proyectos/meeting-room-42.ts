/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: meeting-room-42.ts    Project: portfolio                           */
/*   Created: 2026/11/26 01:37:20  by vm                                      */
/*   Updated: 2026/11/26 01:37:20  by vm                                      */
/* ************************************************************************** */

/** 42 Meeting Room. */

import type { Proyecto } from '@/types/proyecto';

export const MEETING_ROOM_42: Proyecto = {
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
  screenshots: [
    {
      src: 'proyectos/meeting-room-42/01.webp',
      alt: { es: 'Línea de tiempo de la sala', pt: 'Linha de tempo da sala' },
    },
    {
      src: 'proyectos/meeting-room-42/02.webp',
      alt: { es: 'Reserva de un horario', pt: 'Reserva de um horário' },
    },
    {
      src: 'proyectos/meeting-room-42/03.webp',
      alt: { es: 'Uso por usuario', pt: 'Utilização por utilizador' },
    },
    {
      src: 'proyectos/meeting-room-42/04.webp',
      alt: { es: 'Cómo funciona por dentro', pt: 'Como funciona por dentro' },
    },
    {
      src: 'proyectos/meeting-room-42/05.webp',
      alt: { es: 'Reglas de reserva', pt: 'Regras de reserva' },
    },
  ],
  diagram: [
    { icon: 'usuario', label: { es: 'Estudiante', pt: 'Estudante' } },
    { icon: 'web', label: 'Next.js' },
    { icon: 'datos', label: 'PostgreSQL' },
    { icon: 'nube', label: { es: 'Tiempo real', pt: 'Tempo real' } },
  ],
  featured: false,
  visibility: 'privado',
};
