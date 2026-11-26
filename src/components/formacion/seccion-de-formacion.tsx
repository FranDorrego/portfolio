/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: seccion-de-formacion.tsx    Project: portfolio                     */
/*   Created: 2026/11/26 01:41:07  by vm                                      */
/*   Updated: 2026/11/26 01:41:07  by vm                                      */
/* ************************************************************************** */

/** Formacion: donde estudie y donde sigo estudiando. */

import { GraduationCap, MapPin } from 'lucide-react';
import { Seccion } from '@/components/layout/seccion';
import { FORMACION } from '@/data/formacion';
import { useIdioma } from '@/i18n';
import { cn } from '@/lib/class-names';

export function SeccionDeFormacion(): JSX.Element {
  const { t, leer } = useIdioma();
  return (
    <Seccion id="formacion" titulo={t.formacion.titulo} Icono={GraduationCap}>
      <p className="max-w-3xl text-lg text-muted-foreground">{t.formacion.bajada}</p>
      <ul className="mt-6 grid gap-4 md:grid-cols-2">
        {FORMACION.map((estudio) => (
          <li key={estudio.institucion} className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-semibold text-foreground">{estudio.institucion}</h3>
              {estudio.enCurso && (
                <span
                  className={cn(
                    'shrink-0 rounded-full border border-success/40 bg-success/10 px-2 py-0.5',
                    'text-xs text-success',
                  )}
                >
                  {t.formacion.enCurso}
                </span>
              )}
            </div>
            <p className="mt-1 text-foreground/90">{leer(estudio.titulo)}</p>
            <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin aria-hidden className="h-3.5 w-3.5" />
              {leer(estudio.lugar)}
            </p>
          </li>
        ))}
      </ul>
    </Seccion>
  );
}
