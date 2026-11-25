/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: clientes-3.ts    Project: portfolio                                */
/*   Created: 2026/11/25 22:46:46  by vm                                      */
/*   Updated: 2026/11/25 22:46:46  by vm                                      */
/* ************************************************************************** */

/** Mas trabajo para clientes: portales, bots, mantenimiento y sistemas. */

import type { Proyecto } from '@/types/proyecto';

export const OTROS_CLIENTES: Proyecto[] = [
  {
    id: 'voto-escondido',
    slug: 'voto-escondido',
    title: 'Voto Escondido',
    category: 'cliente',
    country: { es: 'Perú', pt: 'Peru' },
    shortDescription: {
      es: 'Portal público que muestra cómo votó cada senador, con un panel para cargar y versionar los datos.',
      pt: 'Portal público que mostra como votou cada senador, com um painel para carregar e versionar os dados.',
    },
    fullDescription: {
      es: 'Home y detalle de cada votación, con un panel de administración que guarda las últimas versiones de los datos y las imágenes.',
      pt: 'Home e detalhe de cada votação, com um painel de administração que guarda as últimas versões dos dados e as imagens.',
    },
    role: {
      es: 'Autor único del backend; el frontend partió de una base generada con IA y lo integré yo.',
      pt: 'Autor único do backend; o frontend partiu de uma base gerada com IA e fui eu a integrá-lo.',
    },
    languages: ['Python', 'TypeScript'],
    technologies: ['FastAPI', 'JWT', 'React', 'Vite'],
    cardTags: ['FastAPI', 'React'],
    filters: ['python', 'react', 'typescript'],
    startDate: '2025-09',
    endDate: '2025-09',
    screenshots: [],
    diagram: [
      { icon: 'usuario', label: 'Admin' },
      { icon: 'api', label: 'API FastAPI' },
      { icon: 'documento', label: { es: 'Votaciones', pt: 'Votações' } },
      { icon: 'web', label: 'Portal' },
    ],
    featured: false,
    visibility: 'privado',
  },
  {
    id: 'bbloom',
    slug: 'bbloom',
    title: 'BBloom',
    category: 'cliente',
    shortDescription: {
      es: 'Frontend de una plataforma para conocer pareja: perfiles, filtros, mensajes y membresías.',
      pt: 'Frontend de uma plataforma de encontros: perfis, filtros, mensagens e subscrições.',
    },
    fullDescription: {
      es: 'Registro, perfil por pasos, tarjetas de perfiles con filtros, mensajes y planes de pago, sobre el diseño entregado por el cliente.',
      pt: 'Registo, perfil por passos, cartões de perfis com filtros, mensagens e planos de pagamento, sobre o design entregue pelo cliente.',
    },
    role: {
      es: 'Desarrollo del frontend a partir de una base generada con IA.',
      pt: 'Desenvolvimento do frontend a partir de uma base gerada com IA.',
    },
    languages: ['TypeScript'],
    technologies: ['React', 'Vite', 'Tailwind CSS', 'React Query'],
    cardTags: ['React', 'TypeScript', 'Tailwind'],
    filters: ['react', 'typescript'],
    startDate: '2025-07',
    endDate: '2025-07',
    screenshots: [],
    diagram: [
      { icon: 'usuario', label: { es: 'Registro', pt: 'Registo' } },
      { icon: 'movil', label: 'Perfil' },
      { icon: 'chat', label: { es: 'Mensajes', pt: 'Mensagens' } },
      { icon: 'pago', label: { es: 'Membresía', pt: 'Subscrição' } },
    ],
    featured: false,
    visibility: 'privado',
  },
  {
    id: 'bot-municipal',
    slug: 'bot-municipal',
    title: 'Bot de atención ciudadana',
    category: 'cliente',
    country: { es: 'Argentina', pt: 'Argentina' },
    shortDescription: {
      es: 'Bot de WhatsApp para una municipalidad: trámites, servicios y reclamos, con un agente de IA.',
      pt: 'Bot de WhatsApp para um município: trâmites, serviços e reclamações, com um agente de IA.',
    },
    fullDescription: {
      es: 'Flujo de n8n con entradas de WhatsApp y Telegram, un agente con memoria de conversación y herramientas HTTP, más la propuesta de arquitectura.',
      pt: 'Fluxo de n8n com entradas de WhatsApp e Telegram, um agente com memória de conversa e ferramentas HTTP, mais a proposta de arquitetura.',
    },
    role: {
      es: 'Autor único.',
      pt: 'Autor único.',
    },
    languages: [],
    technologies: ['n8n', 'OpenAI', 'WhatsApp Business', 'Telegram'],
    cardTags: ['n8n', 'IA', 'WhatsApp'],
    filters: ['ia'],
    startDate: '2025-06',
    endDate: '2025-06',
    screenshots: [],
    diagram: [
      { icon: 'chat', label: 'WhatsApp' },
      { icon: 'flujo', label: 'n8n' },
      { icon: 'ia', label: 'Agente de IA' },
      { icon: 'usuario', label: { es: 'Vecino', pt: 'Munícipe' } },
    ],
    featured: false,
    visibility: 'privado',
  },
  {
    id: 'wye',
    slug: 'wye',
    title: 'Portal de salones para eventos',
    category: 'cliente',
    shortDescription: {
      es: 'Mantenimiento de una plataforma Django heredada de anuncios de salones y servicios para fiestas.',
      pt: 'Manutenção de uma plataforma Django herdada de anúncios de salões e serviços para festas.',
    },
    fullDescription: {
      es: 'Sistema de terceros en Django 1.11, importado del servidor del cliente para corregir la carga de anuncios y los errores de fotos.',
      pt: 'Sistema de terceiros em Django 1.11, importado do servidor do cliente para corrigir o carregamento de anúncios e os erros de fotos.',
    },
    role: {
      es: 'Mantenimiento puntual de un sistema heredado.',
      pt: 'Manutenção pontual de um sistema herdado.',
    },
    languages: ['Python'],
    technologies: ['Django 1.11', 'Celery', 'PostgreSQL', 'Gunicorn'],
    cardTags: ['Django', 'Celery', 'Legacy'],
    filters: ['python', 'django'],
    startDate: '2025-11',
    endDate: '2026-04',
    screenshots: [],
    diagram: [
      { icon: 'nube', label: 'Servidor' },
      { icon: 'codigo', label: 'Django legacy' },
      { icon: 'datos', label: 'PostgreSQL' },
      { icon: 'web', label: 'Portal' },
    ],
    featured: false,
    visibility: 'privado',
  },
  {
    id: 'oli-vara',
    slug: 'oli-vara',
    title: 'Oli Vara Inmobiliaria',
    category: 'cliente',
    country: { es: 'México', pt: 'México' },
    shortDescription: {
      es: 'Landing de una agente de bienes raíces: servicios, vídeo, Instagram y contacto por WhatsApp.',
      pt: 'Landing de uma agente imobiliária: serviços, vídeo, Instagram e contacto por WhatsApp.',
    },
    fullDescription: {
      es: 'Sitio de una página con vídeo, servicios, feed de Instagram y páginas legales.',
      pt: 'Site de uma página com vídeo, serviços, feed do Instagram e páginas legais.',
    },
    role: {
      es: 'Ajuste de estilo y contenido sobre una base generada con IA.',
      pt: 'Ajuste de estilo e conteúdo sobre uma base gerada com IA.',
    },
    languages: ['TypeScript'],
    technologies: ['React', 'Vite', 'Tailwind CSS'],
    cardTags: ['React', 'Tailwind'],
    filters: ['react', 'typescript'],
    startDate: '2025-08',
    endDate: '2025-11',
    status: 'finalizado',
    screenshots: [],
    diagram: [
      { icon: 'web', label: 'Landing' },
      { icon: 'video', label: 'Vídeo' },
      { icon: 'chat', label: 'WhatsApp' },
    ],
    featured: false,
    visibility: 'privado',
  },
  {
    id: 'migracion-hosting',
    slug: 'migracion-hosting',
    title: 'Migración de hosting a Raspberry Pi',
    category: 'cliente',
    shortDescription: {
      es: 'Migración de un sitio WordPress y su correo a un servidor propio, documentada paso a paso.',
      pt: 'Migração de um site WordPress e do respetivo email para um servidor próprio, documentada passo a passo.',
    },
    fullDescription: {
      es: 'Instalación del servidor web y la base de datos, migración del sitio, certificados SSL, cortafuegos y correo con webmail.',
      pt: 'Instalação do servidor web e da base de dados, migração do site, certificados SSL, firewall e email com webmail.',
    },
    role: {
      es: 'Administración de sistemas, de punta a punta.',
      pt: 'Administração de sistemas, de ponta a ponta.',
    },
    languages: ['Bash'],
    technologies: ['Linux', 'Apache', 'MariaDB', 'WordPress', 'SSL', 'Roundcube'],
    cardTags: ['Linux', 'Apache', 'WordPress'],
    filters: ['cloud'],
    startDate: '2025-06',
    endDate: '2025-06',
    status: 'finalizado',
    screenshots: [],
    diagram: [
      { icon: 'nube', label: 'Hosting' },
      { icon: 'consola', label: { es: 'Migración', pt: 'Migração' } },
      { icon: 'nube', label: 'Raspberry Pi' },
      { icon: 'correo', label: 'Email' },
    ],
    featured: false,
    visibility: 'privado',
  },
];
