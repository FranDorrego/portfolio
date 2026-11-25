/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: use-actividad-de-github.ts    Project: portfolio                   */
/*   Created: 2026/11/25 21:30:00  by claude                                  */
/*   Updated: 2026/11/25 21:30:00  by claude                                  */
/* ************************************************************************** */

/** Los cuatro estados del widget de GitHub: cargando, con datos, vacio y error (con reintento). */

import { useCallback, useEffect, useState } from 'react';
import { USUARIO_DE_GITHUB, proveedorDelSitio } from '@/services/github.service';
import type { ActividadDeGithub, ProveedorDeActividad } from '@/types/github';

export type EstadoDeActividad =
  | { estado: 'cargando' }
  | { estado: 'listo'; actividad: ActividadDeGithub }
  | { estado: 'vacio'; actividad: ActividadDeGithub }
  | { estado: 'error' };

/** Sin ninguna cifra y sin mapa no hay nada que mostrar: es el estado vacio. */
export function estaVacia(actividad: ActividadDeGithub): boolean {
  const sinCifras =
    actividad.commits === null && actividad.pullRequests === null && actividad.merges === null;
  return sinCifras && actividad.contributions.length === 0;
}

interface Resultado {
  resultado: EstadoDeActividad;
  reintentar: () => void;
}

export function useActividadDeGithub(
  proveedor: ProveedorDeActividad = proveedorDelSitio,
  usuario: string = USUARIO_DE_GITHUB,
): Resultado {
  const [resultado, setResultado] = useState<EstadoDeActividad>({ estado: 'cargando' });
  const [intento, setIntento] = useState(0);

  useEffect(() => {
    const corte = new AbortController();
    setResultado({ estado: 'cargando' });
    proveedor
      .leer(usuario, corte.signal)
      .then((actividad) => {
        if (corte.signal.aborted) return;
        setResultado({ estado: estaVacia(actividad) ? 'vacio' : 'listo', actividad });
      })
      .catch(() => {
        if (!corte.signal.aborted) setResultado({ estado: 'error' });
      });
    return () => corte.abort();
  }, [proveedor, usuario, intento]);

  const reintentar = useCallback(() => setIntento((n) => n + 1), []);
  return { resultado, reintentar };
}
