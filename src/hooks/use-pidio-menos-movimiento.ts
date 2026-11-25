/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: use-pidio-menos-movimiento.ts    Project: portfolio                */
/*   Created: 2026/11/25 21:30:00  by claude                                  */
/*   Updated: 2026/11/25 21:30:00  by claude                                  */
/* ************************************************************************** */

/** Si la persona pidio «reducir movimiento» en su sistema. Se entera si lo cambia. */

import { useEffect, useState } from 'react';

const CONSULTA = '(prefers-reduced-motion: reduce)';

function pidio(): boolean {
  return (
    typeof window !== 'undefined' && !!window.matchMedia && window.matchMedia(CONSULTA).matches
  );
}

export function usePidioMenosMovimiento(): boolean {
  const [menos, setMenos] = useState(pidio);
  useEffect(() => {
    if (!window.matchMedia) return;
    const consulta = window.matchMedia(CONSULTA);
    const alCambiar = (): void => setMenos(consulta.matches);
    consulta.addEventListener('change', alCambiar);
    return () => consulta.removeEventListener('change', alCambiar);
  }, []);
  return menos;
}
