/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: inicio.tsx    Project: portfolio                                   */
/*   Created: 2026/11/25 21:30:00  by claude                                  */
/*   Updated: 2026/11/25 21:30:00  by claude                                  */
/* ************************************************************************** */

/** La pagina: una sola experiencia vertical, seccion por seccion. */

import { lazy, Suspense } from 'react';
import { Hero } from '@/components/hero/hero';
import { Barra } from '@/components/layout/barra';
import { Pie } from '@/components/layout/pie';
import { ProveedorDeDetalle } from '@/components/proyectos/proveedor-de-detalle';
import { SeccionDeProyectos } from '@/components/proyectos/seccion-de-proyectos';
import { SeccionSobreMi } from '@/components/sobre-mi/seccion-sobre-mi';
import { SeccionDeContacto } from '@/components/contacto/seccion-de-contacto';
import { useMetadatos } from '@/hooks/use-metadatos';
import { useIdioma } from '@/i18n';
import { cn } from '@/lib/class-names';

// El acordeon trae su propia libreria y esta lejos del primer pantallazo: baja aparte.
const SeccionDePreguntas = lazy(() =>
  import('@/components/preguntas/seccion-de-preguntas').then((modulo) => ({
    default: modulo.SeccionDePreguntas,
  })),
);

export function Inicio(): JSX.Element {
  const { t } = useIdioma();
  useMetadatos();
  return (
    <ProveedorDeDetalle>
      <a
        href="#contenido"
        className={cn(
          'sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50',
          'focus:rounded-md focus:bg-card focus:px-3 focus:py-2 focus:text-sm',
          'focus:ring-2 focus:ring-ring',
        )}
      >
        {t.comun.saltar}
      </a>
      <Barra />
      <main id="contenido">
        <Hero />
        <SeccionDeProyectos />
        <SeccionSobreMi />
        <Suspense fallback={<div id="faq" className="min-h-96 border-t border-border" />}>
          <SeccionDePreguntas />
        </Suspense>
        <SeccionDeContacto />
      </main>
      <Pie />
    </ProveedorDeDetalle>
  );
}
