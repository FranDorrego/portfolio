/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: maquina-de-escribir.ts    Project: portfolio                       */
/*   Created: 2026/11/25 23:23:44  by claude                                  */
/*   Updated: 2026/11/25 23:31:45  by vm                                      */
/* ************************************************************************** */

/**
 * El guion de la maquina de escribir del inicio: escribe un titulo, lo borra y escribe el
 * siguiente, en ronda. Cada paso es el texto al que hay que llegar; la pieza escribe o borra de
 * a una letra.
 */

/** Los textos a los que se llega, en orden: cada titulo y despues la linea vacia. */
export function guionRotativo(titulos: readonly string[]): string[] {
  return titulos.flatMap((titulo) => [titulo, '']);
}

/** El texto siguiente camino a `destino`: borra una letra si sobra, o escribe la que falta. */
export function unaLetraHacia(actual: string, destino: string): string {
  if (actual === destino) return actual;
  if (destino.startsWith(actual)) return destino.slice(0, actual.length + 1);
  return actual.slice(0, -1);
}
