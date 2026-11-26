/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: actividad-de-github.tsx    Project: portfolio                      */
/*   Created: 2026/11/25 22:27:55  by claude                                  */
/*   Updated: 2026/11/26 01:39:52  by vm                                      */
/* ************************************************************************** */

/**
 * La actividad de GitHub, como se ve en el perfil: «N contribuciones en el ultimo anio», el mapa
 * y a la derecha los anios para elegir. Debajo, commits, pull requests, merges y repositorios
 * del mismo periodo, y una nota sobre como se trabaja con IA. No sabe de donde salen los datos:
 * recibe un proveedor y dibuja cargando, datos, vacio o error.
 */

import { useState } from 'react';
import { Bot, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { PERFIL } from '@/data/perfil';
import { useActividadDeGithub } from '@/hooks/use-actividad-de-github';
import { useIdioma } from '@/i18n';
import { cn } from '@/lib/class-names';
import { SOLAPA_PULSABLE } from '@/lib/movimiento';
import type {
  ActividadDeGithub as Actividad,
  PeriodoDeGithub,
  ProveedorDeActividad,
} from '@/types/github';
import { totalDeContribuciones } from '@/utils/mapa-de-contribuciones';
import { numeroConFormato, rellenar } from '@/utils/texto';
import { MapaDeContribuciones } from './mapa-de-contribuciones';

function Cifra({ etiqueta, valor }: { etiqueta: string; valor: number | null }): JSX.Element {
  const { idioma } = useIdioma();
  return (
    <div className="rounded-md border border-border px-3 py-2.5">
      <dd className="text-2xl font-semibold tabular-nums text-foreground">
        {valor === null ? '—' : numeroConFormato(valor, idioma)}
      </dd>
      <dt className="text-sm text-muted-foreground">{etiqueta}</dt>
    </div>
  );
}

function Esqueleto(): JSX.Element {
  const { t } = useIdioma();
  return (
    <div role="status" aria-label={t.github.cargando}>
      <Skeleton className="h-5 w-64 rounded" />
      <Skeleton className="mt-3 aspect-[53/8.6] w-full rounded-md" />
      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {[0, 1, 2, 3].map((n) => (
          <Skeleton key={n} className="h-[4.25rem] rounded-md" />
        ))}
      </div>
    </div>
  );
}

function EnlaceAlPerfil(): JSX.Element {
  const { t } = useIdioma();
  return (
    <a
      href={PERFIL.github}
      target="_blank"
      rel="noreferrer"
      className={cn(
        'rounded text-primary hover:underline focus-visible:outline-none',
        'focus-visible:ring-2 focus-visible:ring-ring',
      )}
    >
      {t.github.verPerfil} ↗
    </a>
  );
}

interface PropsDeAnios {
  periodos: PeriodoDeGithub[];
  elegido: string;
  alElegir: (clave: string) => void;
}

/** Los anios para elegir, como la columna de la derecha del perfil de GitHub. */
function Anios({ periodos, elegido, alElegir }: PropsDeAnios): JSX.Element {
  const { t } = useIdioma();
  return (
    <div
      role="group"
      aria-label={t.github.anios}
      className="flex gap-1.5 overflow-x-auto pb-1 sm:flex-col sm:overflow-visible sm:pb-0"
    >
      {periodos.map((periodo) => {
        const actual = periodo.clave === elegido;
        return (
          <button
            key={periodo.clave}
            type="button"
            aria-pressed={actual}
            onClick={() => alElegir(periodo.clave)}
            className={cn(
              'shrink-0 rounded-md px-3 py-1.5 text-left text-xs sm:w-24',
              SOLAPA_PULSABLE,
              actual
                ? 'bg-action text-action-foreground'
                : 'text-muted-foreground hover:bg-secondary hover:text-foreground',
            )}
          >
            {periodo.clave === 'ultimo' ? t.github.ultimoAnio : periodo.clave}
          </button>
        );
      })}
    </div>
  );
}

function Datos({ actividad }: { actividad: Actividad }): JSX.Element {
  const { t, idioma } = useIdioma();
  const [clave, setClave] = useState(actividad.periodos[0]?.clave ?? 'ultimo');
  const periodo = actividad.periodos.find((uno) => uno.clave === clave) ?? actividad.periodos[0];
  if (!periodo) return <></>;
  const total = periodo.total ?? totalDeContribuciones(periodo.contributions);
  const titulo = clave === 'ultimo' ? t.github.enElAnio : t.github.enUnAnio;
  return (
    <>
      <h3 className="text-base font-normal text-foreground">
        {rellenar(titulo, { total: numeroConFormato(total, idioma), anio: clave })}
      </h3>
      <div className="mt-2 flex flex-col-reverse gap-2 sm:flex-row">
        <div className="min-w-0 flex-1">
          {periodo.contributions.length > 0 ? (
            <MapaDeContribuciones dias={periodo.contributions} pie={<EnlaceAlPerfil />} />
          ) : (
            <p
              className={cn(
                'rounded-md border border-dashed border-border px-3 py-6 text-center text-sm',
                'text-muted-foreground',
              )}
            >
              {t.github.sinMapa}
            </p>
          )}
        </div>
        {actividad.periodos.length > 1 && (
          <Anios periodos={actividad.periodos} elegido={clave} alElegir={setClave} />
        )}
      </div>
      <dl className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
        <Cifra etiqueta={t.github.commits} valor={periodo.commits} />
        <Cifra etiqueta={t.github.pullRequests} valor={periodo.pullRequests} />
        <Cifra etiqueta={t.github.merges} valor={periodo.merges} />
        <Cifra etiqueta={t.github.repos} valor={periodo.repos} />
      </dl>
      {actividad.includesPrivate === false && (
        <p className="mt-1.5 text-xs text-muted-foreground">{t.github.soloPublicos}</p>
      )}
      <p className="mt-3 flex items-start gap-2 text-sm text-muted-foreground">
        <Bot aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
        {t.github.conIa}
      </p>
    </>
  );
}

export function ActividadDeGithub({
  proveedor,
}: {
  proveedor?: ProveedorDeActividad;
}): JSX.Element {
  const { t } = useIdioma();
  const { resultado, reintentar } = useActividadDeGithub(proveedor);
  return (
    <aside aria-label={t.github.titulo} className="min-w-0">
      {resultado.estado === 'cargando' && <Esqueleto />}
      {resultado.estado === 'listo' && <Datos actividad={resultado.actividad} />}
      {resultado.estado === 'vacio' && (
        <p className="py-10 text-center text-sm text-muted-foreground">{t.github.vacio}</p>
      )}
      {resultado.estado === 'error' && (
        <div
          role="alert"
          className="flex flex-col items-center gap-3 rounded-md border border-border py-8 text-center"
        >
          <p className="text-sm text-muted-foreground">{t.github.error}</p>
          <Button variant="outline" size="sm" onClick={reintentar}>
            <RefreshCw aria-hidden />
            {t.github.reintentar}
          </Button>
        </div>
      )}
    </aside>
  );
}
