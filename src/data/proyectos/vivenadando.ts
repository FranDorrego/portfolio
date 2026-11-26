/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: vivenadando.ts    Project: portfolio                               */
/*   Created: 2026/11/26 01:37:20  by vm                                      */
/*   Updated: 2026/11/26 01:37:20  by vm                                      */
/* ************************************************************************** */

/** ViveNadando. */

import type { Proyecto } from '@/types/proyecto';

export const VIVENADANDO: Proyecto = {
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
  screenshots: [
    {
      src: 'proyectos/vivenadando/01.webp',
      alt: {
        es: 'Panel de atención: chats de WhatsApp y conversación con el asistente de IA',
        pt: 'Painel de atendimento: chats de WhatsApp e conversa com o assistente de IA',
      },
    },
    {
      src: 'proyectos/vivenadando/02.webp',
      alt: {
        es: 'Horarios de JackRabbit que ve la IA y calendario semanal por profesor',
        pt: 'Horários do JackRabbit que a IA vê e calendário semanal por professor',
      },
    },
    {
      src: 'proyectos/vivenadando/03.webp',
      alt: { es: 'Acceso al panel de ViveNadando', pt: 'Acesso ao painel da ViveNadando' },
    },
  ],
  diagram: [
    { icon: 'chat', label: 'WhatsApp' },
    { icon: 'flujo', label: 'n8n + IA' },
    { icon: 'api', label: 'API Django' },
    { icon: 'externo', label: 'JackRabbit' },
    { icon: 'web', label: { es: 'Panel', pt: 'Painel' } },
  ],
  logo: 'logos/vivenadando.jpeg',
  featured: true,
  visibility: 'privado',
};
