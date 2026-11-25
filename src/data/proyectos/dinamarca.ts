/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: dinamarca.ts    Project: portfolio                                 */
/*   Created: 2026/11/25 23:34:37  by vm                                      */
/*   Updated: 2026/11/25 23:34:37  by vm                                      */
/* ************************************************************************** */

/** Tours en Dinamarca: reservas de tours guiados con cobro online. */

import type { Proyecto } from '@/types/proyecto';

export const DINAMARCA: Proyecto = {
  id: 'dinamarca-tours',
  slug: 'dinamarca-tours',
  title: 'Tours en Dinamarca',
  category: 'cliente',
  country: { es: 'Dinamarca', pt: 'Dinamarca' },
  shortDescription: {
    es: 'Reservas de tours guiados con cobro online: disponibilidad, calendario, panel de administración y comprobantes.',
    pt: 'Reservas de tours guiados com pagamento online: disponibilidade, calendário, painel de administração e comprovativos.',
  },
  fullDescription: {
    es: 'Sitio público en dos idiomas para reservar sin crear cuenta y pagar una seña, y un panel para gestionar salidas, horarios recurrentes, bloqueos, asistencia y estadísticas. Cada reserva envía su correo y su comprobante en PDF.',
    pt: 'Site público em duas línguas para reservar sem criar conta e pagar um sinal, e um painel para gerir saídas, horários recorrentes, bloqueios, presenças e estatísticas. Cada reserva envia o seu email e o comprovativo em PDF.',
  },
  role: {
    es: 'Arquitectura y dirección técnica; el código se escribió con asistentes de IA bajo mi revisión.',
    pt: 'Arquitetura e direção técnica; o código foi escrito com assistentes de IA sob a minha revisão.',
  },
  languages: ['Python', 'TypeScript'],
  technologies: ['Django', 'DRF', 'PostgreSQL', 'React', 'Vite', 'SumUp', 'PDF', 'Vitest'],
  cardTags: ['Django', 'React', 'PostgreSQL', 'SumUp'],
  filters: ['python', 'django', 'react', 'typescript', 'ia'],
  startDate: '2026-10',
  status: 'en-desarrollo',
  screenshots: [
    {
      src: 'proyectos/dinamarca-tours/01.webp',
      alt: { es: 'Portada del sitio de reservas', pt: 'Página inicial do site de reservas' },
    },
    {
      src: 'proyectos/dinamarca-tours/02.webp',
      alt: { es: 'Catálogo de tours guiados', pt: 'Catálogo de tours guiados' },
    },
    {
      src: 'proyectos/dinamarca-tours/03.webp',
      alt: {
        es: 'Detalle de un tour con precio y fechas',
        pt: 'Detalhe de um tour com preço e datas',
      },
    },
    {
      src: 'proyectos/dinamarca-tours/04.webp',
      alt: {
        es: 'Reserva: calendario y total a pagar',
        pt: 'Reserva: calendário e total a pagar',
      },
    },
  ],
  diagram: [
    { icon: 'web', label: { es: 'Sitio público', pt: 'Site público' } },
    { icon: 'pago', label: 'SumUp' },
    { icon: 'api', label: 'API Django' },
    { icon: 'usuario', label: { es: 'Panel admin', pt: 'Painel admin' } },
    { icon: 'correo', label: 'PDF + email' },
  ],
  featured: false,
  visibility: 'privado',
};
