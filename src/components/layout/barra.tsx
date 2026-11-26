/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: barra.tsx    Project: portfolio                                    */
/*   Created: 2026/11/25 21:30:00  by claude                                  */
/*   Updated: 2026/11/26 13:33:22  by vm                                      */
/* ************************************************************************** */

/** La barra de arriba: quien soy, donde estoy, idioma y accesos rapidos. */

import { MapPin } from 'lucide-react';
import { IDS_DE_SECCIONES, SECCIONES } from '@/data/navegacion';
import { useHaBajado } from '@/hooks/use-ha-bajado';
import { useSeccionActiva } from '@/hooks/use-seccion-activa';
import { useIdioma } from '@/i18n';
import { cn } from '@/lib/class-names';
import { CONTENEDOR_DE_PAGINA } from '@/lib/movimiento';
import { FotoDePerfil } from '@/components/hero/foto-de-perfil';
import { SelectorDeIdioma } from './selector-de-idioma';

const ENLACE =
  'whitespace-nowrap rounded-md px-2 py-1.5 text-sm transition-colors duration-150 ' +
  'focus-visible:outline-none ' +
  'focus-visible:ring-2 focus-visible:ring-ring';

function Navegacion({ className }: { className?: string }): JSX.Element {
  const { t } = useIdioma();
  const activa = useSeccionActiva(IDS_DE_SECCIONES);
  return (
    <nav aria-label={t.barra.navegacion} className={className}>
      <ul className="flex w-full items-center gap-1 lg:w-auto">
        {SECCIONES.map((seccion) => {
          const actual = activa === seccion.id;
          return (
            <li key={seccion.id}>
              <a
                href={`#${seccion.id}`}
                aria-current={actual ? 'location' : undefined}
                className={cn(
                  ENLACE,
                  actual
                    ? 'bg-secondary text-foreground'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {t.nav[seccion.texto]}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/** Donde estoy. En el celular va en el inicio, no en la barra. */
export function Ubicacion({ className }: { className?: string }): JSX.Element {
  const { t } = useIdioma();
  return (
    <span className={cn('flex items-center gap-1 text-xs text-muted-foreground', className)}>
      <MapPin aria-hidden className="h-3.5 w-3.5 shrink-0" />
      <span className="truncate">{t.barra.ubicacion}</span>
    </span>
  );
}

/**
 * La barra de arriba. En escritorio esta siempre. En el celular el inicio ya muestra quien soy,
 * asi que la barra aparece recien al bajar, en una sola fila: la foto y las secciones.
 */
export function Barra(): JSX.Element {
  const bajo = useHaBajado(80);
  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40 border-b border-border bg-background',
        'transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]',
        'lg:sticky lg:translate-y-0 lg:bg-background/95 lg:backdrop-blur',
        bajo ? 'translate-y-0' : '-translate-y-full',
      )}
    >
      <div className={cn(CONTENEDOR_DE_PAGINA, 'hidden h-14 items-center gap-3 lg:flex')}>
        <FotoDePerfil className="h-8 w-8" />
        <Ubicacion />
        <div className="ml-auto flex items-center gap-2">
          <Navegacion />
          <SelectorDeIdioma />
        </div>
      </div>
      <div className={cn(CONTENEDOR_DE_PAGINA, 'flex h-12 items-center gap-2 lg:hidden')}>
        <FotoDePerfil className="h-7 w-7" />
        <Navegacion className="sin-barra min-w-0 flex-1 overflow-x-auto" />
      </div>
    </header>
  );
}
