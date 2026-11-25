/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: clientes.ts    Project: portfolio                                  */
/*   Created: 2026/11/25 21:30:00  by claude                                  */
/*   Updated: 2026/11/25 21:30:00  by claude                                  */
/* ************************************************************************** */

/** Trabajo para clientes. Donde hubo equipo, la ficha dice que parte es mia. */

import type { Proyecto } from '@/types/proyecto';

export const CLIENTES: Proyecto[] = [
  {
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
    screenshots: [],
    featured: false,
    visibility: 'privado',
  },
  {
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
    screenshots: [],
    featured: false,
    visibility: 'privado',
  },
  {
    id: 'botminero',
    slug: 'botminero',
    title: 'BotMinero',
    category: 'cliente',
    shortDescription: {
      es: 'Trading automatizado: conecta las alertas de TradingView con órdenes en Binance.',
      pt: 'Trading automatizado: liga os alertas do TradingView a ordens na Binance.',
    },
    fullDescription: {
      es: 'Plataforma de bots de trading sobre futuros de Binance. Cada bot recibe alertas, abre la orden con su stop loss y su take profit, y permite que otros usuarios se sumen.',
      pt: 'Plataforma de bots de trading sobre futuros da Binance. Cada bot recebe alertas, abre a ordem com o seu stop loss e take profit, e permite que outros utilizadores se juntem.',
    },
    solution: {
      es: 'Un backend Django con una biblioteca interna para Binance (crear y cerrar órdenes, apalancamiento, validación de claves y saldo), pagos en cripto y avisos por Telegram.',
      pt: 'Um backend Django com uma biblioteca interna para a Binance (criar e fechar ordens, alavancagem, validação de chaves e saldo), pagamentos em cripto e avisos por Telegram.',
    },
    role: { es: 'Desarrollo completo del backend.', pt: 'Desenvolvimento completo do backend.' },
    languages: ['Python'],
    technologies: ['Django', 'DRF', 'Binance API', 'TradingView', 'Telegram'],
    cardTags: ['Django', 'Binance API', 'TradingView'],
    filters: ['python', 'django'],
    startDate: '2024-05',
    endDate: '2025-02',
    status: 'finalizado',
    screenshots: [],
    featured: false,
    visibility: 'privado',
  },
  {
    id: 'asistente-ecommerce',
    slug: 'asistente-comercial-ecommerce',
    title: 'Asistente comercial con IA para e-commerce',
    category: 'cliente',
    shortDescription: {
      es: 'Chat de ventas con IA sobre un catálogo sincronizado desde WooCommerce, con análisis de compatibilidad entre productos y equipos.',
      pt: 'Chat de vendas com IA sobre um catálogo sincronizado a partir do WooCommerce, com análise de compatibilidade entre produtos e equipamentos.',
    },
    fullDescription: {
      es: 'Un chat público para clientes y otro interno para vendedores responden sobre stock, especificaciones y compatibilidad. La compra se cierra en la tienda del cliente.',
      pt: 'Um chat público para clientes e outro interno para vendedores respondem sobre stock, especificações e compatibilidade. A compra é concluída na loja do cliente.',
    },
    solution: {
      es: 'Backend Django con búsqueda de texto completo y por trigramas, sincronización con WordPress, tareas asíncronas con Celery y agentes en n8n que consultan la API.',
      pt: 'Backend Django com pesquisa de texto completo e por trigramas, sincronização com o WordPress, tarefas assíncronas com Celery e agentes em n8n que consultam a API.',
    },
    role: {
      es: 'Segunda etapa del backend y flujos de IA, en equipo.',
      pt: 'Segunda etapa do backend e fluxos de IA, em equipa.',
    },
    responsibilities: [
      {
        es: 'La base del backend la construyó otro desarrollador. Yo tomé la segunda etapa: sincronización de productos, chat, prompts y flujos de n8n (84 de 224 commits).',
        pt: 'A base do backend foi construída por outro programador. Eu assumi a segunda etapa: sincronização de produtos, chat, prompts e fluxos de n8n (84 de 224 commits).',
      },
    ],
    languages: ['Python', 'TypeScript'],
    technologies: [
      'Django',
      'DRF',
      'Celery',
      'Redis',
      'Channels',
      'PostgreSQL',
      'WooCommerce',
      'n8n',
    ],
    cardTags: ['Django', 'Celery', 'WooCommerce', 'n8n'],
    filters: ['python', 'django', 'ia'],
    startDate: '2026-01',
    endDate: '2026-06',
    screenshots: [],
    featured: false,
    visibility: 'privado',
  },
  {
    id: 'plataforma-ingles',
    slug: 'plataforma-de-ingles',
    title: 'Plataforma de aprendizaje de inglés',
    category: 'cliente',
    shortDescription: {
      es: 'Frontend de una academia en línea: embudo de captación, ejercicios interactivos, progreso y facturación.',
      pt: 'Frontend de uma academia online: funil de captação, exercícios interativos, progresso e faturação.',
    },
    fullDescription: {
      es: 'Una parte pública (landing, inscripción y webinar) y una plataforma privada con unidades, árbol de habilidades en tres niveles, decenas de tipos de ejercicio, biblioteca, estadísticas y pagos.',
      pt: 'Uma parte pública (landing, inscrição e webinar) e uma plataforma privada com unidades, árvore de competências em três níveis, dezenas de tipos de exercício, biblioteca, estatísticas e pagamentos.',
    },
    problem: {
      es: 'Había que reemplazar un frontend anterior sin perder su lógica de ejercicios, vídeo y facturación.',
      pt: 'Era preciso substituir um frontend anterior sem perder a sua lógica de exercícios, vídeo e faturação.',
    },
    solution: {
      es: 'Documentar primero la lógica del frontend viejo y portarla después a una SPA nueva, con vídeos protegidos y pagos integrados.',
      pt: 'Documentar primeiro a lógica do frontend antigo e portá-la depois para uma SPA nova, com vídeos protegidos e pagamentos integrados.',
    },
    role: { es: 'Único desarrollador del frontend.', pt: 'Único programador do frontend.' },
    responsibilities: [
      {
        es: 'La base visual se generó con una herramienta de IA; la integración con la API, los ejercicios, la facturación y las correcciones son míos (253 de 559 commits).',
        pt: 'A base visual foi gerada com uma ferramenta de IA; a integração com a API, os exercícios, a faturação e as correções são meus (253 de 559 commits).',
      },
    ],
    languages: ['TypeScript'],
    technologies: ['React', 'Vite', 'Tailwind CSS', 'TanStack Query', 'Stripe', 'Auth0', 'Git LFS'],
    cardTags: ['React', 'TypeScript', 'Stripe', 'Auth0'],
    filters: ['react', 'typescript'],
    startDate: '2025-10',
    endDate: '2026-04',
    screenshots: [],
    featured: false,
    visibility: 'privado',
  },
  {
    id: 'dinamarca-tours',
    slug: 'dinamarca-tours',
    title: 'Dinamarca Tours',
    category: 'cliente',
    client: 'Dinamarca Tours',
    shortDescription: {
      es: 'Plataforma de reservas de tours: disponibilidad, calendario, gestión de salidas y cobro de una seña al reservar.',
      pt: 'Plataforma de reservas de tours: disponibilidade, calendário, gestão de saídas e cobrança de um sinal na reserva.',
    },
    fullDescription: {
      es: 'Proyecto en su etapa inicial. El alcance definido es el agendamiento de tours con un cobro mínimo de reserva.',
      pt: 'Projeto na fase inicial. O âmbito definido é o agendamento de tours com uma cobrança mínima de reserva.',
    },
    role: { es: 'Arquitectura y desarrollo.', pt: 'Arquitetura e desenvolvimento.' },
    languages: [],
    technologies: [],
    cardTags: [],
    filters: [],
    startDate: '2026-10',
    status: 'en-desarrollo',
    screenshots: [],
    featured: false,
    visibility: 'privado',
  },
];
