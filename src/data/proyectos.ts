/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: proyectos.ts    Project: portfolio                                 */
/*   Created: 2026/11/25 21:30:00  by claude                                  */
/*   Updated: 2026/11/25 21:30:00  by claude                                  */
/* ************************************************************************** */

/**
 * El catalogo: la fuente unica de los proyectos. El orden de esta lista es el de la pagina, y
 * los cuatro primeros son los destacados.
 */

import type { Proyecto } from '@/types/proyecto';
import { CLIENTES } from './proyectos/clientes';
import { DESTACADOS } from './proyectos/destacados';
import { DISTRIVALTO } from './proyectos/distrivalto';
import { FORMACION } from './proyectos/formacion';
import { PROPIOS } from './proyectos/propios';

const [sistemas, ...restoDeFormacion] = FORMACION;

export const PROYECTOS: readonly Proyecto[] = [
  ...DESTACADOS,
  DISTRIVALTO,
  sistemas,
  ...PROPIOS,
  ...CLIENTES,
  ...restoDeFormacion,
];
