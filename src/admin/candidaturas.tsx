/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: candidaturas.tsx    Project: portfolio                             */
/*   Created: 2026/11/26 21:09:19  by vm                                      */
/*   Updated: 2026/11/26 21:10:29  by vm                                      */
/* ************************************************************************** */

/**
 * La pestana de candidaturas: cuantas hay en cada estado, la lista (la ultima primero) y las
 * ventanas para crear una o abrirla.
 */

import { useState } from 'react';
import { Plus, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { cn } from '@/lib/class-names';
import { api } from './api';
import { fecha } from './formato';
import { DetalleDeCandidatura } from './detalle-de-candidatura';
import { FormularioDeCandidatura } from './formulario-de-candidatura';
import {
  BORRADOR_VACIO,
  ESTADOS,
  IDIOMAS,
  type Borrador,
  type Candidatura,
  type Cv,
  type Estado,
} from './tipos';

const COLOR: Record<Estado, string> = {
  sin_contacto: 'text-muted-foreground',
  contacto: 'text-primary',
  videollamada: 'text-primary',
  oferta: 'text-success',
  rechazada: 'text-muted-foreground line-through',
};

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
    <section className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center gap-2">
        <Button onClick={() => setBorrador(BORRADOR_VACIO)}>
          <Plus aria-hidden />
          Nueva candidatura
        </Button>
        <div className="flex flex-wrap gap-1.5 text-sm">
          {(Object.keys(ESTADOS) as Estado[]).map((estado) => {
            const cuantas = candidaturas.filter((una) => una.estado === estado).length;
            return (
              <button
                key={estado}
                type="button"
                onClick={() => setFiltro(filtro === estado ? null : estado)}
                aria-pressed={filtro === estado}
                className={cn(
                  'rounded-full border border-border px-3 py-1',
                  filtro === estado ? 'bg-secondary text-foreground' : 'text-muted-foreground',
                )}
              >
                {ESTADOS[estado]} <span className="font-mono text-xs">{cuantas}</span>
              </button>
            );
          })}
        </div>
      </div>

      {lista.length === 0 ? (
        <p className="rounded-xl border border-dashed border-border px-6 py-12 text-center text-muted-foreground">
          {candidaturas.length === 0 ? 'Todavía no hay candidaturas.' : 'Ninguna en este estado.'}
        </p>
      ) : (
        <ul className="divide-y divide-border rounded-xl border border-border bg-card">
          {lista.map((una) => (
            <li key={una.id}>
              <button
                type="button"
                onClick={async () => setAbierta(await api.candidatura(una.id))}
                className="grid w-full gap-1 px-4 py-3 text-left hover:bg-secondary sm:grid-cols-[1fr_auto] sm:items-center"
              >
                <span>
                  <span className="font-medium text-foreground">{una.empresa}</span>
                  <span className="text-muted-foreground"> · {una.cargo}</span>
                  <span className="block text-xs text-muted-foreground">
                    {fecha(una.creada)} · {IDIOMAS[una.idioma]}
                    {una.cv_nombre && ` · ${una.cv_nombre}`}
                  </span>
                </span>
                <span className={cn('flex items-center gap-2 text-sm', COLOR[una.estado])}>
                  {una.tiene_video && <Video aria-label="Con video" className="h-4 w-4" />}
                  {ESTADOS[una.estado]}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}

      <Dialog open={borrador !== null} onOpenChange={(abierto) => !abierto && setBorrador(null)}>
        <DialogContent textoDeCerrar="Cerrar" className="sm:max-w-2xl">
          <DialogTitle className="text-lg font-semibold">Nueva candidatura</DialogTitle>
          {borrador && (
            <FormularioDeCandidatura
              inicial={borrador}
              cvs={cvs}
              alCrear={(creada) => {
                setBorrador(null);
                alCambiar();
                setAbierta(creada);
              }}
            />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={abierta !== null} onOpenChange={(abierto) => !abierto && setAbierta(null)}>
        <DialogContent textoDeCerrar="Cerrar" className="sm:max-w-2xl">
          {abierta && (
            <>
              <DialogTitle className="text-lg font-semibold">
                {abierta.empresa} · {abierta.cargo}
              </DialogTitle>
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
