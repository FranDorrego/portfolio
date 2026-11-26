/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: perfil.ts    Project: portfolio                                    */
/*   Created: 2026/11/25 21:30:00  by claude                                  */
/*   Updated: 2026/11/26 01:43:13  by vm                                      */
/* ************************************************************************** */

/** Los datos de contacto. Son los que el autor ya publica en su perfil de GitHub. */

export const PERFIL = {
  nombre: 'Franco Dorrego',
  foto: 'franco-dorrego.webp',
  fotoGrande: 'franco-dorrego-grande.webp',
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

/** Los titulos que la maquina de escribir del inicio va sumando. No se traducen. */
export const TITULOS_DEL_HERO = [
  'Python / Django',
  'React / TypeScript',
  'Cloud / Linux',
  'AI / Automation',
  '42 Porto',
] as const;
