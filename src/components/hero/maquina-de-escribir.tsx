/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: maquina-de-escribir.tsx    Project: portfolio                      */
/*   Created: 2026/11/25 23:23:44  by claude                                  */
/*   Updated: 2026/11/25 23:31:45  by vm                                      */
/* ************************************************************************** */

/**
 * La maquina de escribir del inicio: escribe un titulo, lo borra y escribe el siguiente, en
 * ronda. Arranca con el primero ya escrito, asi la linea nunca esta vacia al llegar. Ocupa una
 * sola linea de alto fijo: nada de alrededor se mueve. Con «reducir movimiento» queda quieta en
 * el primero.
 */

import { useEffect, useMemo, useState } from 'react';
import { usePidioMenosMovimiento } from '@/hooks/use-pidio-menos-movimiento';
import { guionRotativo, unaLetraHacia } from '@/utils/maquina-de-escribir';

const MS_AL_ESCRIBIR = 60;
const MS_AL_BORRAR = 30;
const MS_ESCRITO = 1600;
const MS_VACIO = 250;

export function MaquinaDeEscribir({ titulos }: { titulos: readonly string[] }): JSX.Element {
  const quieto = usePidioMenosMovimiento();
  const guion = useMemo(() => guionRotativo(titulos), [titulos]);
  const primero = titulos[0] ?? '';
  const [paso, setPaso] = useState(0);
  const [texto, setTexto] = useState(primero);

  const destino = guion[paso] ?? '';

  useEffect(() => {
    if (quieto || guion.length === 0) return;
    const llego = texto === destino;
    let espera = destino.startsWith(texto) ? MS_AL_ESCRIBIR : MS_AL_BORRAR;
    if (llego) espera = destino === '' ? MS_VACIO : MS_ESCRITO;
    const reloj = window.setTimeout(() => {
      if (llego) setPaso((actual) => (actual + 1) % guion.length);
      else setTexto(unaLetraHacia(texto, destino));
    }, espera);
    return () => window.clearTimeout(reloj);
  }, [quieto, texto, destino, guion.length]);

  return (
    <p className="h-7 whitespace-nowrap font-mono text-base text-primary sm:text-lg">
      <span className="sr-only">{titulos.join(', ')}</span>
      <span aria-hidden>
        <span className="text-muted-foreground">{'> '}</span>
        {quieto ? primero : texto}
        <span className="cursor-de-consola ml-0.5 inline-block h-[1em] w-2 translate-y-0.5 bg-primary" />
      </span>
    </p>
  );
}
