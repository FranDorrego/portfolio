/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: github.service.ts    Project: portfolio                            */
/*   Created: 2026/11/25 21:30:00  by claude                                  */
/*   Updated: 2026/11/25 22:40:58  by vm                                      */
/* ************************************************************************** */

/**
 * De donde salen las estadisticas de GitHub: de `github-stats.json`, un archivo del propio sitio
 * que la accion de GitHub vuelve a escribir todos los dias (scripts/estadisticas-de-github.mjs).
 * Para cambiar de proveedor alcanza con escribir otro `ProveedorDeActividad`: la interfaz solo
 * conoce `ActividadDeGithub`.
 *
 * La respuesta se lee con tolerancia y lo que no viene queda en `null`: nunca se inventa una
 * cifra.
 */

import { recurso } from '@/lib/raiz';
import type { ActividadDeGithub, DiaDeContribuciones, ProveedorDeActividad } from '@/types/github';

export const USUARIO_DE_GITHUB = 'FranDorrego';

const ARCHIVO = 'github-stats.json';
const ESPERA_MAXIMA_MS = 10_000;

type Objeto = Record<string, unknown>;

function esObjeto(valor: unknown): valor is Objeto {
  return typeof valor === 'object' && valor !== null && !Array.isArray(valor);
}

/** El primer numero valido entre varias claves posibles; `null` si no hay ninguno. */
function numero(origen: Objeto, claves: string[]): number | null {
  for (const clave of claves) {
    const valor = origen[clave];
    if (typeof valor === 'number' && Number.isFinite(valor) && valor >= 0) return valor;
  }
  return null;
}

const FECHA = /^\d{4}-\d{2}-\d{2}/;

function unDia(fecha: unknown, cantidad: unknown): DiaDeContribuciones | null {
  if (typeof fecha !== 'string' || !FECHA.test(fecha)) return null;
  if (typeof cantidad !== 'number' || !Number.isFinite(cantidad) || cantidad < 0) return null;
  return { date: fecha.slice(0, 10), count: Math.round(cantidad) };
}

/** Acepta una lista `[{ date, count }]` o un diccionario `{ 'AAAA-MM-DD': n }`. */
export function leerContribuciones(crudo: unknown): DiaDeContribuciones[] {
  let dias: (DiaDeContribuciones | null)[] = [];
  if (Array.isArray(crudo)) {
    dias = crudo.map((fila) =>
      esObjeto(fila)
        ? unDia(fila.date ?? fila.fecha, fila.count ?? fila.contributionCount ?? fila.cantidad)
        : null,
    );
  } else if (esObjeto(crudo)) {
    dias = Object.entries(crudo).map(([fecha, cantidad]) => unDia(fecha, cantidad));
  }
  return dias
    .filter((dia): dia is DiaDeContribuciones => dia !== null)
    .sort((a, b) => a.date.localeCompare(b.date));
}

/** Convierte la respuesta de la API en lo que usa la interfaz. Tira si no es un objeto. */
export function interpretarActividad(cuerpo: unknown, usuario: string): ActividadDeGithub {
  if (!esObjeto(cuerpo)) throw new Error('respuesta-invalida');
  if (cuerpo.success === false) throw new Error('respuesta-con-error');
  const datos = esObjeto(cuerpo.data) ? cuerpo.data : cuerpo;
  const totales = esObjeto(datos.totals) ? { ...datos, ...datos.totals } : datos;
  return {
    username: typeof datos.username === 'string' ? datos.username : usuario,
    total: numero(totales, ['total_contributions', 'totalContributions', 'total']),
    commits: numero(totales, ['commits', 'total_commits', 'totalCommits']),
    pullRequests: numero(totales, ['pull_requests', 'pullRequests', 'prs', 'total_prs']),
    merges: numero(totales, ['merges', 'merged_pull_requests', 'mergedPullRequests', 'merged']),
    includesPrivate: typeof datos.includes_private === 'boolean' ? datos.includes_private : null,
    updatedAt: typeof datos.updated_at === 'string' ? datos.updated_at : null,
    contributions: leerContribuciones(
      datos.contributions ?? datos.heatmap ?? datos.contribution_calendar ?? datos.calendar,
    ),
  };
}

/** Corta el pedido si lo pide quien llama o si pasa el tiempo maximo. */
function conLimite(senal?: AbortSignal): { senal: AbortSignal; soltar: () => void } {
  const corte = new AbortController();
  const cortar = (): void => corte.abort();
  const reloj = setTimeout(cortar, ESPERA_MAXIMA_MS);
  if (senal?.aborted) cortar();
  senal?.addEventListener('abort', cortar, { once: true });
  return {
    senal: corte.signal,
    soltar: () => {
      clearTimeout(reloj);
      senal?.removeEventListener('abort', cortar);
    },
  };
}

export const proveedorDelSitio: ProveedorDeActividad = {
  async leer(usuario, senal) {
    const limite = conLimite(senal);
    try {
      const respuesta = await fetch(recurso(ARCHIVO), {
        headers: { Accept: 'application/json' },
        signal: limite.senal,
      });
      if (!respuesta.ok) throw new Error(`estado-${respuesta.status}`);
      return interpretarActividad(await respuesta.json(), usuario);
    } finally {
      limite.soltar();
    }
  },
};
