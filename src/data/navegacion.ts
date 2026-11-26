/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: navegacion.ts    Project: portfolio                                */
/*   Created: 2026/11/25 22:17:56  by claude                                  */
/*   Updated: 2026/11/26 01:41:07  by vm                                      */
/* ************************************************************************** */

/** Las secciones de la pagina, en orden. El `id` es el ancla de cada una. */

import type { Textos } from '@/i18n/es';

export interface Seccion {
  id: string;
  texto: keyof Textos['nav'];
}

export const SECCIONES: readonly Seccion[] = [
  { id: 'proyectos', texto: 'proyectos' },
  { id: 'sobre-mi', texto: 'sobreMi' },
  { id: 'formacion', texto: 'formacion' },
  { id: 'tecnologias', texto: 'tecnologias' },
  { id: 'faq', texto: 'preguntas' },
  { id: 'contacto', texto: 'contacto' },
];

export const IDS_DE_SECCIONES: readonly string[] = SECCIONES.map((seccion) => seccion.id);
