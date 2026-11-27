/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: lo-enviado.tsx    Project: portfolio                               */
/*   Created: 2026/11/27 17:38:24  by vm                                      */
/*   Updated: 2026/11/27 17:38:26  by vm                                      */
/* ************************************************************************** */

/**
 * Lo que se envio en una candidatura, tal como quedo al registrarla: el CV y la carta en PDF
 * (aunque despues el CV se haya rehecho o borrado), el resumen y la carta en texto.
 */

import { Eye, FileDown, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { api } from './api';
import { fecha } from './formato';
import { Rotulo } from './marco';
import type { Candidatura } from './tipos';

export function LoEnviado({ candidatura }: { candidatura: Candidatura }): JSX.Element {
  const enviado = candidatura.enviado;
  const { id } = candidatura;
  const cvDelSitio = !candidatura.tiene_cv_enviado && enviado?.cv_url;
  const nada = !candidatura.tiene_cv_enviado && !cvDelSitio && !candidatura.tiene_carta_enviada;
  return (
    <section className="flex flex-col gap-3 rounded-lg border border-border bg-background/50 p-4">
      <Rotulo>Lo que se envió</Rotulo>
      {enviado && (
        <p className="text-sm text-muted-foreground">
          {fecha(enviado.fecha)}
          {enviado.cv_nombre ? ` · CV: ${enviado.cv_nombre}` : ' · Sin CV'}
        </p>
      )}
      {nada ? (
        <p className="text-sm text-muted-foreground">
          No se guardó ningún PDF con esta candidatura.
        </p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {candidatura.tiene_cv_enviado && (
            <>
              <Button asChild size="sm">
                <a href={api.descargaDeLoEnviado(id, 'cv')}>
                  <FileDown aria-hidden />
                  CV enviado
                </a>
              </Button>
              <Button asChild size="sm" variant="outline">
                <a href={api.urlDeLoEnviado(id, 'cv')} target="_blank" rel="noreferrer">
                  <Eye aria-hidden />
                  Ver
                </a>
              </Button>
            </>
          )}
          {cvDelSitio && (
            <Button asChild size="sm">
              <a href={enviado?.cv_url ?? ''} target="_blank" rel="noreferrer">
                <FileDown aria-hidden />
                CV enviado (del sitio)
              </a>
            </Button>
          )}
          {candidatura.tiene_carta_enviada && (
            <Button asChild size="sm" variant="outline">
              <a href={api.descargaDeLoEnviado(id, 'carta')}>
                <Mail aria-hidden />
                Carta enviada
              </a>
            </Button>
          )}
        </div>
      )}
      {enviado?.resumen && (
        <details className="text-sm">
          <summary className="cursor-pointer text-muted-foreground">Resumen del CV enviado</summary>
          <p className="mt-2 whitespace-pre-wrap">{enviado.resumen}</p>
        </details>
      )}
      {enviado?.carta && (
        <details className="text-sm">
          <summary className="cursor-pointer text-muted-foreground">Carta enviada</summary>
          <p className="mt-2 whitespace-pre-wrap">{enviado.carta}</p>
        </details>
      )}
    </section>
  );
}
