/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: distrivalto.ts    Project: portfolio                               */
/*   Created: 2026/11/25 22:24:26  by claude                                  */
/*   Updated: 2026/11/25 23:34:20  by vm                                      */
/* ************************************************************************** */

/** Distrivalto: el tercer destacado. */

import type { Proyecto } from '@/types/proyecto';

export const DISTRIVALTO: Proyecto = {
  id: 'distrivalto',
  slug: 'distrivalto',
  title: 'Distrivalto',
  category: 'cliente',
  client: 'Distrivalto',
  country: { es: 'México', pt: 'México' },
  shortDescription: {
    es: 'Atención comercial y de soporte con IA conectada a la web, WordPress y WhatsApp, con procesamiento de documentos y catálogo de productos.',
    pt: 'Atendimento comercial e de suporte com IA ligado ao site, ao WordPress e ao WhatsApp, com processamento de documentos e catálogo de produtos.',
  },
  fullDescription: {
    es: 'Un chat de soporte con IA atiende por la web y por WhatsApp, y una mesa de agentes humanos puede tomar cualquier conversación. El panel de administración mantiene el catálogo, los manuales, las preguntas frecuentes y lo que la IA va aprendiendo.',
    pt: 'Um chat de suporte com IA atende pelo site e pelo WhatsApp, e uma equipa de agentes humanos pode assumir qualquer conversa. O painel de administração mantém o catálogo, os manuais, as perguntas frequentes e o que a IA vai aprendendo.',
  },
  problem: {
    es: 'Las consultas de uso, compatibilidad y garantía llegaban por varios canales y dependían de que alguien encontrara la respuesta en manuales en PDF.',
    pt: 'Os pedidos sobre utilização, compatibilidade e garantia chegavam por vários canais e dependiam de alguém encontrar a resposta em manuais em PDF.',
  },
  solution: {
    es: 'El backend guarda cada mensaje, dispara el flujo de n8n en segundo plano y devuelve por WebSocket los estados y la respuesta. Los manuales pasan por una extracción de texto en tres pasos: lectura directa, OCR y, si hace falta, un modelo de visión.',
    pt: 'O backend guarda cada mensagem, dispara o fluxo de n8n em segundo plano e devolve por WebSocket os estados e a resposta. Os manuais passam por uma extração de texto em três passos: leitura direta, OCR e, se for preciso, um modelo de visão.',
  },
  role: {
    es: 'Arquitectura, desarrollo, integraciones y gestión técnica.',
    pt: 'Arquitetura, desenvolvimento, integrações e gestão técnica.',
  },
  responsibilities: [
    {
      es: 'Autor principal del backend: 219 commits propios y 39 hechos con un asistente de IA bajo mi revisión.',
      pt: 'Autor principal do backend: 219 commits próprios e 39 feitos com um assistente de IA sob a minha revisão.',
    },
    {
      es: 'Diseño de la comunicación entre el frontend, el backend, n8n, WhatsApp y el correo.',
      pt: 'Desenho da comunicação entre o frontend, o backend, o n8n, o WhatsApp e o email.',
    },
  ],
  architecture: [
    {
      es: 'Tres piezas: frontend React, backend Django y n8n como orquestador de la IA.',
      pt: 'Três peças: frontend React, backend Django e n8n como orquestrador da IA.',
    },
    {
      es: 'HTTP (gunicorn) y WebSocket (Channels + Daphne) en procesos separados, con Redis como bus.',
      pt: 'HTTP (gunicorn) e WebSocket (Channels + Daphne) em processos separados, com Redis como bus.',
    },
    {
      es: 'Modelos de lenguaje por OpenRouter, WhatsApp por Twilio y correo por Microsoft Graph.',
      pt: 'Modelos de linguagem via OpenRouter, WhatsApp via Twilio e email via Microsoft Graph.',
    },
  ],
  languages: ['Python', 'JavaScript'],
  technologies: [
    'Django',
    'DRF',
    'Channels',
    'Redis',
    'React',
    'PostgreSQL',
    'n8n',
    'Twilio',
    'OpenRouter',
    'OCR',
    'WordPress',
    'Microsoft Graph',
  ],
  cardTags: ['Django', 'React', 'Redis', 'n8n', 'Twilio'],
  filters: ['python', 'django', 'react', 'ia', 'cloud'],
  startDate: '2026-03',
  status: 'activo',
  highlights: [
    {
      es: 'Una combinación de versiones de Redis cortaba los WebSocket en períodos sin tráfico: se reprodujo, se fijó la versión y quedó documentado.',
      pt: 'Uma combinação de versões do Redis cortava os WebSocket em períodos sem tráfego: foi reproduzida, a versão ficou fixada e tudo documentado.',
    },
    {
      es: 'El dominio anterior se conservó sin redirección porque un 301 convertiría en GET los POST de n8n y de Twilio.',
      pt: 'O domínio anterior foi mantido sem redirecionamento porque um 301 converteria em GET os POST do n8n e do Twilio.',
    },
  ],
  metrics: [
    {
      value: '17,0 s → 5,3 s',
      label: {
        es: 'mediana de respuesta por mensaje',
        pt: 'mediana de resposta por mensagem',
      },
      source: {
        es: 'Informe interno de rendimiento, noviembre de 2026. Medido en banco de pruebas local, no en producción.',
        pt: 'Relatório interno de desempenho, novembro de 2026. Medido em bancada de testes local, não em produção.',
      },
    },
    {
      value: '−69 %',
      label: { es: 'costo de IA por mensaje', pt: 'custo de IA por mensagem' },
      source: {
        es: 'El mismo informe, en banco de pruebas local.',
        pt: 'O mesmo relatório, em bancada de testes local.',
      },
    },
  ],
  screenshots: [
    {
      src: 'proyectos/distrivalto/01.webp',
      alt: { es: 'Chat público con la asistente Mila', pt: 'Chat público com a assistente Mila' },
    },
    {
      src: 'proyectos/distrivalto/02.webp',
      alt: {
        es: 'Respuesta de Mila con pasos para revisar un equipo',
        pt: 'Resposta da Mila com passos para rever um equipamento',
      },
    },
    {
      src: 'proyectos/distrivalto/03.webp',
      alt: {
        es: 'Panel de administración con indicadores y evolución mensual',
        pt: 'Painel de administração com indicadores e evolução mensal',
      },
    },
    {
      src: 'proyectos/distrivalto/04.webp',
      alt: {
        es: 'Mesa de soporte: conversaciones y botón para tomar un chat',
        pt: 'Equipa de suporte: conversas e botão para assumir um chat',
      },
    },
    {
      src: 'proyectos/distrivalto/05.webp',
      alt: {
        es: 'Consumo de IA: saldo, gasto diario y mensual',
        pt: 'Consumo de IA: saldo, gasto diário e mensal',
      },
    },
  ],
  diagram: [
    { icon: 'chat', label: { es: 'Web y WhatsApp', pt: 'Web e WhatsApp' } },
    { icon: 'api', label: 'API Django' },
    { icon: 'flujo', label: 'n8n + IA' },
    { icon: 'documento', label: { es: 'Manuales OCR', pt: 'Manuais OCR' } },
    { icon: 'usuario', label: 'Agente humano' },
  ],
  featured: true,
  visibility: 'privado',
};
