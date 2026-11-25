/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: proveedor-de-detalle.tsx    Project: portfolio                     */
/*   Created: 2026/11/25 21:30:00  by claude                                  */
/*   Updated: 2026/11/25 21:30:00  by claude                                  */
/* ************************************************************************** */

/**
 * Quien abre el detalle de un proyecto. Cualquier parte de la pagina (una tarjeta del catalogo,
 * un producto) llama a `abrir(id)`; la ventana se baja recien la primera vez que hace falta.
 */

import { Suspense, lazy, useCallback, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { PROYECTOS } from '@/data/proyectos';
import type { Proyecto } from '@/types/proyecto';
import { ContextoDeDetalle } from './use-abrir-proyecto';

const VentanaDeProyecto = lazy(() =>
  import('./ventana-de-proyecto').then((modulo) => ({ default: modulo.VentanaDeProyecto })),
);

export function ProveedorDeDetalle({ children }: { children: ReactNode }): JSX.Element {
  const [abierto, setAbierto] = useState<Proyecto | null>(null);
  // La ventana se monta al primer pedido y queda: asi puede animar tambien su cierre.
  const [pedida, setPedida] = useState(false);

  // Lo que tenia el foco al abrir: al cerrar se le devuelve (teclado y lectores de pantalla).
  const origen = useRef<HTMLElement | null>(null);

  const abrir = useCallback((id: string): void => {
    const proyecto = PROYECTOS.find((uno) => uno.id === id);
    if (!proyecto) return;
    origen.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setPedida(true);
    setAbierto(proyecto);
  }, []);
  const cerrar = useCallback((): void => setAbierto(null), []);
  const devolverFoco = useCallback((): void => origen.current?.focus(), []);

  return (
    <ContextoDeDetalle.Provider value={abrir}>
      {children}
      {pedida && (
        <Suspense fallback={null}>
          <VentanaDeProyecto proyecto={abierto} alCerrar={cerrar} alDevolverFoco={devolverFoco} />
        </Suspense>
      )}
    </ContextoDeDetalle.Provider>
  );
}
