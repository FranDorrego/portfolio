/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: pie.tsx    Project: portfolio                                      */
/*   Created: 2026/11/25 22:17:56  by claude                                  */
/*   Updated: 2026/11/25 22:21:17  by claude                                  */
/* ************************************************************************** */

/** El pie de la pagina. */

import { useIdioma } from '@/i18n';
import { cn } from '@/lib/class-names';
import { CONTENEDOR_DE_PAGINA } from '@/lib/movimiento';

export function Pie(): JSX.Element {
  const { t } = useIdioma();
  return (
    <footer className="border-t border-border">
      <div
        className={cn(
          CONTENEDOR_DE_PAGINA,
          'flex flex-wrap justify-between gap-2 py-8 text-sm text-muted-foreground',
        )}
      >
        <p>{t.pie.firma}</p>
        <p className="font-mono text-xs">v{__VERSION__}</p>
      </div>
    </footer>
  );
}
