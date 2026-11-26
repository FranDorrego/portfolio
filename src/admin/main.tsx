/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: main.tsx    Project: portfolio                                     */
/*   Created: 2026/11/26 21:10:07  by vm                                      */
/*   Updated: 2026/11/26 21:10:29  by vm                                      */
/* ************************************************************************** */

/** El arranque del panel /admin/: una pagina aparte del sitio, sin indexar. */

import { createRoot } from 'react-dom/client';
import { ErrorBoundary } from '@/components/layout/error-boundary';
import '@/index.css';
import { Panel } from './panel';

createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <Panel />
  </ErrorBoundary>,
);
