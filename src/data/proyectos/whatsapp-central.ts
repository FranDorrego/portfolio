/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: whatsapp-central.ts    Project: portfolio                          */
/*   Created: 2026/11/26 01:37:20  by vm                                      */
/*   Updated: 2026/11/26 01:37:20  by vm                                      */
/* ************************************************************************** */

/** WhatsApp Central. */

import type { Proyecto } from '@/types/proyecto';

export const WHATSAPP_CENTRAL: Proyecto = {
  id: 'whatsapp-central',
  slug: 'whatsapp-central',
  title: 'WhatsApp Central',
  category: 'propio',
  shortDescription: {
    es: 'Una sola API para enviar y recibir WhatsApp por Meta y por Twilio, con librería cliente y panel web.',
    pt: 'Uma única API para enviar e receber WhatsApp via Meta e via Twilio, com biblioteca cliente e painel web.',
  },
  fullDescription: {
    es: 'Normaliza los mensajes de los dos proveedores, guarda las conversaciones, descarga los archivos y reenvía cada mensaje al webhook del cliente. Incluye una librería Python y un panel para plantillas.',
    pt: 'Normaliza as mensagens dos dois fornecedores, guarda as conversas, descarrega os ficheiros e reencaminha cada mensagem para o webhook do cliente. Inclui uma biblioteca Python e um painel para modelos.',
  },
  role: {
    es: 'Autor único del backend; el frontend partió de una base generada con IA y lo integré yo.',
    pt: 'Autor único do backend; o frontend partiu de uma base gerada com IA e fui eu a integrá-lo.',
  },
  languages: ['Python', 'TypeScript'],
  technologies: ['Django', 'DRF', 'PostgreSQL', 'Twilio', 'Meta WhatsApp API', 'React'],
  cardTags: ['Django', 'Twilio', 'Meta API'],
  filters: ['python', 'django', 'react', 'typescript'],
  startDate: '2025-12',
  endDate: '2026-01',
  screenshots: [
    {
      src: 'proyectos/whatsapp-central/01.webp',
      alt: { es: 'Portada del servicio', pt: 'Página inicial do serviço' },
    },
    {
      src: 'proyectos/whatsapp-central/02.webp',
      alt: { es: 'Bandeja de conversaciones', pt: 'Caixa de conversas' },
    },
    {
      src: 'proyectos/whatsapp-central/03.webp',
      alt: { es: 'Funcionalidades', pt: 'Funcionalidades' },
    },
    {
      src: 'proyectos/whatsapp-central/04.webp',
      alt: { es: 'Documentación de la librería', pt: 'Documentação da biblioteca' },
    },
    { src: 'proyectos/whatsapp-central/05.webp', alt: { es: 'Acceso', pt: 'Acesso' } },
  ],
  diagram: [
    { icon: 'chat', label: 'Meta / Twilio' },
    { icon: 'api', label: 'API Django' },
    { icon: 'datos', label: 'PostgreSQL' },
    { icon: 'externo', label: 'Webhook' },
    { icon: 'web', label: { es: 'Panel', pt: 'Painel' } },
  ],
  featured: false,
  visibility: 'privado',
};
