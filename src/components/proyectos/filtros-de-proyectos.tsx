/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: filtros-de-proyectos.tsx    Project: portfolio                     */
/*   Created: 2026/11/25 21:30:00  by claude                                  */
/*   Updated: 2026/11/25 22:41:32  by vm                                      */
/* ************************************************************************** */

/** Los dos grupos de filtros (tecnologia y categoria). Se combinan entre si y con la busqueda. */

import { useIdioma } from '@/i18n';
import { cn } from '@/lib/class-names';
import { SOLAPA_PULSABLE } from '@/lib/movimiento';
import type { CategoriaDeProyecto, FiltroDeTecnologia } from '@/types/proyecto';
import type { CriteriosDeBusqueda } from '@/utils/filtros-de-proyectos';

const TECNOLOGIAS: FiltroDeTecnologia[] = [
  'python',
  'django',
  'react',
  'typescript',
  'cloud',
  'ia',
  'c',
];
const CATEGORIAS: CategoriaDeProyecto[] = ['propio', 'cliente', 'sistemas', 'educacion'];

interface PropsDeGrupo<T extends string> {
  titulo: string;
  opciones: { valor: T; texto: string }[];
  elegida: T;
  alElegir: (valor: T) => void;
}

function Grupo<T extends string>({
  titulo,
  opciones,
  elegida,
  alElegir,
}: PropsDeGrupo<T>): JSX.Element {
  return (
    <fieldset className="min-w-0">
      <legend className="mb-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">
        {titulo}
      </legend>
      <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
        {opciones.map((opcion) => {
          const marcada = opcion.valor === elegida;
          return (
            <button
              key={opcion.valor}
              type="button"
              aria-pressed={marcada}
              onClick={() => alElegir(opcion.valor)}
              className={cn(
                'shrink-0 rounded-md border px-3 py-1.5 text-sm',
                SOLAPA_PULSABLE,
                marcada
                  ? 'border-primary/60 bg-primary/10 text-primary'
                  : 'border-border bg-card text-muted-foreground hover:text-foreground',
              )}
            >
              {opcion.texto}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

interface Props {
  criterios: CriteriosDeBusqueda;
  alCambiar: (cambio: Partial<CriteriosDeBusqueda>) => void;
}

export function FiltrosDeProyectos({ criterios, alCambiar }: Props): JSX.Element {
  const { t } = useIdioma();
  const todas = { valor: 'todas' as const, texto: t.proyectos.todas };
  return (
    <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
      <Grupo
        titulo={t.proyectos.filtroTecnologia}
        elegida={criterios.tecnologia}
        alElegir={(tecnologia) => alCambiar({ tecnologia })}
        opciones={[
          todas,
          ...TECNOLOGIAS.map((valor) => ({ valor, texto: t.proyectos.tecnologias[valor] })),
        ]}
      />
      <Grupo
        titulo={t.proyectos.filtroCategoria}
        elegida={criterios.categoria}
        alElegir={(categoria) => alCambiar({ categoria })}
        opciones={[
          todas,
          ...CATEGORIAS.map((valor) => ({ valor, texto: t.proyectos.categorias[valor] })),
        ]}
      />
    </div>
  );
}
