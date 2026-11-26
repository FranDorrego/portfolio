/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: texto-para-agentes.ts    Project: portfolio                        */
/*   Created: 2026/11/26 01:43:49  by vm                                      */
/*   Updated: 2026/11/26 01:43:49  by vm                                      */
/* ************************************************************************** */

/**
 * El resumen en Markdown que leen los agentes de IA (llms.txt y llms-full.txt): quien soy, como
 * contactarme, que se, donde estudie y cada proyecto con mi rol. Sale de los mismos datos que la
 * pagina, asi que nunca se desactualiza.
 */

import { FORMACION } from '@/data/formacion';
import { PERFIL } from '@/data/perfil';
import { PROYECTOS } from '@/data/proyectos';
import { GRUPOS_DE_TECNOLOGIAS } from '@/data/tecnologias';
import { es } from '@/i18n/es';
import type { Proyecto } from '@/types/proyecto';

function proyecto({ uno, completo }: { uno: Proyecto; completo: boolean }): string {
  const lineas = [`### ${uno.title}`, '', uno.shortDescription.es, ''];
  lineas.push(`- Categoría: ${es.proyectos.categoriaCorta[uno.category]}`);
  if (uno.country) lineas.push(`- País: ${uno.country.es}`);
  lineas.push(`- Rol: ${uno.role.es}`);
  if (uno.technologies.length > 0) lineas.push(`- Tecnologías: ${uno.technologies.join(', ')}`);
  if (uno.startDate) lineas.push(`- Período: ${uno.startDate} – ${uno.endDate ?? 'hoy'}`);
  if (uno.repositoryUrl) lineas.push(`- Código: ${uno.repositoryUrl}`);
  if (uno.demoUrl) lineas.push(`- Sitio: ${uno.demoUrl}`);
  if (completo) {
    lineas.push('', uno.fullDescription.es);
    if (uno.problem) lineas.push('', `Problema: ${uno.problem.es}`);
    if (uno.solution) lineas.push('', `Solución: ${uno.solution.es}`);
    for (const renglon of uno.responsibilities ?? []) lineas.push(`- ${renglon.es}`);
    for (const renglon of uno.architecture ?? []) lineas.push(`- ${renglon.es}`);
  }
  return lineas.join('\n');
}

/** `completo`: con la descripcion larga de cada proyecto (llms-full.txt). */
export function textoParaAgentes({
  sitio,
  completo,
}: {
  sitio: string;
  completo: boolean;
}): string {
  const partes = [
    '# Franco Dorrego',
    '',
    `> ${es.meta.description}`,
    '',
    `Sitio: ${sitio}/ (español) · ${sitio}/pt/ (portugués).`,
    '',
    '## Contacto',
    '',
    `- Email: ${PERFIL.email}`,
    `- LinkedIn: ${PERFIL.linkedin}`,
    `- GitHub: ${PERFIL.github}`,
    `- Ubicación: Porto, Portugal. ${es.barra.estado}.`,
    '',
    '## Sobre mí',
    '',
    es.sobreMi.resumen,
    '',
    ...Object.values(es.sobreMi.datos).map((dato) => `- ${dato}`),
    '',
    `Fortalezas: ${es.sobreMi.fortalezas.join('; ')}.`,
    `A mejorar: ${es.sobreMi.mejoras.join('; ')}.`,
    '',
    '## Formación',
    '',
    ...FORMACION.map(
      (estudio) =>
        `- ${estudio.institucion}: ${estudio.titulo.es} (${estudio.lugar.es}${estudio.enCurso ? ', en curso' : ''})`,
    ),
    '',
    '## Tecnologías',
    '',
    ...GRUPOS_DE_TECNOLOGIAS.map(
      (grupo) =>
        `- ${grupo.titulo.es}: ${grupo.tecnologias.map((tecnologia) => tecnologia.nombre).join(', ')}`,
    ),
    '',
    es.tecnologias.checker,
    '',
    `## Experiencia (${es.proyectos.antiguedad})`,
    '',
    ...PROYECTOS.map((uno) => proyecto({ uno, completo }) + '\n'),
    '## Preguntas frecuentes',
    '',
    ...es.preguntas.lista.map((item) => `**${item.pregunta}** ${item.respuesta}\n`),
  ];
  if (!completo) {
    partes.push(`Versión completa, con cada proyecto en detalle: ${sitio}/llms-full.txt`);
  }
  return partes.join('\n') + '\n';
}
