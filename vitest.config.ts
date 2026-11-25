/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: vitest.config.ts    Project: portfolio                             */
/*   Created: 2026/11/25 22:17:57  by claude                                  */
/*   Updated: 2026/11/25 22:26:00  by claude                                  */
/* ************************************************************************** */

/** Vitest: la logica corre en node; las pruebas de pantalla piden jsdom en su primera linea. */

import { defineConfig, mergeConfig } from 'vitest/config';
import vite from './vite.config';

export default mergeConfig(
  vite,
  defineConfig({
    test: {
      environment: 'node',
      globals: true,
      include: ['src/**/*.test.{ts,tsx}', 'scripts/**/*.test.mjs'],
      pool: 'forks',
    },
  }),
);
