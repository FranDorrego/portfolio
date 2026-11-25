/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: app.tsx    Project: portfolio                                      */
/*   Created: 2026/11/25 22:17:56  by claude                                  */
/*   Updated: 2026/11/25 22:21:17  by claude                                  */
/* ************************************************************************** */

/** El idioma y la unica pagina. */

import { ProveedorDeIdioma } from '@/i18n';
import { Inicio } from '@/pages/inicio';

export function App(): JSX.Element {
  return (
    <ProveedorDeIdioma>
      <Inicio />
    </ProveedorDeIdioma>
  );
}
