/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: filtros-de-proyectos.tsx    Project: portfolio                     */
/*   Created: 2026/11/25 22:27:55  by claude                                  */
/*   Updated: 2026/11/26 02:15:26  by vm                                      */
/* ************************************************************************** */

/**
 * Los filtros rapidos, en una sola fila que se desliza: primero el tipo de trabajo y despues la
 * tecnologia, separados por una raya. Se puede marcar uno de cada grupo; tocar el marcado lo
 * desmarca. «Todos» vuelve a mostrar todo.
 */

import { Fragment } from 'react';
import { X } from 'lucide-react';
import { useIdioma } from '@/i18n';
import { cn } from '@/lib/class-names';
import { SOLAPA_PULSABLE } from '@/lib/movimiento';
import type { CategoriaDeProyecto, FiltroDeTecnologia } from '@/types/proyecto';
import { hayCriterios, type CriteriosDeBusqueda } from '@/utils/filtros-de-proyectos';

const CATEGORIAS: CategoriaDeProyecto[] = ['cliente', 'propio', 'sistemas', 'educacion'];
const TECNOLOGIAS: FiltroDeTecnologia[] = [
  'python',
  'django',
  'react',
  'typescript',
  'ia',
  'cloud',
  'c',
];

interface PropsDeChip {
  marcado: boolean;
  alTocar: () => void;
  children: React.ReactNode;
}

function Chip({ marcado, alTocar, children }: PropsDeChip): JSX.Element {
  return (
    <button
      type="button"
      aria-pressed={marcado}
      onClick={alTocar}
      className={cn(
        'flex shrink-0 items-center gap-1 rounded-full border px-3 py-1.5 text-sm',
        SOLAPA_PULSABLE,
        marcado
          ? 'border-primary/60 bg-primary/10 text-primary'
          : 'border-border bg-card text-muted-foreground hover:text-foreground',
      )}
    >
      {children}
    </button>
  );
}

interface Props {
  criterios: CriteriosDeBusqueda;
  alCambiar: (cambio: Partial<CriteriosDeBusqueda>) => void;
  alLimpiar: () => void;
}

export function FiltrosDeProyectos({ criterios, alCambiar, alLimpiar }: Props): JSX.Element {
  const { t } = useIdioma();
  const grupos = [
    CATEGORIAS.map((categoria) => (
      <Chip
        key={categoria}
        marcado={criterios.categoria === categoria}
        alTocar={() =>
          alCambiar({ categoria: criterios.categoria === categoria ? 'todas' : categoria })
        }
      >
        {t.proyectos.categorias[categoria]}
      </Chip>
    )),
    TECNOLOGIAS.map((tecnologia) => (
      <Chip
        key={tecnologia}
        marcado={criterios.tecnologia === tecnologia}
        alTocar={() =>
          alCambiar({ tecnologia: criterios.tecnologia === tecnologia ? 'todas' : tecnologia })
        }
      >
        {t.proyectos.tecnologias[tecnologia]}
      </Chip>
    )),
  ];
  return (
    <div
      role="group"
      aria-label={t.proyectos.filtros}
      className="sin-barra -mx-4 flex items-center gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0"
    >
      <Chip marcado={!hayCriterios(criterios)} alTocar={alLimpiar}>
        {hayCriterios(criterios) && <X aria-hidden className="h-3.5 w-3.5" />}
        {t.proyectos.todas}
      </Chip>
      {grupos.map((grupo, indice) => (
        <Fragment key={indice}>
          <span aria-hidden className="h-5 w-px shrink-0 bg-border" />
          {grupo}
        </Fragment>
      ))}
    </div>
  );
}
