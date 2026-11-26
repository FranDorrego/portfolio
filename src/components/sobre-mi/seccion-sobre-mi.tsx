/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: seccion-sobre-mi.tsx    Project: portfolio                         */
/*   Created: 2026/11/25 22:17:56  by claude                                  */
/*   Updated: 2026/11/26 13:33:12  by vm                                      */
/* ************************************************************************** */

/** Sobre mi, en una mirada: un parrafo, los datos con icono y lo bueno junto a lo que mejorar. */

import {
  Bot,
  Building2,
  ClipboardCheck,
  Compass,
  Flag,
  Globe,
  GraduationCap,
  Languages,
  Layers,
  MapPin,
  Network,
  ThumbsUp,
  TrendingUp,
  User,
  Users,
  Zap,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Seccion } from '@/components/layout/seccion';
import { useIdioma } from '@/i18n';
import { cn } from '@/lib/class-names';

/** Un icono por renglon, en el mismo orden que los textos de `es.ts` y `pt.ts`. */
const ICONOS_DE_FORTALEZAS: LucideIcon[] = [Layers, Network, Bot, Compass, Zap, Globe];
const ICONOS_DE_MEJORAS: LucideIcon[] = [Languages, Building2, ClipboardCheck, Users];

interface PropsDeColumna {
  titulo: string;
  Icono: LucideIcon;
  renglones: string[];
  iconos: LucideIcon[];
}

/** Las dos columnas se dibujan igual: lo que mejorar no es una lista de defectos. */
function Columna({ titulo, Icono, renglones, iconos }: PropsDeColumna): JSX.Element {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground">
        <Icono aria-hidden className="h-4 w-4 text-primary" />
        {titulo}
      </h3>
      <ul className="mt-4 space-y-3">
        {renglones.map((renglon, indice) => {
          const IconoDelRenglon = iconos[indice] ?? Icono;
          return (
            <li key={renglon} className="flex items-center gap-3 text-foreground/90">
              <IconoDelRenglon aria-hidden className="h-4 w-4 shrink-0 text-muted-foreground" />
              {renglon}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function SeccionSobreMi(): JSX.Element {
  const { t } = useIdioma();
  const datos: [LucideIcon, string][] = [
    [Flag, t.sobreMi.datos.origen],
    [MapPin, t.sobreMi.datos.residencia],
    [Languages, t.sobreMi.datos.idiomas],
    [TrendingUp, t.sobreMi.datos.ingles],
    [GraduationCap, t.sobreMi.datos.formacion],
  ];
  return (
    <Seccion id="sobre-mi" titulo={t.sobreMi.titulo} Icono={User}>
      <p className="max-w-3xl text-lg leading-relaxed text-foreground/90">{t.sobreMi.resumen}</p>
      <ul className="mt-6 flex flex-wrap gap-2">
        {datos.map(([Icono, texto]) => (
          <li
            key={texto}
            className={cn(
              'flex items-center gap-2 rounded-md border border-border bg-card px-3 py-1.5',
              'text-sm text-foreground',
            )}
          >
            <Icono aria-hidden className="h-4 w-4 text-primary" />
            {texto}
          </li>
        ))}
      </ul>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <Columna
          titulo={t.sobreMi.fortalezasTitulo}
          Icono={ThumbsUp}
          renglones={t.sobreMi.fortalezas}
          iconos={ICONOS_DE_FORTALEZAS}
        />
        <Columna
          titulo={t.sobreMi.mejorasTitulo}
          Icono={TrendingUp}
          renglones={t.sobreMi.mejoras}
          iconos={ICONOS_DE_MEJORAS}
        />
      </div>
    </Seccion>
  );
}
