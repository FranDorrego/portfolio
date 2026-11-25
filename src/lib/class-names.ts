/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: class-names.ts    Project: portfolio                               */
/*   Created: 2026/11/25 22:18:47  by claude                                  */
/*   Updated: 2026/11/25 22:18:47  by claude                                  */
/* ************************************************************************** */

/** Unir clases de Tailwind sin que dos del mismo grupo se pisen. */

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...clases: ClassValue[]): string {
  return twMerge(clsx(clases));
}
