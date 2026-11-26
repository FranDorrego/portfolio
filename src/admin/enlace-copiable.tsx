/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: enlace-copiable.tsx    Project: portfolio                          */
/*   Created: 2026/11/26 22:48:40  by vm                                      */
/*   Updated: 2026/11/26 22:48:40  by vm                                      */
/* ************************************************************************** */

/** El enlace de una candidatura, que puede ser larguisimo. */

import { useState } from 'react';
import { Check, Copy, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

/** Un enlace largo: se ve el principio, se abre al tocarlo y se copia entero con el boton. */
export function EnlaceCopiable({ url }: { url: string }): JSX.Element {
  const [copiado, setCopiado] = useState(false);
  const copiar = async (): Promise<void> => {
    await navigator.clipboard.writeText(url);
    setCopiado(true);
    window.setTimeout(() => setCopiado(false), 1500);
  };
  return (
    <span className="flex min-w-0 items-center gap-2">
      <a
        className="inline-flex min-w-0 items-center gap-1 text-primary hover:underline"
        href={url}
        target="_blank"
        rel="noreferrer"
        title={url}
      >
        <span className="truncate">{url.replace(/^https?:\/\/(www\.)?/, '')}</span>
        <ExternalLink aria-hidden className="h-3.5 w-3.5 shrink-0" />
      </a>
      <Button
        type="button"
        size="sm"
        variant="outline"
        className="h-7 shrink-0 px-2 text-xs"
        onClick={copiar}
      >
        {copiado ? <Check aria-hidden /> : <Copy aria-hidden />}
        {copiado ? 'Copiado' : 'Copiar'}
      </Button>
    </span>
  );
}
