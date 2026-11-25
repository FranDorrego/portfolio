/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: buscador-de-proyectos.tsx    Project: portfolio                    */
/*   Created: 2026/11/25 21:30:00  by claude                                  */
/*   Updated: 2026/11/25 21:30:00  by claude                                  */
/* ************************************************************************** */

/** El buscador de texto libre del catalogo. */

import { Search, X } from 'lucide-react';
import { useIdioma } from '@/i18n';
import { cn } from '@/lib/class-names';

interface Props {
  valor: string;
  alCambiar: (valor: string) => void;
}

export function BuscadorDeProyectos({ valor, alCambiar }: Props): JSX.Element {
  const { t } = useIdioma();
  return (
    <div role="search" className="relative">
      <Search
        aria-hidden
        className={cn(
          'pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2',
          'text-muted-foreground',
        )}
      />
      <input
        type="search"
        value={valor}
        onChange={(evento) => alCambiar(evento.target.value)}
        aria-label={t.proyectos.buscar}
        placeholder={t.proyectos.buscarEjemplo}
        autoComplete="off"
        className={cn(
          'h-11 w-full rounded-md border border-input bg-card pl-9 pr-10 text-base',
          'text-foreground placeholder:text-muted-foreground focus-visible:outline-none',
          'focus-visible:ring-2 focus-visible:ring-ring',
          '[&::-webkit-search-cancel-button]:hidden',
        )}
      />
      {valor !== '' && (
        <button
          type="button"
          onClick={() => alCambiar('')}
          aria-label={t.proyectos.borrarBusqueda}
          className={cn(
            'absolute right-2 top-1/2 inline-flex h-7 w-7 -translate-y-1/2 items-center',
            'justify-center rounded text-muted-foreground transition-colors',
            'hover:text-foreground focus-visible:outline-none focus-visible:ring-2',
            'focus-visible:ring-ring',
          )}
        >
          <X aria-hidden className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
