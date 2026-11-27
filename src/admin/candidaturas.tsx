/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: candidaturas.tsx    Project: portfolio                             */
/*   Created: 2026/11/26 21:09:19  by vm                                      */
/*   Updated: 2026/11/27 15:26:17  by vm                                      */
/* ************************************************************************** */

/**
 * La pestana de candidaturas: cuantas hay en cada estado (tocar una cifra filtra), la lista (la
 * ultima primero) y las ventanas para crear una o abrirla.
 */

import { useState } from 'react';
import { Building2, Inbox, Plus, Send, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { cn } from '@/lib/class-names';
import { TARJETA_PULSABLE } from '@/lib/movimiento';
import { api } from './api';
import { fecha } from './formato';
import { DetalleDeCandidatura } from './detalle-de-candidatura';
import { FormularioDeCandidatura } from './formulario-de-candidatura';
import { EtiquetaDeIa, EtiquetaDeMcp, Insignia, PuntoDeEstado, Titulo } from './marco';
import {
  BORRADOR_VACIO,
  ESTADOS,
  IDIOMAS,
  type Borrador,
  type Candidatura,
  type Cv,
  type Estado,
} from './tipos';

/** Una cifra de arriba: cuantas hay en un estado. Tocarla filtra la lista. */
function Cifra({
  texto,
  cuantas,
  estado,
  activa,
  alElegir,
}: {
  texto: string;
  cuantas: number;
  estado?: Estado;
  activa: boolean;
  alElegir: () => void;
}): JSX.Element {
  return (
    <button
      type="button"
      onClick={alElegir}
      aria-pressed={activa}
      className={cn(
        'flex flex-col items-start gap-1 rounded-xl border bg-card px-4 py-3 text-left',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        TARJETA_PULSABLE,
        activa ? 'border-primary/60' : 'border-border',
      )}
    >
      <span className="text-2xl font-semibold tabular-nums text-foreground">{cuantas}</span>
      <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
        {estado && <PuntoDeEstado estado={estado} />}
        {texto}
      </span>
    </button>
  );
}

export function Candidaturas({
  candidaturas,
  cvs,
  borrador,
  setBorrador,
  alCambiar,
}: {
  candidaturas: Candidatura[];
  cvs: Cv[];
  borrador: Borrador | null;
  setBorrador: (borrador: Borrador | null) => void;
  alCambiar: () => void;
}): JSX.Element {
  const [abierta, setAbierta] = useState<Candidatura | null>(null);
  const [filtro, setFiltro] = useState<Estado | null>(null);
  const lista = filtro ? candidaturas.filter((una) => una.estado === filtro) : candidaturas;

  return (
    <section className="flex flex-col gap-8">
      <Titulo
        Icono={Send}
        titulo="Candidaturas"
        bajada="A dónde me postulé, con qué CV y cómo va cada una."
        junto={
          <Button onClick={() => setBorrador(BORRADOR_VACIO)}>
            <Plus aria-hidden />
            Nueva candidatura
          </Button>
        }
      />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <Cifra
          texto="Todas"
          cuantas={candidaturas.length}
          activa={filtro === null}
          alElegir={() => setFiltro(null)}
        />
        {(Object.keys(ESTADOS) as Estado[]).map((estado) => (
          <Cifra
            key={estado}
            texto={ESTADOS[estado]}
            estado={estado}
            cuantas={candidaturas.filter((una) => una.estado === estado).length}
            activa={filtro === estado}
            alElegir={() => setFiltro(filtro === estado ? null : estado)}
          />
        ))}
      </div>

      {lista.length === 0 ? (
        <div
          className={cn(
            'flex flex-col items-center rounded-xl border border-dashed border-border px-6 py-14',
            'text-center',
          )}
        >
          <Inbox aria-hidden className="h-8 w-8 text-muted-foreground" />
          <p className="mt-3 text-muted-foreground">
            {candidaturas.length === 0 ? 'Todavía no hay candidaturas.' : 'Ninguna en este estado.'}
          </p>
        </div>
      ) : (
        <ul className="grid gap-3">
          {lista.map((una) => (
            <li key={una.id}>
              <button
                type="button"
                onClick={async () => setAbierta(await api.candidatura(una.id))}
                className={cn(
                  'grid w-full gap-3 rounded-xl border border-border bg-card px-5 py-4 text-left',
                  'sm:grid-cols-[1fr_auto] sm:items-center',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                  TARJETA_PULSABLE,
                )}
              >
                <span className="min-w-0">
                  <span className="flex items-center gap-2">
                    <Building2 aria-hidden className="h-4 w-4 shrink-0 text-primary" />
                    <span className="truncate font-semibold text-foreground">{una.empresa}</span>
                  </span>
                  <span className="mt-0.5 block text-muted-foreground">{una.cargo}</span>
                  <span className="mt-2 flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs text-muted-foreground">
                    <span>{fecha(una.creada)}</span>
                    <span>{IDIOMAS[una.idioma]}</span>
                    {una.cv_nombre && <span>CV: {una.cv_nombre}</span>}
                  </span>
                </span>
                <span className="flex items-center gap-2">
                  {una.tiene_video && (
                    <Video aria-label="Con video" className="h-4 w-4 text-muted-foreground" />
                  )}
                  {una.origen === 'mcp' && <EtiquetaDeMcp />}
                  {una.con_ia && <EtiquetaDeIa />}
                  <Insignia estado={una.estado} />
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}

      <Dialog open={borrador !== null} onOpenChange={(abierto) => !abierto && setBorrador(null)}>
        <DialogContent textoDeCerrar="Cerrar" className="sm:max-w-2xl">
          <DialogTitle className="text-xl font-semibold">Nueva candidatura</DialogTitle>
          {borrador && (
            <FormularioDeCandidatura
              inicial={borrador}
              cvs={cvs}
              alCrear={() => {
                // Guardada, vuelve a la lista: la nueva aparece primera.
                setBorrador(null);
                setFiltro(null);
                alCambiar();
              }}
            />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={abierta !== null} onOpenChange={(abierto) => !abierto && setAbierta(null)}>
        <DialogContent textoDeCerrar="Cerrar" className="sm:max-w-2xl">
          {abierta && (
            <>
              <div className="flex flex-wrap items-center gap-3 pr-10">
                <DialogTitle className="text-xl font-semibold">
                  {abierta.empresa}
                  <span className="font-normal text-muted-foreground"> · {abierta.cargo}</span>
                </DialogTitle>
                {abierta.origen === 'mcp' && <EtiquetaDeMcp />}
                {abierta.con_ia && <EtiquetaDeIa />}
                <Insignia estado={abierta.estado} />
              </div>
              <DetalleDeCandidatura
                key={abierta.id}
                candidatura={abierta}
                alCambiar={(cambiada) => {
                  setAbierta(cambiada);
                  alCambiar();
                }}
                alBorrar={() => {
                  setAbierta(null);
                  alCambiar();
                }}
              />
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
