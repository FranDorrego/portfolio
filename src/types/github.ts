/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: github.ts    Project: portfolio                                    */
/*   Created: 2026/11/25 21:30:00  by claude                                  */
/*   Updated: 2026/11/25 23:21:38  by vm                                      */
/* ************************************************************************** */

/** La actividad de GitHub tal como la usa la interfaz, sin importar de que proveedor salga. */

export interface DiaDeContribuciones {
  /** AAAA-MM-DD. */
  date: string;
  count: number;
  /** El nivel de color que le da GitHub (0 a 4). Sin el, se calcula por cuartos. */
  level?: 0 | 1 | 2 | 3 | 4;
}

/** `null` en una cifra: el proveedor no la informo. Se muestra «no disponible», nunca un cero. */
export interface ActividadDeGithub {
  username: string;
  /** Todas las contribuciones del periodo (incluye lo privado si el perfil lo muestra). */
  total: number | null;
  commits: number | null;
  pullRequests: number | null;
  merges: number | null;
  /** Ordenadas de la mas vieja a la mas nueva. Vacia si el proveedor no trae el mapa. */
  contributions: DiaDeContribuciones[];
  /** Cuando se generaron los datos (ISO 8601), si el proveedor lo dice. */
  updatedAt: string | null;
  /** `false`: las cifras son solo de repositorios publicos. `null`: no se sabe. */
  includesPrivate: boolean | null;
}

/** Lo que cualquier proveedor de estadisticas tiene que saber hacer. */
export interface ProveedorDeActividad {
  leer: (usuario: string, senal?: AbortSignal) => Promise<ActividadDeGithub>;
}
