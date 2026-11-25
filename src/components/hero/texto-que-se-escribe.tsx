/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: texto-que-se-escribe.tsx    Project: portfolio                     */
/*   Created: 2026/11/25 21:30:00  by claude                                  */
/*   Updated: 2026/11/25 21:30:00  by claude                                  */
/* ************************************************************************** */

/**
 * Escribe y borra una lista de textos, uno detras de otro. El renglon tiene alto fijo y el ancho
 * del texto mas largo, asi que nada de alrededor se mueve. Con «reducir movimiento» queda quieto
 * en el primero; un lector de pantalla recibe la lista entera una sola vez.
 */

import { useEffect, useState } from 'react';
import { usePidioMenosMovimiento } from '@/hooks/use-pidio-menos-movimiento';

const MS_POR_LETRA = 70;
const MS_AL_BORRAR = 35;
const MS_DE_PAUSA = 1600;
const MS_ENTRE_TEXTOS = 350;

interface Props {
  textos: readonly string[];
  leyenda: string;
}

export function TextoQueSeEscribe({ textos, leyenda }: Props): JSX.Element {
  const quieto = usePidioMenosMovimiento();
  const [cual, setCual] = useState(0);
  const [letras, setLetras] = useState(0);
  const [borrando, setBorrando] = useState(false);

  const actual = textos[cual % textos.length] ?? '';

  useEffect(() => {
    if (quieto) return;
    let espera = borrando ? MS_AL_BORRAR : MS_POR_LETRA;
    if (!borrando && letras === actual.length) espera = MS_DE_PAUSA;
    if (borrando && letras === 0) espera = MS_ENTRE_TEXTOS;
    const reloj = window.setTimeout(() => {
      if (!borrando && letras === actual.length) setBorrando(true);
      else if (borrando && letras === 0) {
        setBorrando(false);
        setCual((n) => (n + 1) % textos.length);
      } else setLetras((n) => n + (borrando ? -1 : 1));
    }, espera);
    return () => window.clearTimeout(reloj);
  }, [quieto, borrando, letras, actual, textos.length]);

  const masLargo = textos.reduce((largo, texto) => Math.max(largo, texto.length), 0);
  const visible = quieto ? (textos[0] ?? '') : actual.slice(0, letras);

  return (
    <p className="font-mono text-base text-primary sm:text-lg">
      <span className="sr-only">
        {leyenda}: {textos.join(', ')}.
      </span>
      <span
        aria-hidden
        className="inline-flex h-7 items-center whitespace-pre"
        style={{ minWidth: `${masLargo + 3}ch` }}
      >
        <span className="text-muted-foreground">{'> '}</span>
        {visible}
        <span className="cursor-de-consola ml-0.5 inline-block h-5 w-2 bg-primary" />
      </span>
    </p>
  );
}
