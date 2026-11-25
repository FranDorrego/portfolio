/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: texto.ts    Project: portfolio                                     */
/*   Created: 2026/11/25 21:30:00  by claude                                  */
/*   Updated: 2026/11/25 21:30:00  by claude                                  */
/* ************************************************************************** */

/** Ayudas de texto: rellenar `{{huecos}}` y escribir fechas en el idioma de la pagina. */

import { ETIQUETA_DE_IDIOMA, type Idioma } from '@/i18n/idiomas';

export function rellenar(plantilla: string, valores: Record<string, string | number>): string {
  return plantilla.replace(/\{\{(\w+)\}\}/g, (todo, clave: string) =>
    clave in valores ? String(valores[clave]) : todo,
  );
}

/** «AAAA-MM-DD» como «3 de marzo de 2026». */
export function fechaLarga(fecha: string, idioma: Idioma): string {
  const dia = new Date(`${fecha}T00:00:00Z`);
  if (Number.isNaN(dia.getTime())) return fecha;
  return new Intl.DateTimeFormat(ETIQUETA_DE_IDIOMA[idioma], {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(dia);
}

/** «AAAA-MM» como «mar 2026»; un año solo queda igual. */
export function mesCorto(fecha: string, idioma: Idioma): string {
  if (!/^\d{4}-\d{2}$/.test(fecha)) return fecha;
  const dia = new Date(`${fecha}-01T00:00:00Z`);
  return new Intl.DateTimeFormat(ETIQUETA_DE_IDIOMA[idioma], {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(dia);
}

export function numeroConFormato(valor: number, idioma: Idioma): string {
  return new Intl.NumberFormat(ETIQUETA_DE_IDIOMA[idioma]).format(valor);
}
