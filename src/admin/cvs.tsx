/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: cvs.tsx    Project: portfolio                                      */
/*   Created: 2026/11/26 21:09:49  by vm                                      */
/*   Updated: 2026/11/26 21:42:38  by vm                                      */
/* ************************************************************************** */

/**
 * La pestana de CV: los del sitio (automaticos), el base para ATS, los que subo en PDF y los que
 * armo el agente para cada vacante. Arriba, el agente.
 */

import { useState, type FormEvent } from 'react';
import { FileDown, FileText, Globe, Mail, Trash2, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/class-names';
import { cvParaAts } from '@/data/perfil';
import { api } from './api';
import { AdaptarCv } from './adaptar-cv';
import { Rotulo, Titulo } from './marco';
import { Aviso, Campo, SelectorDeIdioma } from './campos';
import { ENTRADA, fecha } from './formato';
import { IDIOMAS, type Borrador, type Cv, type Idioma } from './tipos';

const GRUPOS: { tipo: Cv['tipo']; titulo: string }[] = [
  { tipo: 'sitio', titulo: 'Automáticos del sitio' },
  { tipo: 'base', titulo: 'Bases para ATS' },
  { tipo: 'generado', titulo: 'Adaptados a vacantes' },
  { tipo: 'subido', titulo: 'Subidos' },
];

function SubirCv({ alSubir }: { alSubir: () => void }): JSX.Element {
  const [nombre, setNombre] = useState('');
  const [idioma, setIdioma] = useState<Idioma>('es');
  const [archivo, setArchivo] = useState<File | null>(null);
  const [aviso, setAviso] = useState<string | null>(null);

  const enviar = async (evento: FormEvent): Promise<void> => {
    evento.preventDefault();
    if (!archivo) return;
    try {
      const cv = await api.crearCv(nombre || archivo.name.replace(/\.pdf$/i, ''), idioma);
      await api.subirPdf(cv.id, archivo);
      setNombre('');
      setArchivo(null);
      setAviso('CV subido.');
      alSubir();
    } catch (error) {
      setAviso((error as Error).message);
    }
  };

  return (
    <form onSubmit={enviar} className="grid gap-3 sm:grid-cols-[1fr_10rem_auto_auto] sm:items-end">
      <Campo etiqueta="Nombre">
        <input className={ENTRADA} value={nombre} onChange={(e) => setNombre(e.target.value)} />
      </Campo>
      <Campo etiqueta="Idioma">
        <SelectorDeIdioma valor={idioma} alCambiar={setIdioma} />
      </Campo>
      <Button asChild variant="outline">
        <label className="cursor-pointer">
          <FileText aria-hidden />
          {archivo ? archivo.name : 'Elegir PDF'}
          <input
            type="file"
            accept="application/pdf"
            className="sr-only"
            onChange={(e) => setArchivo(e.target.files?.[0] ?? null)}
          />
        </label>
      </Button>
      <Button type="submit" disabled={!archivo}>
        <Upload aria-hidden />
        Subir
      </Button>
      <div className="sm:col-span-4">
        <Aviso texto={aviso} />
      </div>
    </form>
  );
}

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
          <a href={api.urlDelPdf(cv.id)} target="_blank" rel="noreferrer">
            <FileDown aria-hidden />
            PDF
          </a>
        </Button>
        {cv.carta && (
          <Button asChild size="sm" variant="outline">
            <a href={api.urlDeLaCarta(cv.id)} target="_blank" rel="noreferrer">
              <Mail aria-hidden />
              Carta
            </a>
          </Button>
        )}
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

export function Cvs({
  cvs,
  alCambiar,
  alPostularse,
}: {
  cvs: Cv[];
  alCambiar: () => void;
  alPostularse: (borrador: Borrador) => void;
}): JSX.Element {
  return (
    <div className="flex flex-col gap-10">
      <Titulo
        Icono={FileText}
        titulo="CVs"
        bajada="Los del sitio, las bases para ATS, los que subo y los que adapta el agente a cada vacante."
      />
      <AdaptarCv cvs={cvs} alCrear={alCambiar} alPostularse={alPostularse} />
      {GRUPOS.map(({ tipo, titulo }) => {
        const grupo = cvs.filter((cv) => cv.tipo === tipo);
        if (grupo.length === 0 && tipo !== 'subido') return null;
        return (
          <section key={tipo} className="flex flex-col gap-3">
            <Rotulo>{titulo}</Rotulo>
            {grupo.length > 0 && (
              <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {grupo.map((cv) => (
                  <TarjetaDeCv key={cv.id} cv={cv} alCambiar={alCambiar} />
                ))}
              </ul>
            )}
            {tipo === 'subido' && (
              <div className="rounded-xl border border-dashed border-border p-4">
                <SubirCv alSubir={alCambiar} />
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}
