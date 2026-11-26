/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: selector-de-idioma.tsx    Project: portfolio                       */
/*   Created: 2026/11/25 22:27:55  by claude                                  */
/*   Updated: 2026/11/26 02:15:33  by vm                                      */
/* ************************************************************************** */

/**
 * El selector ES / PT. Cambia todos los textos de la pagina. Discreto: dos siglas en texto, la
 * elegida resaltada, sin caja alrededor.
 */

import { Fragment } from 'react';
import { useIdioma } from '@/i18n';
import { IDIOMAS } from '@/i18n/idiomas';
import { cn } from '@/lib/class-names';

export function SelectorDeIdioma(): JSX.Element {
  const { idioma, cambiarIdioma, t } = useIdioma();
  return (
    <div role="group" aria-label={t.barra.idioma} className="flex items-center font-mono text-xs">
      {IDIOMAS.map((opcion, indice) => {
        const elegido = opcion === idioma;
        return (
          <Fragment key={opcion}>
            {indice > 0 && (
              <span aria-hidden className="text-muted-foreground/50">
                /
              </span>
            )}
            <button
              type="button"
              lang={opcion}
              aria-pressed={elegido}
              aria-label={t.barra.idiomas[opcion]}
              onClick={() => cambiarIdioma(opcion)}
              className={cn(
                'rounded px-1.5 py-1 uppercase transition-colors duration-150',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                elegido ? 'text-foreground' : 'text-muted-foreground/70 hover:text-foreground',
              )}
            >
              {opcion}
            </button>
          </Fragment>
        );
      })}
    </div>
  );
}
