/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: prospeccion.ts    Project: portfolio                               */
/*   Created: 2026/11/26 01:37:20  by vm                                      */
/*   Updated: 2026/11/26 01:37:20  by vm                                      */
/* ************************************************************************** */

/** Sistema de prospección. */

import type { Proyecto } from '@/types/proyecto';

export const PROSPECCION: Proyecto = {
  id: 'prospeccion',
  slug: 'prospeccion',
  title: 'Sistema de prospección',
  category: 'propio',
  shortDescription: {
    es: 'Prospección comercial automática: detecta el stack de cada sitio, evalúa y envía, con control de ritmo.',
    pt: 'Prospeção comercial automática: deteta o stack de cada site, avalia e envia, com controlo de ritmo.',
  },
  fullDescription: {
    es: 'Bots que detectan con qué está hecho un sitio, lo evalúan y preparan el contacto. Un gateway compartido reparte los envíos entre cuentas y un panel muestra el estado y la auditoría.',
    pt: 'Bots que detetam com que é feito um site, avaliam-no e preparam o contacto. Um gateway partilhado distribui os envios por contas e um painel mostra o estado e a auditoria.',
  },
  role: {
    es: 'Autor único.',
    pt: 'Autor único.',
  },
  languages: ['Python', 'Bash'],
  technologies: ['PostgreSQL', 'SQLite', 'systemd', 'Resend', 'Linux'],
  cardTags: ['Python', 'PostgreSQL', 'systemd'],
  filters: ['python', 'cloud'],
  startDate: '2026-11',
  status: 'activo',
  screenshots: [],
  diagram: [
    { icon: 'web', label: { es: 'Sitios', pt: 'Sites' } },
    { icon: 'codigo', label: { es: 'Detección', pt: 'Deteção' } },
    { icon: 'datos', label: 'PostgreSQL' },
    { icon: 'correo', label: { es: 'Envío', pt: 'Envio' } },
    { icon: 'grafico', label: { es: 'Panel', pt: 'Painel' } },
  ],
  featured: false,
  visibility: 'privado',
};
