/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: propios-2.ts    Project: portfolio                                 */
/*   Created: 2026/11/25 22:46:26  by vm                                      */
/*   Updated: 2026/11/25 22:46:46  by vm                                      */
/* ************************************************************************** */

/** Mas productos propios alrededor de ArduMaker. */

import type { Proyecto } from '@/types/proyecto';

export const MAS_PROPIOS: Proyecto[] = [
  {
    id: 'sitio-ardumaker',
    slug: 'sitio-ardumaker',
    title: 'ArduMaker · sitio público',
    category: 'propio',
    shortDescription: {
      es: 'El sitio público de ArduMaker: portadas por producto, precios, blog y documentación, en tres idiomas.',
      pt: 'O site público da ArduMaker: páginas por produto, preços, blog e documentação, em três línguas.',
    },
    fullDescription: {
      es: 'Cada ruta se pre-renderiza por idioma, con sitemap y un índice para agentes de IA. Hay pruebas por página y una base de diseño compartida con el resto de los fronts.',
      pt: 'Cada rota é pré-renderizada por língua, com sitemap e um índice para agentes de IA. Há testes por página e uma base de design partilhada com os restantes frontends.',
    },
    role: {
      es: 'Arquitectura y desarrollo; la base inicial se generó con IA.',
      pt: 'Arquitetura e desenvolvimento; a base inicial foi gerada com IA.',
    },
    languages: ['TypeScript'],
    technologies: ['React', 'Vite', 'Vitest', 'Pre-render', 'SEO', 'Nginx'],
    cardTags: ['React', 'TypeScript', 'SEO', 'Vitest'],
    filters: ['react', 'typescript', 'cloud'],
    startDate: '2026-01',
    status: 'activo',
    screenshots: [
      {
        src: 'proyectos/ardumaker-developer/inicio.webp',
        alt: { es: 'Inicio del sitio de ArduMaker', pt: 'Início do site da ArduMaker' },
      },
      {
        src: 'proyectos/ardumaker-developer/servicios.webp',
        alt: { es: 'Página de servicios', pt: 'Página de serviços' },
      },
      {
        src: 'proyectos/ardumaker-mcp/mcp.webp',
        alt: { es: 'Página del producto MCP', pt: 'Página do produto MCP' },
      },
    ],
    diagram: [
      { icon: 'codigo', label: 'React' },
      { icon: 'consola', label: 'Pre-render' },
      { icon: 'web', label: { es: '3 idiomas', pt: '3 línguas' } },
      { icon: 'grafico', label: 'SEO' },
    ],
    demoUrl: 'https://ardumaker.com',
    featured: false,
    visibility: 'privado',
  },
  {
    id: 'workana-crm',
    slug: 'workana-crm',
    title: 'Workana CRM',
    category: 'propio',
    shortDescription: {
      es: 'Extensión de Chrome y central web que conectan varias cuentas de Workana con un proyecto, con propuestas redactadas por IA.',
      pt: 'Extensão do Chrome e central web que ligam várias contas da Workana a um projeto, com propostas redigidas por IA.',
    },
    fullDescription: {
      es: 'Sincroniza propuestas y chats, programa seguimientos, marca los proyectos ya propuestos y redacta con IA. Es la cuarta versión: antes fue un bot de alertas y un CRM en Django.',
      pt: 'Sincroniza propostas e chats, agenda seguimentos, marca os projetos já propostos e redige com IA. É a quarta versão: antes foi um bot de alertas e um CRM em Django.',
    },
    role: {
      es: 'Autor único, con parte del código asistido por IA.',
      pt: 'Autor único, com parte do código assistido por IA.',
    },
    languages: ['JavaScript', 'Python'],
    technologies: ['Chrome Manifest V3', 'Node', 'PWA', 'OpenRouter', 'Django', 'n8n', 'Vitest'],
    cardTags: ['Chrome MV3', 'Node', 'IA', 'Vitest'],
    filters: ['python', 'django', 'ia'],
    startDate: '2025-05',
    status: 'activo',
    screenshots: [],
    diagram: [
      { icon: 'web', label: 'Workana' },
      { icon: 'extension', label: { es: 'Extensión', pt: 'Extensão' } },
      { icon: 'ia', label: 'IA' },
      { icon: 'api', label: 'ArduMaker' },
      { icon: 'movil', label: 'Central PWA' },
    ],
    featured: false,
    visibility: 'privado',
  },
  {
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
    screenshots: [],
    diagram: [
      { icon: 'chat', label: 'Meta / Twilio' },
      { icon: 'api', label: 'API Django' },
      { icon: 'datos', label: 'PostgreSQL' },
      { icon: 'externo', label: 'Webhook' },
      { icon: 'web', label: { es: 'Panel', pt: 'Painel' } },
    ],
    featured: false,
    visibility: 'privado',
  },
  {
    id: 'ardumail',
    slug: 'ardumail',
    title: 'ArduMail',
    category: 'propio',
    shortDescription: {
      es: 'Correo de ArduMaker: webmail propio y el servicio de dominios, casillas y recepción por SMTP.',
      pt: 'Email da ArduMaker: webmail próprio e o serviço de domínios, caixas e receção por SMTP.',
    },
    fullDescription: {
      es: 'Webmail con bandeja, conversaciones, redacción con adjuntos y borradores. La primera versión del servicio incluía un servidor SMTP propio con validación SPF y DKIM.',
      pt: 'Webmail com caixa de entrada, conversas, redação com anexos e rascunhos. A primeira versão do serviço incluía um servidor SMTP próprio com validação SPF e DKIM.',
    },
    role: {
      es: 'Arquitectura y desarrollo; el prototipo del webmail se generó con IA.',
      pt: 'Arquitetura e desenvolvimento; o protótipo do webmail foi gerado com IA.',
    },
    languages: ['TypeScript', 'Python'],
    technologies: ['React', 'Vite', 'TanStack Router', 'Django', 'SMTP', 'SPF / DKIM', 'Vitest'],
    cardTags: ['React', 'Django', 'SMTP'],
    filters: ['python', 'django', 'react', 'typescript', 'cloud'],
    startDate: '2025-09',
    status: 'activo',
    screenshots: [],
    diagram: [
      { icon: 'correo', label: 'SMTP' },
      { icon: 'api', label: 'API Django' },
      { icon: 'datos', label: { es: 'Casillas', pt: 'Caixas' } },
      { icon: 'web', label: 'Webmail' },
    ],
    featured: false,
    visibility: 'privado',
  },
  {
    id: 'prospeccion',
    slug: 'prospeccion',
    title: 'Sistema de prospección',
    category: 'propio',
    shortDescription: {
      es: 'Prospección comercial automática: detecta el stack de cada sitio, evalúa y envía, con control de ritmo.',
      pt: 'Prospeção comercial automática: deteta o stack de cada site, avalia e envia, com controlo de ritmo.',
    },
    fullDescription: {
      es: 'Bots que detectan con qué está hecho un sitio, lo evalúan y preparan el contacto. Un gateway compartido reparte los envíos entre cuentas y un panel muestra el estado y la auditoría.',
      pt: 'Bots que detetam com que é feito um site, avaliam-no e preparam o contacto. Um gateway partilhado distribui os envios por contas e um painel mostra o estado e a auditoria.',
    },
    role: {
      es: 'Autor único.',
      pt: 'Autor único.',
    },
    languages: ['Python', 'Bash'],
    technologies: ['PostgreSQL', 'SQLite', 'systemd', 'Resend', 'Linux'],
    cardTags: ['Python', 'PostgreSQL', 'systemd'],
    filters: ['python', 'cloud'],
    startDate: '2026-11',
    status: 'activo',
    screenshots: [],
    diagram: [
      { icon: 'web', label: { es: 'Sitios', pt: 'Sites' } },
      { icon: 'codigo', label: { es: 'Detección', pt: 'Deteção' } },
      { icon: 'datos', label: 'PostgreSQL' },
      { icon: 'correo', label: { es: 'Envío', pt: 'Envio' } },
      { icon: 'grafico', label: { es: 'Panel', pt: 'Painel' } },
    ],
    featured: false,
    visibility: 'privado',
  },
];
