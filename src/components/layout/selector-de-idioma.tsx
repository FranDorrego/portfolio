/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: selector-de-idioma.tsx    Project: portfolio                       */
/*   Created: 2026/11/25 21:30:00  by claude                                  */
/*   Updated: 2026/11/25 21:30:00  by claude                                  */
/* ************************************************************************** */

/** El selector ES / PT: dos botones, uno marcado. Cambia todos los textos de la pagina. */

import { useIdioma } from '@/i18n';
import { IDIOMAS } from '@/i18n/idiomas';
import { cn } from '@/lib/class-names';
import { SOLAPA_PULSABLE } from '@/lib/movimiento';

export function SelectorDeIdioma(): JSX.Element {
  const { idioma, cambiarIdioma, t } = useIdioma();
  return (
    <div
      role="group"
      aria-label={t.barra.idioma}
      className="inline-flex rounded-md border border-border bg-card p-0.5"
    >
      {IDIOMAS.map((opcion) => {
        const elegido = opcion === idioma;
        return (
          <button
            key={opcion}
            type="button"
            lang={opcion}
            aria-pressed={elegido}
            aria-label={t.barra.idiomas[opcion]}
            onClick={() => cambiarIdioma(opcion)}
            className={cn(
              'min-w-9 rounded px-2 py-1 font-mono text-xs font-medium uppercase',
              SOLAPA_PULSABLE,
              elegido
                ? 'bg-secondary text-foreground'
                : 'text-muted-foreground hover:text-foreground',
            )}
          >
            {opcion}
          </button>
        );
      })}
    </div>
  );
}
