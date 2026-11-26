/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: accordion.tsx    Project: portfolio                                */
/*   Created: 2026/11/25 22:18:47  by claude                                  */
/*   Updated: 2026/11/26 02:17:55  by vm                                      */
/* ************************************************************************** */

/** El acordeon de las preguntas: Radix pone el teclado y los roles; aca va el aspecto. */

import * as React from 'react';
// estandar: ignore JS-012 - asi expone Radix sus piezas
import * as Primitiva from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/class-names';
import { ENTRADA_DE_VISTA, GIRO } from '@/lib/movimiento';

export const Accordion = Primitiva.Root;

export const AccordionItem = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof Primitiva.Item>
>(({ className, ...props }, ref) => (
  <Primitiva.Item ref={ref} className={cn('border-b border-border', className)} {...props} />
));
AccordionItem.displayName = 'AccordionItem';

export const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof Primitiva.Trigger>
>(({ className, children, ...props }, ref) => (
  <Primitiva.Header className="flex">
    <Primitiva.Trigger
      ref={ref}
      className={cn(
        'flex flex-1 items-center justify-between gap-4 rounded py-5 text-left font-medium',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        '[&[data-state=open]>svg]:rotate-180',
        className,
      )}
      {...props}
    >
      {children}
      <ChevronDown aria-hidden className={cn('h-4 w-4 shrink-0 text-muted-foreground', GIRO)} />
    </Primitiva.Trigger>
  </Primitiva.Header>
));
AccordionTrigger.displayName = 'AccordionTrigger';

export const AccordionContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof Primitiva.Content>
>(({ className, children, ...props }, ref) => (
  // Siempre en la pagina (oculta si esta cerrada): asi la leen los buscadores y los agentes.
  <Primitiva.Content
    ref={ref}
    forceMount
    className={cn(ENTRADA_DE_VISTA, 'data-[state=closed]:hidden')}
    {...props}
  >
    <div className={cn('pb-6', className)}>{children}</div>
  </Primitiva.Content>
));
AccordionContent.displayName = 'AccordionContent';
