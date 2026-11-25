/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: use-idioma.ts    Project: portfolio                                */
/*   Created: 2026/11/25 21:30:00  by claude                                  */
/*   Updated: 2026/11/25 21:30:00  by claude                                  */
/* ************************************************************************** */

/** El contexto del idioma y el hook que lo lee. El proveedor esta en `index.tsx`. */

import { createContext, useContext } from 'react';
import type { Textos } from './es';
import type { Idioma, Texto } from './idiomas';

export interface ValorDeIdioma {
  idioma: Idioma;
  cambiarIdioma: (idioma: Idioma) => void;
  /** Los textos de la interfaz en el idioma actual. */
  t: Textos;
  /** Un texto del catalogo (que trae todos los idiomas) en el idioma actual. */
  leer: (texto: Texto) => string;
}

export const ContextoDeIdioma = createContext<ValorDeIdioma | null>(null);

export function useIdioma(): ValorDeIdioma {
  const valor = useContext(ContextoDeIdioma);
  if (!valor) throw new Error('useIdioma se usa adentro de <ProveedorDeIdioma>');
  return valor;
}
