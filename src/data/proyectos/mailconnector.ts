/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: mailconnector.ts    Project: portfolio                             */
/*   Created: 2026/11/26 01:37:20  by vm                                      */
/*   Updated: 2026/11/26 01:37:20  by vm                                      */
/* ************************************************************************** */

/** MailConnector. */

import type { Proyecto } from '@/types/proyecto';

export const MAILCONNECTOR: Proyecto = {
  id: 'mailconnector',
  slug: 'mailconnector',
  title: 'MailConnector',
  category: 'propio',
  shortDescription: {
    es: 'Recibe alertas de TradingView por correo y las convierte en órdenes en exchanges de criptomonedas.',
    pt: 'Recebe alertas do TradingView por email e converte-os em ordens em exchanges de criptomoedas.',
  },
  fullDescription: {
    es: 'Cada usuario recibe una dirección de correo propia. Cuando llega una alerta, el sistema la interpreta, la guarda y ejecuta la orden en el exchange configurado.',
    pt: 'Cada utilizador recebe um endereço de email próprio. Quando chega um alerta, o sistema interpreta-o, guarda-o e executa a ordem na exchange configurada.',
  },
  solution: {
    es: 'Dos apps Django (núcleo e ingesta de correo), ejecución de órdenes en paralelo, servicios por exchange y claves de API cifradas. Todo en contenedores con Docker Compose.',
    pt: 'Duas apps Django (núcleo e ingestão de email), execução de ordens em paralelo, serviços por exchange e chaves de API cifradas. Tudo em contentores com Docker Compose.',
  },
  role: { es: 'Autor único.', pt: 'Autor único.' },
  languages: ['Python'],
  technologies: ['Django', 'DRF', 'PostgreSQL', 'Docker', 'Binance API', 'KuCoin API', 'Telegram'],
  cardTags: ['Django', 'PostgreSQL', 'Docker'],
  filters: ['python', 'django', 'cloud'],
  startDate: '2025-04',
  endDate: '2025-05',
  screenshots: [
    {
      src: 'proyectos/mailconnector/01.webp',
      alt: {
        es: 'Portada: un mail se convierte en una orden',
        pt: 'Página inicial: um email transforma-se numa ordem',
      },
    },
    {
      src: 'proyectos/mailconnector/02.webp',
      alt: { es: 'Alertas configuradas', pt: 'Alertas configurados' },
    },
    {
      src: 'proyectos/mailconnector/03.webp',
      alt: { es: 'Órdenes ejecutadas', pt: 'Ordens executadas' },
    },
    {
      src: 'proyectos/mailconnector/04.webp',
      alt: { es: 'Correos recibidos', pt: 'Emails recebidos' },
    },
    {
      src: 'proyectos/mailconnector/05.webp',
      alt: { es: 'Exchanges y planes', pt: 'Exchanges e planos' },
    },
  ],
  diagram: [
    { icon: 'grafico', label: 'TradingView' },
    { icon: 'correo', label: 'Email' },
    { icon: 'api', label: 'API Django' },
    { icon: 'externo', label: 'Exchange' },
  ],
  featured: false,
  visibility: 'privado',
};
