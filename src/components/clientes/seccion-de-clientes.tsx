/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: seccion-de-clientes.tsx    Project: portfolio                      */
/*   Created: 2026/11/26 13:38:39  by claude                                  */
/*   Updated: 2026/11/26 13:44:47  by vm                                      */
/* ************************************************************************** */

/**
 * Clientes y empresas con las que trabaje, en un acordeon cerrado: a la vista queda el promedio de
 * Workana; al abrirlo, las opiniones escritas como citas y despues el resto de los trabajos
 * calificados en una lista corta.
 */

import { ArrowUpRight, MessageSquareQuote, Star } from 'lucide-react';
import { useAbrirProyecto } from '@/components/proyectos/use-abrir-proyecto';
import { Seccion } from '@/components/layout/seccion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { TESTIMONIOS, calificados, promedio, type Testimonio } from '@/data/testimonios';
import { useIdioma } from '@/i18n';
import { cn } from '@/lib/class-names';
import { mesCorto, rellenar } from '@/utils/texto';

function Estrellas({ valor }: { valor: number }): JSX.Element {
  const { t } = useIdioma();
  return (
    <span
      role="img"
      aria-label={rellenar(t.clientes.estrellas, { valor })}
      className="flex items-center gap-0.5"
    >
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          aria-hidden
          className={cn(
            'h-3.5 w-3.5',
            n <= valor ? 'fill-warning text-warning' : 'text-muted-foreground/40',
          )}
        />
      ))}
    </span>
  );
}

const ENLACE =
  'rounded underline-offset-4 hover:underline focus-visible:outline-none ' +
  'focus-visible:ring-2 focus-visible:ring-ring';

function Encabezado({ uno }: { uno: Testimonio }): JSX.Element {
  const { idioma } = useIdioma();
  const nombre = 'font-semibold text-foreground';
  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
      {uno.enlaceDelCliente ? (
        <a
          href={uno.enlaceDelCliente}
          target="_blank"
          rel="noreferrer"
          className={cn(ENLACE, nombre)}
        >
          {uno.cliente}
        </a>
      ) : (
        <span className={nombre}>{uno.cliente}</span>
      )}
      {uno.calificacion !== undefined && <Estrellas valor={uno.calificacion} />}
      {uno.fecha && (
        <span className="font-mono text-xs text-muted-foreground">
          {mesCorto(uno.fecha, idioma)}
        </span>
      )}
    </div>
  );
}

function Trabajo({ uno }: { uno: Testimonio }): JSX.Element {
  const { t } = useIdioma();
  const abrir = useAbrirProyecto();
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
      {uno.enlaceDelTrabajo ? (
        <a
          href={uno.enlaceDelTrabajo}
          target="_blank"
          rel="noreferrer"
          className={cn(ENLACE, 'text-muted-foreground')}
        >
          {uno.trabajo}
          <ArrowUpRight aria-hidden className="ml-1 inline h-3.5 w-3.5 align-[-0.15em]" />
        </a>
      ) : (
        <span className="text-muted-foreground">{uno.trabajo}</span>
      )}
      {uno.proyecto && (
        <button
          type="button"
          onClick={() => abrir(uno.proyecto as string)}
          className={cn(ENLACE, 'text-primary')}
        >
          {t.clientes.verProyecto}
        </button>
      )}
    </div>
  );
}

function Opiniones(): JSX.Element {
  const { t } = useIdioma();
  const conOpinion = TESTIMONIOS.filter((uno) => uno.comentario);
  const sinOpinion = TESTIMONIOS.filter((uno) => !uno.comentario);
  return (
    <>
      <ul className="grid gap-4 md:grid-cols-2">
        {conOpinion.map((uno) => (
          <li
            key={uno.enlaceDelTrabajo ?? uno.cliente}
            className="flex flex-col gap-3 rounded-xl border border-border bg-card p-5"
          >
            <Encabezado uno={uno} />
            <blockquote lang="es" className="text-[1.05rem] leading-relaxed text-foreground/90">
              “{uno.comentario}”
            </blockquote>
            <div className="mt-auto">
              <Trabajo uno={uno} />
            </div>
          </li>
        ))}
      </ul>
      <h3 className="mt-8 font-mono text-xs uppercase tracking-wider text-muted-foreground">
        {t.clientes.otros}
      </h3>
      <ul className="mt-2 divide-y divide-border border-y border-border">
        {sinOpinion.map((uno) => (
          <li key={uno.enlaceDelTrabajo ?? uno.cliente} className="space-y-1 py-3">
            <Encabezado uno={uno} />
            <Trabajo uno={uno} />
          </li>
        ))}
      </ul>
    </>
  );
}

export function SeccionDeClientes(): JSX.Element {
  const { t, idioma } = useIdioma();
  const valor = promedio(TESTIMONIOS);
  const conOpinion = TESTIMONIOS.filter((uno) => uno.comentario).length;
  return (
    <Seccion id="clientes" titulo={t.clientes.titulo} Icono={MessageSquareQuote}>
      <Accordion type="single" collapsible className="border-y border-border">
        <AccordionItem value="clientes" className="border-b-0">
          <AccordionTrigger className="text-base">
            <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <Estrellas valor={Math.round(valor)} />
              <span className="font-semibold text-foreground">
                {valor.toLocaleString(idioma === 'pt' ? 'pt-PT' : 'es')}
              </span>
              <span className="text-muted-foreground">
                {rellenar(t.clientes.resumen, { cantidad: calificados(TESTIMONIOS).length })}
                {' · '}
                {rellenar(t.clientes.opiniones, { cantidad: conOpinion })}
              </span>
            </span>
          </AccordionTrigger>
          <AccordionContent className="pb-6">
            <Opiniones />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Seccion>
  );
}
