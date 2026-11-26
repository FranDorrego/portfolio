/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: idioma-inicial.ts    Project: portfolio                            */
/*   Created: 2026/11/25 22:17:56  by claude                                  */
/*   Updated: 2026/11/26 01:41:37  by vm                                      */
/* ************************************************************************** */

/** Con que idioma arranca la visita: el de la ruta, el elegido antes o el espanol. */

import { direccionDe, idiomaDeLaRuta } from '@/lib/raiz';
import { IDIOMA_POR_DEFECTO, esIdioma, type Idioma } from './idiomas';

export const CLAVE_DE_IDIOMA = 'portfolio-idioma';

function idiomaGuardado(): Idioma | null {
  try {
    const valor = window.localStorage.getItem(CLAVE_DE_IDIOMA);
    return esIdioma(valor) ? valor : null;
  } catch {
    // Con el almacenamiento bloqueado no hay eleccion previa que leer.
    return null;
  }
}

/** Lo que delata a un buscador o a un agente: ven siempre el espanol, que es la canonica. */
const ROBOTS = /bot|crawl|spider|slurp|preview|lighthouse|headless|gptbot|claude|perplexity/i;

/**
 * El idioma del equipo de la persona: espanol si lo tiene en espanol; portugues si lo tiene en
 * portugues o en ingles (el sitio no tiene ingles y la mayoria de esas visitas son de Portugal).
 * Se mira la lista entera de idiomas, en orden; si ninguno es de esos tres, espanol.
 */
export function idiomaDelNavegador(idiomas: readonly string[]): Idioma {
  for (const idioma of idiomas) {
    const codigo = idioma.toLowerCase();
    if (codigo.startsWith('es')) return 'es';
    if (codigo.startsWith('pt') || codigo.startsWith('en')) return 'pt';
  }
  return IDIOMA_POR_DEFECTO;
}

/** La ruta (`/pt/`) manda; despues lo elegido antes; despues el idioma del equipo. */
export function idiomaInicial(): Idioma {
  if (typeof window === 'undefined') return IDIOMA_POR_DEFECTO;
  const deLaRuta = idiomaDeLaRuta(window.location.pathname);
  if (deLaRuta) return deLaRuta;
  if (ROBOTS.test(navigator.userAgent)) return IDIOMA_POR_DEFECTO;
  const idiomas = navigator.languages?.length ? navigator.languages : [navigator.language];
  return idiomaGuardado() ?? idiomaDelNavegador(idiomas.filter(Boolean));
}

/** Recuerda la eleccion y deja en la barra la direccion de ese idioma, sin recargar. */
export function guardarIdioma(idioma: Idioma): void {
  try {
    window.localStorage.setItem(CLAVE_DE_IDIOMA, idioma);
  } catch {
    // Sin almacenamiento la eleccion vale solo para esta visita.
  }
  mostrarEnLaDireccion(idioma);
}

/** La direccion de la barra siempre es la del idioma que se esta viendo. */
export function mostrarEnLaDireccion(idioma: Idioma): void {
  const destino = direccionDe(idioma) + window.location.hash;
  if (destino !== window.location.href) window.history.replaceState(null, '', destino);
}
