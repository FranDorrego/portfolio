/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: destacados.ts    Project: portfolio                                */
/*   Created: 2026/11/25 21:30:00  by claude                                  */
/*   Updated: 2026/11/25 21:30:00  by claude                                  */
/* ************************************************************************** */

/** Los cuatro proyectos que se ven al llegar. Cada dato sale del repositorio o del autor. */

import type { Proyecto } from '@/types/proyecto';

export const DESTACADOS: Proyecto[] = [
  {
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
    screenshots: [],
    logo: 'logos/ardumaker.png',
    demoUrl: 'https://ardumaker.com',
    featured: true,
    visibility: 'privado',
  },
  {
    id: 'vivenadando',
    slug: 'vivenadando',
    title: 'ViveNadando',
    category: 'cliente',
    client: 'ViveNadando',
    country: { es: 'México', pt: 'México' },
    shortDescription: {
      es: 'Plataforma de atención al cliente para una academia de natación: chatbot de WhatsApp, gestión de alumnos, calendarios e integración con JackRabbit.',
      pt: 'Plataforma de atendimento ao cliente para uma academia de natação: chatbot de WhatsApp, gestão de alunos, calendários e integração com o JackRabbit.',
    },
    fullDescription: {
      es: 'Un chatbot de WhatsApp atiende a las familias y un panel interno acompaña a recepción. El backend mantiene una copia local de los datos de JackRabbit (familias, alumnos, clases e inscripciones) y es la fuente de datos de los flujos de n8n donde vive la IA.',
      pt: 'Um chatbot de WhatsApp atende as famílias e um painel interno apoia a receção. O backend mantém uma cópia local dos dados do JackRabbit (famílias, alunos, aulas e inscrições) e é a fonte de dados dos fluxos de n8n onde vive a IA.',
    },
    problem: {
      es: 'La recepción respondía a mano consultas repetidas de horarios, reposiciones, clases de prueba y cobranza, con la información repartida entre JackRabbit y WhatsApp.',
      pt: 'A receção respondia manualmente a pedidos repetidos sobre horários, reposições, aulas experimentais e cobranças, com a informação repartida entre o JackRabbit e o WhatsApp.',
    },
    solution: {
      es: 'Un motor único de disponibilidad de horarios (inscripción, clase de prueba, reposición y lista de espera), sincronización continua con JackRabbit y un bot que consulta y registra todo a través de la API.',
      pt: 'Um motor único de disponibilidade de horários (inscrição, aula experimental, reposição e lista de espera), sincronização contínua com o JackRabbit e um bot que consulta e regista tudo através da API.',
    },
    role: {
      es: 'Arquitectura, desarrollo Full Stack, integraciones y coordinación.',
      pt: 'Arquitetura, desenvolvimento Full Stack, integrações e coordenação.',
    },
    responsibilities: [
      {
        es: 'Autor de casi todo el backend (alrededor del 97 % de los commits).',
        pt: 'Autor de quase todo o backend (cerca de 97 % dos commits).',
      },
      {
        es: 'En el panel, la base visual se generó con una herramienta de IA; la integración con la API, los refactors y la limpieza son míos.',
        pt: 'No painel, a base visual foi gerada com uma ferramenta de IA; a integração com a API, os refactors e a limpeza são meus.',
      },
      {
        es: 'Diseño de los flujos de n8n y trato directo con la clienta.',
        pt: 'Desenho dos fluxos de n8n e contacto direto com a cliente.',
      },
    ],
    architecture: [
      {
        es: 'Backend Django + DRF con apps por dominio (JackRabbit, WhatsApp, n8n, tareas) y PostgreSQL.',
        pt: 'Backend Django + DRF com apps por domínio (JackRabbit, WhatsApp, n8n, tarefas) e PostgreSQL.',
      },
      {
        es: 'Dos procesos de sincronización corren como servicios de systemd; la IA vive en n8n y el backend entrega datos y guarda resultados.',
        pt: 'Dois processos de sincronização correm como serviços de systemd; a IA vive no n8n e o backend entrega dados e guarda resultados.',
      },
      {
        es: 'Panel en React + TypeScript + Vite, con TanStack Query.',
        pt: 'Painel em React + TypeScript + Vite, com TanStack Query.',
      },
    ],
    languages: ['Python', 'TypeScript'],
    technologies: [
      'Django',
      'DRF',
      'React',
      'Vite',
      'PostgreSQL',
      'n8n',
      'WhatsApp API',
      'JackRabbit API',
      'OCR',
      'systemd',
      'Nginx',
      'GitHub Actions',
    ],
    cardTags: ['Django', 'React', 'PostgreSQL', 'n8n', 'WhatsApp API'],
    filters: ['python', 'django', 'react', 'typescript', 'ia', 'cloud'],
    startDate: '2025-10',
    endDate: '2026-09',
    highlights: [
      {
        es: 'Webhooks de WhatsApp idempotentes: la pasarela a veces entrega el mismo mensaje con otro identificador.',
        pt: 'Webhooks de WhatsApp idempotentes: o gateway por vezes entrega a mesma mensagem com outro identificador.',
      },
      {
        es: 'Un error de la API del proveedor (validación de edad en inscripciones) quedó aislado, documentado y reportado a su soporte.',
        pt: 'Um erro da API do fornecedor (validação de idade nas inscrições) ficou isolado, documentado e reportado ao suporte.',
      },
    ],
    metrics: [
      {
        value: '344',
        label: { es: 'commits en el backend', pt: 'commits no backend' },
        source: {
          es: 'Historial del repositorio, enero a septiembre de 2026.',
          pt: 'Histórico do repositório, janeiro a setembro de 2026.',
        },
      },
      {
        value: '79',
        label: { es: 'archivos de pruebas con CI', pt: 'ficheiros de testes com CI' },
        source: {
          es: 'Repositorio del backend (GitHub Actions).',
          pt: 'Repositório do backend (GitHub Actions).',
        },
      },
    ],
    screenshots: [],
    logo: 'logos/vivenadando.jpeg',
    featured: true,
    visibility: 'privado',
  },
];
