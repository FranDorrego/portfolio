/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: use-etiqueta-de-categoria.ts    Project: portfolio                 */
/*   Created: 2026/11/25 21:30:00  by claude                                  */
/*   Updated: 2026/11/25 21:30:00  by claude                                  */
/* ************************************************************************** */

/** La categoria de un proyecto tal como se lee en la tarjeta y en el detalle. */

import { useIdioma } from '@/i18n';
import type { Proyecto } from '@/types/proyecto';

/** «Cliente · México», «Sistemas · 42 Porto»: la categoria con su matiz. */
export function useEtiquetaDeCategoria(): (proyecto: Proyecto) => string {
  const { t, leer } = useIdioma();
  return (proyecto) =>
    [
      t.proyectos.categoriaCorta[proyecto.category],
      proyecto.categoryNote ? leer(proyecto.categoryNote) : null,
      proyecto.country ? leer(proyecto.country) : null,
    ]
      .filter(Boolean)
      .join(' · ');
}
