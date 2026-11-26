/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: estadisticas-de-github.mjs    Project: portfolio                   */
/*   Created: 2026/11/25 22:27:55  by claude                                  */
/*   Updated: 2026/11/26 01:45:32  by vm                                      */
/* ************************************************************************** */

/**
 * Escribe public/github-stats.json con la actividad real de GitHub, como la muestra el perfil:
 * el ultimo anio y cada anio desde que existe la cuenta, con el total de contribuciones, el
 * mapa dia por dia, commits, pull requests, merges y en cuantos repositorios se trabajo. Lo
 * corre la accion de GitHub en cada push y una vez por dia, y guarda el archivo en el
 * repositorio: asi el sitio se mantiene al dia solo.
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

/** Los niveles de color de GitHub, del 0 al 4. */
const NIVELES = ['NONE', 'FIRST_QUARTILE', 'SECOND_QUARTILE', 'THIRD_QUARTILE', 'FOURTH_QUARTILE'];

/** Un periodo: el calendario, los totales y los repositorios con commits o pull requests. */
export const CONSULTA = `query($usuario: String!, $desde: DateTime!, $hasta: DateTime!,
    $prs: String!, $merges: String!) {
  viewer { login }
  user(login: $usuario) {
    createdAt
    contributionsCollection(from: $desde, to: $hasta) {
      totalCommitContributions
      commitContributionsByRepository(maxRepositories: 100) { repository { nameWithOwner } }
      pullRequestContributionsByRepository(maxRepositories: 100) {
        repository { nameWithOwner }
      }
      contributionCalendar {
        totalContributions
        weeks { contributionDays { date contributionCount contributionLevel } }
      }
    }
  }
  prs: search(query: $prs, type: ISSUE) { issueCount }
  merges: search(query: $merges, type: ISSUE) { issueCount }
}`;

const dia = (fecha) => fecha.toISOString().slice(0, 10);

/** Los periodos a pedir: el ultimo anio (como el perfil) y cada anio calendario. */
export function periodos({ ahora, primerAnio }) {
  const haceUnAnio = new Date(ahora);
  haceUnAnio.setUTCFullYear(haceUnAnio.getUTCFullYear() - 1);
  const lista = [{ clave: 'ultimo', desde: haceUnAnio, hasta: ahora }];
  for (let anio = ahora.getUTCFullYear(); anio >= primerAnio; anio--) {
    lista.push({
      clave: String(anio),
      desde: new Date(Date.UTC(anio, 0, 1)),
      hasta: anio === ahora.getUTCFullYear() ? ahora : new Date(Date.UTC(anio, 11, 31, 23, 59, 59)),
    });
  }
  return lista;
}

/** Lo que el sitio necesita de un periodo. */
export function resumirPeriodo(datos) {
  const coleccion = datos.user.contributionsCollection;
  const repos = new Set(
    [
      ...coleccion.commitContributionsByRepository,
      ...coleccion.pullRequestContributionsByRepository,
    ].map((fila) => fila.repository.nameWithOwner),
  );
  return {
    total_contributions: coleccion.contributionCalendar.totalContributions,
    commits: coleccion.totalCommitContributions,
    pull_requests: datos.prs.issueCount,
    merges: datos.merges.issueCount,
    repos: repos.size,
    contributions: coleccion.contributionCalendar.weeks
      .flatMap((semana) => semana.contributionDays)
      .map((celda) => ({
        date: celda.date,
        count: celda.contributionCount,
        level: NIVELES.indexOf(celda.contributionLevel),
      })),
  };
}

/** El archivo entero: el ultimo anio arriba (como antes) y todos los periodos adentro. */
export function armarArchivo({ usuario, ahora, incluyePrivados, resumenes }) {
  return {
    username: usuario,
    updated_at: dia(ahora),
    includes_private: incluyePrivados,
    ...resumenes.ultimo,
    periods: resumenes,
  };
}

async function pedir(token, variables) {
  const respuesta = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'User-Agent': 'portfolio-stats' },
    body: JSON.stringify({ query: CONSULTA, variables }),
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

function variables(periodo) {
  const rango = `${dia(periodo.desde)}..${dia(periodo.hasta)}`;
  return {
    usuario: USUARIO,
    desde: periodo.desde.toISOString(),
    hasta: periodo.hasta.toISOString(),
    prs: `author:${USUARIO} is:pr created:${rango}`,
    merges: `author:${USUARIO} is:pr is:merged merged:${rango}`,
  };
}

if (process.argv[1] && path.resolve(process.argv[1]) === import.meta.filename) {
  const token = process.env.GH_STATS_TOKEN || process.env.GITHUB_TOKEN;
  if (!token) {
    console.error('estadisticas: falta GITHUB_TOKEN (o GH_STATS_TOKEN). No se escribio nada.');
    process.exit(1);
  }
  const ahora = new Date();
  const [primero] = periodos({ ahora, primerAnio: ahora.getUTCFullYear() });
  const datos = await pedir(token, variables(primero));
  const primerAnio = new Date(datos.user.createdAt).getUTCFullYear();
  const todos = periodos({ ahora, primerAnio });
  const resumenes = { ultimo: resumirPeriodo(datos) };
  // Un pedido por anio, todos a la vez.
  const anios = await Promise.all(
    todos
      .slice(1)
      .map(async (periodo) => [
        periodo.clave,
        resumirPeriodo(await pedir(token, variables(periodo))),
      ]),
  );
  for (const [clave, resumen] of anios) resumenes[clave] = resumen;
  const archivo = armarArchivo({
    usuario: USUARIO,
    ahora,
    incluyePrivados: datos.viewer.login.toLowerCase() === USUARIO.toLowerCase(),
    resumenes,
  });
  mkdirSync(path.dirname(SALIDA), { recursive: true });
  writeFileSync(SALIDA, `${JSON.stringify(archivo)}\n`);
  for (const [clave, r] of Object.entries(resumenes)) {
    console.log(
      `estadisticas ${clave}: ${r.total_contributions} contribuciones, ${r.commits} commits, ` +
        `${r.pull_requests} PR, ${r.merges} merges, ${r.repos} repos`,
    );
  }
  console.log(`(${archivo.includes_private ? 'con' : 'sin'} repositorios privados)`);
}
