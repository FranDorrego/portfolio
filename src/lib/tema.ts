/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: tema.ts    Project: portfolio                                      */
/*   Created: 2026/11/25 22:29:31  by vm                                      */
/*   Updated: 2026/11/25 22:29:31  by vm                                      */
/* ************************************************************************** */

/**
 * El tema claro u oscuro. Sin eleccion previa, el oscuro (como los fronts de ArduMaker). La
 * misma regla esta en el script de index.html, que corre antes del primer dibujo.
 */

export type Tema = 'dark' | 'light';

export const CLAVE_DE_TEMA = 'portfolio-tema';

const COLOR_DE_BARRA: Record<Tema, string> = { dark: '#151619', light: '#ffffff' };

export function temaGuardado(valor: string | null): Tema {
  return valor === 'light' ? 'light' : 'dark';
}

export function temaActual(): Tema {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}

/** Pone el tema en la pagina, en la barra del telefono y lo recuerda. */
export function aplicarTema(tema: Tema): void {
  document.documentElement.classList.toggle('dark', tema === 'dark');
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', COLOR_DE_BARRA[tema]);
  try {
    window.localStorage.setItem(CLAVE_DE_TEMA, tema);
  } catch {
    // Sin almacenamiento el tema vale solo para esta visita.
  }
}
