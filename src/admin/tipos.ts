/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: tipos.ts    Project: portfolio                                     */
/*   Created: 2026/11/26 21:08:08  by vm                                      */
/*   Updated: 2026/11/27 15:26:17  by vm                                      */
/* ************************************************************************** */

/** Lo que devuelve la API del panel (admin-api/). */

export type Idioma = 'es' | 'pt' | 'en';
export type Estado = 'sin_contacto' | 'contacto' | 'videollamada' | 'oferta' | 'rechazada';

export interface EstadoDeSesion {
  hay_cuenta: boolean;
  email: string | null;
}

export interface Cambio {
  estado: Estado;
  nota: string;
  fecha: string;
}

export interface Candidatura {
  id: number;
  empresa: string;
  cargo: string;
  descripcion: string;
  cv_id: number | null;
  cv_nombre: string | null;
  enlace: string;
  idioma: Idioma;
  estado: Estado;
  notas: string;
  tiene_video: boolean;
  /** La encontro, preparo y envio una IA sola (la registro con AGENT_TOKEN). */
  con_ia: boolean;
  /** Por donde se registro: el panel, la API con AGENT_TOKEN o un agente por MCP. */
  origen: 'panel' | 'api' | 'mcp';
  video_nombre: string | null;
  creada: string;
  actualizada: string;
  historial?: Cambio[];
}

export interface BloqueDelCv {
  titulo: string;
  rol: string;
  periodo: string;
  puntos: string[];
}

export interface ContenidoDelCv {
  idioma: Idioma;
  nombre: string;
  titulo: string;
  resumen: string;
  experiencia: BloqueDelCv[];
  proyectos: BloqueDelCv[];
}

export interface Cv {
  id: number;
  nombre: string;
  tipo: 'sitio' | 'base' | 'subido' | 'generado';
  idioma: Idioma;
  url: string | null;
  vacante: string | null;
  carta: string | null;
  notas: string | null;
  creado: string;
  tiene_contenido: boolean;
  tiene_archivo: boolean;
  contenido?: ContenidoDelCv | null;
  empresa?: string | null;
  siglas?: string | null;
  cargo?: string | null;
}

export interface Perfil {
  que_busco: string;
  sobre_mi: string;
  telefono: string;
  email: string;
}

/** Una candidatura todavia sin guardar (el formulario, o lo que trae el agente). */
export interface Borrador {
  empresa: string;
  cargo: string;
  descripcion: string;
  cv_id: number | null;
  enlace: string;
  idioma: Idioma;
}

export const BORRADOR_VACIO: Borrador = {
  empresa: '',
  cargo: '',
  descripcion: '',
  cv_id: null,
  enlace: '',
  idioma: 'es',
};

export const ESTADOS: Record<Estado, string> = {
  sin_contacto: 'Sin contacto',
  contacto: 'Hubo contacto',
  videollamada: 'Videollamada',
  oferta: 'Oferta',
  rechazada: 'Rechazada',
};

export const IDIOMAS: Record<Idioma, string> = { es: 'Español', pt: 'Português', en: 'English' };
