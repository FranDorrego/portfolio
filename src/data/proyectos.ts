/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: proyectos.ts    Project: portfolio                                 */
/*   Created: 2026/11/25 22:27:55  by claude                                  */
/*   Updated: 2026/11/26 01:37:20  by vm                                      */
/* ************************************************************************** */

/**
 * El catalogo: la fuente unica de los proyectos, un archivo por proyecto en `proyectos/`. El
 * orden de esta lista es el de la pagina, salvo que los que tienen capturas van primero.
 */

import type { Proyecto } from '@/types/proyecto';
import { ACADEMIA_ARDUINO } from './proyectos/academia-arduino';
import { AGENTE_MINIVPS } from './proyectos/agente-minivps';
import { ARBIPLUS } from './proyectos/arbiplus';
import { ARDUMAIL } from './proyectos/ardumail';
import { ARDUMAKER_DEVELOPER } from './proyectos/ardumaker-developer';
import { ARDUMAKER_MCP } from './proyectos/ardumaker-mcp';
import { ASISTENTE_ECOMMERCE } from './proyectos/asistente-ecommerce';
import { AURALYX } from './proyectos/auralyx';
import { BBLOOM } from './proyectos/bbloom';
import { BELTRAN_CONTADORES } from './proyectos/beltran-contadores';
import { BOT_MUNICIPAL } from './proyectos/bot-municipal';
import { BOTMINERO } from './proyectos/botminero';
import { BRIGHT_VENTURES } from './proyectos/bright-ventures';
import { CHATBOTS_DEMO } from './proyectos/chatbots-demo';
import { COMANDERA } from './proyectos/comandera';
import { COMPUTACION_OK } from './proyectos/computacion-ok';
import { CONTABILIDAD_INTERNA } from './proyectos/contabilidad-interna';
import { CRYPTOEXCEL } from './proyectos/cryptoexcel';
import { DEMOS_INTERACTIVAS } from './proyectos/demos-interactivas';
import { DINAMARCA_TOURS } from './proyectos/dinamarca-tours';
import { DISTRIVALTO } from './proyectos/distrivalto';
import { ESTANDARES_CLI } from './proyectos/estandares-cli';
import { HEMINGUAU } from './proyectos/heminguau';
import { ITBANK } from './proyectos/itbank';
import { JAVA_ACADEMICO } from './proyectos/java-academico';
import { MAILCONNECTOR } from './proyectos/mailconnector';
import { MEETING_ROOM_42 } from './proyectos/meeting-room-42';
import { MEETINGS } from './proyectos/meetings';
import { MIGRACION_HOSTING } from './proyectos/migracion-hosting';
import { MIKE } from './proyectos/mike';
import { MYL_EVENT_MAGIC } from './proyectos/myl-event-magic';
import { OLI_VARA } from './proyectos/oli-vara';
import { PLATAFORMA_INGLES } from './proyectos/plataforma-ingles';
import { PROSPECCION } from './proyectos/prospeccion';
import { SHA256 } from './proyectos/sha256';
import { SISTEMAS_42 } from './proyectos/sistemas-42';
import { SITIO_ARDUMAKER } from './proyectos/sitio-ardumaker';
import { SONAE_DEMO } from './proyectos/sonae-demo';
import { TRADING_BOTS } from './proyectos/trading-bots';
import { VIDEO_PROCESSING_API } from './proyectos/video-processing-api';
import { VIVENADANDO } from './proyectos/vivenadando';
import { VOTO_ESCONDIDO } from './proyectos/voto-escondido';
import { WHATSAPP_CENTRAL } from './proyectos/whatsapp-central';
import { WORKANA_CRM } from './proyectos/workana-crm';
import { WYE } from './proyectos/wye';

const CATALOGO: Proyecto[] = [
  ARDUMAKER_DEVELOPER,
  VIVENADANDO,
  DISTRIVALTO,
  SISTEMAS_42,
  BELTRAN_CONTADORES,
  AURALYX,
  BOTMINERO,
  ASISTENTE_ECOMMERCE,
  PLATAFORMA_INGLES,
  DINAMARCA_TOURS,
  ARDUMAKER_MCP,
  CRYPTOEXCEL,
  MEETINGS,
  AGENTE_MINIVPS,
  ESTANDARES_CLI,
  MAILCONNECTOR,
  COMPUTACION_OK,
  MIKE,
  BRIGHT_VENTURES,
  HEMINGUAU,
  MYL_EVENT_MAGIC,
  COMANDERA,
  SITIO_ARDUMAKER,
  WORKANA_CRM,
  WHATSAPP_CENTRAL,
  ARDUMAIL,
  PROSPECCION,
  VOTO_ESCONDIDO,
  BBLOOM,
  BOT_MUNICIPAL,
  WYE,
  OLI_VARA,
  MIGRACION_HOSTING,
  TRADING_BOTS,
  ARBIPLUS,
  CHATBOTS_DEMO,
  CONTABILIDAD_INTERNA,
  DEMOS_INTERACTIVAS,
  VIDEO_PROCESSING_API,
  ITBANK,
  ACADEMIA_ARDUINO,
  MEETING_ROOM_42,
  SHA256,
  SONAE_DEMO,
  JAVA_ACADEMICO,
];

/** Los proyectos con capturas van primero; entre ellos, y entre los demas, se respeta el orden. */
export const PROYECTOS: readonly Proyecto[] = [
  ...CATALOGO.filter((proyecto) => proyecto.screenshots.length > 0),
  ...CATALOGO.filter((proyecto) => proyecto.screenshots.length === 0),
];
