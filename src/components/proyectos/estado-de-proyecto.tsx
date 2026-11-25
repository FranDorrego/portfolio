/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: estado-de-proyecto.tsx    Project: portfolio                       */
/*   Created: 2026/11/25 21:30:00  by claude                                  */
/*   Updated: 2026/11/25 21:30:00  by claude                                  */
/* ************************************************************************** */

/** El indicador de estado. Solo se dibuja cuando el estado esta confirmado. */

import { useIdioma } from '@/i18n';
import { cn } from '@/lib/class-names';
import type { EstadoDeProyecto as Estado } from '@/types/proyecto';

const PUNTO: Record<Estado, string> = {
  activo: 'bg-primary',
  'en-desarrollo': 'bg-amber-400',
  mantenimiento: 'bg-sky-400',
  finalizado: 'bg-muted-foreground',
};

export function EstadoDeProyecto({ estado }: { estado?: Estado }): JSX.Element | null {
  const { t } = useIdioma();
  if (!estado) return null;
  return (
    <span className="inline-flex shrink-0 items-center gap-1.5 font-mono text-xs text-muted-foreground">
      <span aria-hidden className={cn('h-1.5 w-1.5 rounded-full', PUNTO[estado])} />
      {t.proyectos.estado[estado]}
    </span>
  );
}
