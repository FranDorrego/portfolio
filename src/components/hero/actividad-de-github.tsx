/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: actividad-de-github.tsx    Project: portfolio                      */
/*   Created: 2026/11/25 21:30:00  by claude                                  */
/*   Updated: 2026/11/25 22:29:31  by vm                                      */
/* ************************************************************************** */

/**
 * La tarjeta de actividad de GitHub, con aspecto de consola. No sabe de donde salen los datos:
 * recibe un proveedor (por defecto el archivo del sitio) y dibuja cargando, datos, vacio o error.
 */

import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { PERFIL } from '@/data/perfil';
import { useActividadDeGithub } from '@/hooks/use-actividad-de-github';
import { useIdioma } from '@/i18n';
import { USUARIO_DE_GITHUB } from '@/services/github.service';
import type { ActividadDeGithub as Actividad, ProveedorDeActividad } from '@/types/github';
import { fechaLarga, numeroConFormato, rellenar } from '@/utils/texto';
import { MapaDeContribuciones } from './mapa-de-contribuciones';
import { cn } from '@/lib/class-names';

function Cifra({ etiqueta, valor }: { etiqueta: string; valor: number | null }): JSX.Element {
  const { t, idioma } = useIdioma();
  return (
    <div className="rounded-md border border-border bg-background px-3 py-2.5">
      <dt className="font-mono text-xs text-muted-foreground">{etiqueta}</dt>
      <dd className="mt-1 text-xl font-semibold tabular-nums text-foreground">
        {valor === null ? (
          <span className="text-sm font-normal text-muted-foreground">{t.comun.noDisponible}</span>
        ) : (
          numeroConFormato(valor, idioma)
        )}
      </dd>
    </div>
  );
}

function Esqueleto(): JSX.Element {
  const { t } = useIdioma();
  return (
    <div role="status" aria-label={t.github.cargando}>
      <div className="grid grid-cols-3 gap-2">
        {[0, 1, 2].map((n) => (
          <Skeleton key={n} className="h-[4.25rem] rounded-md" />
        ))}
      </div>
      <Skeleton className="mt-4 aspect-[53/7.4] w-full rounded-md" />
      <Skeleton className="mt-3 h-4 w-2/3 rounded" />
    </div>
  );
}

function Datos({ actividad }: { actividad: Actividad }): JSX.Element {
  const { t, idioma } = useIdioma();
  return (
    <>
      <dl className="grid grid-cols-3 gap-2">
        <Cifra etiqueta={t.github.commits} valor={actividad.commits} />
        <Cifra etiqueta={t.github.pullRequests} valor={actividad.pullRequests} />
        <Cifra etiqueta={t.github.merges} valor={actividad.merges} />
      </dl>
      <div className="mt-4">
        {actividad.contributions.length > 0 ? (
          <MapaDeContribuciones dias={actividad.contributions} />
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
      {actividad.updatedAt && (
        <p className="mt-3 font-mono text-xs text-muted-foreground">
          {rellenar(t.github.actualizado, {
            fecha: fechaLarga(actividad.updatedAt.slice(0, 10), idioma),
          })}
          {actividad.includesPrivate === false && ` · ${t.github.soloPublico}`}
        </p>
      )}
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
    <aside
      aria-labelledby="github-titulo"
      className="rounded-xl border border-border bg-card shadow-flotante"
    >
      <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
        <span aria-hidden className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-input" />
          <span className="h-2.5 w-2.5 rounded-full bg-input" />
          <span className="h-2.5 w-2.5 rounded-full bg-success" />
        </span>
        <h2 id="github-titulo" className="font-mono text-xs text-muted-foreground">
          <span className="sr-only">{t.github.titulo}: </span>
          <span aria-hidden>~/github/</span>
          {USUARIO_DE_GITHUB}
        </h2>
        <a
          href={PERFIL.github}
          target="_blank"
          rel="noreferrer"
          aria-label={t.github.verPerfil}
          className={cn(
            'ml-auto whitespace-nowrap rounded font-mono text-xs text-primary',
            'underline-offset-4 hover:underline focus-visible:outline-none',
            'focus-visible:ring-2 focus-visible:ring-ring',
          )}
        >
          <span className="hidden sm:inline">{t.github.verPerfil}</span>
          <span className="sm:hidden">GitHub</span> ↗
        </a>
      </div>
      <div className="p-4 sm:p-5">
        {resultado.estado === 'cargando' && <Esqueleto />}
        {resultado.estado === 'listo' && <Datos actividad={resultado.actividad} />}
        {resultado.estado === 'vacio' && (
          <p className="py-10 text-center text-sm text-muted-foreground">{t.github.vacio}</p>
        )}
        {resultado.estado === 'error' && (
          <div role="alert" className="flex flex-col items-center gap-3 py-8 text-center">
            <p className="text-sm text-muted-foreground">{t.github.error}</p>
            <Button variant="outline" size="sm" onClick={reintentar}>
              <RefreshCw aria-hidden />
              {t.github.reintentar}
            </Button>
          </div>
        )}
      </div>
    </aside>
  );
}
