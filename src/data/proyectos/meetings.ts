/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: meetings.ts    Project: portfolio                                  */
/*   Created: 2026/11/26 01:37:20  by vm                                      */
/*   Updated: 2026/11/26 01:37:20  by vm                                      */
/* ************************************************************************** */

/** ArduMaker Meetings. */

import type { Proyecto } from '@/types/proyecto';

export const MEETINGS: Proyecto = {
  id: 'meetings',
  slug: 'ardumaker-meetings',
  title: 'ArduMaker Meetings',
  category: 'propio',
  shortDescription: {
    es: 'Extensión de Chrome que graba reuniones, las sube por partes y deja la transcripción como contexto del proyecto.',
    pt: 'Extensão do Chrome que grava reuniões, envia-as por partes e deixa a transcrição como contexto do projeto.',
  },
  fullDescription: {
    es: 'Graba la pantalla con sonido, el micrófono y, si se quiere, la cámara. Todo se escribe primero en el navegador y después se sube a ArduMaker, donde el backend reconstruye la grabación y la transcribe.',
    pt: 'Grava o ecrã com som, o microfone e, se se quiser, a câmara. Tudo é escrito primeiro no navegador e depois enviado para a ArduMaker, onde o backend reconstrói a gravação e a transcreve.',
  },
  problem: {
    es: 'Lo que se acuerda en una reunión con un cliente se pierde o queda en notas sueltas, lejos del proyecto.',
    pt: 'O que se combina numa reunião com um cliente perde-se ou fica em notas soltas, longe do projeto.',
  },
  solution: {
    es: 'Una extensión Manifest V3 con cuatro contextos (popup, service worker, documento offscreen y aviso en la pestaña), cola en IndexedDB y subida por partes con reintentos. La prioridad declarada es no perder el audio.',
    pt: 'Uma extensão Manifest V3 com quatro contextos (popup, service worker, documento offscreen e aviso no separador), fila em IndexedDB e envio por partes com novas tentativas. A prioridade declarada é não perder o áudio.',
  },
  role: {
    es: 'Arquitectura y desarrollo, con parte del código asistido por IA bajo mi revisión.',
    pt: 'Arquitetura e desenvolvimento, com parte do código assistido por IA sob a minha revisão.',
  },
  highlights: [
    {
      es: 'El service worker no guarda estado en variables porque Chrome lo suspende: todo vive en IndexedDB.',
      pt: 'O service worker não guarda estado em variáveis porque o Chrome suspende-o: tudo vive em IndexedDB.',
    },
    {
      es: 'Pruebas de contrato contra el backend y verificación en integración continua.',
      pt: 'Testes de contrato contra o backend e verificação em integração contínua.',
    },
  ],
  languages: ['TypeScript'],
  technologies: [
    'Chrome Manifest V3',
    'Vite',
    'IndexedDB',
    'OAuth + PKCE',
    'Vitest',
    'GitHub Actions',
  ],
  cardTags: ['TypeScript', 'Chrome MV3', 'IndexedDB', 'Vitest'],
  filters: ['typescript', 'ia'],
  startDate: '2026-10',
  status: 'activo',
  screenshots: [],
  diagram: [
    { icon: 'extension', label: { es: 'Extensión', pt: 'Extensão' } },
    { icon: 'video', label: { es: 'Grabación', pt: 'Gravação' } },
    { icon: 'datos', label: 'IndexedDB' },
    { icon: 'api', label: 'ArduMaker' },
    { icon: 'documento', label: { es: 'Transcripción', pt: 'Transcrição' } },
  ],
  logo: 'logos/ardumaker.png',
  featured: false,
  visibility: 'privado',
};
