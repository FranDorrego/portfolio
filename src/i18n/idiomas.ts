/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: idiomas.ts    Project: portfolio                                   */
/*   Created: 2026/11/25 21:30:00  by claude                                  */
/*   Updated: 2026/11/25 21:30:00  by claude                                  */
/* ************************************************************************** */

/** Los idiomas del portafolio y la forma de un texto que existe en todos. */

export const IDIOMAS = ['es', 'pt'] as const;

export type Idioma = (typeof IDIOMAS)[number];

/** Un texto del catalogo en cada idioma: si falta uno, no compila. */
export type Texto = Record<Idioma, string>;

export const IDIOMA_POR_DEFECTO: Idioma = 'es';

/** El codigo que va en `lang` y en las etiquetas para buscadores. */
export const ETIQUETA_DE_IDIOMA: Record<Idioma, string> = { es: 'es', pt: 'pt-PT' };

export function esIdioma(valor: unknown): valor is Idioma {
  return typeof valor === 'string' && (IDIOMAS as readonly string[]).includes(valor);
}
