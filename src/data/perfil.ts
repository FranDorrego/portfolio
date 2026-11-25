/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: perfil.ts    Project: portfolio                                    */
/*   Created: 2026/11/25 21:30:00  by claude                                  */
/*   Updated: 2026/11/25 21:30:00  by claude                                  */
/* ************************************************************************** */

/** Los datos de contacto. Son los que el autor ya publica en su perfil de GitHub. */

export const PERFIL = {
  nombre: 'Franco Dorrego',
  foto: 'franco-dorrego.jpg',
  email: 'francodorrego@gmail.com',
  linkedin: 'https://www.linkedin.com/in/francodorrego/',
  github: 'https://github.com/FranDorrego',
} as const;

/**
 * El CV: alcanza con dejar el PDF en `public/cv-franco-dorrego.pdf`. Vite avisa en el build si
 * esta (ver vite.config.ts) y recien ahi aparece el boton: no hay enlace a un archivo que no existe.
 */
export const RUTA_DEL_CV = 'cv-franco-dorrego.pdf';
export const HAY_CV: boolean = __HAY_CV__;

/** Los roles que se escriben y se borran en el hero. No se traducen: son nombres de rol. */
export const ROLES = [
  'Project Manager',
  'Cloud Architecture',
  'Full Stack Developer',
  'Python Developer',
  'Django Developer',
] as const;

export const ETIQUETAS_DEL_HERO = [
  'Python / Django',
  'React / TypeScript',
  'Cloud / Linux',
  'AI / Automation',
  '42 Porto',
] as const;
