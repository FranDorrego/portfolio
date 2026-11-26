/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: es.ts    Project: portfolio                                        */
/*   Created: 2026/11/25 22:17:56  by claude                                  */
/*   Updated: 2026/11/26 22:20:11  by vm                                      */
/* ************************************************************************** */

/** Los textos de la interfaz en espanol. Su forma es el molde de los demas idiomas. */

export const es = {
  meta: {
    title: 'Franco Dorrego · Developer Full Stack Web en Porto, Portugal',
    description:
      'Franco Dorrego, developer Full Stack Web en Porto, Portugal: Python, Django, React, TypeScript, cloud e IA. Más de 5 años con productos propios y clientes internacionales.',
  },
  comun: {
    saltar: 'Saltar al contenido',
    cerrar: 'Cerrar',
    noDisponible: 'No disponible',
  },
  barra: {
    ubicacion: 'Porto, Portugal',
    navegacion: 'Secciones',
    idioma: 'Idioma',
    idiomas: { es: 'Español', pt: 'Português' },
    fotoAlt: 'Foto de Franco Dorrego',
    inicio: 'Ir al inicio',
    verFoto: 'Ver la foto en grande',
    temaClaro: 'Cambiar a tema claro',
    temaOscuro: 'Cambiar a tema oscuro',
  },
  nav: {
    proyectos: 'Experiencia',
    clientes: 'Clientes',
    sobreMi: 'Sobre mí',
    formacion: 'Formación',
    tecnologias: 'Tecnologías',
    preguntas: 'Preguntas',
    contacto: 'Contacto',
  },
  hero: {
    subtitulo: 'Developer Full Stack Web',
    descripcion: 'Productos web, cloud y automatizaciones con IA. Del diseño a producción.',
    verProyectos: 'Ver experiencia',
    descargarCv: 'CV',
    contactar: 'Contactar',
  },
  github: {
    titulo: 'Actividad en GitHub',
    verPerfil: 'Ver perfil en GitHub',
    cargando: 'Cargando la actividad de GitHub',
    vacio: 'Todavía no hay actividad para mostrar.',
    sinMapa: 'Mapa de commits no disponible.',
    error: 'No se pudo leer la actividad de GitHub.',
    reintentar: 'Reintentar',
    mapa: 'Mapa de commits',
    unDia: '{{cantidad}} commits el {{fecha}}',
    unDiaUna: '1 commit el {{fecha}}',
    unDiaNinguna: 'Sin commits el {{fecha}}',
    ayudaDelMapa: 'Usa las flechas para recorrer los días.',
    enElAnio: '{{total}} commits en el último año',
    enUnAnio: '{{total}} commits en {{anio}}',
    ultimoAnio: 'Último año',
    anios: 'Años',
    conIa:
      'Trabajo en equipo: el planeamiento y la planificación son míos; la ejecución y el código, con IA.',
    dias: ['lun', 'mié', 'vie'],
    menos: 'Menos',
    mas: 'Más',
  },
  proyectos: {
    titulo: 'Experiencia',
    antiguedad: '+5 años',
    buscar: 'Buscar proyectos',
    buscarEjemplo: 'Buscar proyecto',
    borrarBusqueda: 'Borrar la búsqueda',
    filtroTecnologia: 'Tecnología',
    filtroCategoria: 'Categoría',
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
  clientes: {
    titulo: 'Clientes / Empresas con los que ya trabajé',
    resumen: '{{cantidad}} trabajos calificados',
    opiniones: '{{cantidad}} opiniones de clientes',
    estrellas: '{{valor}} de 5 estrellas',
    verProyecto: 'Ver el proyecto',
    otros: 'También trabajé con',
  },
  sobreMi: {
    titulo: 'Sobre mí',
    resumen:
      'Más de 5 años creando aplicaciones web, automatizaciones e infraestructura cloud: productos propios y clientes internacionales.',
    datos: {
      origen: 'Argentino',
      residencia: '3 años en Portugal',
      idiomas: 'Español y portugués fluidos',
      ingles: 'No manejo el inglés: lo estoy estudiando',
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
      'Inglés: hoy no lo manejo y me estoy esforzando para aprenderlo',
      'Procesos de ingeniería a gran escala',
      'Estándares y metodologías enterprise',
      'Experiencia en equipos consolidados',
    ],
  },
  formacion: {
    hoy: 'actualidad',
    titulo: 'Formación',
    enCurso: 'En curso',
  },
  tecnologias: {
    titulo: 'Tecnologías',
    checkerTitulo: 'Mi propio checker de código',
    checker:
      'Creé ardumaker check, una herramienta que revisa cada repositorio antes de cada commit: así trabajo siempre con el mismo patrón. Este sitio pasa sin errores ni advertencias.',
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
        pregunta: '¿Por qué el cambio de freelancer a programador en una empresa?',
        respuesta:
          'El mundo freelancer es movido y muy divertido, y me gusta. Pero siempre va a estar disponible: por ahora quiero ver qué más hay, y por eso busco trabajo en empresas medianas o grandes, para ampliar mi experiencia.',
      },
      {
        pregunta: '¿Por qué una empresa, si tengo productos propios?',
        respuesta:
          'Trabajar solo tiene un techo técnico. Quiero ver sistemas a mayor escala y aprender de equipos maduros.',
      },
      {
        pregunta: '¿Por qué no me dedico a mis empresas/proyectos?',
        respuesta:
          'Escalar un negocio es ventas, marketing y administración. Yo quiero dedicarme al desarrollo y la arquitectura.',
      },
      {
        pregunta: '¿Por qué compañías medianas o grandes?',
        respuesta: 'Por la mentoría, las revisiones de código y los proyectos complejos.',
      },
      {
        pregunta: '¿Soy un vibecoder?',
        respuesta:
          'No. La IA es mi compañera de trabajo, no quien decide: qué construir, cómo resolverlo, cómo se conectan las piezas, el diseño y la arquitectura los defino yo.\n\nLo que ya no me frena es lo mecánico, como escribir un for o elegir entre int y long para un contador. Trabajo par a par con la IA: los dos aportamos conocimiento y yo pongo el criterio.',
      },
    ],
  },
  contacto: {
    titulo: '¿Hablamos?',
    email: 'Email',
  },
  pie: {
    firma: 'Franco Dorrego · Software Developer · Porto, Portugal',
    ats: 'PDF para ATS',
    completo: 'PDF completo',
    formatos: 'CV en otros formatos',
  },
};

export type Textos = typeof es;
