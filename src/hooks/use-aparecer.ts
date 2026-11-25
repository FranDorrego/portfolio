/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: use-aparecer.ts    Project: portfolio                              */
/*   Created: 2026/11/25 21:30:00  by claude                                  */
/*   Updated: 2026/11/25 21:30:00  by claude                                  */
/* ************************************************************************** */

/** Aparecer al scrollear: una sola vez, y sin esperar si el navegador no sabe observar. */

import { useEffect, useRef, useState } from 'react';

export function useAparecer<T extends HTMLElement>(): { ref: React.RefObject<T>; clase: string } {
  const ref = useRef<T>(null);
  const [visto, setVisto] = useState(() => typeof IntersectionObserver === 'undefined');

  useEffect(() => {
    const elemento = ref.current;
    if (!elemento || visto) return;
    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          setVisto(true);
          observador.disconnect();
        }
      },
      { rootMargin: '0px 0px -10% 0px' },
    );
    observador.observe(elemento);
    return () => observador.disconnect();
  }, [visto]);

  return { ref, clase: visto ? 'ya-aparecio' : 'por-aparecer' };
}
