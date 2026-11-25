/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: mapa-de-contribuciones.tsx    Project: portfolio                   */
/*   Created: 2026/11/25 21:30:00  by claude                                  */
/*   Updated: 2026/11/25 21:30:00  by claude                                  */
/* ************************************************************************** */

/**
 * El mapa de contribuciones: una columna por semana, en escala esmeralda. Es un SVG que se
 * adapta al ancho de la tarjeta (no hay scroll lateral). El detalle de un dia aparece al pasar el
 * mouse o al recorrerlo con las flechas del teclado.
 */

import { useMemo, useState } from 'react';
import { useIdioma } from '@/i18n';
import type { DiaDeContribuciones } from '@/types/github';
import { armarSemanas, totalDeContribuciones, type Celda } from '@/utils/mapa-de-contribuciones';
import { fechaLarga, numeroConFormato, rellenar } from '@/utils/texto';
import { cn } from '@/lib/class-names';

const LADO = 10;
const PASO = 13;

/** De «sin actividad» (zinc) a lo mas intenso (esmeralda claro). */
export const COLORES_POR_NIVEL = ['#27272a', '#064e3b', '#047857', '#10b981', '#6ee7b7'] as const;

interface Posicion {
  semana: number;
  dia: number;
}

const MOVIMIENTOS: Record<string, [number, number]> = {
  ArrowLeft: [-1, 0],
  ArrowRight: [1, 0],
  ArrowUp: [0, -1],
  ArrowDown: [0, 1],
};

export function MapaDeContribuciones({ dias }: { dias: DiaDeContribuciones[] }): JSX.Element {
  const { t, idioma } = useIdioma();
  const semanas = useMemo(() => armarSemanas(dias), [dias]);
  const [activa, setActiva] = useState<Posicion | null>(null);

  const ancho = semanas.length * PASO - (PASO - LADO);
  const alto = 7 * PASO - (PASO - LADO);
  const celdaActiva: Celda | null = activa ? (semanas[activa.semana]?.[activa.dia] ?? null) : null;

  const describir = (celda: Celda): string => {
    const fecha = fechaLarga(celda.date, idioma);
    if (celda.count === 0) return rellenar(t.github.unDiaNinguna, { fecha });
    if (celda.count === 1) return rellenar(t.github.unDiaUna, { fecha });
    return rellenar(t.github.unDia, { cantidad: numeroConFormato(celda.count, idioma), fecha });
  };

  const resumen = rellenar(t.github.resumenDelMapa, {
    total: numeroConFormato(totalDeContribuciones(dias), idioma),
    desde: fechaLarga(dias[0].date, idioma),
    hasta: fechaLarga(dias[dias.length - 1].date, idioma),
  });

  const mover = (evento: React.KeyboardEvent): void => {
    const paso = MOVIMIENTOS[evento.key];
    if (!paso) return;
    evento.preventDefault();
    const desde = activa ?? { semana: semanas.length - 1, dia: 0 };
    let semana = desde.semana;
    let dia = desde.dia;
    // Avanza hasta la proxima celda con fecha: los huecos de los bordes se saltean.
    for (let intento = 0; intento < 8; intento++) {
      semana = Math.min(semanas.length - 1, Math.max(0, semana + paso[0]));
      dia = Math.min(6, Math.max(0, dia + paso[1]));
      if (semanas[semana]?.[dia]) break;
    }
    if (semanas[semana]?.[dia]) setActiva({ semana, dia });
  };

  return (
    <figure className="m-0">
      <div
        role="img"
        tabIndex={0}
        aria-label={`${t.github.mapa}. ${resumen}. ${t.github.ayudaDelMapa}`}
        onKeyDown={mover}
        onBlur={() => setActiva(null)}
        onMouseLeave={() => setActiva(null)}
        className={cn(
          'relative rounded-sm focus-visible:outline-none focus-visible:ring-2',
          'focus-visible:ring-ring focus-visible:ring-offset-4',
          'focus-visible:ring-offset-[#09090b]',
        )}
      >
        <svg viewBox={`0 0 ${ancho} ${alto}`} className="block h-auto w-full" aria-hidden>
          {semanas.map((semana, x) =>
            semana.map((celda, y) =>
              celda ? (
                <rect
                  key={celda.date}
                  x={x * PASO}
                  y={y * PASO}
                  width={LADO}
                  height={LADO}
                  rx={2}
                  fill={COLORES_POR_NIVEL[celda.nivel]}
                  stroke={activa?.semana === x && activa.dia === y ? '#fafafa' : 'none'}
                  strokeWidth={1.5}
                  onMouseEnter={() => setActiva({ semana: x, dia: y })}
                />
              ) : null,
            ),
          )}
        </svg>
        {activa && celdaActiva && (
          <div
            className={cn(
              'pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full',
              'whitespace-nowrap rounded-md border border-border bg-card px-2 py-1 text-xs',
              'text-foreground shadow-flotante',
            )}
            style={{
              left: `clamp(5.5rem, ${((activa.semana * PASO + LADO / 2) / ancho) * 100}%, calc(100% - 5.5rem))`,
              top: `calc(${((activa.dia * PASO) / alto) * 100}% - 6px)`,
            }}
          >
            {describir(celdaActiva)}
          </div>
        )}
        <span aria-live="polite" className="sr-only">
          {celdaActiva ? describir(celdaActiva) : ''}
        </span>
      </div>
      <figcaption
        className={cn(
          'mt-3 flex flex-wrap items-center justify-between gap-2 font-mono text-xs',
          'text-muted-foreground',
        )}
      >
        <span>{resumen}</span>
        <span aria-hidden className="flex items-center gap-1">
          {t.github.menos}
          {COLORES_POR_NIVEL.map((color) => (
            <span key={color} className="h-2.5 w-2.5 rounded-sm" style={{ background: color }} />
          ))}
          {t.github.mas}
        </span>
      </figcaption>
    </figure>
  );
}
