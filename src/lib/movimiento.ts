/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: movimiento.ts    Project: portfolio                                */
/*   Created: 2026/11/25 22:18:47  by claude                                  */
/*   Updated: 2026/11/25 22:18:47  by claude                                  */
/* ************************************************************************** */

/** El movimiento de la interfaz en un solo lugar: solo transform, opacidad y color. */

const CURVA = 'ease-[cubic-bezier(0.23,1,0.32,1)]';

/** Una tarjeta entera que se puede tocar: el borde toma color y se hunde apenas. */
export const TARJETA_PULSABLE =
  `cursor-pointer transition-[transform,border-color] duration-200 ${CURVA} ` +
  'hover:border-primary/50 active:scale-[0.99]';

/** Una opcion de un filtro o del selector de idioma. */
export const SOLAPA_PULSABLE =
  `transition-[transform,background-color,color] duration-200 ${CURVA} active:scale-[0.97] ` +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring';

/** La flecha de algo que se despliega: gira, no se cambia por otro icono. */
export const GIRO = `transition-transform duration-200 ${CURVA}`;

/** Lo que aparece adentro de la pagina sin cambiar de pagina (index.css). */
export const ENTRADA_DE_VISTA = 'entrada-de-vista';

/** El ancho y el margen de toda la pagina. */
export const CONTENEDOR_DE_PAGINA = 'mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8';
