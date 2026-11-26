/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: seccion-de-formacion.tsx    Project: portfolio                     */
/*   Created: 2026/11/26 01:46:23  by claude                                  */
/*   Updated: 2026/11/26 22:20:11  by vm                                      */
/* ************************************************************************** */

/** Formacion: cada institucion con su logo y un enlace a su sitio. */

import { ArrowUpRight, GraduationCap } from 'lucide-react';
import { Seccion } from '@/components/layout/seccion';
import { FORMACION } from '@/data/formacion';
import { useIdioma } from '@/i18n';
import { cn } from '@/lib/class-names';
import { TARJETA_PULSABLE } from '@/lib/movimiento';
import { recurso } from '@/lib/raiz';
import { mesCorto } from '@/utils/texto';

export function SeccionDeFormacion(): JSX.Element {
  const { t, leer, idioma } = useIdioma();
  return (
    <Seccion id="formacion" titulo={t.formacion.titulo} Icono={GraduationCap}>
      <ul className="grid gap-3 sm:grid-cols-2">
        {FORMACION.map((estudio) => (
          <li key={estudio.institucion}>
            <a
              href={estudio.sitio}
              target="_blank"
              rel="noreferrer"
              className={cn(
                'flex h-full items-center gap-4 rounded-xl border border-border bg-card p-4',
                TARJETA_PULSABLE,
              )}
            >
              <img
                src={recurso(estudio.logo)}
                alt={`${estudio.institucion} logo`}
                width={64}
                height={64}
                loading="lazy"
                decoding="async"
                className="h-16 w-16 shrink-0 rounded-lg border border-border object-contain"
              />
              <span className="min-w-0 flex-1">
                <span className="flex items-start justify-between gap-2">
                  <span className="font-semibold leading-snug text-foreground">
                    {estudio.institucion}
                  </span>
                  <ArrowUpRight aria-hidden className="h-4 w-4 shrink-0 text-muted-foreground" />
                </span>
                <span className="mt-0.5 block text-sm text-foreground/90">
                  {leer(estudio.titulo)}
                </span>
                <span className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                  {leer(estudio.lugar)}
                  {estudio.desde && (
                    <span className="font-mono">
                      {mesCorto(estudio.desde, idioma)} –{' '}
                      {estudio.hasta ? mesCorto(estudio.hasta, idioma) : t.formacion.hoy}
                    </span>
                  )}
                  {estudio.enCurso && (
                    <span className="rounded-full border border-success/40 bg-success/10 px-2 py-0.5 text-success">
                      {t.formacion.enCurso}
                    </span>
                  )}
                </span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </Seccion>
  );
}
