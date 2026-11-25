/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: raiz.ts    Project: portfolio                                      */
/*   Created: 2026/11/25 22:25:17  by claude                                  */
/*   Updated: 2026/11/25 22:25:18  by claude                                  */
/* ************************************************************************** */

/**
 * La raiz del sitio y la direccion de cada idioma. El espanol vive en la raiz y el portugues en
 * `pt/`: cada idioma tiene su direccion propia, que es lo que un buscador puede indexar. La raiz
 * se calcula una sola vez al cargar, asi sirve igual en un dominio propio o en /portfolio/.
 */

import type { Idioma } from '@/i18n/idiomas';

/** El idioma que dice la ruta: `.../pt/` es portugues; cualquier otra, ninguno en particular. */
export function idiomaDeLaRuta(ruta: string): Idioma | null {
  return /\/pt(\/(index\.html)?)?$/.test(ruta) ? 'pt' : null;
}

/** La direccion de la carpeta raiz, a partir de la direccion de la pagina. */
export function raizDesde(direccion: string): string {
  const pagina = new URL(direccion);
  const subir = idiomaDeLaRuta(pagina.pathname)
    ? pagina.pathname.endsWith('/pt')
      ? './'
      : '../'
    : './';
  return new URL(subir, pagina).href;
}

const RAIZ = typeof window === 'undefined' ? '/' : raizDesde(window.location.href);

/** Un archivo de public/ (una imagen, el CV, las estadisticas). */
export const recurso = (ruta: string): string => `${RAIZ}${ruta}`;

/** La direccion de la pagina en un idioma. */
export const direccionDe = (idioma: Idioma): string => (idioma === 'pt' ? `${RAIZ}pt/` : RAIZ);
