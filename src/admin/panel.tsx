/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: panel.tsx    Project: portfolio                                    */
/*   Created: 2026/11/26 21:10:38  by vm                                      */
/*   Updated: 2026/11/26 21:41:59  by vm                                      */
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
import { Contenedor, Fondo, Foto } from './marco';
import { SobreMi } from './sobre-mi';
import type { Borrador, Candidatura, Cv, EstadoDeSesion } from './tipos';

type Pestana = 'candidaturas' | 'cvs' | 'sobre-mi';

const PESTANAS: { id: Pestana; texto: string; Icono: LucideIcon }[] = [
  { id: 'candidaturas', texto: 'Candidaturas', Icono: Send },
  { id: 'cvs', texto: 'CVs', Icono: FileText },
  { id: 'sobre-mi', texto: 'Sobre mí', Icono: UserRound },
];

const ENLACE =
  'inline-flex items-center gap-1.5 whitespace-nowrap rounded-md px-3 py-1.5 text-sm ' +
  'transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 ' +
  'focus-visible:ring-ring';

/** La barra de arriba, como la del sitio: foto, nombre, pestanas y salir. */
function Barra({
  pestana,
  setPestana,
  email,
  alSalir,
}: {
  pestana: Pestana;
  setPestana: (pestana: Pestana) => void;
  email: string;
  alSalir: () => void;
}): JSX.Element {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <Contenedor className="flex h-14 items-center gap-3">
        <a href="/" className="flex items-center gap-2" aria-label="Ir al sitio">
          <Foto className="h-8 w-8" />
          <span className="hidden font-semibold sm:inline">Franco Dorrego</span>
        </a>
        <span className="hidden font-mono text-xs text-muted-foreground sm:inline">/ panel</span>
        <nav aria-label="Secciones" className="sin-barra ml-2 flex min-w-0 gap-1 overflow-x-auto">
          {PESTANAS.map(({ id, texto, Icono }) => (
            <button
              key={id}
              type="button"
              onClick={() => setPestana(id)}
              aria-current={pestana === id ? 'page' : undefined}
              aria-label={texto}
              className={cn(
                ENLACE,
                pestana === id
                  ? 'bg-secondary text-foreground'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              <Icono aria-hidden className="h-4 w-4" />
              {/* En el celular, las pestanas que no estan abiertas muestran solo el icono. */}
              <span className={pestana === id ? undefined : 'hidden sm:inline'}>{texto}</span>
            </button>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2 text-sm text-muted-foreground">
          <span className="hidden truncate lg:inline">{email}</span>
          <Button variant="ghost" size="sm" onClick={alSalir} aria-label="Salir">
            <LogOut aria-hidden />
            <span className="hidden sm:inline">Salir</span>
          </Button>
        </div>
      </Contenedor>
    </header>
  );
}

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
    <Fondo>
      <Barra pestana={pestana} setPestana={setPestana} email={email} alSalir={alSalir} />
      <Contenedor className="py-10 sm:py-12">
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
      </Contenedor>
    </Fondo>
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
    return (
      <Fondo>
        <p className="p-6 text-muted-foreground">No se pudo conectar con la API: {error}</p>
      </Fondo>
    );
  }
  if (!sesion) return <Fondo>{null}</Fondo>;
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
