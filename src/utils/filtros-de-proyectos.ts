/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: filtros-de-proyectos.ts    Project: portfolio                      */
/*   Created: 2026/11/25 21:30:00  by claude                                  */
/*   Updated: 2026/11/25 21:30:00  by claude                                  */
/* ************************************************************************** */

/** Buscar y filtrar el catalogo: texto libre, tecnologia y categoria, combinables. */

import type { Idioma } from '@/i18n/idiomas';
import type { CategoriaDeProyecto, FiltroDeTecnologia, Proyecto } from '@/types/proyecto';

export interface CriteriosDeBusqueda {
  texto: string;
  tecnologia: FiltroDeTecnologia | 'todas';
  categoria: CategoriaDeProyecto | 'todas';
}

export const SIN_CRITERIOS: CriteriosDeBusqueda = {
  texto: '',
  tecnologia: 'todas',
  categoria: 'todas',
};

/** Minusculas y sin acentos: «automatizacion» encuentra «Automatización». */
export function normalizar(texto: string): string {
  return texto.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
}

interface Etiquetas {
  categorias: Record<CategoriaDeProyecto, string>;
  tecnologias: Record<FiltroDeTecnologia, string>;
}

/** Todo lo que se puede buscar de un proyecto, en un solo texto ya normalizado. */
interface Busqueda {
  proyecto: Proyecto;
  idioma: Idioma;
  etiquetas: Etiquetas;
}

export function textoBuscable({ proyecto, idioma, etiquetas }: Busqueda): string {
  return normalizar(
    [
      proyecto.title,
      proyecto.client ?? '',
      proyecto.country?.[idioma] ?? '',
      proyecto.shortDescription[idioma],
      proyecto.fullDescription[idioma],
      proyecto.role[idioma],
      etiquetas.categorias[proyecto.category],
      proyecto.categoryNote?.[idioma] ?? '',
      ...proyecto.languages,
      ...proyecto.technologies,
      ...proyecto.filters.map((filtro) => etiquetas.tecnologias[filtro]),
    ].join(' · '),
  );
}

export function hayCriterios(criterios: CriteriosDeBusqueda): boolean {
  return (
    criterios.texto.trim() !== '' ||
    criterios.tecnologia !== 'todas' ||
    criterios.categoria !== 'todas'
  );
}

/** Cada palabra escrita tiene que estar; el orden del catalogo se conserva. */
export function filtrarProyectos(
  proyectos: readonly Proyecto[],
  criterios: CriteriosDeBusqueda,
  idioma: Idioma,
  etiquetas: Etiquetas,
): Proyecto[] {
  const palabras = normalizar(criterios.texto).split(/\s+/).filter(Boolean);
  return proyectos.filter((proyecto) => {
    if (criterios.categoria !== 'todas' && proyecto.category !== criterios.categoria) return false;
    if (criterios.tecnologia !== 'todas' && !proyecto.filters.includes(criterios.tecnologia)) {
      return false;
    }
    if (palabras.length === 0) return true;
    const donde = textoBuscable({ proyecto, idioma, etiquetas });
    return palabras.every((palabra) => donde.includes(palabra));
  });
}
