/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: marco.tsx    Project: portfolio                                    */
/*   Created: 2026/11/26 21:35:58  by vm                                      */
/*   Updated: 2026/11/27 15:00:47  by vm                                      */
/* ************************************************************************** */

/**
 * El marco del panel, con el estilo del sitio: la rejilla tecnica del inicio de fondo, la barra
 * de arriba con la foto, los titulos con su icono en un cuadro y las insignias de estado.
 */

import type { ReactNode } from 'react';
import { Sparkles, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/class-names';
import { CONTENEDOR_DE_PAGINA } from '@/lib/movimiento';
import { PERFIL } from '@/data/perfil';
import { ESTADOS, type Estado } from './tipos';

/** La rejilla del inicio del sitio, que se desvanece hacia abajo. */
export function Fondo({ children }: { children: ReactNode }): JSX.Element {
  return (
    <div className="relative min-h-svh">
      <div
        aria-hidden
        className={cn(
          'rejilla-tecnica pointer-events-none absolute inset-x-0 top-0 h-[28rem]',
          '[mask-image:linear-gradient(to_bottom,black,transparent)]',
        )}
      />
      <div className="relative">{children}</div>
    </div>
  );
}

export function Foto({ className }: { className?: string }): JSX.Element {
  return (
    <img
      src={`/${PERFIL.foto}`}
      alt={PERFIL.nombre}
      width={400}
      height={400}
      className={cn('shrink-0 rounded-full border border-border object-cover', className)}
    />
  );
}

export function Contenedor({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}): JSX.Element {
  return <div className={cn(CONTENEDOR_DE_PAGINA, className)}>{children}</div>;
}

/** El titulo de una pestana, como los de las secciones del sitio. */
export function Titulo({
  Icono,
  titulo,
  bajada,
  junto,
}: {
  Icono: LucideIcon;
  titulo: string;
  bajada?: string;
  junto?: ReactNode;
}): JSX.Element {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h2 className="flex items-center gap-3 text-2xl font-semibold tracking-tight sm:text-3xl">
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
        </h2>
        {bajada && <p className="mt-2 max-w-2xl text-muted-foreground">{bajada}</p>}
      </div>
      {junto}
    </div>
  );
}

/** Un rotulo chico en mayusculas, como los del sitio. */
export function Rotulo({ children }: { children: ReactNode }): JSX.Element {
  return (
    <h3 className="font-mono text-xs uppercase tracking-wider text-muted-foreground">{children}</h3>
  );
}

const TONO: Record<Estado, string> = {
  sin_contacto: 'border-border text-muted-foreground',
  contacto: 'border-primary/40 bg-primary/10 text-primary',
  videollamada: 'border-primary/40 bg-primary/10 text-primary',
  oferta: 'border-success/40 bg-success/10 text-success',
  rechazada: 'border-border text-muted-foreground line-through',
};

const PUNTO: Record<Estado, string> = {
  sin_contacto: 'bg-muted-foreground/60',
  contacto: 'bg-primary',
  videollamada: 'bg-primary',
  oferta: 'bg-success',
  rechazada: 'bg-muted-foreground/40',
};

export function Insignia({ estado }: { estado: Estado }): JSX.Element {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-0.5',
        'text-xs font-medium',
        TONO[estado],
      )}
    >
      <span aria-hidden className={cn('h-1.5 w-1.5 rounded-full', PUNTO[estado])} />
      {ESTADOS[estado]}
    </span>
  );
}

export function PuntoDeEstado({ estado }: { estado: Estado }): JSX.Element {
  return <span aria-hidden className={cn('block h-2 w-2 shrink-0 rounded-full', PUNTO[estado])} />;
}

/** La etiqueta de una candidatura que una IA encontro, preparo y envio sola. */
export function EtiquetaDeIa(): JSX.Element {
  return (
    <span
      title="La encontró, preparó y envió una IA sola, sin intervención"
      className={cn(
        'inline-flex items-center gap-1 whitespace-nowrap rounded-full border px-2.5 py-0.5',
        'border-primary/40 bg-primary/10 text-xs font-medium text-primary',
      )}
    >
      <Sparkles aria-hidden className="h-3 w-3" />
      Con IA
    </span>
  );
}
