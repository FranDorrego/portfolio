/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: es.ts    Project: portfolio                                        */
/*   Created: 2026/11/25 22:17:56  by claude                                  */
/*   Updated: 2026/11/25 22:29:31  by vm                                      */
/* ************************************************************************** */

/** Los textos de la interfaz en espanol. Su forma es el molde de los demas idiomas. */

export const es = {
  meta: {
    title: 'Franco Dorrego · Desarrollador Full Stack en Porto',
    description:
      'Desarrollador Full Stack: Python, Django, React, TypeScript, cloud e IA. Productos propios y clientes internacionales. Disponible en Porto, Portugal.',
  },
  comun: {
    saltar: 'Saltar al contenido',
    cerrar: 'Cerrar',
    noDisponible: 'No disponible',
  },
  barra: {
    ubicacion: 'Porto, Portugal',
    estado: 'Disponible',
    navegacion: 'Secciones',
    idioma: 'Idioma',
    idiomas: { es: 'Español', pt: 'Português' },
    fotoAlt: 'Foto de Franco Dorrego',
    inicio: 'Ir al inicio',
    temaClaro: 'Cambiar a tema claro',
    temaOscuro: 'Cambiar a tema oscuro',
  },
  nav: {
    proyectos: 'Experiencia',
    sobreMi: 'Sobre mí',
    preguntas: 'Preguntas',
    contacto: 'Contacto',
  },
  hero: {
    subtitulo: 'Programador Full Stack',
    rolesLeyenda: 'También trabajo como',
    descripcion: 'Productos web, cloud y automatizaciones con IA. Del diseño a producción.',
    etiquetas: 'Áreas de trabajo',
    verProyectos: 'Ver experiencia',
    descargarCv: 'CV',
    contactar: 'Contactar',
  },
  github: {
    titulo: 'Actividad en GitHub',
    verPerfil: 'Ver perfil en GitHub',
    commits: 'Commits',
    pullRequests: 'Pull requests',
    merges: 'Merges',
    cargando: 'Cargando la actividad de GitHub',
    vacio: 'Todavía no hay actividad para mostrar.',
    sinMapa: 'Mapa de contribuciones no disponible.',
    error: 'No se pudo leer la actividad de GitHub.',
    reintentar: 'Reintentar',
    mapa: 'Mapa de contribuciones',
    resumenDelMapa: '{{total}} contribuciones · {{desde}} – {{hasta}}',
    unDia: '{{cantidad}} contribuciones el {{fecha}}',
    unDiaUna: '1 contribución el {{fecha}}',
    unDiaNinguna: 'Sin contribuciones el {{fecha}}',
    menos: 'Menos',
    mas: 'Más',
    ayudaDelMapa: 'Usa las flechas para recorrer los días.',
    actualizado: 'Actualizado el {{fecha}}',
    soloPublico: 'solo repos públicos',
  },
  proyectos: {
    titulo: 'Experiencia',
    buscar: 'Buscar proyectos',
    buscarEjemplo: 'Buscar: Django, WhatsApp, cliente…',
    borrarBusqueda: 'Borrar la búsqueda',
    filtroTecnologia: 'Tecnología',
    filtroCategoria: 'Categoría',
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
      propio: 'Productos propios',
      cliente: 'Clientes',
      sistemas: '42 Porto / Sistemas',
      educacion: 'Educación y Hardware',
    },
    categoriaCorta: {
      propio: 'Producto propio',
      cliente: 'Cliente',
      sistemas: 'Sistemas',
      educacion: 'Educación',
    },
    resultados: '{{cantidad}} proyectos',
    unResultado: '1 proyecto',
    limpiar: 'Limpiar filtros',
    verMas: 'Ver más',
    quedan: '+{{cantidad}}',
    sinResultados: 'Sin resultados.',
    verDetalle: 'Ver el detalle de {{titulo}}',
    estado: {
      activo: 'Activo',
      finalizado: 'Finalizado',
      'en-desarrollo': 'En desarrollo',
      mantenimiento: 'En mantenimiento',
    },
    capturaPendiente: 'Captura pendiente',
    capturaPendienteAlt: 'Marcador: todavía no hay capturas de {{titulo}}',
  },
  detalle: {
    problema: 'Problema',
    solucion: 'Solución',
    responsabilidad: 'Mi rol',
    arquitectura: 'Arquitectura',
    lenguajes: 'Lenguajes',
    tecnologias: 'Tecnologías',
    capturas: 'Capturas',
    resultados: 'Resultados',
    fuente: 'Fuente',
    decisiones: 'Decisiones',
    actualidad: 'hoy',
    codigoPrivado: 'Código privado',
    verRepositorio: 'Repositorio',
    verSitio: 'Sitio',
    anterior: 'Imagen anterior',
    siguiente: 'Imagen siguiente',
    imagen: '{{actual}} / {{total}}',
  },
  sobreMi: {
    titulo: 'Sobre mí',
    resumen:
      'Unos 4 años creando aplicaciones web, automatizaciones e infraestructura cloud, casi siempre por mi cuenta: productos propios y clientes internacionales. Uso IA para ir más rápido; la arquitectura y la revisión son mías.',
    datos: {
      origen: 'Argentino',
      residencia: '3 años en Portugal',
      legal: 'Residencia aprobada',
      idiomas: 'Español y portugués fluidos',
      ingles: 'Inglés en mejora',
      formacion: '42 Porto · Common Core',
    },
    fortalezasTitulo: 'Lo bueno',
    fortalezas: [
      'Visión completa: infra, backend, frontend y negocio',
      'Arquitectura e integración de APIs',
      'IA y automatización aplicadas',
      'Autonomía para resolver',
      'Aprendo rápido y solo',
      'Productos reales, clientes internacionales',
    ],
    mejorasTitulo: 'A mejorar',
    mejoras: [
      'Mi inglés',
      'Procesos de ingeniería a gran escala',
      'Estándares y metodologías enterprise',
      'Experiencia en equipos consolidados',
    ],
  },
  preguntas: {
    titulo: 'Preguntas frecuentes',
    lista: [
      {
        pregunta: '¿Qué busco?',
        respuesta:
          'Un puesto Full Stack, Backend Python/Django o de arquitectura de soluciones, en un equipo consolidado.',
      },
      {
        pregunta: '¿Por qué una empresa, si tengo productos propios?',
        respuesta:
          'Trabajar solo tiene un techo técnico. Quiero ver sistemas a mayor escala y aprender de equipos maduros.',
      },
      {
        pregunta: '¿Por qué no me dedico solo a mis empresas?',
        respuesta:
          'Escalar un negocio es ventas, marketing y administración. Yo quiero dedicarme al desarrollo y la arquitectura.',
      },
      {
        pregunta: '¿Por qué compañías medianas o grandes?',
        respuesta: 'Por la mentoría, las revisiones de código y los proyectos complejos.',
      },
    ],
  },
  contacto: {
    titulo: '¿Hablamos?',
    email: 'Email',
  },
  pie: {
    firma: 'Franco Dorrego · Software Developer · Porto, Portugal',
  },
};

export type Textos = typeof es;
