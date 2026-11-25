/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: use-metadatos.ts    Project: portfolio                             */
/*   Created: 2026/11/25 21:30:00  by claude                                  */
/*   Updated: 2026/11/25 21:30:00  by claude                                  */
/* ************************************************************************** */

/** El titulo y la descripcion de la pagina (y de Open Graph) en el idioma elegido. */

import { useEffect } from 'react';
import { useIdioma } from '@/i18n';
import { ETIQUETA_DE_IDIOMA } from '@/i18n/idiomas';

function ponerMeta(selector: string, contenido: string): void {
  document.querySelector(selector)?.setAttribute('content', contenido);
}

export function useMetadatos(): void {
  const { t, idioma } = useIdioma();
  useEffect(() => {
    document.title = t.meta.title;
    ponerMeta('meta[name="description"]', t.meta.description);
    ponerMeta('meta[property="og:title"]', t.meta.title);
    ponerMeta('meta[property="og:description"]', t.meta.description);
    ponerMeta('meta[name="twitter:title"]', t.meta.title);
    ponerMeta('meta[name="twitter:description"]', t.meta.description);
    ponerMeta('meta[property="og:locale"]', ETIQUETA_DE_IDIOMA[idioma].replace('-', '_'));
  }, [t, idioma]);
}
