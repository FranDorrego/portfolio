/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: pt.ts    Project: portfolio                                        */
/*   Created: 2026/11/25 22:17:56  by claude                                  */
/*   Updated: 2026/11/26 13:44:27  by vm                                      */
/* ************************************************************************** */

/** Los textos de la interfaz en portugues de Portugal. Misma forma que `es.ts`. */

import type { Textos } from './es';

export const pt: Textos = {
  meta: {
    title: 'Franco Dorrego · Developer Full Stack Web no Porto, Portugal',
    description:
      'Franco Dorrego, developer Full Stack Web no Porto, Portugal: Python, Django, React, TypeScript, cloud e IA. Mais de 5 anos com produtos próprios e clientes internacionais.',
  },
  comun: {
    saltar: 'Saltar para o conteúdo',
    cerrar: 'Fechar',
    noDisponible: 'Não disponível',
  },
  barra: {
    ubicacion: 'Porto, Portugal',
    navegacion: 'Secções',
    idioma: 'Língua',
    idiomas: { es: 'Español', pt: 'Português' },
    fotoAlt: 'Fotografia de Franco Dorrego',
    inicio: 'Ir para o início',
    verFoto: 'Ver a fotografia em grande',
    temaClaro: 'Mudar para tema claro',
    temaOscuro: 'Mudar para tema escuro',
  },
  nav: {
    proyectos: 'Experiência',
    clientes: 'Clientes',
    sobreMi: 'Sobre mim',
    formacion: 'Formação',
    tecnologias: 'Tecnologias',
    preguntas: 'Perguntas',
    contacto: 'Contacto',
  },
  hero: {
    subtitulo: 'Developer Full Stack Web',
    descripcion: 'Produtos web, cloud e automatizações com IA. Do desenho à produção.',
    verProyectos: 'Ver experiência',
    descargarCv: 'CV',
    contactar: 'Contactar',
  },
  github: {
    titulo: 'Atividade no GitHub',
    verPerfil: 'Ver perfil no GitHub',
    cargando: 'A carregar a atividade do GitHub',
    vacio: 'Ainda não há atividade para mostrar.',
    sinMapa: 'Mapa de commits não disponível.',
    error: 'Não foi possível ler a atividade do GitHub.',
    reintentar: 'Tentar novamente',
    mapa: 'Mapa de commits',
    unDia: '{{cantidad}} commits a {{fecha}}',
    unDiaUna: '1 commit a {{fecha}}',
    unDiaNinguna: 'Sem commits a {{fecha}}',
    ayudaDelMapa: 'Use as setas para percorrer os dias.',
    enElAnio: '{{total}} commits no último ano',
    enUnAnio: '{{total}} commits em {{anio}}',
    ultimoAnio: 'Último ano',
    anios: 'Anos',
    conIa:
      'Trabalho em equipa: o planeamento e a planificação são meus; a execução e o código, com IA.',
    dias: ['seg', 'qua', 'sex'],
    menos: 'Menos',
    mas: 'Mais',
  },
  proyectos: {
    titulo: 'Experiência',
    antiguedad: '+5 anos',
    buscar: 'Pesquisar projetos',
    buscarEjemplo: 'Pesquisar projeto',
    borrarBusqueda: 'Limpar a pesquisa',
    filtroTecnologia: 'Tecnologia',
    filtroCategoria: 'Categoria',
    todas: 'Todos',
    filtros: 'Filtros rápidos',
    tecnologias: {
      python: 'Python',
      django: 'Django',
      react: 'React',
      typescript: 'TypeScript',
      cloud: 'Cloud / Linux',
      ia: 'IA & n8n',
      c: 'C / C++',
    },
    categorias: {
      propio: 'Produtos próprios',
      cliente: 'Clientes',
      sistemas: '42 Porto / Sistemas',
      educacion: 'Educação e Hardware',
    },
    categoriaCorta: {
      propio: 'Produto próprio',
      cliente: 'Cliente',
      sistemas: 'Sistemas',
      educacion: 'Educação',
    },
    resultados: '{{cantidad}} projetos',
    unResultado: '1 projeto',
    limpiar: 'Limpar filtros',
    verMas: 'Ver mais',
    quedan: '+{{cantidad}}',
    sinResultados: 'Sem resultados.',
    verDetalle: 'Ver o detalhe de {{titulo}}',
    estado: {
      activo: 'Ativo',
      finalizado: 'Concluído',
      'en-desarrollo': 'Em desenvolvimento',
      mantenimiento: 'Em manutenção',
    },
    capturaPendiente: 'Captura pendente',
    capturaPendienteAlt: 'Marcador: ainda não há capturas de {{titulo}}',
  },
  detalle: {
    problema: 'Problema',
    solucion: 'Solução',
    responsabilidad: 'A minha função',
    arquitectura: 'Arquitetura',
    lenguajes: 'Linguagens',
    tecnologias: 'Tecnologias',
    capturas: 'Capturas',
    resultados: 'Resultados',
    fuente: 'Fonte',
    decisiones: 'Decisões',
    actualidad: 'hoje',
    codigoPrivado: 'Código privado',
    verRepositorio: 'Repositório',
    verSitio: 'Site',
    anterior: 'Imagem anterior',
    siguiente: 'Imagem seguinte',
    imagen: '{{actual}} / {{total}}',
  },
  clientes: {
    titulo: 'Clientes',
    resumen: '{{cantidad}} trabalhos avaliados na Workana',
    opiniones: '{{cantidad}} opiniões de clientes',
    estrellas: '{{valor}} de 5 estrelas',
    verProyecto: 'Ver o projeto',
    otros: 'Também trabalhei com',
  },
  sobreMi: {
    titulo: 'Sobre mim',
    resumen:
      'Mais de 5 anos a criar aplicações web, automatizações e infraestrutura cloud: produtos próprios e clientes internacionais.',
    datos: {
      origen: 'Argentino',
      residencia: '3 anos em Portugal',
      idiomas: 'Espanhol e português fluentes',
      ingles: 'Não domino o inglês: estou a estudá-lo',
      formacion: '42 Porto · Common Core',
    },
    fortalezasTitulo: 'O bom',
    fortalezas: [
      'Visão completa: infra, backend, frontend e negócio',
      'Arquitetura e integração de APIs',
      'IA e automatização aplicadas',
      'Autonomia para resolver',
      'Aprendo depressa e sozinho',
      'Produtos reais, clientes internacionais',
    ],
    mejorasTitulo: 'A melhorar',
    mejoras: [
      'Inglês: hoje não o domino e estou a esforçar-me para o aprender',
      'Processos de engenharia em grande escala',
      'Normas e metodologias enterprise',
      'Experiência em equipas consolidadas',
    ],
  },
  formacion: {
    titulo: 'Formação',
    enCurso: 'Em curso',
  },
  tecnologias: {
    titulo: 'Tecnologias',
    checkerTitulo: 'O meu próprio checker de código',
    checker:
      'Criei o ardumaker check, uma ferramenta que revê cada repositório antes de cada commit: assim trabalho sempre com o mesmo padrão. Este site passa sem erros nem avisos.',
  },
  preguntas: {
    titulo: 'Perguntas frequentes',
    lista: [
      {
        pregunta: 'O que procuro?',
        respuesta:
          'Uma posição Full Stack, Backend Python/Django ou de arquitetura de soluções, numa equipa consolidada.',
      },
      {
        pregunta: 'Porquê a mudança de freelancer para programador numa empresa?',
        respuesta:
          'O mundo freelancer é agitado e muito divertido, e gosto dele. Mas vai estar sempre disponível: por agora quero ver o que mais existe, e por isso procuro trabalho em empresas médias ou grandes, para ampliar a minha experiência.',
      },
      {
        pregunta: 'Porquê uma empresa, se tenho produtos próprios?',
        respuesta:
          'Trabalhar sozinho tem um teto técnico. Quero ver sistemas a maior escala e aprender com equipas maduras.',
      },
      {
        pregunta: 'Porque não me dedico às minhas empresas/projetos?',
        respuesta:
          'Escalar um negócio é vendas, marketing e administração. Eu quero dedicar-me ao desenvolvimento e à arquitetura.',
      },
      {
        pregunta: 'Porquê empresas médias ou grandes?',
        respuesta: 'Pela mentoria, pelas revisões de código e pelos projetos complexos.',
      },
      {
        pregunta: 'Sou um vibecoder?',
        respuesta:
          'Não. A IA é a minha colega de trabalho, não quem decide: o que construir, como resolver, como as peças se ligam, o design e a arquitetura são definidos por mim.\n\nO que já não me trava é o mecânico, como escrever um for ou escolher entre int e long para um contador. Trabalho lado a lado com a IA: os dois contribuímos com conhecimento e eu ponho o critério.',
      },
    ],
  },
  contacto: {
    titulo: 'Falamos?',
    email: 'Email',
  },
  pie: {
    firma: 'Franco Dorrego · Software Developer · Porto, Portugal',
  },
};
