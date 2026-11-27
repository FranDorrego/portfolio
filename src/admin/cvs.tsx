/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: cvs.tsx    Project: portfolio                                      */
/*   Created: 2026/11/26 21:09:49  by vm                                      */
/*   Updated: 2026/11/27 17:39:36  by vm                                      */
/* ************************************************************************** */

/**
 * La pestana de CV, en este orden: el agente que adapta un CV a una vacante; los ultimos 6 CV
 * (adaptados y subidos) con un buscador por empresa, cargo o nombre; subir un PDF; las bases para
 * ATS y, al final, los automaticos del sitio.
 */

import { useState, type FormEvent } from 'react';
import { FileText, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { api } from './api';
import { AdaptarCv } from './adaptar-cv';
import { CvsRecientes } from './cvs-recientes';
import { Grilla } from './grilla';
import { Rotulo, Titulo } from './marco';
import { Aviso, Campo, SelectorDeIdioma } from './campos';
import { ENTRADA } from './formato';
import type { Borrador, Cv, Idioma } from './tipos';

/** Los fijos van abajo, en este orden: primero las bases para ATS, despues los del sitio. */
const FIJOS: { tipo: Cv['tipo']; titulo: string }[] = [
  { tipo: 'base', titulo: 'Bases para ATS' },
  { tipo: 'sitio', titulo: 'Automáticos del sitio' },
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
  const propios = cvs.filter((cv) => cv.tipo === 'generado' || cv.tipo === 'subido');
  return (
    <div className="flex flex-col gap-10">
      <Titulo
        Icono={FileText}
        titulo="CVs"
        bajada="Adaptar a una vacante, los últimos CV con buscador, subir, bases y los del sitio."
      />
      <AdaptarCv cvs={cvs} alCrear={alCambiar} alPostularse={alPostularse} />

      <CvsRecientes propios={propios} alCambiar={alCambiar} />

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
