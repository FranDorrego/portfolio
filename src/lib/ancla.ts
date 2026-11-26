/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: ancla.ts    Project: portfolio                                     */
/*   Created: 2026/11/26 13:56:51  by vm                                      */
/*   Updated: 2026/11/26 13:56:51  by vm                                      */
/* ************************************************************************** */

/**
 * Entrar por un ancla (/#clientes) tiene que dejar la seccion arriba. El navegador salta al ancla
 * mientras la pagina todavia carga: despues llegan las imagenes y las fuentes, el contenido de
 * arriba crece y la seccion queda corrida. Aca se vuelve a acomodar cuando la pagina termina de
 * cargar, salvo que la persona ya se haya movido sola, y recien entonces se enciende el
 * desplazamiento suave para los clics del menu.
 */

/** El elemento al que apunta el ancla, o null si no hay ancla o no existe. */
export function destinoDelAncla(hash: string, documento: Document): HTMLElement | null {
  const id = decodeURIComponent(hash.replace(/^#/, ''));
  return id ? documento.getElementById(id) : null;
}

/** Lleva la ventana al ancla sin animacion. */
function irAlAncla(): void {
  destinoDelAncla(window.location.hash, document)?.scrollIntoView({ block: 'start' });
}

/** Acomoda el ancla al cargar y enciende el desplazamiento suave. */
export function cuidarAncla(): void {
  let seMovio = false;
  const moverse = (): void => {
    seMovio = true;
  };
  const opciones = { once: true, passive: true } as const;
  ['wheel', 'touchstart', 'keydown'].forEach((evento) =>
    window.addEventListener(evento, moverse, opciones),
  );

  irAlAncla();
  const alCargar = (): void => {
    if (!seMovio) irAlAncla();
    // Un cuadro despues, para que el ultimo salto no salga animado.
    requestAnimationFrame(() => document.documentElement.classList.add('suave'));
  };
  if (document.readyState === 'complete') alCargar();
  else window.addEventListener('load', alCargar, { once: true });
}
