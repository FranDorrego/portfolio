/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: hero.tsx    Project: portfolio                                     */
/*   Created: 2026/11/25 22:27:55  by claude                                  */
/*   Updated: 2026/11/26 01:47:16  by vm                                      */
/* ************************************************************************** */

/**
 * La primera pantalla, con el formato de las portadas de ArduMaker: ocupa todo el alto, titulo
 * grande, una sola accion y la actividad de GitHub a la derecha. Abajo, una flecha lleva a lo
 * que sigue.
 */

import { ChevronDown, Download, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HAY_CV, RUTA_DEL_CV, TITULOS_DEL_HERO } from '@/data/perfil';
import { useIdioma } from '@/i18n';
import { cn } from '@/lib/class-names';
import { CONTENEDOR_DE_PAGINA } from '@/lib/movimiento';
import { recurso } from '@/lib/raiz';
import { UbicacionYEstado } from '@/components/layout/barra';
import { SelectorDeIdioma } from '@/components/layout/selector-de-idioma';
import { SelectorDeTema } from '@/components/layout/selector-de-tema';
import { ActividadDeGithub } from './actividad-de-github';
import { FotoDePerfil } from './foto-de-perfil';
import { MaquinaDeEscribir } from './maquina-de-escribir';

export function Hero(): JSX.Element {
  const { t } = useIdioma();
  return (
    <section
      id="inicio"
      aria-labelledby="inicio-titulo"
      className={cn('relative flex min-h-[75svh] flex-col overflow-hidden')}
    >
      <div
        aria-hidden
        className={cn(
          'rejilla-tecnica absolute inset-0',
          '[mask-image:linear-gradient(to_bottom,black,transparent_85%)]',
        )}
      />
      <div
        className={cn(
          CONTENEDOR_DE_PAGINA,
          'relative grid flex-1 content-center gap-10 pb-10 pt-5 lg:py-10 xl:items-center xl:gap-10',
          'xl:grid-cols-[minmax(0,1fr)_minmax(0,40rem)]',
        )}
      >
        <div>
          {/* En el celular no hay barra arriba hasta que se baja: esto va aca. */}
          <div className="mb-6 flex items-center justify-between gap-3 lg:hidden">
            <UbicacionYEstado />
            <div className="flex shrink-0 items-center gap-1">
              <SelectorDeIdioma />
              <SelectorDeTema />
            </div>
          </div>
          <FotoDePerfil className="h-24 w-24 sm:h-28 sm:w-28" />
          <h1
            id="inicio-titulo"
            className={cn(
              'mt-6 whitespace-nowrap text-[clamp(2.25rem,10.5vw,3.75rem)] font-bold',
              'leading-[1.05] tracking-tight text-foreground lg:text-5xl',
            )}
          >
            Franco Dorrego
          </h1>
          <p className="mt-3 text-xl font-medium text-foreground/90 sm:text-2xl">
            {t.hero.subtitulo}
          </p>
          <div className="mt-2">
            <MaquinaDeEscribir titulos={TITULOS_DEL_HERO} />
          </div>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-muted-foreground">
            {t.hero.descripcion}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <a href="#contacto">
                <Mail aria-hidden />
                {t.hero.contactar}
              </a>
            </Button>
            {HAY_CV && (
              <Button asChild size="lg" variant="outline">
                <a href={recurso(RUTA_DEL_CV)} download>
                  <Download aria-hidden />
                  {t.hero.descargarCv}
                </a>
              </Button>
            )}
          </div>
        </div>
        <ActividadDeGithub />
      </div>
      <a
        href="#proyectos"
        aria-label={t.hero.verProyectos}
        className={cn(
          'relative mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full',
          'text-muted-foreground transition-colors hover:text-foreground',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        )}
      >
        <ChevronDown aria-hidden className="flecha-de-scroll h-6 w-6" />
      </a>
    </section>
  );
}
