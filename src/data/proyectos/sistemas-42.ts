/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: sistemas-42.ts    Project: portfolio                               */
/*   Created: 2026/11/26 01:37:20  by vm                                      */
/*   Updated: 2026/11/26 01:37:20  by vm                                      */
/* ************************************************************************** */

/** Minishell, cub3D & Pipex. */

import type { Proyecto } from '@/types/proyecto';

export const SISTEMAS_42: Proyecto = {
  id: 'sistemas-42',
  slug: 'minishell-cub3d-pipex',
  title: 'Minishell, cub3D & Pipex',
  category: 'sistemas',
  categoryNote: { es: '42 Porto', pt: '42 Porto' },
  shortDescription: {
    es: 'Programación de sistemas en C: una shell tipo bash, un motor 3D por raycasting y la gestión de procesos, pipes y redirecciones de Unix.',
    pt: 'Programação de sistemas em C: uma shell do tipo bash, um motor 3D por raycasting e a gestão de processos, pipes e redirecionamentos de Unix.',
  },
  fullDescription: {
    es: 'Tres proyectos del Common Core de 42 Porto. Minishell es una shell con tokenizer, expansiones, heredoc, redirecciones, pipes, señales y builtins. cub3D es un motor en primera persona con raycasting sobre MiniLibX. Pipex reproduce el pipe de la shell con fork, execve, pipe y dup2.',
    pt: 'Três projetos do Common Core da 42 Porto. O Minishell é uma shell com tokenizer, expansões, heredoc, redirecionamentos, pipes, sinais e builtins. O cub3D é um motor na primeira pessoa com raycasting sobre a MiniLibX. O Pipex reproduz o pipe da shell com fork, execve, pipe e dup2.',
  },
  problem: {
    es: 'Entender qué hay debajo de las herramientas de todos los días: procesos, descriptores de archivo, señales y memoria, sin frameworks ni bibliotecas que lo escondan.',
    pt: 'Perceber o que está por baixo das ferramentas de todos os dias: processos, descritores de ficheiro, sinais e memória, sem frameworks nem bibliotecas que o escondam.',
  },
  solution: {
    es: 'C con -Wall -Wextra -Werror y Makefile. En minishell: tokenizer → parser → expansiones → ejecución. En cub3D: validación del mapa → inicialización → raycasting con texturas.',
    pt: 'C com -Wall -Wextra -Werror e Makefile. No minishell: tokenizer → parser → expansões → execução. No cub3D: validação do mapa → inicialização → raycasting com texturas.',
  },
  role: {
    es: 'Desarrollo e implementación técnica. Minishell y cub3D en pareja; Pipex individual.',
    pt: 'Desenvolvimento e implementação técnica. Minishell e cub3D em par; Pipex individual.',
  },
  responsibilities: [
    {
      es: 'Minishell: todos los builtins, el parser, los pipes y las señales (97 de 201 commits).',
      pt: 'Minishell: todos os builtins, o parser, os pipes e os sinais (97 de 201 commits).',
    },
    {
      es: 'cub3D: el parser y la validación de mapas y las utilidades (28 de 54 commits). El raycasting es de mi compañero.',
      pt: 'cub3D: o parser e a validação de mapas e os utilitários (28 de 54 commits). O raycasting é do meu colega.',
    },
    {
      es: 'Pipex: proyecto individual, con printf propio.',
      pt: 'Pipex: projeto individual, com printf próprio.',
    },
  ],
  languages: ['C'],
  technologies: ['Linux', 'Unix', 'Makefile', 'readline', 'MiniLibX', 'fork / execve', 'pipes'],
  cardTags: ['C', 'Linux', 'Unix', 'Makefile'],
  filters: ['c', 'cloud'],
  startDate: '2025-09',
  endDate: '2026-04',
  status: 'finalizado',
  screenshots: [],
  diagram: [
    { icon: 'consola', label: 'Entrada' },
    { icon: 'codigo', label: 'Tokenizer' },
    { icon: 'codigo', label: 'Parser' },
    { icon: 'consola', label: 'fork / execve' },
    { icon: 'juego', label: 'Raycasting' },
  ],
  repositoryUrl: 'https://github.com/rodperei/minishell',
  featured: true,
  visibility: 'publico',
};
