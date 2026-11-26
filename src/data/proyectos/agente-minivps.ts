/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: agente-minivps.ts    Project: portfolio                            */
/*   Created: 2026/11/26 01:37:20  by vm                                      */
/*   Updated: 2026/11/26 01:37:20  by vm                                      */
/* ************************************************************************** */

/** Agente de miniVPS. */

import type { Proyecto } from '@/types/proyecto';

export const AGENTE_MINIVPS: Proyecto = {
  id: 'agente-minivps',
  slug: 'agente-de-minivps',
  title: 'Agente de miniVPS',
  category: 'propio',
  shortDescription: {
    es: 'El agente que corre en cada host y en cada miniVPS de ArduMaker, y los scripts que aprovisionan las máquinas.',
    pt: 'O agente que corre em cada host e em cada miniVPS da ArduMaker, e os scripts que aprovisionam as máquinas.',
  },
  fullDescription: {
    es: 'Un servicio FastAPI empaquetado como binario único que expone el estado, el rendimiento, los procesos y la terminal de cada máquina, controla los contenedores LXD y se actualiza solo. Lo acompañan los scripts de Bash que preparan un host desde cero.',
    pt: 'Um serviço FastAPI empacotado como binário único que expõe o estado, o desempenho, os processos e o terminal de cada máquina, controla os contentores LXD e atualiza-se sozinho. É acompanhado pelos scripts de Bash que preparam um host de raiz.',
  },
  problem: {
    es: 'Dividir un servidor en entornos aislados y administrarlos a distancia sin entrar por SSH a cada uno.',
    pt: 'Dividir um servidor em ambientes isolados e administrá-los à distância sem entrar por SSH em cada um.',
  },
  solution: {
    es: 'Tres capas (API central → agente del host → agente del miniVPS). El host solo hace lo que tiene que pasar en la máquina; lo demás lo decide la API central.',
    pt: 'Três camadas (API central → agente do host → agente do miniVPS). O host só faz o que tem de acontecer na máquina; o resto é decidido pela API central.',
  },
  role: {
    es: 'Arquitectura, desarrollo y operación.',
    pt: 'Arquitetura, desenvolvimento e operação.',
  },
  languages: ['Python', 'Bash'],
  technologies: ['FastAPI', 'LXD', 'Linux', 'systemd', 'Nginx', 'UFW', 'WebSocket', 'PyInstaller'],
  cardTags: ['FastAPI', 'LXD', 'Linux', 'Bash'],
  filters: ['python', 'cloud'],
  startDate: '2025-10',
  status: 'activo',
  screenshots: [],
  diagram: [
    { icon: 'api', label: 'API central' },
    { icon: 'consola', label: 'Agente host' },
    { icon: 'nube', label: { es: 'Contenedor LXD', pt: 'Contentor LXD' } },
    { icon: 'consola', label: 'Agente VPS' },
  ],
  logo: 'logos/ardumaker.png',
  featured: false,
  visibility: 'privado',
};
