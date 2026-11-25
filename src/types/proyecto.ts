/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: proyecto.ts    Project: portfolio                                  */
/*   Created: 2026/11/25 21:30:00  by claude                                  */
/*   Updated: 2026/11/25 22:43:44  by vm                                      */
/* ************************************************************************** */

/** El modelo de un proyecto del catalogo. Lo no confirmado es opcional: no se rellena. */

import type { Texto } from '@/i18n/idiomas';

export type CategoriaDeProyecto = 'propio' | 'cliente' | 'sistemas' | 'educacion';

/** Los filtros por tecnologia de la seccion de proyectos. */
export type FiltroDeTecnologia =
  'python' | 'django' | 'react' | 'typescript' | 'cloud' | 'ia' | 'c';

/** Solo se indica un estado cuando hay evidencia (actividad del repositorio o dato del autor). */
export type EstadoDeProyecto = 'activo' | 'finalizado' | 'en-desarrollo' | 'mantenimiento';

/** `privado`: el codigo no es publico; se muestra la arquitectura y no un enlace al repositorio. */
export type Visibilidad = 'publico' | 'privado';

/** Una cifra con su origen: sin fuente verificable no se publica. */
export interface Metrica {
  value: string;
  label: Texto;
  source: Texto;
}

/** Los iconos disponibles para un paso del diagrama. */
export type IconoDePaso =
  | 'usuario'
  | 'chat'
  | 'web'
  | 'ia'
  | 'flujo'
  | 'api'
  | 'datos'
  | 'nube'
  | 'externo'
  | 'documento'
  | 'planilla'
  | 'codigo'
  | 'movil'
  | 'correo'
  | 'pago'
  | 'consola'
  | 'video'
  | 'extension'
  | 'grafico'
  | 'juego';

/** Un paso de «como funciona»: un icono y dos o tres palabras (un nombre propio no se traduce). */
export interface PasoDelDiagrama {
  icon: IconoDePaso;
  label: Texto | string;
}

export interface Captura {
  src: string;
  alt: Texto;
}

export interface Proyecto {
  id: string;
  slug: string;
  title: string;
  category: CategoriaDeProyecto;
  /** Matiz de la categoria que se muestra en la tarjeta (por ejemplo «Hackathon»). */
  categoryNote?: Texto;
  client?: string;
  country?: Texto;
  shortDescription: Texto;
  fullDescription: Texto;
  problem?: Texto;
  solution?: Texto;
  role: Texto;
  /** Que hice yo, separado de lo que hizo el equipo o una herramienta de IA. */
  responsibilities?: Texto[];
  /** La arquitectura, en renglones cortos. Es lo que se muestra cuando el codigo es privado. */
  architecture?: Texto[];
  languages: string[];
  technologies: string[];
  /** Las etiquetas (pocas) que se ven en la tarjeta. */
  cardTags: string[];
  filters: FiltroDeTecnologia[];
  duration?: Texto;
  /** AAAA-MM. Sale del primer y del ultimo commit del repositorio, o de un dato del autor. */
  startDate?: string;
  endDate?: string;
  status?: EstadoDeProyecto;
  highlights?: Texto[];
  metrics?: Metrica[];
  screenshots: Captura[];
  /** Como funciona, en tres a cinco pasos. Es la imagen cuando no hay capturas publicables. */
  diagram?: PasoDelDiagrama[];
  /** Un logotipo real para la portada mientras no haya capturas. */
  logo?: string;
  repositoryUrl?: string;
  demoUrl?: string;
  featured: boolean;
  visibility: Visibilidad;
}
