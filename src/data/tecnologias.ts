/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: tecnologias.ts    Project: portfolio                               */
/*   Created: 2026/11/26 01:41:07  by vm                                      */
/*   Updated: 2026/11/26 13:33:12  by vm                                      */
/* ************************************************************************** */

/** Las tecnologias que uso, agrupadas, con su icono (public/tecnologias/). Las marcas no se traducen. */

import type { Texto } from '@/i18n/idiomas';

export interface Tecnologia {
  nombre: string;
  icono: string;
}

export interface GrupoDeTecnologias {
  titulo: Texto;
  tecnologias: Tecnologia[];
}

const t = (nombre: string, archivo: string): Tecnologia => ({
  nombre,
  icono: `tecnologias/${archivo}`,
});

export const GRUPOS_DE_TECNOLOGIAS: GrupoDeTecnologias[] = [
  {
    titulo: { es: 'Lenguajes', pt: 'Linguagens' },
    tecnologias: [
      t('Python', 'python.svg'),
      t('TypeScript', 'typescript.svg'),
      t('JavaScript', 'javascript.svg'),
      t('C', 'lenguaje-c.svg'),
      t('C++', 'cplusplus.svg'),
      t('Bash', 'gnubash.svg'),
    ],
  },
  {
    titulo: { es: 'Web y APIs', pt: 'Web e APIs' },
    tecnologias: [
      t('Django', 'django.svg'),
      t('FastAPI', 'fastapi.svg'),
      t('Flask', 'flask.svg'),
      t('React', 'react.svg'),
      t('Next.js', 'nextdotjs.svg'),
      t('Vite', 'vite.svg'),
      t('Node.js', 'nodedotjs.svg'),
      t('Tailwind CSS', 'tailwindcss.svg'),
      t('HTML y CSS', 'html5.svg'),
    ],
  },
  {
    titulo: { es: 'Datos', pt: 'Dados' },
    tecnologias: [
      t('PostgreSQL', 'postgresql.svg'),
      t('MySQL', 'mysql.svg'),
      t('SQLite', 'sqlite.svg'),
      t('Redis', 'redis.svg'),
    ],
  },
  {
    titulo: { es: 'Infraestructura', pt: 'Infraestrutura' },
    tecnologias: [
      t('Linux', 'linux.svg'),
      t('Docker', 'docker.svg'),
      t('Nginx', 'nginx.svg'),
      t('Tailscale', 'tailscale.svg'),
      t('DNS y dominios', 'cloudflare.svg'),
      t('Git', 'git.svg'),
      t('GitHub', 'github.svg'),
    ],
  },
  {
    titulo: { es: 'IA, automatización e integraciones', pt: 'IA, automatização e integrações' },
    tecnologias: [
      t('Claude', 'anthropic.svg'),
      t('n8n', 'n8n.svg'),
      t('Lovable', 'lovable.webp'),
      t('WhatsApp API', 'whatsapp.svg'),
      t('Stripe', 'stripe.svg'),
      t('Arduino', 'arduino.svg'),
      t('ArduMaker Developer', 'ardumaker.webp'),
    ],
  },
];
