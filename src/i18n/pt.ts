/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: pt.ts    Project: portfolio                                        */
/*   Created: 2026/11/25 22:17:56  by claude                                  */
/*   Updated: 2026/11/25 22:22:29  by claude                                  */
/* ************************************************************************** */

/** Los textos de la interfaz en portugues de Portugal. Misma forma que `es.ts`. */

import type { Textos } from './es';

export const pt: Textos = {
  meta: {
    title: 'Franco Dorrego · Programador Full Stack no Porto',
    description:
      'Programador Full Stack: Python, Django, React, TypeScript, cloud e IA. Produtos próprios e clientes internacionais. Disponível no Porto, Portugal.',
  },
  comun: {
    saltar: 'Saltar para o conteúdo',
    cerrar: 'Fechar',
    noDisponible: 'Não disponível',
  },
  barra: {
    ubicacion: 'Porto, Portugal',
    estado: 'Disponível',
    navegacion: 'Secções',
    idioma: 'Língua',
    idiomas: { es: 'Español', pt: 'Português' },
    fotoAlt: 'Fotografia de Franco Dorrego',
    inicio: 'Ir para o início',
  },
  nav: {
    proyectos: 'Experiência',
    sobreMi: 'Sobre mim',
    preguntas: 'Perguntas',
    contacto: 'Contacto',
  },
  hero: {
    subtitulo: 'Programador Full Stack',
    rolesLeyenda: 'Também trabalho como',
    descripcion: 'Produtos web, cloud e automatizações com IA. Do desenho à produção.',
    etiquetas: 'Áreas de trabalho',
    verProyectos: 'Ver experiência',
    descargarCv: 'CV',
    contactar: 'Contactar',
  },
  github: {
    titulo: 'Atividade no GitHub',
    verPerfil: 'Ver perfil no GitHub',
    commits: 'Commits',
    pullRequests: 'Pull requests',
    merges: 'Merges',
    cargando: 'A carregar a atividade do GitHub',
    vacio: 'Ainda não há atividade para mostrar.',
    sinMapa: 'Mapa de contribuições não disponível.',
    error: 'Não foi possível ler a atividade do GitHub.',
    reintentar: 'Tentar novamente',
    mapa: 'Mapa de contribuições',
    resumenDelMapa: '{{total}} contribuições · {{desde}} – {{hasta}}',
    unDia: '{{cantidad}} contribuições a {{fecha}}',
    unDiaUna: '1 contribuição a {{fecha}}',
    unDiaNinguna: 'Sem contribuições a {{fecha}}',
    menos: 'Menos',
    mas: 'Mais',
    ayudaDelMapa: 'Use as setas para percorrer os dias.',
    actualizado: 'Atualizado a {{fecha}}',
    soloPublico: 'só repos públicos',
  },
  proyectos: {
    titulo: 'Experiência',
    buscar: 'Pesquisar projetos',
    buscarEjemplo: 'Pesquisar: Django, WhatsApp, cliente…',
    borrarBusqueda: 'Limpar a pesquisa',
    filtroTecnologia: 'Tecnologia',
    filtroCategoria: 'Categoria',
    todas: 'Todas',
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
  sobreMi: {
    titulo: 'Sobre mim',
    resumen:
      'Cerca de 4 anos a criar aplicações web, automatizações e infraestrutura cloud, quase sempre por conta própria: produtos próprios e clientes internacionais. Uso IA para ir mais depressa; a arquitetura e a revisão são minhas.',
    datos: {
      origen: 'Argentino',
      residencia: '3 anos em Portugal',
      legal: 'Residência aprovada',
      idiomas: 'Espanhol e português fluentes',
      ingles: 'Inglês em melhoria',
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
      'O meu inglês',
      'Processos de engenharia em grande escala',
      'Normas e metodologias enterprise',
      'Experiência em equipas consolidadas',
    ],
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
        pregunta: 'Porquê uma empresa, se tenho produtos próprios?',
        respuesta:
          'Trabalhar sozinho tem um teto técnico. Quero ver sistemas a maior escala e aprender com equipas maduras.',
      },
      {
        pregunta: 'Porque não me dedico só às minhas empresas?',
        respuesta:
          'Escalar um negócio é vendas, marketing e administração. Eu quero dedicar-me ao desenvolvimento e à arquitetura.',
      },
      {
        pregunta: 'Porquê empresas médias ou grandes?',
        respuesta: 'Pela mentoria, pelas revisões de código e pelos projetos complexos.',
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
