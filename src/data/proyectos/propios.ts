/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: propios.ts    Project: portfolio                                   */
/*   Created: 2026/11/25 21:30:00  by claude                                  */
/*   Updated: 2026/11/25 21:30:00  by claude                                  */
/* ************************************************************************** */

/** Productos y herramientas propias. Lo descubierto en GitHub esta marcado en cada ficha. */

import type { Proyecto } from '@/types/proyecto';

export const PROPIOS: Proyecto[] = [
  {
    id: 'ardumaker-mcp',
    slug: 'ardumaker-mcp',
    title: 'ArduMaker MCP',
    category: 'propio',
    shortDescription: {
      es: 'Servidor MCP público para que agentes de IA operen servidores, dominios, bases de datos, correo y proyectos con permiso del usuario.',
      pt: 'Servidor MCP público para que agentes de IA operem servidores, domínios, bases de dados, email e projetos com autorização do utilizador.',
    },
    fullDescription: {
      es: 'La infraestructura de integración de ArduMaker para agentes de IA. Un asistente compatible con MCP puede crear un VPS, publicar un repositorio en un dominio, consultar una base de datos o mover una tarea, siempre después de que una persona apruebe el acceso.',
      pt: 'A infraestrutura de integração da ArduMaker para agentes de IA. Um assistente compatível com MCP pode criar um VPS, publicar um repositório num domínio, consultar uma base de dados ou mover uma tarefa, sempre depois de uma pessoa aprovar o acesso.',
    },
    problem: {
      es: 'Los agentes de IA saben escribir código, pero no tienen una forma segura y uniforme de operar la infraestructura donde ese código corre.',
      pt: 'Os agentes de IA sabem escrever código, mas não têm uma forma segura e uniforme de operar a infraestrutura onde esse código corre.',
    },
    solution: {
      es: 'Un servidor MCP con OAuth 2.1 y PKCE, registro dinámico de clientes, aprobación humana y rotación de tokens, que expone la plataforma como herramientas con un contrato común.',
      pt: 'Um servidor MCP com OAuth 2.1 e PKCE, registo dinâmico de clientes, aprovação humana e rotação de tokens, que expõe a plataforma como ferramentas com um contrato comum.',
    },
    role: {
      es: 'Diseño del contrato de las herramientas, arquitectura y desarrollo.',
      pt: 'Desenho do contrato das ferramentas, arquitetura e desenvolvimento.',
    },
    architecture: [
      {
        es: 'Proceso ASGI propio (uvicorn) y entorno virtual separado del backend, para que el SDK de MCP no afecte a la API.',
        pt: 'Processo ASGI próprio (uvicorn) e ambiente virtual separado do backend, para que o SDK de MCP não afete a API.',
      },
      {
        es: 'Alrededor de 80 módulos de herramientas: proyectos, VPS, bases de datos, correo, WordPress, grabaciones, RAG y n8n.',
        pt: 'Cerca de 80 módulos de ferramentas: projetos, VPS, bases de dados, email, WordPress, gravações, RAG e n8n.',
      },
      {
        es: 'Un «contrato del servidor» con once reglas por herramienta, verificado en integración continua.',
        pt: 'Um «contrato do servidor» com onze regras por ferramenta, verificado em integração contínua.',
      },
      {
        es: 'El contenido escrito por terceros (correos, logs, salidas de comandos) llega marcado como no confiable.',
        pt: 'O conteúdo escrito por terceiros (emails, logs, saídas de comandos) chega marcado como não confiável.',
      },
    ],
    languages: ['Python'],
    technologies: ['MCP', 'OAuth 2.1', 'PKCE', 'Django', 'uvicorn', 'PostgreSQL', 'n8n'],
    cardTags: ['MCP', 'OAuth 2.1', 'Django', 'Python'],
    filters: ['python', 'django', 'ia', 'cloud'],
    status: 'activo',
    screenshots: [],
    logo: 'logos/ardumaker.png',
    featured: false,
    visibility: 'privado',
  },
  {
    id: 'cryptoexcel',
    slug: 'cryptoexcel',
    title: 'CryptoExcel',
    category: 'propio',
    shortDescription: {
      es: 'Registro y análisis de operaciones de criptomonedas con integración a Binance, webhooks y generación de informes en Excel.',
      pt: 'Registo e análise de operações de criptomoedas com integração com a Binance, webhooks e geração de relatórios em Excel.',
    },
    fullDescription: {
      es: 'Aplicación web para registrar y ordenar operaciones de arbitraje: movimientos, balances, comprobantes y estadísticas, con exportación a Excel enviada por correo. La construí desde cero en unos tres meses, entre 2023 y 2024.',
      pt: 'Aplicação web para registar e organizar operações de arbitragem: movimentos, saldos, comprovativos e estatísticas, com exportação para Excel enviada por email. Construí-a de raiz em cerca de três meses, entre 2023 e 2024.',
    },
    problem: {
      es: 'Quien hace arbitraje lleva sus operaciones en planillas armadas a mano, con errores y sin una vista clara del rendimiento.',
      pt: 'Quem faz arbitragem regista as operações em folhas de cálculo feitas à mão, com erros e sem uma visão clara do rendimento.',
    },
    solution: {
      es: 'Un backend Django con una app por área (autenticación, movimientos, estadísticas, pagos, exportaciones) y tres microservicios para Binance, exportaciones y comprobantes, con un frontend en Next.js.',
      pt: 'Um backend Django com uma app por área (autenticação, movimentos, estatísticas, pagamentos, exportações) e três microsserviços para a Binance, exportações e comprovativos, com um frontend em Next.js.',
    },
    role: {
      es: 'Autor único: producto, backend, frontend y despliegue.',
      pt: 'Autor único: produto, backend, frontend e deploy.',
    },
    languages: ['Python', 'JavaScript'],
    technologies: [
      'Django',
      'DRF',
      'Next.js',
      'React',
      'PostgreSQL',
      'Binance API',
      'openpyxl',
      'Google Drive API',
    ],
    cardTags: ['Django', 'Next.js', 'Binance API', 'Excel'],
    filters: ['python', 'django', 'react'],
    startDate: '2023-12',
    status: 'mantenimiento',
    metrics: [
      {
        value: '564',
        label: { es: 'commits entre backend y frontend', pt: 'commits entre backend e frontend' },
        source: {
          es: 'Historial de los dos repositorios principales.',
          pt: 'Histórico dos dois repositórios principais.',
        },
      },
    ],
    screenshots: [],
    featured: false,
    visibility: 'privado',
  },
  {
    id: 'meetings',
    slug: 'ardumaker-meetings',
    title: 'ArduMaker Meetings',
    category: 'propio',
    shortDescription: {
      es: 'Extensión de Chrome que graba reuniones, las sube por partes y deja la transcripción como contexto del proyecto.',
      pt: 'Extensão do Chrome que grava reuniões, envia-as por partes e deixa a transcrição como contexto do projeto.',
    },
    fullDescription: {
      es: 'Graba la pantalla con sonido, el micrófono y, si se quiere, la cámara. Todo se escribe primero en el navegador y después se sube a ArduMaker, donde el backend reconstruye la grabación y la transcribe.',
      pt: 'Grava o ecrã com som, o microfone e, se se quiser, a câmara. Tudo é escrito primeiro no navegador e depois enviado para a ArduMaker, onde o backend reconstrói a gravação e a transcreve.',
    },
    problem: {
      es: 'Lo que se acuerda en una reunión con un cliente se pierde o queda en notas sueltas, lejos del proyecto.',
      pt: 'O que se combina numa reunião com um cliente perde-se ou fica em notas soltas, longe do projeto.',
    },
    solution: {
      es: 'Una extensión Manifest V3 con cuatro contextos (popup, service worker, documento offscreen y aviso en la pestaña), cola en IndexedDB y subida por partes con reintentos. La prioridad declarada es no perder el audio.',
      pt: 'Uma extensão Manifest V3 com quatro contextos (popup, service worker, documento offscreen e aviso no separador), fila em IndexedDB e envio por partes com novas tentativas. A prioridade declarada é não perder o áudio.',
    },
    role: {
      es: 'Arquitectura y desarrollo, con parte del código asistido por IA bajo mi revisión.',
      pt: 'Arquitetura e desenvolvimento, com parte do código assistido por IA sob a minha revisão.',
    },
    highlights: [
      {
        es: 'El service worker no guarda estado en variables porque Chrome lo suspende: todo vive en IndexedDB.',
        pt: 'O service worker não guarda estado em variáveis porque o Chrome suspende-o: tudo vive em IndexedDB.',
      },
      {
        es: 'Pruebas de contrato contra el backend y verificación en integración continua.',
        pt: 'Testes de contrato contra o backend e verificação em integração contínua.',
      },
    ],
    languages: ['TypeScript'],
    technologies: [
      'Chrome Manifest V3',
      'Vite',
      'IndexedDB',
      'OAuth + PKCE',
      'Vitest',
      'GitHub Actions',
    ],
    cardTags: ['TypeScript', 'Chrome MV3', 'IndexedDB', 'Vitest'],
    filters: ['typescript', 'ia'],
    startDate: '2026-10',
    status: 'activo',
    screenshots: [],
    logo: 'logos/ardumaker.png',
    featured: false,
    visibility: 'privado',
  },
  {
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
    technologies: [
      'FastAPI',
      'LXD',
      'Linux',
      'systemd',
      'Nginx',
      'UFW',
      'WebSocket',
      'PyInstaller',
    ],
    cardTags: ['FastAPI', 'LXD', 'Linux', 'Bash'],
    filters: ['python', 'cloud'],
    startDate: '2025-10',
    status: 'activo',
    screenshots: [],
    logo: 'logos/ardumaker.png',
    featured: false,
    visibility: 'privado',
  },
  {
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
    logo: 'logos/ardumaker.png',
    featured: false,
    visibility: 'privado',
  },
  {
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
    technologies: [
      'Django',
      'DRF',
      'PostgreSQL',
      'Docker',
      'Binance API',
      'KuCoin API',
      'Telegram',
    ],
    cardTags: ['Django', 'PostgreSQL', 'Docker'],
    filters: ['python', 'django', 'cloud'],
    startDate: '2025-04',
    endDate: '2025-05',
    screenshots: [],
    featured: false,
    visibility: 'privado',
  },
];
