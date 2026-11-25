/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: barra.tsx    Project: portfolio                                    */
/*   Created: 2026/11/25 21:30:00  by claude                                  */
/*   Updated: 2026/11/25 23:19:33  by vm                                      */
/* ************************************************************************** */

/** La barra de arriba: quien soy, donde estoy, si estoy disponible, idioma y accesos rapidos. */

import { MapPin } from 'lucide-react';
import { IDS_DE_SECCIONES, SECCIONES } from '@/data/navegacion';
import { useSeccionActiva } from '@/hooks/use-seccion-activa';
import { useIdioma } from '@/i18n';
import { cn } from '@/lib/class-names';
import { CONTENEDOR_DE_PAGINA } from '@/lib/movimiento';
import { FotoDePerfil } from '@/components/hero/foto-de-perfil';
import { SelectorDeIdioma } from './selector-de-idioma';
import { SelectorDeTema } from './selector-de-tema';

const ENLACE =
  'whitespace-nowrap rounded-md px-2 py-1.5 text-sm transition-colors duration-150 ' +
  'focus-visible:outline-none ' +
  'focus-visible:ring-2 focus-visible:ring-ring';

function Navegacion({ className }: { className?: string }): JSX.Element {
  const { t } = useIdioma();
  const activa = useSeccionActiva(IDS_DE_SECCIONES);
  return (
    <nav aria-label={t.barra.navegacion} className={className}>
      <ul className="flex w-full items-center justify-between gap-1 md:w-auto md:justify-start">
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

export function Barra(): JSX.Element {
  const { t } = useIdioma();
  return (
    <header
      className={cn(
        'sticky top-0 z-40 border-b border-border bg-background',
        'lg:bg-background/95 lg:backdrop-blur',
      )}
    >
      <div className={cn(CONTENEDOR_DE_PAGINA, 'flex h-14 items-center gap-3')}>
        <FotoDePerfil className="h-8 w-8" />
        <div className="flex min-w-0 flex-col leading-tight sm:flex-row sm:items-center sm:gap-3">
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin aria-hidden className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{t.barra.ubicacion}</span>
          </span>
          <span className="flex items-center gap-1.5 text-xs text-foreground">
            <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-success" />
            <span className="truncate">{t.barra.estado}</span>
          </span>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Navegacion className="hidden md:block" />
          <SelectorDeIdioma />
          <SelectorDeTema />
        </div>
      </div>
      <div className="border-t border-border md:hidden">
        <Navegacion className={cn(CONTENEDOR_DE_PAGINA, 'flex h-11 items-center')} />
      </div>
    </header>
  );
}
