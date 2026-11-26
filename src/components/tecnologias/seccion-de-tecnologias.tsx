/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: seccion-de-tecnologias.tsx    Project: portfolio                   */
/*   Created: 2026/11/26 01:41:07  by vm                                      */
/*   Updated: 2026/11/26 01:41:07  by vm                                      */
/* ************************************************************************** */

/** Las tecnologias que uso, por grupo, con su icono; y el checker que me da un patron de trabajo. */

import { Cpu, ShieldCheck } from 'lucide-react';
import { Seccion } from '@/components/layout/seccion';
import { GRUPOS_DE_TECNOLOGIAS } from '@/data/tecnologias';
import { useIdioma } from '@/i18n';
import { recurso } from '@/lib/raiz';

export function SeccionDeTecnologias(): JSX.Element {
  const { t, leer } = useIdioma();
  return (
    <Seccion id="tecnologias" titulo={t.tecnologias.titulo} Icono={Cpu}>
      <div className="space-y-6">
        {GRUPOS_DE_TECNOLOGIAS.map((grupo) => (
          <div key={grupo.titulo.es}>
            <h3 className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              {leer(grupo.titulo)}
            </h3>
            <ul className="mt-2 flex flex-wrap gap-2">
              {grupo.tecnologias.map((tecnologia) => (
                <li
                  key={tecnologia.nombre}
                  className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground"
                >
                  <img
                    src={recurso(tecnologia.icono)}
                    alt=""
                    width={20}
                    height={20}
                    loading="lazy"
                    decoding="async"
                    className="h-5 w-5 object-contain"
                  />
                  {tecnologia.nombre}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-8 flex items-start gap-3 rounded-xl border border-primary/40 bg-primary/5 p-5">
        <ShieldCheck aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
        <div>
          <h3 className="font-semibold text-foreground">{t.tecnologias.checkerTitulo}</h3>
          <p className="mt-1 text-muted-foreground">{t.tecnologias.checker}</p>
        </div>
      </div>
    </Seccion>
  );
}
