/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: proveedor-de-idioma.tsx    Project: portfolio                      */
/*   Created: 2026/11/25 21:30:00  by claude                                  */
/*   Updated: 2026/11/25 21:30:00  by claude                                  */
/* ************************************************************************** */

/**
 * El idioma del portafolio. Todos los textos de la interfaz salen de `es.ts` y `pt.ts`, que
 * tienen la misma forma (lo comprueba TypeScript): no hay traduccion a medias ni componentes
 * duplicados por idioma.
 */

import { useCallback, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { es, type Textos } from './es';
import { pt } from './pt';
import { guardarIdioma, idiomaInicial, mostrarEnLaDireccion } from './idioma-inicial';
import { ETIQUETA_DE_IDIOMA, type Idioma } from './idiomas';
import { ContextoDeIdioma, type ValorDeIdioma } from './use-idioma';

const DICCIONARIOS: Record<Idioma, Textos> = { es, pt };

interface Props {
  children: ReactNode;
  /** Para las pruebas: arrancar en un idioma dado. */
  inicial?: Idioma;
}

export function ProveedorDeIdioma({ children, inicial }: Props): JSX.Element {
  const [idioma, setIdioma] = useState<Idioma>(() => inicial ?? idiomaInicial());

  useEffect(() => {
    document.documentElement.lang = ETIQUETA_DE_IDIOMA[idioma];
    mostrarEnLaDireccion(idioma);
  }, [idioma]);

  const cambiarIdioma = useCallback((nuevo: Idioma): void => {
    guardarIdioma(nuevo);
    setIdioma(nuevo);
  }, []);

  const valor = useMemo<ValorDeIdioma>(
    () => ({
      idioma,
      cambiarIdioma,
      t: DICCIONARIOS[idioma],
      leer: (texto) => texto[idioma],
    }),
    [idioma, cambiarIdioma],
  );

  return <ContextoDeIdioma.Provider value={valor}>{children}</ContextoDeIdioma.Provider>;
}
