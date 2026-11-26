/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: campos.tsx    Project: portfolio                                   */
/*   Created: 2026/11/26 21:08:31  by vm                                      */
/*   Updated: 2026/11/26 21:10:29  by vm                                      */
/* ************************************************************************** */

/** Las piezas de formulario del panel: el mismo aspecto en todas las pestanas. */

import type { ReactNode } from 'react';
import { cn } from '@/lib/class-names';
import { ENTRADA } from './formato';
import { IDIOMAS, type Idioma } from './tipos';

export function Campo({
  etiqueta,
  children,
  className,
}: {
  etiqueta: string;
  children: ReactNode;
  className?: string;
}): JSX.Element {
  return (
    <label className={cn('flex flex-col gap-1.5 text-sm', className)}>
      <span className="font-medium text-muted-foreground">{etiqueta}</span>
      {children}
    </label>
  );
}

export function SelectorDeIdioma({
  valor,
  alCambiar,
}: {
  valor: Idioma;
  alCambiar: (idioma: Idioma) => void;
}): JSX.Element {
  return (
    <select
      className={ENTRADA}
      value={valor}
      onChange={(evento) => alCambiar(evento.target.value as Idioma)}
    >
      {Object.entries(IDIOMAS).map(([codigo, nombre]) => (
        <option key={codigo} value={codigo}>
          {nombre}
        </option>
      ))}
    </select>
  );
}

export function Aviso({ texto }: { texto: string | null }): JSX.Element | null {
  if (!texto) return null;
  return (
    <p role="alert" className="rounded-md border border-border bg-secondary px-3 py-2 text-sm">
      {texto}
    </p>
  );
}
