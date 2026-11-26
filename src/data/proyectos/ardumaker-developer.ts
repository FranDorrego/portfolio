/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: ardumaker-developer.ts    Project: portfolio                       */
/*   Created: 2026/11/26 01:37:20  by vm                                      */
/*   Updated: 2026/11/26 01:37:20  by vm                                      */
/* ************************************************************************** */

/** ArduMaker Developer. */

import type { Proyecto } from '@/types/proyecto';

export const ARDUMAKER_DEVELOPER: Proyecto = {
  id: 'ardumaker-developer',
  slug: 'ardumaker-developer',
  title: 'ArduMaker Developer',
  category: 'propio',
  shortDescription: {
    es: 'Plataforma cloud y SaaS para freelancers y equipos de desarrollo: servidores, dominios, aplicaciones, bases de datos, automatizaciones, APIs y herramientas de IA en un solo lugar.',
    pt: 'Plataforma cloud e SaaS para freelancers e equipas de desenvolvimento: servidores, domínios, aplicações, bases de dados, automatizações, APIs e ferramentas de IA num só lugar.',
  },
  fullDescription: {
    es: 'ArduMaker Developer centraliza lo que un freelancer o un equipo pequeño necesita para llevar un proyecto a producción: miniVPS Linux, dominios y DNS, despliegues desde GitHub, bases de datos, correo, WhatsApp, gestión de proyectos y un servidor MCP para que los agentes de IA operen todo eso con permiso del usuario.',
    pt: 'A ArduMaker Developer centraliza o que um freelancer ou uma equipa pequena precisa para levar um projeto a produção: miniVPS Linux, domínios e DNS, deploys a partir do GitHub, bases de dados, email, WhatsApp, gestão de projetos e um servidor MCP para que os agentes de IA operem tudo isso com autorização do utilizador.',
  },
  problem: {
    es: 'Publicar y mantener un proyecto obliga a repartir el trabajo entre muchos proveedores: hosting, DNS, correo, mensajería, automatizaciones y facturación, cada uno con su panel y su forma de fallar.',
    pt: 'Publicar e manter um projeto obriga a repartir o trabalho por muitos fornecedores: alojamento, DNS, email, mensagens, automatizações e faturação, cada um com o seu painel e a sua forma de falhar.',
  },
  solution: {
    es: 'Una API central en Django que orquesta hosts Linux divididos en contenedores, un agente propio en cada máquina, varios frontends React que comparten una misma base de diseño y un servidor MCP público con OAuth 2.1.',
    pt: 'Uma API central em Django que orquestra hosts Linux divididos em contentores, um agente próprio em cada máquina, vários frontends React que partilham a mesma base de design e um servidor MCP público com OAuth 2.1.',
  },
  role: {
    es: 'Fundador: arquitectura de software, desarrollo, infraestructura y coordinación técnica.',
    pt: 'Fundador: arquitetura de software, desenvolvimento, infraestrutura e coordenação técnica.',
  },
  responsibilities: [
    {
      es: 'Diseño de la arquitectura completa: API central, agentes en los hosts, frontends y servidor MCP.',
      pt: 'Desenho da arquitetura completa: API central, agentes nos hosts, frontends e servidor MCP.',
    },
    {
      es: 'Desarrollo del backend y de la infraestructura de despliegue (PostgreSQL, systemd, nginx, SSL).',
      pt: 'Desenvolvimento do backend e da infraestrutura de deploy (PostgreSQL, systemd, nginx, SSL).',
    },
    {
      es: 'Parte del código se escribe con asistentes de IA; la arquitectura, la revisión y la decisión de fusionar son mías.',
      pt: 'Parte do código é escrita com assistentes de IA; a arquitetura, a revisão e a decisão de integrar são minhas.',
    },
  ],
  architecture: [
    {
      es: 'API central: Django + DRF, una app por dominio de negocio (cloud, proyectos, correo, WhatsApp, MCP, facturación…), lógica en servicios y documentación por endpoint.',
      pt: 'API central: Django + DRF, uma app por domínio de negócio (cloud, projetos, email, WhatsApp, MCP, faturação…), lógica em serviços e documentação por endpoint.',
    },
    {
      es: 'Tres capas de cómputo: API central → agente del host (FastAPI) → agente de cada miniVPS, sobre contenedores LXD.',
      pt: 'Três camadas de computação: API central → agente do host (FastAPI) → agente de cada miniVPS, sobre contentores LXD.',
    },
    {
      es: 'HTTP con gunicorn, WebSocket con Channels y un proceso aparte para el servidor MCP.',
      pt: 'HTTP com gunicorn, WebSocket com Channels e um processo separado para o servidor MCP.',
    },
    {
      es: 'Frontends React + Vite + TypeScript sobre un paquete base compartido.',
      pt: 'Frontends React + Vite + TypeScript sobre um pacote base partilhado.',
    },
  ],
  languages: ['Python', 'TypeScript', 'Bash'],
  technologies: [
    'Django',
    'DRF',
    'Channels',
    'FastAPI',
    'React',
    'Vite',
    'PostgreSQL',
    'Linux',
    'LXD',
    'Nginx',
    'systemd',
    'Docker',
    'n8n',
    'MCP',
    'Stripe',
    'Twilio',
    'Cloudflare',
    'OpenRouter',
    'Qdrant',
  ],
  cardTags: ['Django', 'React', 'PostgreSQL', 'Linux', 'MCP'],
  filters: ['python', 'django', 'react', 'typescript', 'cloud', 'ia'],
  startDate: '2025-06',
  status: 'activo',
  highlights: [
    {
      es: 'El pool HTTP pasó de workers síncronos a hilos después de medir colas de 27 a 38 segundos cuando un agente de VPS respondía lento.',
      pt: 'O pool HTTP passou de workers síncronos para threads depois de medir filas de 27 a 38 segundos quando um agente de VPS respondia devagar.',
    },
    {
      es: 'Integración continua que comprueba migraciones, imports, el contrato del servidor MCP y la suite de pruebas.',
      pt: 'Integração contínua que verifica migrações, imports, o contrato do servidor MCP e a suite de testes.',
    },
  ],
  metrics: [
    {
      value: '2.345',
      label: { es: 'commits en el backend central', pt: 'commits no backend central' },
      source: {
        es: 'Historial del repositorio, enero a noviembre de 2026.',
        pt: 'Histórico do repositório, janeiro a novembro de 2026.',
      },
    },
    {
      value: '23',
      label: { es: 'apps Django de negocio', pt: 'apps Django de negócio' },
      source: { es: 'Configuración del backend.', pt: 'Configuração do backend.' },
    },
    {
      value: '+1.000',
      label: { es: 'archivos de pruebas', pt: 'ficheiros de testes' },
      source: {
        es: 'Conteo de archivos de test del repositorio.',
        pt: 'Contagem de ficheiros de teste do repositório.',
      },
    },
  ],
  screenshots: [
    {
      src: 'proyectos/ardumaker-developer/inicio.webp',
      alt: { es: 'Inicio del sitio de ArduMaker', pt: 'Início do site da ArduMaker' },
    },
    {
      src: 'proyectos/ardumaker-developer/servicios.webp',
      alt: { es: 'Página de servicios de ArduMaker', pt: 'Página de serviços da ArduMaker' },
    },
    {
      src: 'proyectos/ardumaker-developer/panel.webp',
      alt: { es: 'Acceso al panel de cliente', pt: 'Acesso ao painel de cliente' },
    },
    {
      src: 'proyectos/ardumaker-developer/estado.webp',
      alt: {
        es: 'Página de estado de la infraestructura',
        pt: 'Página de estado da infraestrutura',
      },
    },
  ],
  diagram: [
    { icon: 'usuario', label: { es: 'Panel web', pt: 'Painel web' } },
    { icon: 'api', label: 'API Django' },
    { icon: 'consola', label: { es: 'Agente del host', pt: 'Agente do host' } },
    { icon: 'nube', label: 'miniVPS Linux' },
  ],
  logo: 'logos/ardumaker.png',
  demoUrl: 'https://ardumaker.com',
  featured: true,
  visibility: 'privado',
};
