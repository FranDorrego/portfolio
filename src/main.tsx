/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: main.tsx    Project: portfolio                                     */
/*   Created: 2026/11/25 22:17:56  by claude                                  */
/*   Updated: 2026/11/26 02:16:09  by vm                                      */
/* ************************************************************************** */

/** El arranque: toma la pagina pre-renderizada o la dibuja. */

import { createRoot, hydrateRoot } from 'react-dom/client';
import { App } from './app';
import { ErrorBoundary } from '@/components/layout/error-boundary';
import './index.css';

const contenedor = document.getElementById('root')!;
const pagina = (
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);

// La pagina ya viene dibujada (scripts/prerender.mjs): React la toma tal cual, sin redibujarla,
// asi nada aparece ni desaparece al cargar. Sin prerender (en desarrollo) se dibuja de cero.
if (contenedor.hasChildNodes()) hydrateRoot(contenedor, pagina);
else createRoot(contenedor).render(pagina);
