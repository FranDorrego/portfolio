/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: cvs.tsx    Project: portfolio                                      */
/*   Created: 2026/11/26 21:09:49  by vm                                      */
/*   Updated: 2026/11/26 23:06:46  by vm                                      */
/* ************************************************************************** */

/**
 * La pestana de CV, en este orden: el agente que adapta un CV a una vacante; los ultimos 6 CV
 * (adaptados y subidos) con un buscador por empresa, cargo o nombre; subir un PDF; las bases para
 * ATS y, al final, los automaticos del sitio.
 */

import { useState, type FormEvent } from 'react';
import { FileDown, FileText, Globe, Mail, Search, Trash2, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/class-names';
import { cvParaAts } from '@/data/perfil';
import { api } from './api';
import { AdaptarCv } from './adaptar-cv';
import { Rotulo, Titulo } from './marco';
import { Aviso, Campo, SelectorDeIdioma } from './campos';
import { ENTRADA, fecha } from './formato';
import { IDIOMAS, type Borrador, type Cv, type Idioma } from './tipos';

const TIPOS: Record<Cv['tipo'], string> = {
  generado: 'Adaptado',
  subido: 'Subido',
  base: 'Base ATS',
  sitio: 'Del sitio',
};

/** Los fijos van abajo, en este orden: primero las bases para ATS, despues los del sitio. */
const FIJOS: { tipo: Cv['tipo']; titulo: string }[] = [
  { tipo: 'base', titulo: 'Bases para ATS' },
  { tipo: 'sitio', titulo: 'Automáticos del sitio' },
];

const ULTIMOS = 6;

/** Sin tildes ni mayusculas: «junior» encuentra «Júnior». */
const normal = (texto: string): string =>
  texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

/** Si el CV tiene todas las palabras buscadas en su empresa, siglas, cargo o nombre. */
function coincide(cv: Cv, busqueda: string): boolean {
  const donde = normal([cv.nombre, cv.empresa, cv.siglas, cv.cargo].filter(Boolean).join(' '));
  return normal(busqueda)
    .split(/\s+/)
    .filter(Boolean)
    .every((palabra) => donde.includes(palabra));
}

function Grilla({ cvs, alCambiar }: { cvs: Cv[]; alCambiar: () => void }): JSX.Element {
  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {cvs.map((cv) => (
        <TarjetaDeCv key={cv.id} cv={cv} alCambiar={alCambiar} />
      ))}
    </ul>
  );
}

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
  const [busqueda, setBusqueda] = useState('');
  const propios = cvs
    .filter((cv) => cv.tipo === 'generado' || cv.tipo === 'subido')
    .sort((a, b) => b.creado.localeCompare(a.creado));
  const encontrados = busqueda.trim()
    ? propios.filter((cv) => coincide(cv, busqueda))
    : propios.slice(0, ULTIMOS);
  return (
    <div className="flex flex-col gap-10">
      <Titulo
        Icono={FileText}
        titulo="CVs"
        bajada="Adaptar a una vacante, los últimos CV con buscador, subir, bases y los del sitio."
      />
      <AdaptarCv cvs={cvs} alCrear={alCambiar} alPostularse={alPostularse} />

      <section className="flex flex-col gap-3">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <Rotulo>
            {busqueda.trim()
              ? `${encontrados.length} de ${propios.length}`
              : `Últimos ${Math.min(ULTIMOS, propios.length)} de ${propios.length}`}
          </Rotulo>
          <label className="relative w-full sm:w-80">
            <span className="sr-only">Buscar por empresa, cargo o nombre</span>
            <Search
              aria-hidden
              className={cn(
                'pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2',
                'text-muted-foreground',
              )}
            />
            <input
              type="search"
              className={cn(ENTRADA, 'pl-9')}
              placeholder="Empresa, cargo o nombre del PDF"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </label>
        </div>
        {encontrados.length > 0 ? (
          <Grilla cvs={encontrados} alCambiar={alCambiar} />
        ) : (
          <p
            className={cn(
              'rounded-xl border border-dashed border-border px-6 py-10 text-center',
              'text-muted-foreground',
            )}
          >
            {propios.length === 0
              ? 'Todavía no hay CV adaptados ni subidos.'
              : 'Ningún CV coincide.'}
          </p>
        )}
      </section>

      <section className="flex flex-col gap-3">
        <Rotulo>Subir un CV en PDF</Rotulo>
        <div className="rounded-xl border border-dashed border-border p-4">
          <SubirCv alSubir={alCambiar} />
        </div>
      </section>

      {FIJOS.map(({ tipo, titulo }) => {
        const grupo = cvs.filter((cv) => cv.tipo === tipo);
        if (grupo.length === 0) return null;
        return (
          <section key={tipo} className="flex flex-col gap-3">
            <Rotulo>{titulo}</Rotulo>
            <Grilla cvs={grupo} alCambiar={alCambiar} />
          </section>
        );
      })}
    </div>
  );
}
