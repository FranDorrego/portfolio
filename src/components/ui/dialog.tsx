/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: dialog.tsx    Project: portfolio                                   */
/*   Created: 2026/11/25 22:18:47  by claude                                  */
/*   Updated: 2026/11/25 22:29:31  by vm                                      */
/* ************************************************************************** */

/**
 * La ventana: Radix resuelve el foco, Escape y el clic afuera; aca va el aspecto. En el celular
 * no llega a los bordes y el alto se resuelve desplazando adentro, no moviendo la pagina.
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
          'entrada-de-ventana fixed left-1/2 top-1/2 z-50 grid max-h-[calc(100dvh-2rem)]',
          'w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-6 overflow-y-auto',
          'rounded-xl border border-border bg-card p-4 shadow-flotante sm:p-6 [&>*]:min-w-0',
          className,
        )}
        {...props}
      >
        {children}
        <Primitiva.Close
          aria-label={textoDeCerrar}
          className={cn(
            'absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-md',
            'text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
          )}
        >
          <X aria-hidden className="h-4 w-4" />
        </Primitiva.Close>
      </Primitiva.Content>
    </Primitiva.Portal>
  ),
);
DialogContent.displayName = 'DialogContent';
