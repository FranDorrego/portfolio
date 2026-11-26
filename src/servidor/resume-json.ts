/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: resume-json.ts    Project: portfolio                               */
/*   Created: 2026/11/26 16:55:29  by vm                                      */
/*   Updated: 2026/11/26 22:20:11  by vm                                      */
/* ************************************************************************** */

/**
 * El curriculum en el formato abierto JSON Resume (https://jsonresume.org/schema): lo pueden
 * importar los ATS, las APIs y cualquier script sin leer HTML. Sale de los mismos datos que la
 * pagina.
 */

import { FORMACION } from '@/data/formacion';
import { PERFIL } from '@/data/perfil';
import { TESTIMONIOS } from '@/data/testimonios';
import { GRUPOS_DE_TECNOLOGIAS } from '@/data/tecnologias';
import { es } from '@/i18n/es';
import type { Idioma } from '@/i18n/idiomas';
import { pt } from '@/i18n/pt';
import { PARA_EL_CURRICULUM } from './texto-para-agentes';

export function resumeJson({ sitio, idioma }: { sitio: string; idioma: Idioma }): object {
  const t = idioma === 'pt' ? pt : es;
  const leer = (texto: { es: string; pt: string }): string => texto[idioma];
  const prefijo = idioma === 'pt' ? '/pt' : '';
  return {
    $schema: 'https://raw.githubusercontent.com/jsonresume/resume-schema/v1.0.0/schema.json',
    basics: {
      name: PERFIL.nombre,
      label: t.hero.subtitulo,
      image: `${sitio}/franco-dorrego.jpg`,
      email: PERFIL.email,
      url: `${sitio}${prefijo}/`,
      summary: `${t.meta.description} ${t.sobreMi.resumen}`,
      location: { city: 'Porto', countryCode: 'PT' },
      profiles: [
        { network: 'GitHub', username: 'FranDorrego', url: PERFIL.github },
        { network: 'LinkedIn', username: 'francodorrego', url: PERFIL.linkedin },
      ],
    },
    projects: PARA_EL_CURRICULUM.map((uno) => ({
      name: uno.title,
      description: leer(uno.fullDescription),
      highlights: [
        leer(uno.shortDescription),
        ...(uno.responsibilities ?? []).map(leer),
        ...(uno.highlights ?? []).map(leer),
      ],
      keywords: uno.technologies,
      roles: [leer(uno.role)],
      entity: uno.client,
      type: t.proyectos.categoriaCorta[uno.category],
      ...(uno.startDate && { startDate: uno.startDate }),
      ...(uno.endDate && { endDate: uno.endDate }),
      ...((uno.demoUrl ?? uno.repositoryUrl) && { url: uno.demoUrl ?? uno.repositoryUrl }),
    })),
    education: FORMACION.map((estudio) => ({
      institution: estudio.institucion,
      url: estudio.sitio,
      area: leer(estudio.titulo),
      ...(estudio.desde && { startDate: estudio.desde }),
      ...(estudio.hasta && { endDate: estudio.hasta }),
    })),
    skills: GRUPOS_DE_TECNOLOGIAS.map((grupo) => ({
      name: leer(grupo.titulo),
      keywords: grupo.tecnologias.map((uno) => uno.nombre),
    })),
    languages: [
      { language: idioma === 'pt' ? 'Espanhol' : 'Español', fluency: 'Native' },
      { language: idioma === 'pt' ? 'Português' : 'Portugués', fluency: 'Fluent' },
      { language: idioma === 'pt' ? 'Inglês' : 'Inglés', fluency: 'Beginner' },
    ],
    references: TESTIMONIOS.filter((uno) => uno.comentario).map((uno) => ({
      name: `${uno.cliente} · ${uno.trabajo}`,
      reference: uno.comentario,
    })),
    meta: { canonical: `${sitio}/resume${idioma === 'pt' ? '-pt' : ''}.json` },
  };
}
