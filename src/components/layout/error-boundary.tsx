/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: error-boundary.tsx    Project: portfolio                           */
/*   Created: 2026/11/25 22:25:17  by claude                                  */
/*   Updated: 2026/11/25 22:25:17  by claude                                  */
/* ************************************************************************** */

/**
 * Si un componente falla, la pagina no queda en blanco: se muestra quien soy y como escribirme,
 * que es lo unico que no puede faltar en un portafolio.
 */

import { Component, type ReactNode } from 'react';
import { PERFIL } from '@/data/perfil';
import { es } from '@/i18n/es';

interface Props {
  children: ReactNode;
}

interface Estado {
  fallo: boolean;
}

export class ErrorBoundary extends Component<Props, Estado> {
  state: Estado = { fallo: false };

  static getDerivedStateFromError(): Estado {
    return { fallo: true };
  }

  render(): ReactNode {
    if (!this.state.fallo) return this.props.children;
    return (
      <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center gap-3 px-6">
        <h1 className="text-3xl font-bold text-foreground">{PERFIL.nombre}</h1>
        <p className="text-muted-foreground">{es.pie.firma}</p>
        <a className="text-primary underline underline-offset-4" href={`mailto:${PERFIL.email}`}>
          {PERFIL.email}
        </a>
        <a className="text-primary underline underline-offset-4" href={PERFIL.github}>
          GitHub
        </a>
      </main>
    );
  }
}
