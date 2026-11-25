/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: idioma-inicial.ts    Project: portfolio                            */
/*   Created: 2026/11/25 22:17:56  by claude                                  */
/*   Updated: 2026/11/25 22:25:17  by claude                                  */
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

/** La ruta (`/pt/`) manda sobre lo guardado; sin nada, espanol. */
export function idiomaInicial(): Idioma {
  if (typeof window === 'undefined') return IDIOMA_POR_DEFECTO;
  return idiomaDeLaRuta(window.location.pathname) ?? idiomaGuardado() ?? IDIOMA_POR_DEFECTO;
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
