/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: api.ts    Project: portfolio                                       */
/*   Created: 2026/11/26 21:08:08  by vm                                      */
/*   Updated: 2026/11/27 10:40:44  by vm                                      */
/* ************************************************************************** */

/**
 * El cliente de la API del panel. Va con la cookie de sesion (credentials: 'include'): la API
 * vive en api.francodorrego.com, el mismo sitio que la pagina, asi que la cookie viaja sola.
 */

import type { Candidatura, Cv, EstadoDeSesion, Perfil } from './tipos';

/** La direccion de la API: VITE_ADMIN_API (vite.config.ts pone la de produccion). */
export const API = String(import.meta.env.VITE_ADMIN_API ?? '').replace(/\/+$/, '');

export class ErrorDeApi extends Error {
  constructor(
    public readonly estado: number,
    mensaje: string,
  ) {
    super(mensaje);
  }
}

async function pedir<T>(ruta: string, opciones: RequestInit = {}): Promise<T> {
  const respuesta = await fetch(`${API}${ruta}`, {
    credentials: 'include',
    ...opciones,
    headers:
      typeof opciones.body === 'string'
        ? { 'Content-Type': 'application/json', ...opciones.headers }
        : opciones.headers,
  });
  if (!respuesta.ok) {
    let mensaje = `Error ${respuesta.status}`;
    try {
      const cuerpo = await respuesta.json();
      mensaje = typeof cuerpo.detail === 'string' ? cuerpo.detail : mensaje;
    } catch {
      // Sin cuerpo JSON: queda el codigo.
    }
    throw new ErrorDeApi(respuesta.status, mensaje);
  }
  return respuesta.json() as Promise<T>;
}

const json = (metodo: string, datos: unknown): RequestInit => ({
  method: metodo,
  body: JSON.stringify(datos),
});

const TROZO = 4 * 1024 * 1024;

/** Sube un archivo en trozos de 4 MB; `alAvanzar` recibe de 0 a 1. */
async function subirEnTrozos<T>({
  ruta,
  archivo,
  alAvanzar,
}: {
  ruta: string;
  archivo: File;
  alAvanzar?: (avance: number) => void;
}): Promise<T> {
  const partes = Math.max(1, Math.ceil(archivo.size / TROZO));
  let ultimo: unknown = null;
  for (let parte = 0; parte < partes; parte += 1) {
    const consulta = new URLSearchParams({
      parte: String(parte),
      final: String(parte === partes - 1),
      nombre: archivo.name,
    });
    // Cada trozo espera al anterior: el servidor los agrega en orden.
    // estandar: ignore JS-022 - los trozos van en orden
    ultimo = await pedir(`${ruta}?${consulta}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/octet-stream' },
      body: archivo.slice(parte * TROZO, (parte + 1) * TROZO),
    });
    alAvanzar?.((parte + 1) / partes);
  }
  return ultimo as T;
}

export const api = {
  sesion: () => pedir<EstadoDeSesion>('/api/sesion'),
  entrar: (email: string, clave: string) => pedir('/api/sesion', json('POST', { email, clave })),
  alta: (datos: { token: string; email: string; clave: string }) =>
    pedir('/api/sesion/alta', json('POST', datos)),
  salir: () => pedir('/api/sesion', { method: 'DELETE' }),
  cambiarClave: (actual: string, nueva: string) =>
    pedir('/api/sesion/clave', json('POST', { actual, nueva })),

  candidaturas: () => pedir<Candidatura[]>('/api/candidaturas'),
  candidatura: (id: number) => pedir<Candidatura>(`/api/candidaturas/${id}`),
  crearCandidatura: (datos: Partial<Candidatura>) =>
    pedir<Candidatura>('/api/candidaturas', json('POST', datos)),
  cambiarCandidatura: (id: number, datos: Record<string, unknown>) =>
    pedir<Candidatura>(`/api/candidaturas/${id}`, json('PATCH', datos)),
  borrarCandidatura: (id: number) => pedir(`/api/candidaturas/${id}`, { method: 'DELETE' }),
  subirVideo: (id: number, archivo: File, alAvanzar?: (avance: number) => void) =>
    subirEnTrozos<Candidatura>({ ruta: `/api/candidaturas/${id}/video`, archivo, alAvanzar }),
  borrarVideo: (id: number) =>
    pedir<Candidatura>(`/api/candidaturas/${id}/video`, { method: 'DELETE' }),
  urlDelVideo: (id: number) => `${API}/api/candidaturas/${id}/video`,

  cvs: () => pedir<Cv[]>('/api/cvs'),
  cv: (id: number) => pedir<Cv>(`/api/cvs/${id}`),
  crearCv: (nombre: string, idioma: string) =>
    pedir<Cv>('/api/cvs', json('POST', { nombre, idioma })),
  subirPdf: (id: number, archivo: File) =>
    subirEnTrozos<Cv>({ ruta: `/api/cvs/${id}/archivo`, archivo }),
  borrarCv: (id: number) => pedir(`/api/cvs/${id}`, { method: 'DELETE' }),
  adaptar: (datos: { vacante: string; idioma: string; base_id: number | null }) =>
    pedir<Cv>('/api/cvs/adaptar', json('POST', datos)),
  /** Para ver en el navegador. */
  rehacer: (id: number, indicacion: string) =>
    pedir<Cv>(`/api/cvs/${id}/rehacer`, json('POST', { indicacion })),
  urlDelPdf: (id: number) => `${API}/api/cvs/${id}/pdf`,
  /** Para bajar como «<siglas> - <cargo> - Franco Dorrego.pdf». */
  descargaDelPdf: (id: number) => `${API}/api/cvs/${id}/pdf?descargar=true`,
  descargaDeLaCarta: (id: number) => `${API}/api/cvs/${id}/carta.pdf?descargar=true`,

  perfil: () => pedir<Perfil>('/api/perfil'),
  guardarPerfil: (datos: Perfil) => pedir<Perfil>('/api/perfil', json('PUT', datos)),
};
