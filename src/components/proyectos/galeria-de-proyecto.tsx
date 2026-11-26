/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: galeria-de-proyecto.tsx    Project: portfolio                      */
/*   Created: 2026/11/25 21:30:00  by claude                                  */
/*   Updated: 2026/11/26 01:49:29  by vm                                      */
/* ************************************************************************** */

/** Las capturas de un proyecto, de a una, con anterior / siguiente y las flechas del teclado. */

import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { recurso } from '@/lib/raiz';
import { useIdioma } from '@/i18n';
import { ENTRADA_DE_VISTA } from '@/lib/movimiento';
import type { Proyecto } from '@/types/proyecto';
import { rellenar } from '@/utils/texto';
import { PortadaDeProyecto } from './portada-de-proyecto';
import { cn } from '@/lib/class-names';

export function GaleriaDeProyecto({ proyecto }: { proyecto: Proyecto }): JSX.Element {
  const { t, leer } = useIdioma();
  const [indice, setIndice] = useState(0);
  // En el celular se pasa de imagen deslizando el dedo.
  const inicioDelToque = useRef<number | null>(null);
  const capturas = proyecto.screenshots;

  if (capturas.length === 0) {
    return <PortadaDeProyecto proyecto={proyecto} className="rounded-lg border border-border" />;
  }

  const total = capturas.length;
  const ir = (paso: number): void => setIndice((n) => (n + paso + total) % total);
  const actual = capturas[indice];

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label={t.detalle.capturas}
      onTouchStart={(evento) => {
        inicioDelToque.current = evento.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(evento) => {
        const desde = inicioDelToque.current;
        const hasta = evento.changedTouches[0]?.clientX;
        inicioDelToque.current = null;
        if (desde === null || hasta === undefined || Math.abs(hasta - desde) < 40) return;
        ir(hasta < desde ? 1 : -1);
      }}
      onKeyDown={(evento) => {
        if (evento.key === 'ArrowLeft') ir(-1);
        if (evento.key === 'ArrowRight') ir(1);
      }}
    >
      <img
        key={actual.src}
        src={recurso(actual.src)}
        alt={leer(actual.alt)}
        loading="lazy"
        decoding="async"
        className={cn(
          'aspect-[16/9] w-full rounded-lg border border-border bg-background object-contain',
          ENTRADA_DE_VISTA,
        )}
      />
      {total > 1 && (
        <div className="mt-3 flex items-center justify-between gap-3">
          <Button
            variant="outline"
            size="icon"
            onClick={() => ir(-1)}
            aria-label={t.detalle.anterior}
          >
            <ChevronLeft aria-hidden />
          </Button>
          <p aria-live="polite" className="font-mono text-xs text-muted-foreground">
            {rellenar(t.detalle.imagen, { actual: indice + 1, total })}
          </p>
          <Button
            variant="outline"
            size="icon"
            onClick={() => ir(1)}
            aria-label={t.detalle.siguiente}
          >
            <ChevronRight aria-hidden />
          </Button>
        </div>
      )}
    </div>
  );
}
