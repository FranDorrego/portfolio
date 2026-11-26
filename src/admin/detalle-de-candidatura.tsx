/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: detalle-de-candidatura.tsx    Project: portfolio                   */
/*   Created: 2026/11/26 21:09:01  by vm                                      */
/*   Updated: 2026/11/26 21:42:38  by vm                                      */
/* ************************************************************************** */

/**
 * Una candidatura abierta: cambiar el estado (con una nota), las notas, el video de la
 * videollamada y el historial. Por defecto toda candidatura empieza «Sin contacto».
 */

import { useState } from 'react';
import { ExternalLink, FileText, Trash2, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/class-names';
import { api } from './api';
import { Aviso, Campo } from './campos';
import { ENTRADA, fecha } from './formato';
import { PuntoDeEstado, Rotulo } from './marco';
import { ESTADOS, IDIOMAS, type Candidatura, type Estado } from './tipos';

export function DetalleDeCandidatura({
  candidatura,
  alCambiar,
  alBorrar,
}: {
  candidatura: Candidatura;
  alCambiar: (candidatura: Candidatura) => void;
  alBorrar: () => void;
}): JSX.Element {
  const [estado, setEstado] = useState<Estado>(candidatura.estado);
  const [nota, setNota] = useState('');
  const [notas, setNotas] = useState(candidatura.notas);
  const [avance, setAvance] = useState<number | null>(null);
  const [aviso, setAviso] = useState<string | null>(null);

  const intentar = async (accion: () => Promise<Candidatura>, ok: string): Promise<void> => {
    try {
      alCambiar(await accion());
      setAviso(ok);
    } catch (error) {
      setAviso((error as Error).message);
    }
  };

  const guardar = (): Promise<void> =>
    intentar(async () => {
      const hecha = await api.cambiarCandidatura(candidatura.id, {
        estado,
        notas,
        nota_del_cambio: nota,
      });
      setNota('');
      return hecha;
    }, 'Guardado.');

  const subir = (archivo: File | undefined): void => {
    if (!archivo) return;
    setAvance(0);
    // `intentar` ya muestra el error en el aviso: aca solo falta apagar el avance.
    void intentar(
      () => api.subirVideo(candidatura.id, archivo, setAvance),
      'Video guardado.',
    ).finally(() => setAvance(null));
  };

  return (
    <div className="flex flex-col gap-5">
      <dl
        className={cn(
          'grid gap-x-6 gap-y-2 rounded-lg border border-border bg-background/50 p-4 text-sm',
          'sm:grid-cols-[auto_1fr]',
        )}
      >
        <dt className="text-muted-foreground">Enviada</dt>
        <dd>{fecha(candidatura.creada)}</dd>
        <dt className="text-muted-foreground">Idioma</dt>
        <dd>{IDIOMAS[candidatura.idioma]}</dd>
        <dt className="text-muted-foreground">CV</dt>
        <dd>
          {candidatura.cv_id ? (
            <a
              className="inline-flex items-center gap-1 text-primary hover:underline"
              href={api.urlDelPdf(candidatura.cv_id)}
              target="_blank"
              rel="noreferrer"
            >
              <FileText aria-hidden className="h-4 w-4" />
              {candidatura.cv_nombre}
            </a>
          ) : (
            'Sin CV'
          )}
        </dd>
        {candidatura.enlace && (
          <>
            <dt className="text-muted-foreground">Enlace</dt>
            <dd>
              <a
                className="inline-flex items-center gap-1 break-all text-primary hover:underline"
                href={candidatura.enlace}
                target="_blank"
                rel="noreferrer"
              >
                {candidatura.enlace}
                <ExternalLink aria-hidden className="h-3.5 w-3.5 shrink-0" />
              </a>
            </dd>
          </>
        )}
      </dl>
      {candidatura.descripcion && (
        <details className="rounded-md border border-border p-3 text-sm">
          <summary className="cursor-pointer text-muted-foreground">
            Descripción de la vacante
          </summary>
          <p className="mt-2 whitespace-pre-wrap">{candidatura.descripcion}</p>
        </details>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <Campo etiqueta="Estado">
          <select
            className={ENTRADA}
            value={estado}
            onChange={(e) => setEstado(e.target.value as Estado)}
          >
            {Object.entries(ESTADOS).map(([codigo, nombre]) => (
              <option key={codigo} value={codigo}>
                {nombre}
              </option>
            ))}
          </select>
        </Campo>
        <Campo etiqueta="Nota del cambio (opcional)">
          <input className={ENTRADA} value={nota} onChange={(e) => setNota(e.target.value)} />
        </Campo>
        <Campo etiqueta="Notas" className="sm:col-span-2">
          <textarea
            className={`${ENTRADA} min-h-24`}
            value={notas}
            onChange={(e) => setNotas(e.target.value)}
          />
        </Campo>
      </div>
      <div>
        <Button onClick={guardar}>Guardar cambios</Button>
      </div>

      <section className="flex flex-col gap-3">
        <Rotulo>Video de la videollamada</Rotulo>
        {candidatura.tiene_video && (
          <video
            key={candidatura.actualizada}
            controls
            preload="metadata"
            src={api.urlDelVideo(candidatura.id)}
            className="w-full rounded-lg border border-border bg-background"
          />
        )}
        <div className="flex flex-wrap items-center gap-2">
          <Button asChild variant="outline">
            <label className="cursor-pointer">
              <Upload aria-hidden />
              {candidatura.tiene_video ? 'Reemplazar video' : 'Subir video'}
              <input
                type="file"
                accept="video/*"
                className="sr-only"
                onChange={(e) => subir(e.target.files?.[0])}
              />
            </label>
          </Button>
          {candidatura.tiene_video && (
            <Button
              variant="ghost"
              onClick={() => intentar(() => api.borrarVideo(candidatura.id), 'Video borrado.')}
            >
              Quitar video
            </Button>
          )}
          {avance !== null && (
            <span className="font-mono text-xs text-muted-foreground">
              Subiendo {Math.round(avance * 100)} %
            </span>
          )}
        </div>
      </section>

      <Aviso texto={aviso} />

      {candidatura.historial && candidatura.historial.length > 0 && (
        <section>
          <Rotulo>Historial</Rotulo>
          <ol className="mt-3 space-y-3 text-sm">
            {candidatura.historial.map((cambio) => (
              <li key={`${cambio.fecha}-${cambio.estado}`} className="flex gap-3">
                <span className="mt-1.5">
                  <PuntoDeEstado estado={cambio.estado} />
                </span>
                <span>
                  <span className="font-medium">{ESTADOS[cambio.estado]}</span>
                  <span className="ml-2 font-mono text-xs text-muted-foreground">
                    {fecha(cambio.fecha)}
                  </span>
                  {cambio.nota && (
                    <span className="block text-muted-foreground">{cambio.nota}</span>
                  )}
                </span>
              </li>
            ))}
          </ol>
        </section>
      )}

      <div className="border-t border-border pt-4">
        <Button
          variant="ghost"
          onClick={async () => {
            if (!window.confirm('¿Borrar esta candidatura?')) return;
            await api.borrarCandidatura(candidatura.id);
            alBorrar();
          }}
        >
          <Trash2 aria-hidden />
          Borrar candidatura
        </Button>
      </div>
    </div>
  );
}
