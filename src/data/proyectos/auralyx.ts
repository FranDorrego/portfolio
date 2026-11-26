/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: auralyx.ts    Project: portfolio                                   */
/*   Created: 2026/11/26 01:37:20  by vm                                      */
/*   Updated: 2026/11/26 01:37:20  by vm                                      */
/* ************************************************************************** */

/** AuraLyx. */

import type { Proyecto } from '@/types/proyecto';

export const AURALYX: Proyecto = {
  id: 'auralyx',
  slug: 'auralyx',
  title: 'AuraLyx',
  category: 'cliente',
  client: 'AuraLyx',
  shortDescription: {
    es: 'Gestión de facturas con IA y OCR desde WhatsApp, y un CRM de contactos con chatbot.',
    pt: 'Gestão de faturas com IA e OCR a partir do WhatsApp, e um CRM de contactos com chatbot.',
  },
  fullDescription: {
    es: 'Dos productos. En Gestión, los clientes envían facturas y comprobantes por WhatsApp, un modelo de visión extrae los datos y la gestoría los exporta a Excel con sus propias plantillas. El CRM reúne contactos, citas, chats de WhatsApp y reseñas.',
    pt: 'Dois produtos. Na Gestão, os clientes enviam faturas e comprovativos por WhatsApp, um modelo de visão extrai os dados e o gabinete exporta-os para Excel com os seus próprios modelos. O CRM reúne contactos, marcações, chats de WhatsApp e avaliações.',
  },
  problem: {
    es: 'Cargar a mano los datos de cada factura que llega como foto o PDF.',
    pt: 'Introduzir à mão os dados de cada fatura que chega como fotografia ou PDF.',
  },
  solution: {
    es: 'Dos backends Django con la misma anatomía: vistas finas, servicios sin HTTP y un contrato para n8n fijado por pruebas. El acceso a los datos se controla por empresa.',
    pt: 'Dois backends Django com a mesma anatomia: views finas, serviços sem HTTP e um contrato para o n8n fixado por testes. O acesso aos dados é controlado por empresa.',
  },
  role: {
    es: 'Único desarrollador de los dos backends.',
    pt: 'Único programador dos dois backends.',
  },
  responsibilities: [
    {
      es: 'Parte del refactor a una capa de servicios se hizo con un asistente de IA; yo reviso y fusiono cada cambio.',
      pt: 'Parte do refactor para uma camada de serviços foi feita com um assistente de IA; eu revejo e integro cada alteração.',
    },
  ],
  languages: ['Python', 'TypeScript'],
  technologies: [
    'Django',
    'DRF',
    'PostgreSQL',
    'OCR',
    'Modelos de visión',
    'WhatsApp Cloud API',
    'n8n',
    'GitHub Actions',
  ],
  cardTags: ['Django', 'IA + OCR', 'WhatsApp', 'n8n'],
  filters: ['python', 'django', 'react', 'typescript', 'ia'],
  startDate: '2025-07',
  endDate: '2026-10',
  screenshots: [
    {
      src: 'proyectos/auralyx/01.webp',
      alt: { es: 'Web corporativa de AuraLyx', pt: 'Site corporativo da AuraLyx' },
    },
    {
      src: 'proyectos/auralyx/02.webp',
      alt: {
        es: 'Panel del CRM con métricas y contactos',
        pt: 'Painel do CRM com métricas e contactos',
      },
    },
    {
      src: 'proyectos/auralyx/03.webp',
      alt: {
        es: 'Portada de la gestión de facturas por WhatsApp',
        pt: 'Página inicial da gestão de faturas por WhatsApp',
      },
    },
    {
      src: 'proyectos/auralyx/04.webp',
      alt: {
        es: 'Documentos leídos por IA y su estado de exportación',
        pt: 'Documentos lidos por IA e o seu estado de exportação',
      },
    },
    {
      src: 'proyectos/auralyx/05.webp',
      alt: { es: 'Empresas de una gestoría', pt: 'Empresas de um gabinete de contabilidade' },
    },
  ],
  diagram: [
    { icon: 'chat', label: 'WhatsApp' },
    { icon: 'documento', label: { es: 'Factura', pt: 'Fatura' } },
    { icon: 'ia', label: { es: 'IA de visión', pt: 'IA de visão' } },
    { icon: 'api', label: 'API Django' },
    { icon: 'planilla', label: 'Excel' },
  ],
  featured: false,
  visibility: 'privado',
};
