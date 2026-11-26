/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: seccion.tsx    Project: portfolio                                  */
/*   Created: 2026/11/25 22:17:56  by claude                                  */
/*   Updated: 2026/11/26 02:15:26  by vm                                      */
/* ************************************************************************** */

/** El marco de una seccion: ancla, icono y titulo. Se ve desde el principio: nada aparece despues. */

import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/class-names';
import { CONTENEDOR_DE_PAGINA } from '@/lib/movimiento';

interface Props {
  id: string;
  titulo: string;
  Icono: LucideIcon;
  /** Un dato corto al lado del titulo (por ejemplo, los anios de experiencia). */
  junto?: string;
  children: ReactNode;
}

export function Seccion({ id, titulo, Icono, junto, children }: Props): JSX.Element {
  return (
    <section id={id} aria-labelledby={`${id}-titulo`} className="border-t border-border">
      <div className={cn(CONTENEDOR_DE_PAGINA, 'py-12 sm:py-16')}>
        <h2
          id={`${id}-titulo`}
          className="flex items-center gap-3 text-3xl font-semibold tracking-tight text-foreground"
        >
          <span
            aria-hidden
            className={cn(
              'flex h-10 w-10 items-center justify-center rounded-lg border border-border',
              'bg-card text-primary',
            )}
          >
            <Icono className="h-5 w-5" />
          </span>
          {titulo}
          {junto && (
            <span
              className={cn(
                'rounded-full border border-primary/40 bg-primary/10 px-3 py-0.5 font-mono',
                'text-base font-medium text-primary',
              )}
            >
              {junto}
            </span>
          )}
        </h2>
        <div className="mt-6">{children}</div>
      </div>
    </section>
  );
}
