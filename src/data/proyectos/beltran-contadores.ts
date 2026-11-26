/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: beltran-contadores.ts    Project: portfolio                        */
/*   Created: 2026/11/26 01:37:20  by vm                                      */
/*   Updated: 2026/11/26 01:37:20  by vm                                      */
/* ************************************************************************** */

/** Beltrán Contadores. */

import type { Proyecto } from '@/types/proyecto';

export const BELTRAN_CONTADORES: Proyecto = {
  id: 'beltran-contadores',
  slug: 'beltran-contadores',
  title: 'Beltrán Contadores',
  category: 'cliente',
  client: 'Beltrán Contadores',
  shortDescription: {
    es: 'Registro de operaciones agrícolas por WhatsApp, con backend, flujos de IA y panel administrativo.',
    pt: 'Registo de operações agrícolas por WhatsApp, com backend, fluxos de IA e painel administrativo.',
  },
  fullDescription: {
    es: 'Los productores cuentan por WhatsApp lo que hicieron en el campo y un chatbot lo convierte en registros: tareas, productos, maquinaria, ingresos y egresos. El estudio contable los revisa en un panel web y exporta cada campaña a Excel con sus costos.',
    pt: 'Os produtores contam por WhatsApp o que fizeram no campo e um chatbot converte isso em registos: tarefas, produtos, maquinaria, receitas e despesas. O gabinete de contabilidade revê-os num painel web e exporta cada campanha para Excel com os respetivos custos.',
  },
  problem: {
    es: 'La información de cada campaña llegaba tarde, incompleta y por mensajes sueltos que alguien tenía que pasar a mano.',
    pt: 'A informação de cada campanha chegava tarde, incompleta e em mensagens soltas que alguém tinha de passar à mão.',
  },
  solution: {
    es: 'Una API Django que guarda las conversaciones y los registros, y trece flujos de n8n que entienden cada mensaje. Los reintentos solo se aplican a lecturas, para no duplicar registros.',
    pt: 'Uma API Django que guarda as conversas e os registos, e treze fluxos de n8n que interpretam cada mensagem. As novas tentativas só se aplicam a leituras, para não duplicar registos.',
  },
  role: {
    es: 'Backend (compartido) y autor único del chatbot y de los flujos de n8n.',
    pt: 'Backend (partilhado) e autor único do chatbot e dos fluxos de n8n.',
  },
  responsibilities: [
    {
      es: 'Backend en equipo: la base inicial la escribió otro desarrollador; desde febrero de 2026 lo continúo yo y hago la reestructuración (201 de 378 commits).',
      pt: 'Backend em equipa: a base inicial foi escrita por outro programador; desde fevereiro de 2026 continuo-o eu e faço a reestruturação (201 de 378 commits).',
    },
    {
      es: 'Chatbot y flujos de n8n: los 44 commits son míos.',
      pt: 'Chatbot e fluxos de n8n: os 44 commits são meus.',
    },
  ],
  architecture: [
    {
      es: 'Django + DRF con PostgreSQL y apps por dominio; sin broker: dos comandos corridos por systemd.',
      pt: 'Django + DRF com PostgreSQL e apps por domínio; sem broker: dois comandos corridos pelo systemd.',
    },
    {
      es: 'Una prueba de contrato por instantánea cubre todos los endpoints en uso.',
      pt: 'Um teste de contrato por snapshot cobre todos os endpoints em uso.',
    },
  ],
  languages: ['Python', 'TypeScript', 'JavaScript'],
  technologies: [
    'Django',
    'DRF',
    'PostgreSQL',
    'n8n',
    'WhatsApp API',
    'OpenRouter',
    'pandas',
    'React',
  ],
  cardTags: ['Django', 'PostgreSQL', 'n8n', 'WhatsApp API'],
  filters: ['python', 'django', 'react', 'typescript', 'ia'],
  startDate: '2025-12',
  endDate: '2026-10',
  screenshots: [
    {
      src: 'proyectos/beltran-contadores/01.webp',
      alt: { es: 'Portada del sistema', pt: 'Página inicial do sistema' },
    },
    {
      src: 'proyectos/beltran-contadores/02.webp',
      alt: {
        es: 'Clientes productores y sus campañas agrícolas',
        pt: 'Clientes produtores e as suas campanhas agrícolas',
      },
    },
    {
      src: 'proyectos/beltran-contadores/03.webp',
      alt: {
        es: 'Detalle de una campaña: campos, lotes y cultivos',
        pt: 'Detalhe de uma campanha: campos, lotes e culturas',
      },
    },
    {
      src: 'proyectos/beltran-contadores/04.webp',
      alt: { es: 'Acceso al panel AgroAdmin', pt: 'Acesso ao painel AgroAdmin' },
    },
  ],
  diagram: [
    { icon: 'chat', label: 'WhatsApp' },
    { icon: 'flujo', label: 'n8n + IA' },
    { icon: 'api', label: 'API Django' },
    { icon: 'web', label: { es: 'Panel', pt: 'Painel' } },
    { icon: 'planilla', label: 'Excel' },
  ],
  featured: false,
  visibility: 'privado',
};
