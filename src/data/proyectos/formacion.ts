/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: formacion.ts    Project: portfolio                                 */
/*   Created: 2026/11/25 21:30:00  by claude                                  */
/*   Updated: 2026/11/25 21:30:00  by claude                                  */
/* ************************************************************************** */

/** 42 Porto, formacion, hackathons y hardware. */

import type { Proyecto } from '@/types/proyecto';

/** El cuarto destacado: los proyectos de sistemas de 42 Porto con autoria comprobada. */
export const FORMACION: Proyecto[] = [
  {
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
    repositoryUrl: 'https://github.com/rodperei/minishell',
    featured: true,
    visibility: 'publico',
  },
  {
    id: 'video-processing-api',
    slug: 'video-processing-api',
    title: 'Video Processing API',
    category: 'educacion',
    categoryNote: { es: 'Hackathon Seguranza', pt: 'Hackathon Seguranza' },
    shortDescription: {
      es: 'Procesamiento de vídeo en tiempo real: recibe vídeos o fotogramas en vivo, los envía a un detector y publica las detecciones por WebSocket.',
      pt: 'Processamento de vídeo em tempo real: recebe vídeos ou fotogramas em direto, envia-os para um detetor e publica as deteções por WebSocket.',
    },
    fullDescription: {
      es: 'Backend escrito durante un hackathon. Trocea cada vídeo en fotogramas, los manda a un servicio de detección externo y entrega los resultados por REST y por salas de Socket.IO, con varios clientes a la vez.',
      pt: 'Backend escrito durante um hackathon. Divide cada vídeo em fotogramas, envia-os para um serviço de deteção externo e entrega os resultados por REST e por salas de Socket.IO, com vários clientes em simultâneo.',
    },
    solution: {
      es: 'Un hilo por vídeo con estados (en cola, esperando espectadores, procesando, terminado). El procesamiento se pausa si nadie está mirando y los fotogramas por segundo se cambian en caliente.',
      pt: 'Uma thread por vídeo com estados (em fila, à espera de espectadores, a processar, terminado). O processamento pausa se ninguém estiver a ver e os fotogramas por segundo mudam-se a quente.',
    },
    role: { es: 'Autor del backend.', pt: 'Autor do backend.' },
    languages: ['Python'],
    technologies: ['Flask', 'Socket.IO', 'OpenCV', 'SQLite', 'WebSocket'],
    cardTags: ['Python', 'Flask', 'OpenCV', 'WebSocket'],
    filters: ['python', 'ia'],
    startDate: '2026-04',
    endDate: '2026-04',
    status: 'finalizado',
    screenshots: [],
    repositoryUrl: 'https://github.com/FranDorrego/Hackaton---Seguranza',
    featured: false,
    visibility: 'publico',
  },
  {
    id: 'itbank',
    slug: 'itbank',
    title: 'ITBANK',
    category: 'educacion',
    categoryNote: { es: 'Académico · ITBA', pt: 'Académico · ITBA' },
    shortDescription: {
      es: 'Aplicación de home banking con Django y Next.js, construida en ocho sprints.',
      pt: 'Aplicação de home banking com Django e Next.js, construída em oito sprints.',
    },
    fullDescription: {
      es: 'Proyecto del curso de desarrollo Full Stack del ITBA, hecho en pareja. Empezó en HTML, CSS y JavaScript y terminó como una aplicación completa: API REST en Django con permisos y un frontend en Next.js con login, movimientos, tarjetas y divisas.',
      pt: 'Projeto do curso de desenvolvimento Full Stack do ITBA, feito em par. Começou em HTML, CSS e JavaScript e terminou como uma aplicação completa: API REST em Django com permissões e um frontend em Next.js com login, movimentos, cartões e divisas.',
    },
    role: {
      es: 'Desarrollo Full Stack en pareja (230 de 318 commits).',
      pt: 'Desenvolvimento Full Stack em par (230 de 318 commits).',
    },
    languages: ['Python', 'JavaScript'],
    technologies: ['Django', 'DRF', 'Next.js', 'React', 'SQLite', 'Tailwind CSS'],
    cardTags: ['Django', 'Next.js', 'React', 'SQLite'],
    filters: ['python', 'django', 'react'],
    startDate: '2023-08',
    endDate: '2023-12',
    status: 'finalizado',
    screenshots: [],
    repositoryUrl: 'https://github.com/FranDorrego/ITBA',
    featured: false,
    visibility: 'publico',
  },
  {
    id: 'academia-arduino',
    slug: 'academia-de-arduino',
    title: 'Academia de Arduino',
    category: 'educacion',
    categoryNote: { es: 'Proyecto propio', pt: 'Projeto próprio' },
    shortDescription: {
      es: 'Formación en programación, Arduino, C y electrónica, con cursos, material propio y kits físicos.',
      pt: 'Formação em programação, Arduino, C e eletrónica, com cursos, material próprio e kits físicos.',
    },
    fullDescription: {
      es: 'Academia creada entre 2019 y 2020 para enseñar Arduino, programación en C y electrónica básica. Hoy no recibe alumnos nuevos; los contenidos siguen disponibles.',
      pt: 'Academia criada entre 2019 e 2020 para ensinar Arduino, programação em C e eletrónica básica. Hoje não recebe novos alunos; os conteúdos continuam disponíveis.',
    },
    role: {
      es: 'Fundador: contenidos, cursos y kits.',
      pt: 'Fundador: conteúdos, cursos e kits.',
    },
    languages: ['C', 'C++'],
    technologies: ['Arduino', 'Electrónica'],
    cardTags: ['Arduino', 'C', 'Electrónica'],
    filters: ['c'],
    startDate: '2019',
    status: 'finalizado',
    metrics: [
      {
        value: '≈ 3.000',
        label: { es: 'alumnos', pt: 'alunos' },
        source: { es: 'Dato del autor.', pt: 'Dado do autor.' },
      },
    ],
    screenshots: [],
    featured: false,
    visibility: 'privado',
  },
];
