/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: class-names.test.ts    Project: portfolio                          */
/*   Created: 2026/11/25 22:24:26  by claude                                  */
/*   Updated: 2026/11/25 22:24:26  by claude                                  */
/* ************************************************************************** */

/** Unir clases: la ultima de un mismo grupo gana y lo falso se descarta. */

import { describe, expect, it } from 'vitest';
import { cn } from './class-names';

describe('cn', () => {
  it('une, descarta lo falso y resuelve choques de Tailwind', () => {
    const apagada = false;
    expect(cn('p-2', apagada && 'hidden', 'text-sm')).toBe('p-2 text-sm');
    expect(cn('p-2', 'p-4')).toBe('p-4');
    expect(cn('text-muted-foreground', 'text-primary')).toBe('text-primary');
  });
});
