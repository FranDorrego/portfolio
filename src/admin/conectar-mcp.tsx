/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: conectar-mcp.tsx    Project: portfolio                             */
/*   Created: 2026/11/27 15:26:31  by vm                                      */
/*   Updated: 2026/11/27 15:26:32  by vm                                      */
/* ************************************************************************** */

/**
 * Como conectar un agente por MCP: la direccion, las dos formas de pasar el token y que puede
 * hacer. El token no se muestra: vive solo en el servidor (AGENT_TOKEN).
 */

import { Plug } from 'lucide-react';
import { API } from './api';
import { EnlaceCopiable } from './enlace-copiable';
import { Rotulo } from './marco';

const PUEDE = [
  'Leer y guardar «Sobre mí»',
  'Registrar, listar y actualizar candidaturas (quedan con la etiqueta MCP)',
  'Adaptar un CV a una vacante y rehacerlo con una indicación',
  'Subir un CV en PDF y borrar CV',
  'Pedir enlaces de descarga del CV y la carta, sin login, para subirlos a otras plataformas',
];

export function ConectarMcp(): JSX.Element {
  const direccion = `${API}/mcp/`;
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5 sm:p-6">
      <Rotulo>Conectar un agente por MCP</Rotulo>
      <p className="flex items-start gap-2 text-sm text-muted-foreground">
        <Plug aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
        Cualquier agente que acepte MCP (Claude, ChatGPT, Cursor, n8n…) puede hacer lo mismo que
        este panel. Se conecta por HTTP a esta dirección:
      </p>
      <EnlaceCopiable url={direccion} />
      <ul className="space-y-1.5 text-sm">
        <li>
          <span className="font-medium">Con cabecera:</span>{' '}
          <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs">
            Authorization: Bearer &lt;AGENT_TOKEN&gt;
          </code>
        </li>
        <li>
          <span className="font-medium">Sin cabeceras (conectores web):</span>{' '}
          <code className="break-all rounded bg-secondary px-1.5 py-0.5 font-mono text-xs">
            {direccion}&lt;AGENT_TOKEN&gt;/
          </code>
        </li>
      </ul>
      <div>
        <p className="text-sm font-medium">Puede:</p>
        <ul className="mt-1 list-disc space-y-0.5 pl-5 text-sm text-muted-foreground">
          {PUEDE.map((cosa) => (
            <li key={cosa}>{cosa}</li>
          ))}
        </ul>
      </div>
      <p className="text-xs text-muted-foreground">
        El token es el de agente (AGENT_TOKEN, en las variables de la app de la API en ArduMaker).
        Si se cambia, los agentes conectados y los enlaces de descarga dejan de funcionar.
      </p>
    </div>
  );
}
