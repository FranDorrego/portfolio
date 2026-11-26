/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: panel.tsx    Project: portfolio                                    */
/*   Created: 2026/11/26 21:10:38  by vm                                      */
/*   Updated: 2026/11/26 21:10:47  by vm                                      */
/* ************************************************************************** */

/**
 * El panel: si no hay sesion, la puerta; con sesion, tres pestanas (candidaturas, CV y «Sobre
 * mi»). Las candidaturas y los CV se cargan aca porque las dos pestanas los comparten.
 */

import { useCallback, useEffect, useState } from 'react';
import { FileText, LogOut, Send, UserRound, type LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/class-names';
import { Acceso } from './acceso';
import { api, ErrorDeApi } from './api';
import { Candidaturas } from './candidaturas';
import { Cvs } from './cvs';
import { SobreMi } from './sobre-mi';
import type { Borrador, Candidatura, Cv, EstadoDeSesion } from './tipos';

type Pestana = 'candidaturas' | 'cvs' | 'sobre-mi';

const PESTANAS: { id: Pestana; texto: string; Icono: LucideIcon }[] = [
  { id: 'candidaturas', texto: 'Candidaturas', Icono: Send },
  { id: 'cvs', texto: 'CVs', Icono: FileText },
  { id: 'sobre-mi', texto: 'Sobre mí', Icono: UserRound },
];

function Escritorio({ email, alSalir }: { email: string; alSalir: () => void }): JSX.Element {
  const [pestana, setPestana] = useState<Pestana>('candidaturas');
  const [{ candidaturas, cvs }, setDatos] = useState<{ candidaturas: Candidatura[]; cvs: Cv[] }>({
    candidaturas: [],
    cvs: [],
  });
  const [borrador, setBorrador] = useState<Borrador | null>(null);

  const recargar = useCallback((): void => {
    // Si falla (sesion vencida, red), la lista queda como estaba: por eso el `void`.
    void Promise.all([api.candidaturas(), api.cvs()]).then(
      ([nuevas, todos]) => setDatos({ candidaturas: nuevas, cvs: todos }),
      () => undefined,
    );
  }, []);
  useEffect(recargar, [recargar]);

  return (
    <div className="mx-auto flex min-h-svh max-w-5xl flex-col gap-6 px-4 py-6">
      <header className="flex flex-wrap items-center gap-3">
        <h1 className="text-xl font-semibold">Panel</h1>
        <nav aria-label="Secciones" className="flex gap-1">
          {PESTANAS.map(({ id, texto, Icono }) => (
            <button
              key={id}
              type="button"
              onClick={() => setPestana(id)}
              aria-current={pestana === id ? 'page' : undefined}
              className={cn(
                'inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm',
                pestana === id
                  ? 'bg-secondary text-foreground'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              <Icono aria-hidden className="h-4 w-4" />
              {texto}
            </button>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2 text-sm text-muted-foreground">
          <span className="hidden sm:inline">{email}</span>
          <Button variant="ghost" size="sm" onClick={alSalir}>
            <LogOut aria-hidden />
            Salir
          </Button>
        </div>
      </header>
      <main>
        {pestana === 'candidaturas' && (
          <Candidaturas
            candidaturas={candidaturas}
            cvs={cvs}
            borrador={borrador}
            setBorrador={setBorrador}
            alCambiar={recargar}
          />
        )}
        {pestana === 'cvs' && (
          <Cvs
            cvs={cvs}
            alCambiar={recargar}
            alPostularse={(nuevo) => {
              setBorrador(nuevo);
              setPestana('candidaturas');
            }}
          />
        )}
        {pestana === 'sobre-mi' && <SobreMi />}
      </main>
    </div>
  );
}

export function Panel(): JSX.Element {
  const [sesion, setSesion] = useState<EstadoDeSesion | null>(null);
  const [error, setError] = useState<string | null>(null);

  const consultar = useCallback((): void => {
    api.sesion().then(setSesion, (problema: ErrorDeApi) => setError(problema.message));
  }, []);
  useEffect(consultar, [consultar]);

  if (error) {
    return <p className="p-6 text-muted-foreground">No se pudo conectar con la API: {error}</p>;
  }
  if (!sesion) return <p className="p-6 text-muted-foreground">Cargando…</p>;
  if (!sesion.email) return <Acceso hayCuenta={sesion.hay_cuenta} alEntrar={consultar} />;
  return (
    <Escritorio
      email={sesion.email}
      alSalir={() => {
        // Salga bien o mal, se vuelve a preguntar por la sesion: eso muestra la puerta.
        void api.salir().finally(consultar);
      }}
    />
  );
}
