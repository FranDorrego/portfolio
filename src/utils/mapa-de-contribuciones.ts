/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: mapa-de-contribuciones.ts    Project: portfolio                    */
/*   Created: 2026/11/25 21:30:00  by claude                                  */
/*   Updated: 2026/11/25 21:30:00  by claude                                  */
/* ************************************************************************** */

/** Las cuentas del mapa de contribuciones: semanas completas y niveles de intensidad. */

import type { DiaDeContribuciones } from '@/types/github';

export interface Celda extends DiaDeContribuciones {
  /** 0 (sin actividad) a 4 (lo mas intenso del periodo). */
  nivel: 0 | 1 | 2 | 3 | 4;
}

const UN_DIA_MS = 86_400_000;

function aFecha(texto: string): Date {
  return new Date(`${texto}T00:00:00Z`);
}

function aTexto(fecha: Date): string {
  return fecha.toISOString().slice(0, 10);
}

/** El nivel de un dia segun el maximo del periodo (cuartos), como el mapa de GitHub. */
export function nivelDe(cantidad: number, maximo: number): Celda['nivel'] {
  if (cantidad <= 0 || maximo <= 0) return 0;
  const cuarto = Math.ceil((cantidad / maximo) * 4);
  return Math.min(4, Math.max(1, cuarto)) as Celda['nivel'];
}

/**
 * Arma las columnas (semanas, de domingo a sabado) entre el primer y el ultimo dia recibidos.
 * Los dias que el proveedor no manda valen 0; los de antes del primero y despues del ultimo
 * quedan en `null` para que la rejilla no invente fechas.
 */
export function armarSemanas(
  dias: DiaDeContribuciones[],
  maximoDeSemanas = 53,
): (Celda | null)[][] {
  if (dias.length === 0) return [];
  const porFecha = new Map(dias.map((dia) => [dia.date, dia.count]));
  const ultimo = aFecha(dias[dias.length - 1].date);
  let primero = aFecha(dias[0].date);
  const inicioMinimo = new Date(ultimo.getTime() - (maximoDeSemanas * 7 - 1) * UN_DIA_MS);
  if (primero < inicioMinimo) primero = inicioMinimo;
  const maximo = Math.max(
    0,
    ...dias.filter((dia) => aFecha(dia.date) >= primero).map((dia) => dia.count),
  );

  const semanas: (Celda | null)[][] = [];
  let semana: (Celda | null)[] = Array.from({ length: primero.getUTCDay() }, () => null);
  for (let dia = primero; dia <= ultimo; dia = new Date(dia.getTime() + UN_DIA_MS)) {
    const date = aTexto(dia);
    const count = porFecha.get(date) ?? 0;
    semana.push({ date, count, nivel: nivelDe(count, maximo) });
    if (semana.length === 7) {
      semanas.push(semana);
      semana = [];
    }
  }
  if (semana.length > 0) {
    while (semana.length < 7) semana.push(null);
    semanas.push(semana);
  }
  return semanas.slice(-maximoDeSemanas);
}

export function totalDeContribuciones(dias: DiaDeContribuciones[]): number {
  return dias.reduce((suma, dia) => suma + dia.count, 0);
}
