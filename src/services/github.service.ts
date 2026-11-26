/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: github.service.ts    Project: portfolio                            */
/*   Created: 2026/11/25 21:30:00  by claude                                  */
/*   Updated: 2026/11/26 01:39:12  by vm                                      */
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
import type {
  ActividadDeGithub,
  DiaDeContribuciones,
  PeriodoDeGithub,
  ProveedorDeActividad,
} from '@/types/github';

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

function unDia(fecha: unknown, cantidad: unknown, nivel?: unknown): DiaDeContribuciones | null {
  if (typeof fecha !== 'string' || !FECHA.test(fecha)) return null;
  if (typeof cantidad !== 'number' || !Number.isFinite(cantidad) || cantidad < 0) return null;
  const dia: DiaDeContribuciones = { date: fecha.slice(0, 10), count: Math.round(cantidad) };
  if (nivel === 0 || nivel === 1 || nivel === 2 || nivel === 3 || nivel === 4) dia.level = nivel;
  return dia;
}

/** Acepta una lista `[{ date, count }]` o un diccionario `{ 'AAAA-MM-DD': n }`. */
export function leerContribuciones(crudo: unknown): DiaDeContribuciones[] {
  let dias: (DiaDeContribuciones | null)[] = [];
  if (Array.isArray(crudo)) {
    dias = crudo.map((fila) =>
      esObjeto(fila)
        ? unDia(
            fila.date ?? fila.fecha,
            fila.count ?? fila.contributionCount ?? fila.cantidad,
            fila.level,
          )
        : null,
    );
  } else if (esObjeto(crudo)) {
    dias = Object.entries(crudo).map(([fecha, cantidad]) => unDia(fecha, cantidad));
  }
  return dias
    .filter((dia): dia is DiaDeContribuciones => dia !== null)
    .sort((a, b) => a.date.localeCompare(b.date));
}

/** Las cifras y el mapa de un periodo. */
export function leerPeriodo(clave: string, datos: Objeto): PeriodoDeGithub {
  return {
    clave,
    total: numero(datos, ['total_contributions', 'totalContributions', 'total']),
    commits: numero(datos, ['commits', 'total_commits', 'totalCommits']),
    pullRequests: numero(datos, ['pull_requests', 'pullRequests', 'prs', 'total_prs']),
    merges: numero(datos, ['merges', 'merged_pull_requests', 'mergedPullRequests', 'merged']),
    repos: numero(datos, ['repos', 'repositories', 'total_repos']),
    contributions: leerContribuciones(
      datos.contributions ?? datos.heatmap ?? datos.contribution_calendar ?? datos.calendar,
    ),
  };
}

/** El ultimo anio primero y despues los anios, del mas nuevo al mas viejo. */
function leerPeriodos(crudo: unknown, actual: PeriodoDeGithub): PeriodoDeGithub[] {
  if (!esObjeto(crudo)) return [actual];
  const anios = Object.keys(crudo)
    .filter((clave) => /^\d{4}$/.test(clave) && esObjeto(crudo[clave]))
    .sort((a, b) => b.localeCompare(a))
    .map((clave) => leerPeriodo(clave, crudo[clave] as Objeto));
  const ultimo = esObjeto(crudo.ultimo) ? leerPeriodo('ultimo', crudo.ultimo) : actual;
  return [ultimo, ...anios];
}

/** Convierte la respuesta de la API en lo que usa la interfaz. Tira si no es un objeto. */
export function interpretarActividad(cuerpo: unknown, usuario: string): ActividadDeGithub {
  if (!esObjeto(cuerpo)) throw new Error('respuesta-invalida');
  if (cuerpo.success === false) throw new Error('respuesta-con-error');
  const datos = esObjeto(cuerpo.data) ? cuerpo.data : cuerpo;
  const totales = esObjeto(datos.totals) ? { ...datos, ...datos.totals } : datos;
  const actual = leerPeriodo('ultimo', totales);
  return {
    username: typeof datos.username === 'string' ? datos.username : usuario,
    periodos: leerPeriodos(datos.periods, actual),
    total: actual.total,
    commits: actual.commits,
    pullRequests: actual.pullRequests,
    merges: actual.merges,
    includesPrivate: typeof datos.includes_private === 'boolean' ? datos.includes_private : null,
    updatedAt: typeof datos.updated_at === 'string' ? datos.updated_at : null,
    contributions: actual.contributions,
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
