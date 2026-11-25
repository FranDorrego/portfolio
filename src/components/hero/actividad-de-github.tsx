/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: actividad-de-github.tsx    Project: portfolio                      */
/*   Created: 2026/11/25 22:27:55  by claude                                  */
/*   Updated: 2026/11/25 23:23:36  by vm                                      */
/* ************************************************************************** */

/**
 * La actividad de GitHub del ultimo anio, como se ve en el perfil: «N contribuciones en el
 * ultimo anio», el mapa, y abajo los commits, pull requests y merges del mismo periodo. No sabe
 * de donde salen los datos: recibe un proveedor y dibuja cargando, datos, vacio o error.
 */

import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { PERFIL } from '@/data/perfil';
import { useActividadDeGithub } from '@/hooks/use-actividad-de-github';
import { useIdioma } from '@/i18n';
import { cn } from '@/lib/class-names';
import type { ActividadDeGithub as Actividad, ProveedorDeActividad } from '@/types/github';
import { totalDeContribuciones } from '@/utils/mapa-de-contribuciones';
import { numeroConFormato, rellenar } from '@/utils/texto';
import { MapaDeContribuciones } from './mapa-de-contribuciones';

function Cifra({ etiqueta, valor }: { etiqueta: string; valor: number }): JSX.Element {
  const { idioma } = useIdioma();
  return (
    <div className="rounded-md border border-border px-3 py-2.5">
      <dd className="text-2xl font-semibold tabular-nums text-foreground">
        {numeroConFormato(valor, idioma)}
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
      <div className="mt-3 grid grid-cols-3 gap-2">
        {[0, 1, 2].map((n) => (
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

function Datos({ actividad }: { actividad: Actividad }): JSX.Element {
  const { t, idioma } = useIdioma();
  const total = actividad.total ?? totalDeContribuciones(actividad.contributions);
  // Commits, PRs y merges solo se muestran si incluyen lo privado: sin eso quedan muy por
  // debajo de lo real (el total de contribuciones si lo incluye).
  const completo =
    actividad.includesPrivate === true &&
    actividad.commits !== null &&
    actividad.pullRequests !== null &&
    actividad.merges !== null;
  return (
    <>
      <h3 className="text-base font-normal text-foreground">
        {rellenar(t.github.enElAnio, { total: numeroConFormato(total, idioma) })}
      </h3>
      <div className="mt-2">
        {actividad.contributions.length > 0 ? (
          <MapaDeContribuciones dias={actividad.contributions} pie={<EnlaceAlPerfil />} />
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
      {completo && (
        <dl className="mt-3 grid grid-cols-3 gap-2">
          <Cifra etiqueta={t.github.commits} valor={actividad.commits ?? 0} />
          <Cifra etiqueta={t.github.pullRequests} valor={actividad.pullRequests ?? 0} />
          <Cifra etiqueta={t.github.merges} valor={actividad.merges ?? 0} />
        </dl>
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
