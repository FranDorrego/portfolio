/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: formulario-de-candidatura.tsx    Project: portfolio                */
/*   Created: 2026/11/26 21:09:01  by vm                                      */
/*   Updated: 2026/11/26 21:10:29  by vm                                      */
/* ************************************************************************** */

/**
 * Una candidatura nueva: empresa, cargo, descripcion, CV, enlace e idioma. Si viene de un CV
 * adaptado por el agente, llega con todo completo.
 */

import { useState, type FormEvent } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { api } from './api';
import { Aviso, Campo, SelectorDeIdioma } from './campos';
import { ENTRADA } from './formato';
import type { Borrador, Candidatura, Cv } from './tipos';

export function FormularioDeCandidatura({
  inicial,
  cvs,
  alCrear,
}: {
  inicial: Borrador;
  cvs: Cv[];
  alCrear: (candidatura: Candidatura) => void;
}): JSX.Element {
  const [borrador, setBorrador] = useState<Borrador>(inicial);
  const [error, setError] = useState<string | null>(null);
  const cambiar = <K extends keyof Borrador>(campo: K, valor: Borrador[K]): void =>
    setBorrador((actual) => ({ ...actual, [campo]: valor }));

  const enviar = async (evento: FormEvent): Promise<void> => {
    evento.preventDefault();
    try {
      alCrear(await api.crearCandidatura(borrador));
    } catch (problema) {
      setError((problema as Error).message);
    }
  };

  return (
    <form onSubmit={enviar} className="grid gap-4 sm:grid-cols-2">
      <Campo etiqueta="Empresa">
        <input
          className={ENTRADA}
          value={borrador.empresa}
          onChange={(e) => cambiar('empresa', e.target.value)}
          required
        />
      </Campo>
      <Campo etiqueta="Cargo">
        <input
          className={ENTRADA}
          value={borrador.cargo}
          onChange={(e) => cambiar('cargo', e.target.value)}
          required
        />
      </Campo>
      <Campo etiqueta="Descripción de la vacante" className="sm:col-span-2">
        <textarea
          className={`${ENTRADA} min-h-28`}
          value={borrador.descripcion}
          onChange={(e) => cambiar('descripcion', e.target.value)}
        />
      </Campo>
      <Campo etiqueta="CV enviado">
        <select
          className={ENTRADA}
          value={borrador.cv_id ?? ''}
          onChange={(e) => cambiar('cv_id', e.target.value ? Number(e.target.value) : null)}
        >
          <option value="">Sin CV</option>
          {cvs.map((cv) => (
            <option key={cv.id} value={cv.id}>
              {cv.nombre}
            </option>
          ))}
        </select>
      </Campo>
      <Campo etiqueta="Idioma">
        <SelectorDeIdioma
          valor={borrador.idioma}
          alCambiar={(idioma) => cambiar('idioma', idioma)}
        />
      </Campo>
      <Campo etiqueta="Enlace de la candidatura" className="sm:col-span-2">
        <input
          className={ENTRADA}
          type="url"
          placeholder="https://"
          value={borrador.enlace}
          onChange={(e) => cambiar('enlace', e.target.value)}
        />
      </Campo>
      <div className="flex flex-col gap-3 sm:col-span-2">
        <Aviso texto={error} />
        <div>
          <Button type="submit">
            <Plus aria-hidden />
            Guardar candidatura
          </Button>
        </div>
      </div>
    </form>
  );
}
