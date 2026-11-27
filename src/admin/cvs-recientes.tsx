/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: cvs-recientes.tsx    Project: portfolio                            */
/*   Created: 2026/11/27 17:39:12  by vm                                      */
/*   Updated: 2026/11/27 17:39:36  by vm                                      */
/* ************************************************************************** */

/**
 * Los CV adaptados y subidos, del mas nuevo al mas viejo: se ven de a 6 («Ver mas» y «Ver
 * todos») y se buscan por empresa, siglas, cargo o nombre, sin tildes ni mayusculas.
 */

import { useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/class-names';
import { ENTRADA } from './formato';
import { Rotulo } from './marco';
import { Grilla } from './grilla';
import type { Cv } from './tipos';

const ULTIMOS = 6;

/** Sin tildes ni mayusculas: «junior» encuentra «Júnior». */
const normal = (texto: string): string =>
  texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

/** Si el CV tiene todas las palabras buscadas en su empresa, siglas, cargo o nombre. */
function coincide(cv: Cv, busqueda: string): boolean {
  const donde = normal([cv.nombre, cv.empresa, cv.siglas, cv.cargo].filter(Boolean).join(' '));
  return normal(busqueda)
    .split(/\s+/)
    .filter(Boolean)
    .every((palabra) => donde.includes(palabra));
}

export function CvsRecientes({
  propios,
  alCambiar,
}: {
  propios: Cv[];
  alCambiar: () => void;
}): JSX.Element {
  const [busqueda, setBusqueda] = useState('');
  const [cuantos, setCuantos] = useState(ULTIMOS);
  const ordenados = [...propios].sort((a, b) => b.creado.localeCompare(a.creado));
  const encontrados = busqueda.trim()
    ? ordenados.filter((cv) => coincide(cv, busqueda))
    : ordenados.slice(0, cuantos);
  const quedan = busqueda.trim() ? 0 : propios.length - encontrados.length;
  return (
    <section className="flex flex-col gap-3">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <Rotulo>
          {busqueda.trim()
            ? `${encontrados.length} de ${propios.length}`
            : `${encontrados.length} de ${propios.length}, los más nuevos primero`}
        </Rotulo>
        <label className="relative w-full sm:w-80">
          <span className="sr-only">Buscar por empresa, cargo o nombre</span>
          <Search
            aria-hidden
            className={cn(
              'pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2',
              'text-muted-foreground',
            )}
          />
          <input
            type="search"
            className={cn(ENTRADA, 'pl-9')}
            placeholder="Empresa, cargo o nombre del PDF"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </label>
      </div>
      {encontrados.length > 0 ? (
        <>
          <Grilla cvs={encontrados} alCambiar={alCambiar} />
          {quedan > 0 && (
            <div className="flex flex-wrap justify-center gap-2 pt-2">
              <Button variant="outline" onClick={() => setCuantos(cuantos + ULTIMOS)}>
                <ChevronDown aria-hidden />
                Ver {Math.min(ULTIMOS, quedan)} más
              </Button>
              <Button variant="ghost" onClick={() => setCuantos(propios.length)}>
                Ver todos ({propios.length})
              </Button>
            </div>
          )}
        </>
      ) : (
        <p
          className={cn(
            'rounded-xl border border-dashed border-border px-6 py-10 text-center',
            'text-muted-foreground',
          )}
        >
          {propios.length === 0 ? 'Todavía no hay CV adaptados ni subidos.' : 'Ningún CV coincide.'}
        </p>
      )}
    </section>
  );
}
