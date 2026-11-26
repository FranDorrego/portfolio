/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: sobre-mi.tsx    Project: portfolio                                 */
/*   Created: 2026/11/26 21:08:31  by vm                                      */
/*   Updated: 2026/11/26 21:10:29  by vm                                      */
/* ************************************************************************** */

/** «Sobre mi»: el contexto del agente, y el telefono y el email que van en la cabecera del CV. */

import { useEffect, useState } from 'react';
import { Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { api } from './api';
import { Aviso, Campo } from './campos';
import { ENTRADA } from './formato';
import type { Perfil } from './tipos';

const VACIO: Perfil = { que_busco: '', sobre_mi: '', telefono: '', email: '' };

export function SobreMi(): JSX.Element {
  const [perfil, setPerfil] = useState<Perfil>(VACIO);
  const [aviso, setAviso] = useState<string | null>(null);

  // estandar: ignore WEB-007 - un solo pedido al abrir la pestana; se descarta si se cierra antes
  useEffect(() => {
    let vigente = true;
    api.perfil().then(
      (leido) => vigente && setPerfil(leido),
      (error: Error) => vigente && setAviso(error.message),
    );
    return () => {
      vigente = false;
    };
  }, []);

  const cambiar = (campo: keyof Perfil) => (valor: string) =>
    setPerfil((actual) => ({ ...actual, [campo]: valor }));

  const guardar = async (): Promise<void> => {
    try {
      setPerfil(await api.guardarPerfil(perfil));
      setAviso('Guardado.');
    } catch (error) {
      setAviso((error as Error).message);
    }
  };

  return (
    <section className="flex max-w-3xl flex-col gap-4">
      <p className="text-sm text-muted-foreground">
        El agente lee esto antes de adaptar cada CV. Directo y simple.
      </p>
      <Campo etiqueta="Qué busco">
        <textarea
          className={`${ENTRADA} min-h-32`}
          value={perfil.que_busco}
          onChange={(e) => cambiar('que_busco')(e.target.value)}
        />
      </Campo>
      <Campo etiqueta="Sobre mí">
        <textarea
          className={`${ENTRADA} min-h-44`}
          value={perfil.sobre_mi}
          onChange={(e) => cambiar('sobre_mi')(e.target.value)}
        />
      </Campo>
      <div className="grid gap-4 sm:grid-cols-2">
        <Campo etiqueta="Teléfono (va en el CV)">
          <input
            className={ENTRADA}
            value={perfil.telefono}
            onChange={(e) => cambiar('telefono')(e.target.value)}
          />
        </Campo>
        <Campo etiqueta="Email (va en el CV)">
          <input
            className={ENTRADA}
            type="email"
            value={perfil.email}
            onChange={(e) => cambiar('email')(e.target.value)}
          />
        </Campo>
      </div>
      <Aviso texto={aviso} />
      <div>
        <Button onClick={guardar}>
          <Save aria-hidden />
          Guardar
        </Button>
      </div>
    </section>
  );
}
