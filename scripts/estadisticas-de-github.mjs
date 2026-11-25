/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: estadisticas-de-github.mjs    Project: portfolio                   */
/*   Created: 2026/11/25 22:22:29  by claude                                  */
/*   Updated: 2026/11/25 22:41:53  by vm                                      */
/* ************************************************************************** */

/**
 * Escribe public/github-stats.json con la actividad real de GitHub del ultimo anio: el total
 * de contribuciones, commits, pull requests, merges y el mapa dia por dia. Lo corre la accion de GitHub en cada push
 * y una vez por dia, y guarda el archivo en el repositorio: asi el sitio se mantiene al dia solo.
 *
 *   GITHUB_TOKEN=... node scripts/estadisticas-de-github.mjs
 *
 * Con el token de la accion solo se ve la actividad publica. Con un token personal del propio
 * usuario (secreto GH_STATS_TOKEN) entran tambien los repositorios privados. El archivo dice cual
 * de los dos casos es (`includes_private`), y si algo falla no se escribe nada: el sitio muestra
 * «no se pudo leer» antes que una cifra inventada.
 */

import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const USUARIO = process.env.GITHUB_STATS_USER ?? 'FranDorrego';
const SALIDA = path.resolve(import.meta.dirname, '../public/github-stats.json');

/** Todo en un pedido: el ultimo anio de contribuciones y los pull requests desde esa fecha. */
export const CONSULTA = `query($usuario: String!, $prs: String!, $merges: String!) {
  viewer { login }
  user(login: $usuario) {
    contributionsCollection {
      totalCommitContributions
      contributionCalendar {
        totalContributions
        weeks { contributionDays { date contributionCount } }
      }
    }
  }
  prs: search(query: $prs, type: ISSUE) { issueCount }
  merges: search(query: $merges, type: ISSUE) { issueCount }
}`;

/** Hace un anio, como AAAA-MM-DD: desde cuando se cuentan los pull requests. */
export function haceUnAnio(ahora) {
  const fecha = new Date(ahora);
  fecha.setUTCFullYear(fecha.getUTCFullYear() - 1);
  return fecha.toISOString().slice(0, 10);
}

/** De la respuesta de GitHub al archivo que lee el sitio. */
export function resumir({ datos, usuario, ahora }) {
  const coleccion = datos.user.contributionsCollection;
  const dias = coleccion.contributionCalendar.weeks
    .flatMap((semana) => semana.contributionDays)
    .map((dia) => ({ date: dia.date, count: dia.contributionCount }));
  return {
    username: usuario,
    updated_at: ahora.toISOString().slice(0, 10),
    includes_private: datos.viewer.login.toLowerCase() === usuario.toLowerCase(),
    total_contributions: coleccion.contributionCalendar.totalContributions,
    commits: coleccion.totalCommitContributions,
    pull_requests: datos.prs.issueCount,
    merges: datos.merges.issueCount,
    contributions: dias,
  };
}

async function pedir(token, query, variables) {
  const respuesta = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'User-Agent': 'portfolio-stats' },
    body: JSON.stringify({ query, variables }),
    signal: AbortSignal.timeout(30_000),
  });
  const cuerpo = await respuesta.json();
  if (!respuesta.ok || cuerpo.errors) {
    throw new Error(
      `GitHub respondio ${respuesta.status}: ${JSON.stringify(cuerpo.errors ?? cuerpo)}`,
    );
  }
  return cuerpo.data;
}

if (process.argv[1] && path.resolve(process.argv[1]) === import.meta.filename) {
  const token = process.env.GH_STATS_TOKEN || process.env.GITHUB_TOKEN;
  if (!token) {
    console.error('estadisticas: falta GITHUB_TOKEN (o GH_STATS_TOKEN). No se escribio nada.');
    process.exit(1);
  }
  const ahora = new Date();
  const desde = haceUnAnio(ahora);
  const datos = await pedir(token, CONSULTA, {
    usuario: USUARIO,
    prs: `author:${USUARIO} is:pr created:>=${desde}`,
    merges: `author:${USUARIO} is:pr is:merged merged:>=${desde}`,
  });
  const resumen = resumir({ datos, usuario: USUARIO, ahora });
  mkdirSync(path.dirname(SALIDA), { recursive: true });
  writeFileSync(SALIDA, `${JSON.stringify(resumen)}\n`);
  console.log(
    `estadisticas: ${resumen.total_contributions} contribuciones, ` +
      `${resumen.commits} commits, ${resumen.pull_requests} PR, ` +
      `${resumen.merges} merges (${resumen.includes_private ? 'con' : 'sin'} privados)`,
  );
}
