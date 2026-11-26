/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: texto-para-agentes.ts    Project: portfolio                        */
/*   Created: 2026/11/26 01:43:49  by vm                                      */
/*   Updated: 2026/11/26 22:04:35  by vm                                      */
/* ************************************************************************** */

/**
 * El curriculum en Markdown, en espanol o en portugues: quien soy, como contactarme, que se,
 * donde estudie, cada proyecto con mi rol, los clientes y las preguntas frecuentes. Lo leen los
 * agentes de IA (llms.txt, llms-full.txt) y de el salen la pagina /cv/ y el PDF que leen los ATS.
 * Sale de los mismos datos que la pagina, asi que nunca se desactualiza.
 */

import { FORMACION } from '@/data/formacion';
import { PERFIL, cvParaAts } from '@/data/perfil';
import { PROYECTOS } from '@/data/proyectos';
import { TESTIMONIOS, promedio } from '@/data/testimonios';
import { GRUPOS_DE_TECNOLOGIAS } from '@/data/tecnologias';
import { es } from '@/i18n/es';
import type { Idioma } from '@/i18n/idiomas';
import { pt } from '@/i18n/pt';
import type { Proyecto } from '@/types/proyecto';

const ROTULOS = {
  es: {
    sitio: 'Sitio',
    espanol: 'español',
    portugues: 'portugués',
    contacto: 'Contacto',
    ubicacion: 'Ubicación',
    sobreMi: 'Sobre mí',
    fortalezas: 'Fortalezas',
    mejoras: 'A mejorar',
    formacion: 'Formación',
    enCurso: 'en curso',
    tecnologias: 'Tecnologías',
    experiencia: 'Experiencia',
    categoria: 'Categoría',
    pais: 'País',
    rol: 'Rol',
    periodo: 'Período',
    hoy: 'hoy',
    codigo: 'Código',
    problema: 'Problema',
    solucion: 'Solución',
    calificacion: '{{promedio}} de 5 en {{cantidad}} trabajos',
    completo: 'Versión completa, con cada proyecto en detalle',
    otros: 'Otros formatos',
  },
  pt: {
    sitio: 'Site',
    espanol: 'espanhol',
    portugues: 'português',
    contacto: 'Contacto',
    ubicacion: 'Localização',
    sobreMi: 'Sobre mim',
    fortalezas: 'Pontos fortes',
    mejoras: 'A melhorar',
    formacion: 'Formação',
    enCurso: 'em curso',
    tecnologias: 'Tecnologias',
    experiencia: 'Experiência',
    categoria: 'Categoria',
    pais: 'País',
    rol: 'Função',
    periodo: 'Período',
    hoy: 'hoje',
    codigo: 'Código',
    problema: 'Problema',
    solucion: 'Solução',
    calificacion: '{{promedio}} de 5 em {{cantidad}} trabalhos',
    completo: 'Versão completa, com cada projeto em detalhe',
    otros: 'Outros formatos',
  },
} as const;

type Rotulos = (typeof ROTULOS)[Idioma];

/** Los proyectos que van al curriculum (ver `enElCurriculum` en src/types/proyecto.ts). */
export const PARA_EL_CURRICULUM = PROYECTOS.filter((uno) => uno.enElCurriculum !== false);

function proyecto({
  uno,
  completo,
  idioma,
}: {
  uno: Proyecto;
  completo: boolean;
  idioma: Idioma;
}): string {
  const r: Rotulos = ROTULOS[idioma];
  const t = idioma === 'pt' ? pt : es;
  const lineas = [`### ${uno.title}`, '', uno.shortDescription[idioma], ''];
  lineas.push(`- ${r.categoria}: ${t.proyectos.categoriaCorta[uno.category]}`);
  if (uno.country) lineas.push(`- ${r.pais}: ${uno.country[idioma]}`);
  lineas.push(`- ${r.rol}: ${uno.role[idioma]}`);
  if (uno.technologies.length > 0) {
    lineas.push(`- ${r.tecnologias}: ${uno.technologies.join(', ')}`);
  }
  if (uno.startDate) lineas.push(`- ${r.periodo}: ${uno.startDate} – ${uno.endDate ?? r.hoy}`);
  if (uno.repositoryUrl) lineas.push(`- ${r.codigo}: ${uno.repositoryUrl}`);
  if (uno.demoUrl) lineas.push(`- ${r.sitio}: ${uno.demoUrl}`);
  if (completo) {
    lineas.push('', uno.fullDescription[idioma]);
    if (uno.problem) lineas.push('', `${r.problema}: ${uno.problem[idioma]}`);
    if (uno.solution) lineas.push('', `${r.solucion}: ${uno.solution[idioma]}`);
    const renglones = [...(uno.responsibilities ?? []), ...(uno.architecture ?? [])];
    if (renglones.length > 0) lineas.push('');
    for (const renglon of renglones) lineas.push(`- ${renglon[idioma]}`);
  }
  return lineas.join('\n');
}

function clientes(r: Rotulos, titulo: string): string[] {
  const calificacion = r.calificacion
    .replace('{{promedio}}', String(promedio(TESTIMONIOS)))
    .replace('{{cantidad}}', String(TESTIMONIOS.length));
  return [
    `## ${titulo} (${calificacion})`,
    '',
    ...TESTIMONIOS.map(
      (uno) =>
        `- ${uno.cliente} (${[`${uno.calificacion}/5`, uno.fecha].filter(Boolean).join(', ')}): ` +
        uno.trabajo +
        (uno.comentario ? ` — “${uno.comentario}”` : ''),
    ),
    '',
  ];
}

/**
 * `completo`: con la descripcion larga de cada proyecto (llms-full.txt y el CV). `idioma`: por
 * defecto espanol.
 */
export function textoParaAgentes({
  sitio,
  completo,
  idioma = 'es',
}: {
  sitio: string;
  completo: boolean;
  idioma?: Idioma;
}): string {
  const r: Rotulos = ROTULOS[idioma];
  const t = idioma === 'pt' ? pt : es;
  const leer = (texto: { es: string; pt: string }): string => texto[idioma];
  const prefijo = idioma === 'pt' ? '/pt' : '';
  const partes = [
    '# Franco Dorrego',
    '',
    `> ${t.meta.description}`,
    '',
    `${r.sitio}: ${sitio}/ (${r.espanol}) · ${sitio}/pt/ (${r.portugues}).`,
    '',
    `## ${r.contacto}`,
    '',
    `- Email: ${PERFIL.email}`,
    `- LinkedIn: ${PERFIL.linkedin}`,
    `- GitHub: ${PERFIL.github}`,
    `- ${r.ubicacion}: Porto, Portugal.`,
    '',
    `## ${r.sobreMi}`,
    '',
    t.sobreMi.resumen,
    '',
    ...Object.values(t.sobreMi.datos).map((dato) => `- ${dato}`),
    '',
    `${r.fortalezas}: ${t.sobreMi.fortalezas.join('; ')}.`,
    '',
    `${r.mejoras}: ${t.sobreMi.mejoras.join('; ')}.`,
    '',
    `## ${r.formacion}`,
    '',
    ...FORMACION.map(
      (estudio) =>
        `- ${estudio.institucion}: ${leer(estudio.titulo)} ` +
        `(${leer(estudio.lugar)}${estudio.enCurso ? `, ${r.enCurso}` : ''})`,
    ),
    '',
    `## ${r.tecnologias}`,
    '',
    ...GRUPOS_DE_TECNOLOGIAS.map(
      (grupo) =>
        `- ${leer(grupo.titulo)}: ${grupo.tecnologias.map((uno) => uno.nombre).join(', ')}`,
    ),
    '',
    t.tecnologias.checker,
    '',
    `## ${r.experiencia} (${t.proyectos.antiguedad})`,
    '',
    ...PARA_EL_CURRICULUM.map((uno) => proyecto({ uno, completo, idioma }) + '\n'),
    ...clientes(r, t.clientes.titulo),
    `## ${t.preguntas.titulo}`,
    '',
    ...t.preguntas.lista.map((item) => `**${item.pregunta}** ${item.respuesta}\n`),
    `## ${r.otros}`,
    '',
    `- CV (PDF para ATS, una página): ${cvParaAts(idioma)}`,
    `- CV (HTML): ${sitio}${prefijo}/cv/`,
    `- CV (PDF): ${sitio}/cv-franco-dorrego${idioma === 'pt' ? '-pt' : ''}.pdf`,
    `- JSON Resume: ${sitio}/resume${idioma === 'pt' ? '-pt' : ''}.json`,
    `- Markdown: ${sitio}${prefijo}/llms-full.txt`,
    '',
  ];
  if (!completo) partes.push(`${r.completo}: ${sitio}${prefijo}/llms-full.txt`, '');
  return partes.join('\n');
}
