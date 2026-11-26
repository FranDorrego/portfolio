/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: ardumail.ts    Project: portfolio                                  */
/*   Created: 2026/11/26 01:37:20  by vm                                      */
/*   Updated: 2026/11/26 01:37:20  by vm                                      */
/* ************************************************************************** */

/** ArduMail. */

import type { Proyecto } from '@/types/proyecto';

export const ARDUMAIL: Proyecto = {
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
  screenshots: [
    {
      src: 'proyectos/ardumail/01.webp',
      alt: { es: 'Bandeja de entrada', pt: 'Caixa de entrada' },
    },
    {
      src: 'proyectos/ardumail/02.webp',
      alt: { es: 'Correo abierto con adjunto', pt: 'Email aberto com anexo' },
    },
    {
      src: 'proyectos/ardumail/03.webp',
      alt: { es: 'Redacción de un mensaje', pt: 'Redação de uma mensagem' },
    },
    {
      src: 'proyectos/ardumail/04.webp',
      alt: { es: 'Acceso a ArduMail', pt: 'Acesso ao ArduMail' },
    },
  ],
  diagram: [
    { icon: 'correo', label: 'SMTP' },
    { icon: 'api', label: 'API Django' },
    { icon: 'datos', label: { es: 'Casillas', pt: 'Caixas' } },
    { icon: 'web', label: 'Webmail' },
  ],
  featured: false,
  visibility: 'privado',
};
