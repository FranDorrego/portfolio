/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: maquina-de-escribir.ts    Project: portfolio                       */
/*   Created: 2026/11/25 23:19:33  by vm                                      */
/*   Updated: 2026/11/25 23:19:33  by vm                                      */
/* ************************************************************************** */

/**
 * El guion de la maquina de escribir del inicio: escribe un titulo, lo borra, lo vuelve a
 * escribir y le suma el siguiente con una coma, borra ese ultimo, y asi hasta que quedan todos.
 * Cada paso es el texto al que hay que llegar; la pieza escribe o borra de a una letra.
 */

/** Los textos a los que se llega, en orden: dos pasos adelante y uno atras hasta el total. */
export function guionAcumulado(titulos: readonly string[]): string[] {
  const hasta = (cuantos: number): string => titulos.slice(0, cuantos).join(', ');
  const pasos: string[] = [];
  for (let cuantos = 1; cuantos <= titulos.length; cuantos++) {
    pasos.push(hasta(cuantos));
    if (cuantos < titulos.length) pasos.push(hasta(cuantos - 1));
  }
  return pasos;
}

/** El texto siguiente camino a `destino`: borra una letra si sobra, o escribe la que falta. */
export function unaLetraHacia(actual: string, destino: string): string {
  if (actual === destino) return actual;
  if (destino.startsWith(actual)) return destino.slice(0, actual.length + 1);
  return actual.slice(0, -1);
}
