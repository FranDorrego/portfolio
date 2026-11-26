/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: ventana-de-proyecto.tsx    Project: portfolio                      */
/*   Created: 2026/11/25 21:30:00  by claude                                  */
/*   Updated: 2026/11/26 01:48:20  by vm                                      */
/* ************************************************************************** */

/**
 * El detalle de un proyecto en una ventana amplia. Se cierra con Escape, con un clic afuera y con
 * la X (lo resuelve Radix).
 * Si el codigo es privado se explica la arquitectura y no hay boton de repositorio.
 */

import type { ReactNode } from 'react';
import { ExternalLink, Github, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { useIdioma } from '@/i18n';
import type { Texto } from '@/i18n/idiomas';
import type { Proyecto } from '@/types/proyecto';
import { mesCorto } from '@/utils/texto';
import { EstadoDeProyecto } from './estado-de-proyecto';
import { useEtiquetaDeCategoria } from './use-etiqueta-de-categoria';
import { DiagramaDeProyecto } from './diagrama-de-proyecto';
import { GaleriaDeProyecto } from './galeria-de-proyecto';

function Bloque({ titulo, children }: { titulo: string; children: ReactNode }): JSX.Element {
  return (
    <section>
      <h3 className="font-mono text-xs uppercase tracking-wider text-primary">{titulo}</h3>
      <div className="mt-2 text-[0.95rem] leading-relaxed text-foreground/90">{children}</div>
    </section>
  );
}

function Lista({ renglones }: { renglones: Texto[] }): JSX.Element {
  const { leer } = useIdioma();
  return (
    <ul className="space-y-2">
      {renglones.map((renglon) => (
        <li key={renglon.es} className="flex gap-2">
          <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
          <span>{leer(renglon)}</span>
        </li>
      ))}
    </ul>
  );
}

function Etiquetas({ valores }: { valores: string[] }): JSX.Element {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {valores.map((valor) => (
        <li
          key={valor}
          className="rounded border border-border bg-background px-2 py-0.5 font-mono text-xs"
        >
          {valor}
        </li>
      ))}
    </ul>
  );
}

function Periodo({ proyecto }: { proyecto: Proyecto }): JSX.Element | null {
  const { t, idioma } = useIdioma();
  if (!proyecto.startDate) return null;
  const hasta = proyecto.endDate
    ? mesCorto(proyecto.endDate, idioma)
    : proyecto.status === 'activo' || proyecto.status === 'en-desarrollo'
      ? t.detalle.actualidad
      : null;
  const desde = mesCorto(proyecto.startDate, idioma);
  return (
    <span className="font-mono text-xs text-muted-foreground">
      {hasta && hasta !== desde ? `${desde} – ${hasta}` : desde}
    </span>
  );
}

/** El repositorio y el sitio, si existen; si el codigo es privado, se dice. */
function Enlaces({ proyecto }: { proyecto: Proyecto }): JSX.Element {
  const { t } = useIdioma();
  return (
    <div className="flex flex-wrap items-center gap-3">
      {proyecto.repositoryUrl && (
        <Button asChild variant="outline">
          <a href={proyecto.repositoryUrl} target="_blank" rel="noreferrer">
            <Github aria-hidden />
            {t.detalle.verRepositorio}
          </a>
        </Button>
      )}
      {proyecto.demoUrl && (
        <Button asChild variant="outline">
          <a href={proyecto.demoUrl} target="_blank" rel="noreferrer">
            <ExternalLink aria-hidden />
            {t.detalle.verSitio}
          </a>
        </Button>
      )}
      {proyecto.visibility === 'privado' && (
        <p className="flex items-center gap-2 text-sm text-muted-foreground">
          <Lock aria-hidden className="h-4 w-4 shrink-0" />
          {t.detalle.codigoPrivado}
        </p>
      )}
    </div>
  );
}

interface Props {
  proyecto: Proyecto | null;
  alCerrar: () => void;
  /** Al terminar de cerrarse: el foco vuelve a lo que la abrio. */
  alDevolverFoco: () => void;
}

export function VentanaDeProyecto({ proyecto, alCerrar, alDevolverFoco }: Props): JSX.Element {
  const { t, leer } = useIdioma();
  const categoria = useEtiquetaDeCategoria();
  return (
    <Dialog open={proyecto !== null} onOpenChange={(abierta) => !abierta && alCerrar()}>
      {proyecto && (
        <DialogContent
          className="max-w-4xl"
          textoDeCerrar={t.comun.cerrar}
          onCloseAutoFocus={(evento) => {
            evento.preventDefault();
            alDevolverFoco();
          }}
        >
          <header className="space-y-2 pr-10">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              <span className="font-mono text-xs text-primary">{categoria(proyecto)}</span>
              <EstadoDeProyecto estado={proyecto.status} />
              <Periodo proyecto={proyecto} />
            </div>
            <DialogTitle className="text-2xl font-semibold tracking-tight sm:text-3xl">
              {proyecto.title}
            </DialogTitle>
            <DialogDescription className="text-base leading-relaxed text-muted-foreground">
              {leer(proyecto.shortDescription)}
            </DialogDescription>
          </header>

          {proyecto.screenshots.length > 0 ? (
            <GaleriaDeProyecto key={proyecto.id} proyecto={proyecto} />
          ) : (
            proyecto.diagram && (
              <DiagramaDeProyecto
                pasos={proyecto.diagram}
                className="rounded-lg border border-border"
              />
            )
          )}

          <div className="space-y-3">
            <p className="font-medium text-foreground">{leer(proyecto.role)}</p>
            {proyecto.technologies.length > 0 && <Etiquetas valores={proyecto.technologies} />}
            <Enlaces proyecto={proyecto} />
          </div>

          <p className="text-[0.95rem] leading-relaxed text-foreground/90">
            {leer(proyecto.fullDescription)}
          </p>

          {proyecto.screenshots.length > 0 && proyecto.diagram && (
            <DiagramaDeProyecto
              pasos={proyecto.diagram}
              className="rounded-lg border border-border"
            />
          )}

          <div className="grid gap-6 md:grid-cols-2">
            {proyecto.problem && (
              <Bloque titulo={t.detalle.problema}>{leer(proyecto.problem)}</Bloque>
            )}
            {proyecto.solution && (
              <Bloque titulo={t.detalle.solucion}>{leer(proyecto.solution)}</Bloque>
            )}
          </div>

          {proyecto.responsibilities && (
            <Bloque titulo={t.detalle.responsabilidad}>
              <Lista renglones={proyecto.responsibilities} />
            </Bloque>
          )}

          {proyecto.architecture && (
            <Bloque titulo={t.detalle.arquitectura}>
              <Lista renglones={proyecto.architecture} />
            </Bloque>
          )}

          {proyecto.metrics && (
            <Bloque titulo={t.detalle.resultados}>
              <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {proyecto.metrics.map((metrica) => (
                  <div
                    key={metrica.label.es}
                    className="rounded-lg border border-border bg-background p-3"
                  >
                    <dd className="text-xl font-semibold tabular-nums text-foreground">
                      {metrica.value}
                    </dd>
                    <dt className="text-sm text-foreground/90">{leer(metrica.label)}</dt>
                    <p className="mt-1.5 text-xs text-muted-foreground">
                      {t.detalle.fuente}: {leer(metrica.source)}
                    </p>
                  </div>
                ))}
              </dl>
            </Bloque>
          )}

          {proyecto.highlights && (
            <Bloque titulo={t.detalle.decisiones}>
              <Lista renglones={proyecto.highlights} />
            </Bloque>
          )}
        </DialogContent>
      )}
    </Dialog>
  );
}
