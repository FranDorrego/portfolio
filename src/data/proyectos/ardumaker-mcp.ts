/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: ardumaker-mcp.ts    Project: portfolio                             */
/*   Created: 2026/11/26 01:37:20  by vm                                      */
/*   Updated: 2026/11/26 01:37:20  by vm                                      */
/* ************************************************************************** */

/** ArduMaker MCP. */

import type { Proyecto } from '@/types/proyecto';

export const ARDUMAKER_MCP: Proyecto = {
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
  screenshots: [
    {
      src: 'proyectos/ardumaker-mcp/mcp.webp',
      alt: { es: 'Página de ArduMaker MCP', pt: 'Página da ArduMaker MCP' },
    },
  ],
  diagram: [
    { icon: 'ia', label: 'Agente de IA' },
    { icon: 'usuario', label: { es: 'Aprobación', pt: 'Aprovação' } },
    { icon: 'api', label: 'Servidor MCP' },
    { icon: 'nube', label: 'VPS · DNS · DB' },
  ],
  logo: 'logos/ardumaker.png',
  featured: false,
  visibility: 'privado',
};
