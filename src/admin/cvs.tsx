/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: cvs.tsx    Project: portfolio                                      */
/*   Created: 2026/11/26 21:09:49  by vm                                      */
/*   Updated: 2026/11/26 21:10:38  by vm                                      */
/* ************************************************************************** */

/**
 * La pestana de CV: los del sitio (automaticos), el base para ATS, los que subo en PDF y los que
 * armo el agente para cada vacante. Arriba, el agente.
 */

import { useState, type FormEvent } from 'react';
import { FileDown, FileText, Trash2, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { api } from './api';
import { AdaptarCv } from './adaptar-cv';
import { Aviso, Campo, SelectorDeIdioma } from './campos';
import { ENTRADA, fecha } from './formato';
import { IDIOMAS, type Borrador, type Cv, type Idioma } from './tipos';

const GRUPOS: { tipo: Cv['tipo']; titulo: string }[] = [
  { tipo: 'sitio', titulo: 'Automáticos del sitio' },
  { tipo: 'base', titulo: 'Base para ATS' },
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
    <div className="flex flex-col gap-8">
      <AdaptarCv cvs={cvs} alCrear={alCambiar} alPostularse={alPostularse} />
      {GRUPOS.map(({ tipo, titulo }) => {
        const grupo = cvs.filter((cv) => cv.tipo === tipo);
        if (grupo.length === 0 && tipo !== 'subido') return null;
        return (
          <section key={tipo} className="flex flex-col gap-3">
            <h2 className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              {titulo}
            </h2>
            {grupo.length > 0 && (
              <ul className="divide-y divide-border rounded-xl border border-border bg-card">
                {grupo.map((cv) => (
                  <li key={cv.id} className="flex flex-wrap items-center gap-3 px-4 py-3">
                    <span className="min-w-0 flex-1">
                      <span className="font-medium">{cv.nombre}</span>
                      <span className="block text-xs text-muted-foreground">
                        {IDIOMAS[cv.idioma]} · {fecha(cv.creado)}
                      </span>
                    </span>
                    <Button asChild size="sm" variant="outline">
                      <a href={api.urlDelPdf(cv.id)} target="_blank" rel="noreferrer">
                        <FileDown aria-hidden />
                        PDF
                      </a>
                    </Button>
                    {cv.carta && (
                      <Button asChild size="sm" variant="outline">
                        <a href={api.urlDeLaCarta(cv.id)} target="_blank" rel="noreferrer">
                          Carta
                        </a>
                      </Button>
                    )}
                    {(tipo === 'subido' || tipo === 'generado') && (
                      <Button
                        size="sm"
                        variant="ghost"
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
                  </li>
                ))}
              </ul>
            )}
            {tipo === 'subido' && <SubirCv alSubir={alCambiar} />}
          </section>
        );
      })}
    </div>
  );
}
