/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: use-proyectos.ts    Project: portfolio                             */
/*   Created: 2026/11/25 21:30:00  by claude                                  */
/*   Updated: 2026/11/25 21:30:00  by claude                                  */
/* ************************************************************************** */

/** El estado de la seccion de proyectos: criterios, resultados y cuantos se muestran. */

import { useCallback, useMemo, useState } from 'react';
import { PROYECTOS } from '@/data/proyectos';
import { useIdioma } from '@/i18n';
import type { Proyecto } from '@/types/proyecto';
import {
  SIN_CRITERIOS,
  filtrarProyectos,
  hayCriterios,
  type CriteriosDeBusqueda,
} from '@/utils/filtros-de-proyectos';

/** Al llegar, los cuatro destacados; «ver mas» suma de a cuatro. */
export const PRIMERA_TANDA = 4;
export const PASO = 4;

interface Resultado {
  criterios: CriteriosDeBusqueda;
  cambiar: (cambio: Partial<CriteriosDeBusqueda>) => void;
  limpiar: () => void;
  filtrando: boolean;
  encontrados: Proyecto[];
  visibles: Proyecto[];
  quedan: number;
  verMas: () => void;
}

export function useProyectos(): Resultado {
  const { idioma, t } = useIdioma();
  const [criterios, setCriterios] = useState<CriteriosDeBusqueda>(SIN_CRITERIOS);
  const [cuantos, setCuantos] = useState(PRIMERA_TANDA);

  const encontrados = useMemo(
    () =>
      filtrarProyectos(PROYECTOS, criterios, idioma, {
        categorias: t.proyectos.categorias,
        tecnologias: t.proyectos.tecnologias,
      }),
    [criterios, idioma, t],
  );

  const cambiar = useCallback((cambio: Partial<CriteriosDeBusqueda>): void => {
    setCriterios((antes) => ({ ...antes, ...cambio }));
    setCuantos(PRIMERA_TANDA);
  }, []);

  const limpiar = useCallback((): void => {
    setCriterios(SIN_CRITERIOS);
    setCuantos(PRIMERA_TANDA);
  }, []);

  const verMas = useCallback((): void => setCuantos((n) => n + PASO), []);

  const visibles = encontrados.slice(0, cuantos);
  return {
    criterios,
    cambiar,
    limpiar,
    filtrando: hayCriterios(criterios),
    encontrados,
    visibles,
    quedan: encontrados.length - visibles.length,
    verMas,
  };
}
