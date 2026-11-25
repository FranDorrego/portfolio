/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: vite.config.ts    Project: portfolio                               */
/*   Created: 2026/11/25 22:17:57  by claude                                  */
/*   Updated: 2026/11/25 22:26:00  by claude                                  */
/* ************************************************************************** */

/**
 * Vite. La base es relativa: el sitio anda igual en un dominio propio o en /portfolio/.
 * Al compilar se anota si hay CV y que version es (la del paquete y el commit).
 */

import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

const aqui = import.meta.dirname;
const paquete = JSON.parse(readFileSync(path.join(aqui, 'package.json'), 'utf8'));
const commit = (process.env.GITHUB_SHA ?? 'local').slice(0, 7);

export default defineConfig({
  base: './',
  plugins: [react()],
  define: {
    // El boton del CV aparece solo si el PDF esta en public/ (ver src/data/perfil.ts).
    __HAY_CV__: existsSync(path.join(aqui, 'public/cv-franco-dorrego.pdf')),
    __VERSION__: JSON.stringify(`${paquete.version}+${commit}`),
  },
  resolve: { alias: { '@': path.join(aqui, 'src') } },
});
