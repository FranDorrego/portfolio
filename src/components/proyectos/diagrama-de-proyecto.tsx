/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: diagrama-de-proyecto.tsx    Project: portfolio                     */
/*   Created: 2026/11/25 22:43:44  by vm                                      */
/*   Updated: 2026/11/25 22:43:44  by vm                                      */
/* ************************************************************************** */

/**
 * Como funciona un proyecto, en un dibujo: una cadena de pasos con su icono. Es la imagen de
 * los proyectos cuyo codigo y pantallas son privados: muestra que hace sin inventar una captura.
 */

import {
  BarChart3,
  Bot,
  ChevronRight,
  Cloud,
  Code,
  CreditCard,
  Database,
  FileSpreadsheet,
  FileText,
  Gamepad2,
  Globe,
  Mail,
  MessageCircle,
  Plug,
  Puzzle,
  Server,
  Smartphone,
  Terminal,
  User,
  Video,
  Workflow,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Fragment } from 'react';
import { useIdioma } from '@/i18n';
import { cn } from '@/lib/class-names';
import type { IconoDePaso, PasoDelDiagrama } from '@/types/proyecto';

const ICONOS: Record<IconoDePaso, LucideIcon> = {
  usuario: User,
  chat: MessageCircle,
  web: Globe,
  ia: Bot,
  flujo: Workflow,
  api: Server,
  datos: Database,
  nube: Cloud,
  externo: Plug,
  documento: FileText,
  planilla: FileSpreadsheet,
  codigo: Code,
  movil: Smartphone,
  correo: Mail,
  pago: CreditCard,
  consola: Terminal,
  video: Video,
  extension: Puzzle,
  grafico: BarChart3,
  juego: Gamepad2,
};

interface Props {
  pasos: PasoDelDiagrama[];
  /** En la tarjeta va mas chico y sin borde propio. */
  compacto?: boolean;
  className?: string;
}

export function DiagramaDeProyecto({ pasos, compacto = false, className }: Props): JSX.Element {
  const { leer } = useIdioma();
  const texto = (paso: PasoDelDiagrama): string =>
    typeof paso.label === 'string' ? paso.label : leer(paso.label);
  return (
    <ol
      aria-label={pasos.map(texto).join(' → ')}
      className={cn(
        'rejilla-tecnica flex w-full flex-wrap items-center justify-center bg-background',
        compacto ? 'aspect-[16/7] gap-x-1 gap-y-3 px-3 py-4' : 'gap-x-2 gap-y-4 px-4 py-8',
        className,
      )}
    >
      {pasos.map((paso, indice) => {
        const Icono = ICONOS[paso.icon];
        return (
          <Fragment key={`${paso.icon}-${texto(paso)}`}>
            {indice > 0 && (
              <li aria-hidden className="text-muted-foreground">
                <ChevronRight className={compacto ? 'h-4 w-4' : 'h-5 w-5'} />
              </li>
            )}
            <li
              aria-hidden
              className={cn(
                'flex flex-col items-center gap-1.5 text-center',
                compacto ? 'w-[4.5rem]' : 'w-24',
              )}
            >
              <span
                className={cn(
                  'flex items-center justify-center rounded-xl border border-border bg-card',
                  'text-primary',
                  compacto ? 'h-10 w-10' : 'h-14 w-14',
                )}
              >
                <Icono className={compacto ? 'h-5 w-5' : 'h-6 w-6'} />
              </span>
              <span
                className={cn(
                  'font-mono leading-tight text-foreground/90',
                  compacto ? 'text-[11px]' : 'text-xs',
                )}
              >
                {texto(paso)}
              </span>
            </li>
          </Fragment>
        );
      })}
    </ol>
  );
}
