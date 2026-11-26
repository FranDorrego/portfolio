/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: formato.ts    Project: portfolio                                   */
/*   Created: 2026/11/26 21:10:28  by vm                                      */
/*   Updated: 2026/11/26 21:10:28  by vm                                      */
/* ************************************************************************** */

/** Clases y formatos que comparten las piezas del panel. */

export const ENTRADA =
  'w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground ' +
  'placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 ' +
  'focus-visible:ring-ring';

export function fecha(iso: string): string {
  return new Intl.DateTimeFormat('es', { dateStyle: 'medium' }).format(new Date(iso));
}
