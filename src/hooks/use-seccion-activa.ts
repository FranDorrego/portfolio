/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: use-seccion-activa.ts    Project: portfolio                        */
/*   Created: 2026/11/25 21:30:00  by claude                                  */
/*   Updated: 2026/11/25 21:30:00  by claude                                  */
/* ************************************************************************** */

/** Que seccion de la pagina esta a la vista, para marcarla en la navegacion. */

import { useEffect, useState } from 'react';

export function useSeccionActiva(ids: readonly string[]): string | null {
  const [activa, setActiva] = useState<string | null>(null);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const visibles = new Map<string, number>();
    const observador = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (entrada.isIntersecting) visibles.set(entrada.target.id, entrada.intersectionRatio);
          else visibles.delete(entrada.target.id);
        }
        // La primera en el orden de la pagina entre las que estan en la franja central.
        setActiva(ids.find((id) => visibles.has(id)) ?? null);
      },
      { rootMargin: '-35% 0px -55% 0px' },
    );
    for (const id of ids) {
      const elemento = document.getElementById(id);
      if (elemento) observador.observe(elemento);
    }
    return () => observador.disconnect();
  }, [ids]);

  return activa;
}
