/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: use-ha-bajado.ts    Project: portfolio                             */
/*   Created: 2026/11/26 01:47:16  by vm                                      */
/*   Updated: 2026/11/26 01:47:16  by vm                                      */
/* ************************************************************************** */

/** Si la pagina ya se desplazo mas de `umbral` pixeles. Escucha el scroll sin trabar el hilo. */

import { useEffect, useState } from 'react';

export function useHaBajado(umbral: number): boolean {
  const [bajo, setBajo] = useState(false);
  useEffect(() => {
    let pendiente = 0;
    const medir = (): void => {
      pendiente = 0;
      setBajo(window.scrollY > umbral);
    };
    const alDesplazar = (): void => {
      if (!pendiente) pendiente = window.requestAnimationFrame(medir);
    };
    medir();
    window.addEventListener('scroll', alDesplazar, { passive: true });
    return () => {
      window.removeEventListener('scroll', alDesplazar);
      if (pendiente) window.cancelAnimationFrame(pendiente);
    };
  }, [umbral]);
  return bajo;
}
