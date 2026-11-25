/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: hero.tsx    Project: portfolio                                     */
/*   Created: 2026/11/25 21:30:00  by claude                                  */
/*   Updated: 2026/11/25 21:30:00  by claude                                  */
/* ************************************************************************** */

/** La primera pantalla: identidad a la izquierda y la actividad de GitHub a la derecha. */

import { ArrowRight, Download, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ETIQUETAS_DEL_HERO, HAY_CV, ROLES, RUTA_DEL_CV } from '@/data/perfil';
import { recurso } from '@/lib/raiz';
import { useIdioma } from '@/i18n';
import { cn } from '@/lib/class-names';
import { CONTENEDOR_DE_PAGINA } from '@/lib/movimiento';
import { ActividadDeGithub } from './actividad-de-github';
import { TextoQueSeEscribe } from './texto-que-se-escribe';

export function Hero(): JSX.Element {
  const { t } = useIdioma();
  return (
    <section id="inicio" aria-labelledby="inicio-titulo" className="relative overflow-hidden">
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
          'relative grid gap-12 py-14 sm:py-20 lg:items-center lg:gap-16 lg:py-28',
          'lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]',
        )}
      >
        <div>
          <h1
            id="inicio-titulo"
            className={cn(
              'text-[2.75rem] font-bold leading-[1.05] tracking-tight text-foreground',
              'sm:text-6xl',
            )}
          >
            Franco Dorrego
          </h1>
          <p className="mt-3 text-xl font-medium text-foreground/90 sm:text-2xl">
            {t.hero.subtitulo}
          </p>
          <div className="mt-3">
            <TextoQueSeEscribe textos={ROLES} leyenda={t.hero.rolesLeyenda} />
          </div>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-muted-foreground">
            {t.hero.descripcion}
          </p>
          <ul aria-label={t.hero.etiquetas} className="mt-6 flex flex-wrap gap-2">
            {ETIQUETAS_DEL_HERO.map((etiqueta) => (
              <li
                key={etiqueta}
                className={cn(
                  'rounded-md border border-border bg-card px-2.5 py-1 font-mono text-xs',
                  'text-foreground/90',
                )}
              >
                {etiqueta}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="px-6">
              <a href="#proyectos">
                {t.hero.verProyectos}
                <ArrowRight aria-hidden />
              </a>
            </Button>
            {HAY_CV && (
              <Button asChild size="lg" variant="outline" className="px-6">
                <a href={recurso(RUTA_DEL_CV)} download>
                  <Download aria-hidden />
                  {t.hero.descargarCv}
                </a>
              </Button>
            )}
            <Button asChild size="lg" variant="outline" className="px-6">
              <a href="#contacto">
                <Mail aria-hidden />
                {t.hero.contactar}
              </a>
            </Button>
          </div>
        </div>
        <ActividadDeGithub />
      </div>
    </section>
  );
}
