/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: grilla.tsx    Project: portfolio                                   */
/*   Created: 2026/11/27 17:39:36  by vm                                      */
/*   Updated: 2026/11/27 17:39:46  by vm                                      */
/* ************************************************************************** */

/** La tarjeta de un CV y la grilla de tarjetas: nombre, tipo, idioma, fecha y sus acciones. */

import { FileDown, FileText, Globe, Mail, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cvParaAts } from '@/data/perfil';
import { cn } from '@/lib/class-names';
import { api } from './api';
import { fecha } from './formato';
import { RehacerCv } from './rehacer-cv';
import { IDIOMAS, type Cv } from './tipos';

const TIPOS: Record<Cv['tipo'], string> = {
  generado: 'Adaptado',
  subido: 'Subido',
  base: 'Base ATS',
  sitio: 'Del sitio',
};

function TarjetaDeCv({ cv, alCambiar }: { cv: Cv; alCambiar: () => void }): JSX.Element {
  const borrable = cv.tipo === 'subido' || cv.tipo === 'generado';
  const publico = cv.tipo === 'base' && (cv.idioma === 'es' || cv.idioma === 'pt');
  return (
    <li className="flex flex-col gap-4 rounded-xl border border-border bg-card p-4">
      <div className="flex items-start gap-3">
        <span
          aria-hidden
          className={cn(
            'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border',
            'bg-background text-primary',
          )}
        >
          <FileText className="h-5 w-5" />
        </span>
        <span className="min-w-0">
          <span className="block font-medium leading-snug">{cv.nombre}</span>
          <span className="mt-1 flex flex-wrap gap-x-2 gap-y-1 font-mono text-xs text-muted-foreground">
            <span>{TIPOS[cv.tipo]}</span>
            <span>{IDIOMAS[cv.idioma]}</span>
            <span>{fecha(cv.creado)}</span>
          </span>
        </span>
      </div>
      {publico && (
        <a
          href={cvParaAts(cv.idioma as 'es' | 'pt')}
          target="_blank"
          rel="noreferrer"
          className={cn(
            'inline-flex w-fit items-center gap-1.5 rounded-full border border-success/40',
            'bg-success/10 px-2.5 py-0.5 text-xs text-success hover:underline',
          )}
        >
          <Globe aria-hidden className="h-3.5 w-3.5" />
          Pública en el sitio
        </a>
      )}
      <div className="mt-auto flex flex-wrap gap-2">
        <Button asChild size="sm" variant="outline">
          <a href={api.descargaDelPdf(cv.id)}>
            <FileDown aria-hidden />
            PDF
          </a>
        </Button>
        {cv.carta && (
          <Button asChild size="sm" variant="outline">
            <a href={api.descargaDeLaCarta(cv.id)}>
              <Mail aria-hidden />
              Carta
            </a>
          </Button>
        )}
        {cv.tipo === 'generado' && <RehacerCv cv={cv} alRehacer={alCambiar} />}
        {borrable && (
          <Button
            size="sm"
            variant="ghost"
            className="ml-auto"
            aria-label={`Borrar ${cv.nombre}`}
            onClick={async () => {
              if (!window.confirm(`¿Borrar «${cv.nombre}»?`)) return;
              await api.borrarCv(cv.id);
              alCambiar();
            }}
          >
            <Trash2 aria-hidden />
          </Button>
        )}
      </div>
    </li>
  );
}

export function Grilla({ cvs, alCambiar }: { cvs: Cv[]; alCambiar: () => void }): JSX.Element {
  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {cvs.map((cv) => (
        <TarjetaDeCv key={cv.id} cv={cv} alCambiar={alCambiar} />
      ))}
    </ul>
  );
}
