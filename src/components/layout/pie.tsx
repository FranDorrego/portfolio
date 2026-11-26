/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: pie.tsx    Project: portfolio                                      */
/*   Created: 2026/11/25 22:17:56  by claude                                  */
/*   Updated: 2026/11/26 16:57:53  by vm                                      */
/* ************************************************************************** */

/**
 * El pie de la pagina, con el CV en los formatos que leen las maquinas: HTML simple (ATS),
 * PDF, JSON Resume (APIs) y Markdown (agentes de IA). Los escribe scripts/prerender.mjs.
 */

import { HAY_CV, rutaDelCv } from '@/data/perfil';
import { useIdioma } from '@/i18n';
import { cn } from '@/lib/class-names';
import { CONTENEDOR_DE_PAGINA } from '@/lib/movimiento';
import { recurso } from '@/lib/raiz';

function Formatos(): JSX.Element {
  const { t, idioma } = useIdioma();
  const pt = idioma === 'pt';
  const enlaces = [
    { texto: 'HTML', href: recurso(pt ? 'pt/cv/' : 'cv/') },
    ...(HAY_CV ? [{ texto: 'PDF', href: recurso(rutaDelCv(idioma)) }] : []),
    { texto: 'JSON Resume', href: recurso(pt ? 'resume-pt.json' : 'resume.json') },
    { texto: 'Markdown', href: recurso(pt ? 'pt/llms-full.txt' : 'llms-full.txt') },
  ];
  return (
    <nav aria-label={t.pie.formatos} className="flex flex-wrap items-center gap-x-3 gap-y-1">
      <span>{t.pie.formatos}:</span>
      {enlaces.map((enlace) => (
        <a
          key={enlace.texto}
          href={enlace.href}
          className={cn(
            'rounded underline-offset-4 hover:text-foreground hover:underline',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
          )}
        >
          {enlace.texto}
        </a>
      ))}
    </nav>
  );
}

export function Pie(): JSX.Element {
  const { t } = useIdioma();
  return (
    <footer className="border-t border-border">
      <div
        className={cn(
          CONTENEDOR_DE_PAGINA,
          'flex flex-wrap justify-between gap-2 py-8 text-sm text-muted-foreground',
        )}
      >
        <p>{t.pie.firma}</p>
        <Formatos />
        <p className="font-mono text-xs">v{__VERSION__}</p>
      </div>
    </footer>
  );
}
