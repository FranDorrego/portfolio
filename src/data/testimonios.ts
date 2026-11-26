/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: testimonios.ts    Project: portfolio                               */
/*   Created: 2026/11/26 13:34:21  by vm                                      */
/*   Updated: 2026/11/26 13:36:29  by vm                                      */
/* ************************************************************************** */

/**
 * Lo que dijeron clientes y empresas con las que trabaje, tal como figura en Workana. Las
 * opiniones se citan textuales (en el idioma en que se escribieron). `proyecto` enlaza con la
 * ficha del catalogo cuando el trabajo esta ahi.
 */

export interface Testimonio {
  trabajo: string;
  enlaceDelTrabajo?: string;
  cliente: string;
  enlaceDelCliente: string;
  calificacion: number;
  /** AAAA-MM, o solo AAAA cuando Workana dice «hace un año». */
  fecha: string;
  comentario?: string;
  habilidades: string[];
  /** El id del proyecto del catalogo, si esta. */
  proyecto?: string;
}

const WORKANA = 'https://www.workana.com';

export const TESTIMONIOS: Testimonio[] = [
  {
    trabajo: 'Desarrollo de Sitio Web de Reservas para Tours en Dinamarca',
    enlaceDelTrabajo: `${WORKANA}/job/desarrollo-de-sitio-web-de-reservas-para-tours-en-dinamarca`,
    cliente: 'Luis',
    enlaceDelCliente: `${WORKANA}/e/81b9f93c148599d33c0f803802c029d2`,
    calificacion: 5,
    fecha: '2026-11',
    comentario:
      'Todo fue excelente. Muy contento y muy profesional. No dudaría en trabajar nuevamente con él.',
    habilidades: ['JavaScript', 'PHP', 'MySQL', 'API', 'Responsive Web Design'],
    proyecto: 'dinamarca-tours',
  },
  {
    trabajo: 'Desarrollo de Página Web Profesional para Empresa de Inversiones',
    enlaceDelTrabajo: `${WORKANA}/job/desarrollo-de-pagina-web-profesional-para-empresa-de-inversiones`,
    cliente: 'Bright Venture',
    enlaceDelCliente: `${WORKANA}/e/6e0cae6783a0dbdb7c64e58b6513f877`,
    calificacion: 5,
    fecha: '2025',
    comentario:
      'Excelente servicio, muy buena comunicación y muy paciente a todas las peticiones y necesidades que se fueron presentando a lo largo del proyecto.',
    habilidades: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL', 'Responsive Web Design'],
    proyecto: 'bright-ventures',
  },
  {
    trabajo: 'Experto en Automatización con Make (Integromat) para Integración de Negocios',
    enlaceDelTrabajo: `${WORKANA}/job/experto-en-automatizacion-con-make-integromat-para-integracion-de-negocios`,
    cliente: 'Javier Rubio Fernández',
    enlaceDelCliente: `${WORKANA}/e/6e239ca6b7343e6442cf9051e6032f29`,
    calificacion: 5,
    fecha: '2025',
    comentario:
      '¡Increíble! Persona muy agradable y trabajadora. Ha realizado el trabajo bastante rápido e incluso mejorando algunas cosas que se habían comentado. Lo recomiendo.',
    habilidades: ['CRM', 'Python', 'Node.js', 'API', 'JSON', 'QA Automation'],
  },
  {
    trabajo: 'Make (Integromat) Consultoría e Implementación de escenario',
    enlaceDelTrabajo: `${WORKANA}/job/make-integromat-consultoria-e-implementacion-de-escenario`,
    cliente: 'Alejandro Herrera',
    enlaceDelCliente: `${WORKANA}/e/576f46fa0e5f21a02b809691d789dbdf`,
    calificacion: 5,
    fecha: '2025',
    comentario:
      'Excelente freelancer, muy buena comunicación, disposición y trato. Definitivamente lo recomiendo.',
    habilidades: ['Inteligencia Artificial'],
  },
  {
    trabajo: 'Workana AI > Estudio PGH',
    enlaceDelTrabajo: `${WORKANA}/job/workana-ai-estudio-pgh`,
    cliente: 'Estudio PGH',
    enlaceDelCliente: `${WORKANA}/o/estudio-pgh`,
    calificacion: 4,
    fecha: '2026-07',
    habilidades: ['JavaScript', 'MySQL', 'PHP'],
  },
  {
    trabajo: 'Agente Digitalmtx',
    enlaceDelTrabajo: `${WORKANA}/job/agente-digitalmtx-2`,
    cliente: 'Digital MTX',
    enlaceDelCliente: `${WORKANA}/o/digital-mtx`,
    calificacion: 5,
    fecha: '2026-05',
    habilidades: [],
  },
  {
    trabajo: 'Agente Digitalmtx',
    enlaceDelTrabajo: `${WORKANA}/job/agente-digitalmtx`,
    cliente: 'Digital MTX',
    enlaceDelCliente: `${WORKANA}/o/digital-mtx`,
    calificacion: 5,
    fecha: '2026-02',
    habilidades: [],
  },
  {
    trabajo: 'Quiero un portal web seguro para compartir información',
    enlaceDelTrabajo: `${WORKANA}/job/quiero-un-portal-web-seguro-para-compartir-informacion`,
    cliente: 'Juan Vargas',
    enlaceDelCliente: `${WORKANA}/e/4328f80f56fadc56699a0772962555d0`,
    calificacion: 5,
    fecha: '2025',
    habilidades: ['HTML', 'CSS', 'JavaScript', 'WordPress'],
  },
  {
    trabajo: 'Pago directo para Alexis - Programador Web',
    cliente: 'Lara L.',
    enlaceDelCliente: `${WORKANA}/e/be7da9d1003d5e944245ac62abb09aef`,
    calificacion: 5,
    fecha: '2025',
    habilidades: [],
  },
  {
    trabajo: 'Omnixbot',
    enlaceDelTrabajo: `${WORKANA}/job/omnixbot-1`,
    cliente: 'Harold Nunes',
    enlaceDelCliente: `${WORKANA}/e/c7d8e69f6f82f0d43e72d36ae3f46b96`,
    calificacion: 5,
    fecha: '2025',
    habilidades: ['HTML', 'WordPress', 'Responsive Web Design'],
  },
];

/** La calificacion promedio, con un decimal. */
export function promedio(testimonios: readonly Testimonio[]): number {
  if (testimonios.length === 0) return 0;
  const suma = testimonios.reduce((total, uno) => total + uno.calificacion, 0);
  return Math.round((suma / testimonios.length) * 10) / 10;
}
