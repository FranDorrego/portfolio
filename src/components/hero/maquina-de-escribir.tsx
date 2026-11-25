/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: maquina-de-escribir.tsx    Project: portfolio                      */
/*   Created: 2026/11/25 23:19:33  by vm                                      */
/*   Updated: 2026/11/25 23:19:33  by vm                                      */
/* ************************************************************************** */

/**
 * La maquina de escribir del inicio. Va sumando los titulos de a uno (escribe, borra, vuelve y
 * agrega el siguiente) hasta que quedan todos; despues de una pausa empieza de nuevo. El lugar
 * del texto completo esta reservado desde el principio, asi que nada de alrededor se mueve.
 * Con «reducir movimiento» se ve el texto completo, quieto.
 */

import { useEffect, useMemo, useState } from 'react';
import { usePidioMenosMovimiento } from '@/hooks/use-pidio-menos-movimiento';
import { guionAcumulado, unaLetraHacia } from '@/utils/maquina-de-escribir';

const MS_AL_ESCRIBIR = 55;
const MS_AL_BORRAR = 28;
const MS_DE_PAUSA = 900;
const MS_AL_TERMINAR = 4000;

export function MaquinaDeEscribir({ titulos }: { titulos: readonly string[] }): JSX.Element {
  const quieto = usePidioMenosMovimiento();
  const guion = useMemo(() => [...guionAcumulado(titulos), ''], [titulos]);
  const completo = titulos.join(', ');
  const [paso, setPaso] = useState(0);
  const [texto, setTexto] = useState('');

  const destino = guion[paso] ?? '';

  useEffect(() => {
    if (quieto) return;
    const llego = texto === destino;
    let espera = destino.startsWith(texto) ? MS_AL_ESCRIBIR : MS_AL_BORRAR;
    if (llego) espera = destino === completo ? MS_AL_TERMINAR : MS_DE_PAUSA;
    const reloj = window.setTimeout(() => {
      if (llego) setPaso((actual) => (actual + 1) % guion.length);
      else setTexto(unaLetraHacia(texto, destino));
    }, espera);
    return () => window.clearTimeout(reloj);
  }, [quieto, texto, destino, completo, guion.length]);

  return (
    <p className="grid font-mono text-base text-primary sm:text-lg">
      <span className="sr-only">{completo}</span>
      {/* El texto completo, invisible: reserva el alto final para que nada salte. */}
      <span aria-hidden className="invisible col-start-1 row-start-1">
        {completo}
      </span>
      <span aria-hidden className="col-start-1 row-start-1">
        {quieto ? completo : texto}
        <span className="cursor-de-consola ml-0.5 inline-block h-[1em] w-2 translate-y-0.5 bg-primary" />
      </span>
    </p>
  );
}
