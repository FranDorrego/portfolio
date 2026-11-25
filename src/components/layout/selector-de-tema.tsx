/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: selector-de-tema.tsx    Project: portfolio                         */
/*   Created: 2026/11/25 22:29:31  by vm                                      */
/*   Updated: 2026/11/25 22:29:31  by vm                                      */
/* ************************************************************************** */

/** El boton que pasa del tema oscuro al claro y vuelve. El icono dice a cual se va. */

import { useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIdioma } from '@/i18n';
import { aplicarTema, temaActual, type Tema } from '@/lib/tema';

export function SelectorDeTema(): JSX.Element {
  const { t } = useIdioma();
  const [tema, setTema] = useState<Tema>(temaActual);
  const otro: Tema = tema === 'dark' ? 'light' : 'dark';
  const Icono = tema === 'dark' ? Sun : Moon;
  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-9 w-9"
      aria-label={tema === 'dark' ? t.barra.temaClaro : t.barra.temaOscuro}
      onClick={() => {
        aplicarTema(otro);
        setTema(otro);
      }}
    >
      <Icono aria-hidden />
    </Button>
  );
}
