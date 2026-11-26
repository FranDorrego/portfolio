/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: seccion-de-proyectos.tsx    Project: portfolio                     */
/*   Created: 2026/11/25 21:30:00  by claude                                  */
/*   Updated: 2026/11/26 01:48:20  by vm                                      */
/* ************************************************************************** */

/** La seccion de proyectos: buscador, filtros, cantidad de resultados, grilla y «ver mas». */

import { Briefcase, ChevronDown, SearchX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Seccion } from '@/components/layout/seccion';
import { useProyectos } from '@/hooks/use-proyectos';
import { useIdioma } from '@/i18n';
import { rellenar } from '@/utils/texto';
import { BuscadorDeProyectos } from './buscador-de-proyectos';
import { useAbrirProyecto } from './use-abrir-proyecto';
import { FiltrosDeProyectos } from './filtros-de-proyectos';
import { TarjetaDeProyecto } from './tarjeta-de-proyecto';
import { cn } from '@/lib/class-names';

export function SeccionDeProyectos(): JSX.Element {
  const { t } = useIdioma();
  const abrir = useAbrirProyecto();
  const { criterios, cambiar, limpiar, encontrados, visibles, quedan, verMas } = useProyectos();

  const cantidad =
    encontrados.length === 1
      ? t.proyectos.unResultado
      : rellenar(t.proyectos.resultados, { cantidad: encontrados.length });

  return (
    <Seccion
      id="proyectos"
      titulo={t.proyectos.titulo}
      junto={t.proyectos.antiguedad}
      Icono={Briefcase}
    >
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <BuscadorDeProyectos
              valor={criterios.texto}
              alCambiar={(texto) => cambiar({ texto })}
            />
          </div>
          <p role="status" className="shrink-0 font-mono text-sm text-muted-foreground">
            {cantidad}
          </p>
        </div>
        <FiltrosDeProyectos criterios={criterios} alCambiar={cambiar} alLimpiar={limpiar} />
      </div>

      {encontrados.length === 0 ? (
        <div
          className={cn(
            'mt-6 flex flex-col items-center rounded-xl border border-dashed border-border px-6',
            'py-14 text-center',
          )}
        >
          <SearchX aria-hidden className="h-8 w-8 text-muted-foreground" />
          <p className="mt-3 text-lg font-medium text-foreground">{t.proyectos.sinResultados}</p>
          <Button variant="outline" className="mt-5" onClick={limpiar}>
            {t.proyectos.limpiar}
          </Button>
        </div>
      ) : (
        <ul className="mt-6 grid gap-5 md:grid-cols-2">
          {visibles.map((proyecto) => (
            <li key={proyecto.id}>
              <TarjetaDeProyecto proyecto={proyecto} alAbrir={(uno) => abrir(uno.id)} />
            </li>
          ))}
        </ul>
      )}

      {quedan > 0 && (
        <div className="mt-8 flex justify-center">
          <Button variant="outline" size="lg" onClick={verMas}>
            {t.proyectos.verMas}
            <span className="font-mono text-xs text-muted-foreground">
              {rellenar(t.proyectos.quedan, { cantidad: quedan })}
            </span>
            <ChevronDown aria-hidden />
          </Button>
        </div>
      )}
    </Seccion>
  );
}
