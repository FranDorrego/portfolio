/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: estadisticas-de-github.mjs    Project: portfolio                   */
/*   Created: 2026/11/25 22:22:29  by claude                                  */
/*   Updated: 2026/11/25 22:29:50  by vm                                      */
/* ************************************************************************** */

/**
 * Escribe public/github-stats.json con la actividad real de GitHub: commits, pull requests,
 * merges y el mapa de contribuciones del ultimo anio. Lo corre la accion de GitHub en cada push
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

/** Una consulta por anio (GitHub no deja pedir mas de un anio por vez), todas en un pedido. */
export function consulta(desde, hasta) {
  const anios = [];
  for (let anio = desde; anio <= hasta; anio++) {
    anios.push(
      `a${anio}: contributionsCollection(from: "${anio}-01-01T00:00:00Z", ` +
        `to: "${anio}-12-31T23:59:59Z") { totalCommitContributions }`,
    );
  }
  return `query($usuario: String!, $prs: String!, $merges: String!) {
    viewer { login }
    user(login: $usuario) {
      ${anios.join('\n      ')}
      contributionsCollection {
        contributionCalendar { weeks { contributionDays { date contributionCount } } }
      }
    }
    prs: search(query: $prs, type: ISSUE) { issueCount }
    merges: search(query: $merges, type: ISSUE) { issueCount }
  }`;
}

/** De la respuesta de GitHub al archivo que lee el sitio. */
export function resumir({ datos, usuario, ahora }) {
  const anios = Object.entries(datos.user).filter(([clave]) => /^a\d{4}$/.test(clave));
  const dias = datos.user.contributionsCollection.contributionCalendar.weeks
    .flatMap((semana) => semana.contributionDays)
    .map((dia) => ({ date: dia.date, count: dia.contributionCount }));
  return {
    username: usuario,
    updated_at: ahora.toISOString(),
    includes_private: datos.viewer.login.toLowerCase() === usuario.toLowerCase(),
    commits: anios.reduce((suma, [, anio]) => suma + anio.totalCommitContributions, 0),
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
  // La cuenta existe desde 2023: antes no hay nada que sumar.
  const datos = await pedir(token, consulta(2023, ahora.getUTCFullYear()), {
    usuario: USUARIO,
    prs: `author:${USUARIO} is:pr`,
    merges: `author:${USUARIO} is:pr is:merged`,
  });
  const resumen = resumir({ datos, usuario: USUARIO, ahora });
  mkdirSync(path.dirname(SALIDA), { recursive: true });
  writeFileSync(SALIDA, `${JSON.stringify(resumen)}\n`);
  console.log(
    `estadisticas: ${resumen.commits} commits, ${resumen.pull_requests} PR, ` +
      `${resumen.merges} merges (${resumen.includes_private ? 'con' : 'sin'} privados)`,
  );
}
