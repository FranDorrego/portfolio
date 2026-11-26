/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: html-de-paginas.mjs    Project: portfolio                          */
/*   Created: 2026/11/25 22:25:17  by claude                                  */
/*   Updated: 2026/11/26 01:45:44  by vm                                      */
/* ************************************************************************** */

/**
 * Lo que se le hace al HTML compilado: ponerle la pagina dibujada adentro y armar la cabecera
 * de la pagina en portugues: su direccion propia, el idioma, el titulo y la
 * descripcion. Asi un buscador ve dos paginas distintas (/ y /pt/) y no una sola en dos
 * idiomas. La usa scripts/prerender.mjs.
 */

/** El titulo y la descripcion de un idioma, leidos de su archivo de textos. */
export function metadatos(fuente) {
  const title = fuente.match(/title: '([^']+)'/)?.[1];
  const description = fuente.match(/description:\s*'([^']+)'/)?.[1];
  if (!title || !description) throw new Error('No se encontraron title y description');
  return { title, description };
}

/** La pagina en portugues a partir de la pagina en espanol ya compilada. */
export function enPortugues({ html, es, pt }) {
  return html
    .replaceAll(es.title, pt.title)
    .replaceAll(es.description, pt.description)
    .replace('<html lang="es"', '<html lang="pt-PT"')
    .replace(/(<link rel="canonical" href="[^"]*?)"/, '$1pt/"')
    .replace('<meta property="og:url" content="', '<meta property="og:url" content="')
    .replace(/(<meta property="og:url" content="[^"]*?)"/, '$1pt/"')
    .replace('property="og:locale" content="es"', 'property="og:locale" content="pt_PT"')
    .replace(
      'property="og:locale:alternate" content="pt_PT"',
      'property="og:locale:alternate" content="es"',
    )
    .replaceAll('="./', '="../');
}

/** Pone el HTML dibujado adentro del contenedor vacio de la aplicacion. */
export function conContenido(plantilla, contenido) {
  const vacio = '<div id="root"></div>';
  if (!plantilla.includes(vacio)) throw new Error('No se encontro <div id="root"></div>');
  return plantilla.replace(vacio, `<div id="root">${contenido}</div>`);
}
