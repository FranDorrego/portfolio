/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: inicio.tsx    Project: portfolio                                   */
/*   Created: 2026/11/25 21:30:00  by claude                                  */
/*   Updated: 2026/11/26 13:34:21  by vm                                      */
/* ************************************************************************** */

/** La pagina: una sola experiencia vertical, seccion por seccion. */

import { Hero } from '@/components/hero/hero';
import { Barra } from '@/components/layout/barra';
import { Pie } from '@/components/layout/pie';
import { ProveedorDeDetalle } from '@/components/proyectos/proveedor-de-detalle';
import { SeccionDeProyectos } from '@/components/proyectos/seccion-de-proyectos';
import { SeccionDeClientes } from '@/components/clientes/seccion-de-clientes';
import { SeccionSobreMi } from '@/components/sobre-mi/seccion-sobre-mi';
import { SeccionDeFormacion } from '@/components/formacion/seccion-de-formacion';
import { SeccionDeTecnologias } from '@/components/tecnologias/seccion-de-tecnologias';
import { SeccionDeContacto } from '@/components/contacto/seccion-de-contacto';
import { SeccionDePreguntas } from '@/components/preguntas/seccion-de-preguntas';
import { useMetadatos } from '@/hooks/use-metadatos';
import { useIdioma } from '@/i18n';
import { cn } from '@/lib/class-names';

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
        <SeccionDeClientes />
        <SeccionSobreMi />
        <SeccionDeFormacion />
        <SeccionDeTecnologias />
        <SeccionDePreguntas />
        <SeccionDeContacto />
      </main>
      <Pie />
    </ProveedorDeDetalle>
  );
}
