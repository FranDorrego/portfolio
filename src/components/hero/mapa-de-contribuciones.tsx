/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: mapa-de-contribuciones.tsx    Project: portfolio                   */
/*   Created: 2026/11/25 22:27:55  by claude                                  */
/*   Updated: 2026/11/25 23:32:19  by vm                                      */
/* ************************************************************************** */

/**
 * El mapa de contribuciones, igual al del perfil de GitHub: meses arriba, lunes, miercoles y
 * viernes a la izquierda, los mismos verdes y la leyenda «Menos … Mas» abajo. En pantallas
 * angostas se desplaza de costado y arranca mostrando lo mas reciente, como en GitHub. El
 * detalle de un dia aparece al pasar el mouse o al recorrerlo con las flechas del teclado.
 */

import { useEffect, useMemo, useRef, useState } from 'react';
import { useIdioma } from '@/i18n';
import { cn } from '@/lib/class-names';
import type { DiaDeContribuciones } from '@/types/github';
import { armarSemanas, etiquetasDeMes, type Celda } from '@/utils/mapa-de-contribuciones';
import { fechaLarga, numeroConFormato, rellenar } from '@/utils/texto';

const LADO = 10;
const PASO = 13;
const MARGEN_IZQUIERDO = 30;
const MARGEN_SUPERIOR = 18;

/** Los verdes de GitHub, del tema actual (index.css). */
export const COLORES_POR_NIVEL = [0, 1, 2, 3, 4].map((nivel) => `hsl(var(--mapa-${nivel}))`);

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

interface Props {
  dias: DiaDeContribuciones[];
  /** El texto del pie a la izquierda (en GitHub, «Learn how we count contributions»). */
  pie?: React.ReactNode;
}

export function MapaDeContribuciones({ dias, pie }: Props): JSX.Element {
  const { t, idioma } = useIdioma();
  const semanas = useMemo(() => armarSemanas(dias), [dias]);
  const meses = useMemo(() => etiquetasDeMes(semanas, idioma), [semanas, idioma]);
  const [activa, setActiva] = useState<Posicion | null>(null);
  const desplazable = useRef<HTMLDivElement>(null);

  // Como en GitHub: en una pantalla angosta se ve primero lo mas reciente.
  useEffect(() => {
    const caja = desplazable.current;
    if (caja) caja.scrollLeft = caja.scrollWidth;
  }, [semanas]);

  const ancho = MARGEN_IZQUIERDO + semanas.length * PASO - (PASO - LADO);
  const alto = MARGEN_SUPERIOR + 7 * PASO - (PASO - LADO);
  const celdaActiva: Celda | null = activa ? (semanas[activa.semana]?.[activa.dia] ?? null) : null;

  const describir = (celda: Celda): string => {
    const fecha = fechaLarga(celda.date, idioma);
    if (celda.count === 0) return rellenar(t.github.unDiaNinguna, { fecha });
    if (celda.count === 1) return rellenar(t.github.unDiaUna, { fecha });
    return rellenar(t.github.unDia, { cantidad: numeroConFormato(celda.count, idioma), fecha });
  };

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

  const x = (semana: number): number => MARGEN_IZQUIERDO + semana * PASO;
  const y = (dia: number): number => MARGEN_SUPERIOR + dia * PASO;

  return (
    <div className="rounded-md border border-border px-3 pb-3 pt-3 sm:px-4">
      <div ref={desplazable} className="overflow-x-auto">
        <div
          role="img"
          tabIndex={0}
          aria-label={`${t.github.mapa}. ${t.github.ayudaDelMapa}`}
          onKeyDown={mover}
          onBlur={() => setActiva(null)}
          onMouseLeave={() => setActiva(null)}
          className={cn(
            'relative min-w-[44rem] rounded-sm focus-visible:outline-none md:min-w-0',
            'focus-visible:ring-2 focus-visible:ring-ring',
          )}
        >
          <svg viewBox={`0 0 ${ancho} ${alto}`} className="block h-auto w-full" aria-hidden>
            {meses.map((mes) => (
              <text
                key={`${mes.columna}-${mes.texto}`}
                x={x(mes.columna)}
                y={10}
                className="fill-foreground text-[9px]"
              >
                {mes.texto}
              </text>
            ))}
            {t.github.dias.map((nombre, indice) => (
              <text
                key={nombre}
                x={0}
                y={y(1 + indice * 2) + LADO - 1}
                className="fill-foreground text-[9px]"
              >
                {nombre}
              </text>
            ))}
            {semanas.map((semana, columna) =>
              semana.map((celda, fila) =>
                celda ? (
                  <rect
                    key={celda.date}
                    x={x(columna)}
                    y={y(fila)}
                    width={LADO}
                    height={LADO}
                    rx={2}
                    fill={COLORES_POR_NIVEL[celda.nivel]}
                    stroke={
                      activa?.semana === columna && activa.dia === fila
                        ? 'hsl(var(--foreground))'
                        : 'hsl(var(--foreground) / 0.05)'
                    }
                    strokeWidth={activa?.semana === columna && activa.dia === fila ? 1.5 : 0.5}
                    onMouseEnter={() => setActiva({ semana: columna, dia: fila })}
                  />
                ) : null,
              ),
            )}
          </svg>
          {activa && celdaActiva && (
            <div
              className={cn(
                'pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full',
                'whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-xs text-background',
              )}
              style={{
                left: `${((x(activa.semana) + LADO / 2) / ancho) * 100}%`,
                top: `calc(${(y(activa.dia) / alto) * 100}% - 6px)`,
              }}
            >
              {describir(celdaActiva)}
            </div>
          )}
          <span aria-live="polite" className="sr-only">
            {celdaActiva ? describir(celdaActiva) : ''}
          </span>
        </div>
      </div>
      <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
        <span>{pie}</span>
        <span aria-hidden className="flex items-center gap-1">
          {t.github.menos}
          {COLORES_POR_NIVEL.map((color) => (
            <span
              key={color}
              className="h-2.5 w-2.5 rounded-sm outline outline-1 -outline-offset-1 outline-foreground/5"
              style={{ background: color }}
            />
          ))}
          {t.github.mas}
        </span>
      </div>
    </div>
  );
}
