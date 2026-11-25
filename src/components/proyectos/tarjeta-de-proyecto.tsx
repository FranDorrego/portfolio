/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: tarjeta-de-proyecto.tsx    Project: portfolio                      */
/*   Created: 2026/11/25 22:17:56  by claude                                  */
/*   Updated: 2026/11/25 22:20:35  by claude                                  */
/* ************************************************************************** */

/** La tarjeta de un proyecto: lo justo para decidir si se abre el detalle. */

import { useIdioma } from '@/i18n';
import { cn } from '@/lib/class-names';
import { TARJETA_PULSABLE } from '@/lib/movimiento';
import type { Proyecto } from '@/types/proyecto';
import { rellenar } from '@/utils/texto';
import { EstadoDeProyecto } from './estado-de-proyecto';
import { PortadaDeProyecto } from './portada-de-proyecto';
import { useEtiquetaDeCategoria } from './use-etiqueta-de-categoria';

interface Props {
  proyecto: Proyecto;
  alAbrir: (proyecto: Proyecto) => void;
}

export function TarjetaDeProyecto({ proyecto, alAbrir }: Props): JSX.Element {
  const { t, leer } = useIdioma();
  const categoria = useEtiquetaDeCategoria();
  return (
    <article
      className={cn(
        'relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card',
        TARJETA_PULSABLE,
        'focus-within:ring-2 focus-within:ring-ring',
      )}
    >
      <PortadaDeProyecto proyecto={proyecto} className="border-b border-border" />
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-3">
          <p className="font-mono text-xs text-primary">{categoria(proyecto)}</p>
          <EstadoDeProyecto estado={proyecto.status} />
        </div>
        <h3 className="mt-2 text-xl font-semibold tracking-tight text-foreground">
          <button
            type="button"
            onClick={() => alAbrir(proyecto)}
            aria-label={rellenar(t.proyectos.verDetalle, { titulo: proyecto.title })}
            className="text-left after:absolute after:inset-0 focus-visible:outline-none"
          >
            {proyecto.title}
          </button>
        </h3>
        <p className="mt-2 line-clamp-2 text-[0.95rem] leading-relaxed text-muted-foreground">
          {leer(proyecto.shortDescription)}
        </p>
        {proyecto.cardTags.length > 0 && (
          <ul className="mt-auto flex flex-wrap gap-1.5 pt-4">
            {proyecto.cardTags.map((etiqueta) => (
              <li
                key={etiqueta}
                className={cn(
                  'rounded border border-border bg-background px-2 py-0.5 font-mono text-xs',
                  'text-foreground/80',
                )}
              >
                {etiqueta}
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}
