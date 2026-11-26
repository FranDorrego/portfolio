/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: acceso.tsx    Project: portfolio                                   */
/*   Created: 2026/11/26 21:08:31  by vm                                      */
/*   Updated: 2026/11/26 21:36:18  by vm                                      */
/* ************************************************************************** */

/**
 * Entrar con email y clave. Si todavia no hay cuenta, crearla con el token de alta del servidor
 * (SETUP_TOKEN): despues de la primera, el alta queda cerrada.
 */

import { useState, type FormEvent } from 'react';
import { LockKeyhole } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/class-names';
import { api } from './api';
import { Aviso, Campo } from './campos';
import { ENTRADA } from './formato';
import { Fondo, Foto } from './marco';

export function Acceso({
  hayCuenta,
  alEntrar,
}: {
  hayCuenta: boolean;
  alEntrar: () => void;
}): JSX.Element {
  const [email, setEmail] = useState('');
  const [clave, setClave] = useState('');
  const [token, setToken] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);

  const enviar = async (evento: FormEvent): Promise<void> => {
    evento.preventDefault();
    setEnviando(true);
    setError(null);
    try {
      if (hayCuenta) await api.entrar(email, clave);
      else await api.alta({ token, email, clave });
      alEntrar();
    } catch (problema) {
      setError((problema as Error).message);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <Fondo>
      <main className="grid min-h-svh place-items-center px-4">
        <form
          onSubmit={enviar}
          className={cn(
            'flex w-full max-w-sm flex-col gap-4 rounded-xl border border-border bg-card p-6',
            'shadow-flotante',
          )}
        >
          <div className="flex items-center gap-3">
            <Foto className="h-12 w-12" />
            <div>
              <p className="font-semibold">Franco Dorrego</p>
              <p className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
                <LockKeyhole aria-hidden className="h-3.5 w-3.5 text-primary" />
                {hayCuenta ? 'Panel privado' : 'Crear la cuenta'}
              </p>
            </div>
          </div>
          {!hayCuenta && (
            <Campo etiqueta="Token de alta">
              <input
                className={ENTRADA}
                value={token}
                onChange={(e) => setToken(e.target.value)}
                required
              />
            </Campo>
          )}
          <Campo etiqueta="Email">
            <input
              className={ENTRADA}
              type="email"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Campo>
          <Campo etiqueta={hayCuenta ? 'Contraseña' : 'Contraseña (mínimo 10 caracteres)'}>
            <input
              className={ENTRADA}
              type="password"
              autoComplete={hayCuenta ? 'current-password' : 'new-password'}
              minLength={hayCuenta ? 1 : 10}
              value={clave}
              onChange={(e) => setClave(e.target.value)}
              required
            />
          </Campo>
          <Aviso texto={error} />
          <Button type="submit" disabled={enviando}>
            {hayCuenta ? 'Entrar' : 'Crear y entrar'}
          </Button>
        </form>
      </main>
    </Fondo>
  );
}
