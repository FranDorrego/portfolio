/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: rehacer-cv.tsx    Project: portfolio                               */
/*   Created: 2026/11/27 10:40:44  by vm                                      */
/*   Updated: 2026/11/27 10:40:53  by vm                                      */
/* ************************************************************************** */

/**
 * Rehacer un CV adaptado y su carta con una indicacion («mas corto», «destaca Docker», «la carta
 * mas formal»). El agente parte de la version actual y queda en el mismo CV.
 */

import { useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { api } from './api';
import { Aviso, Campo } from './campos';
import { ENTRADA } from './formato';
import type { Cv } from './tipos';

const EJEMPLOS = [
  'Hacelo más corto',
  'Destacá más Docker y Linux',
  'La carta más formal',
  'Sacá el proyecto de e-commerce',
];

export function RehacerCv({ cv, alRehacer }: { cv: Cv; alRehacer: (cv: Cv) => void }): JSX.Element {
  const [abierta, setAbierta] = useState(false);
  const [indicacion, setIndicacion] = useState('');
  // El pedido: o trabaja, o termino con un aviso (error o lo que cambio el agente).
  const [pedido, setPedido] = useState<{ trabajando: boolean; aviso: string | null }>({
    trabajando: false,
    aviso: null,
  });

  const rehacer = async (): Promise<void> => {
    setPedido({ trabajando: true, aviso: null });
    try {
      const nuevo = await api.rehacer(cv.id, indicacion);
      setPedido({ trabajando: false, aviso: null });
      setIndicacion('');
      setAbierta(false);
      alRehacer(nuevo);
    } catch (error) {
      setPedido({ trabajando: false, aviso: (error as Error).message });
    }
  };

  return (
    <>
      <Button size="sm" variant="outline" onClick={() => setAbierta(true)}>
        <RefreshCw aria-hidden />
        Rehacer
      </Button>
      <Dialog open={abierta} onOpenChange={(valor) => !pedido.trabajando && setAbierta(valor)}>
        <DialogContent textoDeCerrar="Cerrar" className="sm:max-w-xl">
          <DialogTitle className="text-xl font-semibold">Rehacer CV y carta</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            {cv.nombre}. El agente parte de la versión actual, aplica tu indicación y no inventa
            nada.
          </DialogDescription>
          <Campo etiqueta="Indicación">
            <textarea
              className={`${ENTRADA} min-h-28`}
              value={indicacion}
              onChange={(e) => setIndicacion(e.target.value)}
              placeholder="Qué cambiar"
            />
          </Campo>
          <div className="flex flex-wrap gap-1.5">
            {EJEMPLOS.map((ejemplo) => (
              <button
                key={ejemplo}
                type="button"
                onClick={() => setIndicacion(ejemplo)}
                className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground hover:text-foreground"
              >
                {ejemplo}
              </button>
            ))}
          </div>
          <Aviso texto={pedido.aviso} />
          <div className="flex items-center gap-3">
            <Button onClick={rehacer} disabled={pedido.trabajando || indicacion.trim().length < 3}>
              <RefreshCw aria-hidden className={pedido.trabajando ? 'animate-spin' : undefined} />
              {pedido.trabajando ? 'Rehaciendo…' : 'Rehacer'}
            </Button>
            {pedido.trabajando && (
              <span className="text-sm text-muted-foreground">Tarda entre 20 y 60 segundos.</span>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
