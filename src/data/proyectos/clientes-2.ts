/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: clientes-2.ts    Project: portfolio                                */
/*   Created: 2026/11/25 22:46:26  by vm                                      */
/*   Updated: 2026/11/25 22:46:46  by vm                                      */
/* ************************************************************************** */

/** Mas trabajo para clientes: tiendas, pagos y sitios con panel. */

import type { Proyecto } from '@/types/proyecto';

export const MAS_CLIENTES: Proyecto[] = [
  {
    id: 'computacion-ok',
    slug: 'computacion-ok',
    title: 'Computación OK',
    category: 'cliente',
    country: { es: 'Argentina', pt: 'Argentina' },
    shortDescription: {
      es: 'Tienda online para armar PCs gaming paso a paso, con verificación de compatibilidad y catálogo sincronizado con el proveedor.',
      pt: 'Loja online para montar PCs gaming passo a passo, com verificação de compatibilidade e catálogo sincronizado com o fornecedor.',
    },
    fullDescription: {
      es: 'E-commerce con armado de PC por pasos, carrito, pedidos y panel de administración. El catálogo, el stock, los precios y las fotos se sincronizan solos desde el servicio SOAP del proveedor.',
      pt: 'E-commerce com montagem de PC por passos, carrinho, encomendas e painel de administração. O catálogo, o stock, os preços e as fotos sincronizam-se sozinhos a partir do serviço SOAP do fornecedor.',
    },
    role: {
      es: 'Autor único del backend; el frontend partió de una base generada con IA y lo integré yo.',
      pt: 'Autor único do backend; o frontend partiu de uma base gerada com IA e fui eu a integrá-lo.',
    },
    languages: ['Python', 'TypeScript'],
    technologies: [
      'Django',
      'DRF',
      'PostgreSQL',
      'Docker Compose',
      'SOAP',
      'React',
      'Vite',
      'Nginx',
    ],
    cardTags: ['Django', 'PostgreSQL', 'Docker', 'React'],
    filters: ['python', 'django', 'react', 'typescript', 'cloud'],
    startDate: '2025-06',
    endDate: '2025-08',
    status: 'finalizado',
    screenshots: [],
    diagram: [
      { icon: 'externo', label: { es: 'Proveedor SOAP', pt: 'Fornecedor SOAP' } },
      { icon: 'api', label: 'API Django' },
      { icon: 'datos', label: 'PostgreSQL' },
      { icon: 'web', label: { es: 'Tienda', pt: 'Loja' } },
      { icon: 'pago', label: { es: 'Pedido', pt: 'Encomenda' } },
    ],
    featured: false,
    visibility: 'privado',
  },
  {
    id: 'mike',
    slug: 'mike',
    title: 'MIKE',
    category: 'cliente',
    shortDescription: {
      es: 'Venta de suscripciones a un asistente financiero por WhatsApp, con cobro online y panel de configuración.',
      pt: 'Venda de subscrições de um assistente financeiro por WhatsApp, com pagamento online e painel de configuração.',
    },
    fullDescription: {
      es: 'Landing con planes y un backend que crea los pagos en MercadoPago, recibe su webhook, verifica el estado y avisa al bot. El contenido y los planes se editan desde un panel.',
      pt: 'Landing com planos e um backend que cria os pagamentos no MercadoPago, recebe o webhook, verifica o estado e avisa o bot. O conteúdo e os planos editam-se a partir de um painel.',
    },
    role: {
      es: 'Autor único del backend; el frontend partió de una base generada con IA y lo integré yo.',
      pt: 'Autor único do backend; o frontend partiu de uma base gerada com IA e fui eu a integrá-lo.',
    },
    languages: ['Python', 'TypeScript'],
    technologies: ['Flask', 'MercadoPago', 'SQLite', 'JWT', 'React', 'Vite'],
    cardTags: ['Flask', 'MercadoPago', 'React'],
    filters: ['python', 'react', 'typescript'],
    startDate: '2025-06',
    endDate: '2026-01',
    status: 'finalizado',
    screenshots: [],
    diagram: [
      { icon: 'web', label: 'Landing' },
      { icon: 'pago', label: 'MercadoPago' },
      { icon: 'api', label: 'API Flask' },
      { icon: 'chat', label: 'Bot WhatsApp' },
    ],
    featured: false,
    visibility: 'privado',
  },
  {
    id: 'bright-ventures',
    slug: 'bright-ventures',
    title: 'Bright Ventures',
    category: 'cliente',
    country: { es: 'EE. UU.', pt: 'EUA' },
    shortDescription: {
      es: 'Sitio de venta de terrenos con un panel para editar todo el contenido, las fotos y el SEO.',
      pt: 'Site de venda de terrenos com um painel para editar todo o conteúdo, as fotos e o SEO.',
    },
    fullDescription: {
      es: 'Catálogo y detalle de terrenos en varios idiomas, con un panel de administración que edita cada sección del sitio sin tocar código.',
      pt: 'Catálogo e detalhe de terrenos em várias línguas, com um painel de administração que edita cada secção do site sem tocar no código.',
    },
    role: {
      es: 'Autor único del backend; el frontend partió de una base generada con IA y lo integré yo.',
      pt: 'Autor único do backend; o frontend partiu de uma base gerada com IA e fui eu a integrá-lo.',
    },
    languages: ['Python', 'TypeScript'],
    technologies: ['FastAPI', 'JWT', 'React', 'Vite', 'Tailwind CSS'],
    cardTags: ['FastAPI', 'React', 'CMS'],
    filters: ['python', 'react', 'typescript'],
    startDate: '2025-09',
    endDate: '2026-01',
    status: 'finalizado',
    screenshots: [],
    diagram: [
      { icon: 'usuario', label: 'Admin' },
      { icon: 'api', label: 'API FastAPI' },
      { icon: 'documento', label: { es: 'Contenido', pt: 'Conteúdo' } },
      { icon: 'web', label: { es: 'Sitio', pt: 'Site' } },
    ],
    featured: false,
    visibility: 'privado',
  },
  {
    id: 'heminguau',
    slug: 'heminguau',
    title: 'Heminguau',
    category: 'cliente',
    country: { es: 'España', pt: 'Espanha' },
    shortDescription: {
      es: 'Sitio de una peluquería canina y tienda de mascotas, con contenido editable y formularios de contacto.',
      pt: 'Site de um salão de tosquia canina e loja de animais, com conteúdo editável e formulários de contacto.',
    },
    fullDescription: {
      es: 'Landing con servicios, galería y ubicación, y un panel que edita el contenido y las fotos y guarda los mensajes que llegan.',
      pt: 'Landing com serviços, galeria e localização, e um painel que edita o conteúdo e as fotos e guarda as mensagens recebidas.',
    },
    role: {
      es: 'Autor único del backend; el frontend partió de una base generada con IA y lo integré yo.',
      pt: 'Autor único do backend; o frontend partiu de uma base gerada com IA e fui eu a integrá-lo.',
    },
    languages: ['Python', 'TypeScript'],
    technologies: ['FastAPI', 'JWT', 'React', 'Vite', 'Tailwind CSS'],
    cardTags: ['FastAPI', 'React', 'CMS'],
    filters: ['python', 'react', 'typescript'],
    startDate: '2025-10',
    endDate: '2026-02',
    status: 'finalizado',
    screenshots: [],
    diagram: [
      { icon: 'usuario', label: 'Admin' },
      { icon: 'api', label: 'API FastAPI' },
      { icon: 'documento', label: { es: 'Contenido', pt: 'Conteúdo' } },
      { icon: 'web', label: { es: 'Sitio', pt: 'Site' } },
    ],
    featured: false,
    visibility: 'privado',
  },
  {
    id: 'myl-event-magic',
    slug: 'myl-event-magic',
    title: 'MYL Event Magic',
    category: 'cliente',
    country: { es: 'Argentina', pt: 'Argentina' },
    shortDescription: {
      es: 'Sitio de servicios para eventos con fotos, vídeo y contenido editable desde un panel.',
      pt: 'Site de serviços para eventos com fotos, vídeo e conteúdo editável a partir de um painel.',
    },
    fullDescription: {
      es: 'Landing con carrusel, grilla de servicios y detalle con fotos y vídeo; el panel edita todo el contenido del sitio.',
      pt: 'Landing com carrossel, grelha de serviços e detalhe com fotos e vídeo; o painel edita todo o conteúdo do site.',
    },
    role: {
      es: 'Autor único del backend; el frontend partió de una base generada con IA y lo integré yo.',
      pt: 'Autor único do backend; o frontend partiu de uma base gerada com IA e fui eu a integrá-lo.',
    },
    languages: ['Python', 'TypeScript'],
    technologies: ['FastAPI', 'JWT', 'React', 'Vite'],
    cardTags: ['FastAPI', 'React', 'CMS'],
    filters: ['python', 'react', 'typescript'],
    startDate: '2025-09',
    endDate: '2026-01',
    status: 'finalizado',
    screenshots: [],
    diagram: [
      { icon: 'usuario', label: 'Admin' },
      { icon: 'api', label: 'API FastAPI' },
      { icon: 'documento', label: { es: 'Contenido', pt: 'Conteúdo' } },
      { icon: 'web', label: { es: 'Sitio', pt: 'Site' } },
    ],
    featured: false,
    visibility: 'privado',
  },
  {
    id: 'comandera',
    slug: 'comandera',
    title: 'Comandera para restaurante',
    category: 'cliente',
    country: { es: 'Colombia', pt: 'Colômbia' },
    shortDescription: {
      es: 'Toma de pedidos por mesa desde el navegador, sobre la base de datos Access que el restaurante ya usaba.',
      pt: 'Registo de pedidos por mesa a partir do navegador, sobre a base de dados Access que o restaurante já usava.',
    },
    fullDescription: {
      es: 'Una API lee y escribe en la base Access existente y un frontend muestra mesas, productos y carrito. Un lanzador instala lo necesario, actualiza y arranca todo en la PC del local.',
      pt: 'Uma API lê e escreve na base Access existente e um frontend mostra mesas, produtos e carrinho. Um lançador instala o necessário, atualiza e arranca tudo no PC do restaurante.',
    },
    role: {
      es: 'Autor único.',
      pt: 'Autor único.',
    },
    languages: ['Python', 'JavaScript'],
    technologies: ['FastAPI', 'Next.js', 'Microsoft Access', 'Windows', 'Instalador propio'],
    cardTags: ['FastAPI', 'Next.js', 'Access'],
    filters: ['python', 'react'],
    startDate: '2025-05',
    endDate: '2025-06',
    status: 'finalizado',
    screenshots: [],
    diagram: [
      { icon: 'movil', label: { es: 'Mesero', pt: 'Empregado' } },
      { icon: 'web', label: 'Next.js' },
      { icon: 'api', label: 'API FastAPI' },
      { icon: 'datos', label: 'Access' },
    ],
    featured: false,
    visibility: 'privado',
  },
];
