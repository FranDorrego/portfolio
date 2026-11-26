/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: entrada.tsx    Project: portfolio                                  */
/*   Created: 2026/11/26 01:43:49  by vm                                      */
/*   Updated: 2026/11/26 01:43:49  by vm                                      */
/* ************************************************************************** */

/**
 * Lo que se arma al compilar, en node: la pagina ya dibujada en cada idioma (para que la lean
 * los buscadores y los agentes sin ejecutar JavaScript, y para que se vea antes) y los textos
 * para agentes de IA (llms.txt). La compila `vite build --ssr` y la usa scripts/prerender.mjs.
 */

import { renderToString } from 'react-dom/server';
import { ProveedorDeIdioma } from '@/i18n';
import type { Idioma } from '@/i18n/idiomas';
import { Inicio } from '@/pages/inicio';

export { textoParaAgentes } from './texto-para-agentes';

/** El HTML de la pagina en un idioma, listo para ir adentro de `#root`. */
export function dibujarPagina(idioma: Idioma): string {
  return renderToString(
    <ProveedorDeIdioma inicial={idioma}>
      <Inicio />
    </ProveedorDeIdioma>,
  );
}
