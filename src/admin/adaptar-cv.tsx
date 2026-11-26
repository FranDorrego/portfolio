/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: adaptar-cv.tsx    Project: portfolio                               */
/*   Created: 2026/11/26 21:09:49  by vm                                      */
/*   Updated: 2026/11/26 21:10:38  by vm                                      */
/* ************************************************************************** */

/**
 * Pegar una vacante y que el agente arme el CV y la carta para ella. El resultado queda guardado
 * como un CV nuevo y se puede registrar como candidatura con un clic.
 */

import { useState } from 'react';
import { Copy, FileDown, Send, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { api } from './api';
import { Aviso, Campo, SelectorDeIdioma } from './campos';
import { ENTRADA } from './formato';
import type { Borrador, Cv, Idioma } from './tipos';

export function AdaptarCv({
  cvs,
  alCrear,
  alPostularse,
}: {
  cvs: Cv[];
  alCrear: () => void;
  alPostularse: (borrador: Borrador) => void;
}): JSX.Element {
  const bases = cvs.filter((cv) => cv.tiene_contenido && cv.tipo !== 'generado');
  const [vacante, setVacante] = useState('');
  const [idioma, setIdioma] = useState<Idioma>('pt');
  const [baseId, setBaseId] = useState<number | null>(null);
  // El pedido al agente: o trabaja, o termino con un CV, o termino con un error.
  const [pedido, setPedido] = useState<{
    trabajando: boolean;
    resultado: Cv | null;
    aviso: string | null;
  }>({ trabajando: false, resultado: null, aviso: null });
  const { trabajando, resultado, aviso } = pedido;

  const adaptar = async (): Promise<void> => {
    setPedido({ trabajando: true, resultado: null, aviso: null });
    try {
      const hecho = await api.adaptar({ vacante, idioma, base_id: baseId });
      setPedido({ trabajando: false, resultado: hecho, aviso: null });
      alCrear();
    } catch (error) {
      setPedido({ trabajando: false, resultado: null, aviso: (error as Error).message });
    }
  };

  return (
    <section className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5">
      <h2 className="flex items-center gap-2 text-lg font-semibold">
        <Sparkles aria-hidden className="h-5 w-5 text-primary" />
        Adaptar a una vacante
      </h2>
      <Campo etiqueta="Texto de la vacante">
        <textarea
          className={`${ENTRADA} min-h-40`}
          placeholder="Pegá acá la descripción completa del puesto"
          value={vacante}
          onChange={(e) => setVacante(e.target.value)}
        />
      </Campo>
      <div className="grid gap-4 sm:grid-cols-2">
        <Campo etiqueta="Idioma del CV y la carta">
          <SelectorDeIdioma valor={idioma} alCambiar={setIdioma} />
        </Campo>
        <Campo etiqueta="A partir de">
          <select
            className={ENTRADA}
            value={baseId ?? ''}
            onChange={(e) => setBaseId(e.target.value ? Number(e.target.value) : null)}
          >
            <option value="">CV base para ATS</option>
            {bases.map((cv) => (
              <option key={cv.id} value={cv.id}>
                {cv.nombre}
              </option>
            ))}
          </select>
        </Campo>
      </div>
      <div className="flex items-center gap-3">
        <Button onClick={adaptar} disabled={trabajando || vacante.trim().length < 30}>
          <Sparkles aria-hidden />
          {trabajando ? 'Adaptando…' : 'Adaptar CV y escribir la carta'}
        </Button>
        {trabajando && (
          <span className="text-sm text-muted-foreground">Tarda entre 20 y 60 segundos.</span>
        )}
      </div>
      <Aviso texto={aviso} />

      {resultado && (
        <div className="flex flex-col gap-4 border-t border-border pt-4">
          <p className="font-medium">{resultado.nombre}</p>
          {resultado.notas && <p className="text-sm text-muted-foreground">{resultado.notas}</p>}
          {resultado.contenido && (
            <p className="rounded-md bg-secondary p-3 text-sm">{resultado.contenido.resumen}</p>
          )}
          <div className="flex flex-wrap gap-2">
            <Button asChild variant="outline">
              <a href={api.urlDelPdf(resultado.id)} target="_blank" rel="noreferrer">
                <FileDown aria-hidden />
                CV en PDF
              </a>
            </Button>
            <Button asChild variant="outline">
              <a href={api.urlDeLaCarta(resultado.id)} target="_blank" rel="noreferrer">
                <FileDown aria-hidden />
                Carta en PDF
              </a>
            </Button>
            <Button
              variant="outline"
              onClick={() => navigator.clipboard.writeText(resultado.carta ?? '')}
            >
              <Copy aria-hidden />
              Copiar la carta
            </Button>
            <Button
              onClick={() =>
                alPostularse({
                  empresa: resultado.empresa ?? '',
                  cargo: resultado.cargo ?? '',
                  descripcion: vacante,
                  cv_id: resultado.id,
                  enlace: '',
                  idioma,
                })
              }
            >
              <Send aria-hidden />
              Registrar candidatura
            </Button>
          </div>
          <details className="text-sm">
            <summary className="cursor-pointer text-muted-foreground">Ver la carta</summary>
            <p className="mt-2 whitespace-pre-wrap">{resultado.carta}</p>
          </details>
        </div>
      )}
    </section>
  );
}
