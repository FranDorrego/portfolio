/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: portada-de-proyecto.tsx    Project: portfolio                      */
/*   Created: 2026/11/25 21:30:00  by claude                                  */
/*   Updated: 2026/11/25 22:43:44  by vm                                      */
/* ************************************************************************** */

/**
 * La imagen de un proyecto. Si hay una captura real, se muestra (con carga diferida). Si no, un
 * marcador que se nota que es un marcador: rejilla, logotipo real si existe y el cartel «captura
 * pendiente». Nunca una imagen inventada que parezca el producto.
 */

import { ImageOff } from 'lucide-react';
import { recurso } from '@/lib/raiz';
import { useIdioma } from '@/i18n';
import { DiagramaDeProyecto } from './diagrama-de-proyecto';
import { cn } from '@/lib/class-names';
import type { Proyecto } from '@/types/proyecto';
import { rellenar } from '@/utils/texto';

interface Props {
  proyecto: Proyecto;
  className?: string;
}

export function PortadaDeProyecto({ proyecto, className }: Props): JSX.Element {
  const { t, leer } = useIdioma();
  const captura = proyecto.screenshots[0];
  if (captura) {
    return (
      <img
        src={recurso(captura.src)}
        alt={leer(captura.alt)}
        loading="lazy"
        decoding="async"
        className={cn('aspect-[16/7] w-full bg-background object-cover object-top', className)}
      />
    );
  }
  if (proyecto.diagram) {
    return <DiagramaDeProyecto pasos={proyecto.diagram} compacto className={className} />;
  }
  return (
    <div
      role="img"
      aria-label={rellenar(t.proyectos.capturaPendienteAlt, { titulo: proyecto.title })}
      className={cn(
        'rejilla-tecnica relative flex aspect-[16/6] w-full items-center justify-center bg-background',
        className,
      )}
    >
      {proyecto.logo ? (
        <img
          src={recurso(proyecto.logo)}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-14 w-14 rounded-lg border border-border bg-card object-contain p-1.5"
        />
      ) : (
        <span aria-hidden className="font-mono text-3xl font-semibold text-input">
          {proyecto.title.slice(0, 2).toUpperCase()}
        </span>
      )}
      <span
        aria-hidden
        className={cn(
          'absolute bottom-2 right-2 flex items-center gap-1 rounded border border-dashed',
          'border-input bg-background/90 px-1.5 py-0.5 font-mono text-[11px]',
          'text-muted-foreground',
        )}
      >
        <ImageOff className="h-3 w-3" />
        {t.proyectos.capturaPendiente}
      </span>
    </div>
  );
}
