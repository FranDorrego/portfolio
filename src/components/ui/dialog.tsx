/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: dialog.tsx    Project: portfolio                                   */
/*   Created: 2026/11/25 22:18:47  by claude                                  */
/*   Updated: 2026/11/26 01:48:20  by vm                                      */
/* ************************************************************************** */

/**
 * La ventana: Radix resuelve el foco, Escape y el clic afuera; aca va el aspecto. En el celular
 * ocupa toda la pantalla; en pantallas grandes es una tarjeta centrada. El alto se resuelve
 * desplazando adentro, no moviendo la pagina.
 */

import * as React from 'react';
// estandar: ignore JS-012 - asi expone Radix sus piezas
import * as Primitiva from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { cn } from '@/lib/class-names';

export const Dialog = Primitiva.Root;
export const DialogTitle = Primitiva.Title;
export const DialogDescription = Primitiva.Description;

interface Props extends React.ComponentPropsWithoutRef<typeof Primitiva.Content> {
  /** El nombre accesible de la X, en el idioma de la pagina. */
  textoDeCerrar: string;
}

export const DialogContent = React.forwardRef<HTMLDivElement, Props>(
  ({ className, children, textoDeCerrar, ...props }, ref) => (
    <Primitiva.Portal>
      <Primitiva.Overlay className="entrada-de-vista fixed inset-0 z-50 bg-black/[var(--velo)]" />
      <Primitiva.Content
        ref={ref}
        className={cn(
          'entrada-de-ventana fixed inset-0 z-50 grid content-start gap-6 overflow-y-auto',
          'overscroll-contain bg-card p-4 [&>*]:min-w-0',
          'sm:inset-auto sm:left-1/2 sm:top-1/2 sm:max-h-[calc(100dvh-2rem)] sm:w-[calc(100%-2rem)]',
          'sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-xl sm:border sm:border-border',
          'sm:p-6 sm:shadow-flotante',
          className,
        )}
        {...props}
      >
        {/* La X queda a la vista aunque el contenido se desplace: una fila sin alto, pegada arriba. */}
        <div className="pointer-events-none sticky top-0 z-20 order-first -mb-6 flex h-0 justify-end">
          <Primitiva.Close
            aria-label={textoDeCerrar}
            className={cn(
              'pointer-events-auto -mr-1 -mt-1 inline-flex h-9 w-9 items-center justify-center',
              'rounded-full border border-border bg-card/90 text-muted-foreground shadow-flotante',
              'transition-colors hover:bg-secondary hover:text-foreground',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
            )}
          >
            <X aria-hidden className="h-4 w-4" />
          </Primitiva.Close>
        </div>
        {children}
      </Primitiva.Content>
    </Primitiva.Portal>
  ),
);
DialogContent.displayName = 'DialogContent';
