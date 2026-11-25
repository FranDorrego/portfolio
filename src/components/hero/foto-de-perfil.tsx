/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: foto-de-perfil.tsx    Project: portfolio                           */
/*   Created: 2026/11/25 23:19:33  by vm                                      */
/*   Updated: 2026/11/25 23:19:33  by vm                                      */
/* ************************************************************************** */

/** La foto de perfil: al tocarla se abre grande. */

import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { PERFIL } from '@/data/perfil';
import { useIdioma } from '@/i18n';
import { cn } from '@/lib/class-names';
import { recurso } from '@/lib/raiz';

export function FotoDePerfil({ className }: { className?: string }): JSX.Element {
  const { t } = useIdioma();
  const [abierta, setAbierta] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setAbierta(true)}
        aria-label={t.barra.verFoto}
        className={cn(
          'shrink-0 overflow-hidden rounded-full border border-border',
          'transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]',
          'hover:scale-[1.03] active:scale-[0.97] focus-visible:outline-none',
          'focus-visible:ring-2 focus-visible:ring-ring',
          className,
        )}
      >
        <img
          src={recurso(PERFIL.foto)}
          alt={t.barra.fotoAlt}
          width={400}
          height={400}
          className="h-full w-full object-cover"
        />
      </button>
      <Dialog open={abierta} onOpenChange={setAbierta}>
        <DialogContent className="max-w-md gap-3 p-3 sm:p-3" textoDeCerrar={t.comun.cerrar}>
          <DialogTitle className="sr-only">{PERFIL.nombre}</DialogTitle>
          <DialogDescription className="sr-only">{t.barra.fotoAlt}</DialogDescription>
          <img
            src={recurso(PERFIL.fotoGrande)}
            alt={t.barra.fotoAlt}
            width={460}
            height={460}
            className="aspect-square w-full rounded-lg object-cover"
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
