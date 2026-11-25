/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: use-abrir-proyecto.ts    Project: portfolio                        */
/*   Created: 2026/11/25 21:30:00  by claude                                  */
/*   Updated: 2026/11/25 21:30:00  by claude                                  */
/* ************************************************************************** */

/** Abrir el detalle de un proyecto desde cualquier parte de la pagina. */

import { createContext, useContext } from 'react';

export const ContextoDeDetalle = createContext<((id: string) => void) | null>(null);

export function useAbrirProyecto(): (id: string) => void {
  const abrir = useContext(ContextoDeDetalle);
  if (!abrir) throw new Error('useAbrirProyecto se usa adentro de <ProveedorDeDetalle>');
  return abrir;
}
