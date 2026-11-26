/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: estandares-cli.ts    Project: portfolio                            */
/*   Created: 2026/11/26 01:37:20  by vm                                      */
/*   Updated: 2026/11/26 01:37:20  by vm                                      */
/* ************************************************************************** */

/** Estándares de trabajo y CLI. */

import type { Proyecto } from '@/types/proyecto';

export const ESTANDARES_CLI: Proyecto = {
  id: 'estandares-cli',
  slug: 'estandares-de-trabajo-cli',
  title: 'Estándares de trabajo y CLI',
  category: 'propio',
  shortDescription: {
    es: 'Las reglas de trabajo de ArduMaker y la herramienta de línea de comandos que las comprueba en cada repositorio.',
    pt: 'As regras de trabalho da ArduMaker e a ferramenta de linha de comandos que as verifica em cada repositório.',
  },
  fullDescription: {
    es: 'Reglas de repositorio y de código en tres idiomas, y un CLI con `check`, `fix` y ganchos de git que las hace cumplir antes de cada commit. Se distribuye como binario para Linux y Windows.',
    pt: 'Regras de repositório e de código em três línguas, e um CLI com `check`, `fix` e hooks de git que as faz cumprir antes de cada commit. É distribuído como binário para Linux e Windows.',
  },
  problem: {
    es: 'Con varios repositorios y varios colaboradores, las convenciones escritas en un documento no se cumplen solas.',
    pt: 'Com vários repositórios e vários colaboradores, as convenções escritas num documento não se cumprem sozinhas.',
  },
  solution: {
    es: 'Un verificador que corre en local y en integración continua. Desde la versión 2.0 son tres binarios sobre paquetes compartidos, para que lo sensible no viaje en el que se distribuye.',
    pt: 'Um verificador que corre em local e em integração contínua. Desde a versão 2.0 são três binários sobre pacotes partilhados, para que o que é sensível não viaje no que é distribuído.',
  },
  role: { es: 'Diseño de las reglas y desarrollo.', pt: 'Desenho das regras e desenvolvimento.' },
  languages: ['Python'],
  technologies: ['CLI', 'PyInstaller', 'Docker', 'Git hooks'],
  cardTags: ['Python', 'CLI', 'Git hooks'],
  filters: ['python'],
  startDate: '2026-09',
  status: 'activo',
  screenshots: [],
  diagram: [
    { icon: 'codigo', label: 'Commit' },
    { icon: 'consola', label: 'ardumaker check' },
    { icon: 'documento', label: { es: 'Reglas', pt: 'Regras' } },
    { icon: 'nube', label: 'CI' },
  ],
  logo: 'logos/ardumaker.png',
  featured: false,
  visibility: 'privado',
};
