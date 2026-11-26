/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: seccion-de-preguntas.tsx    Project: portfolio                     */
/*   Created: 2026/11/25 22:17:56  by claude                                  */
/*   Updated: 2026/11/26 02:16:25  by vm                                      */
/* ************************************************************************** */

/** Las preguntas frecuentes, en un acordeon. Cada una va escrita como una etiqueta: <...>. */

import { CircleHelp } from 'lucide-react';
import { Seccion } from '@/components/layout/seccion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useIdioma } from '@/i18n';

export function SeccionDePreguntas(): JSX.Element {
  const { t } = useIdioma();
  return (
    <Seccion id="faq" titulo={t.preguntas.titulo} Icono={CircleHelp}>
      <Accordion
        type="single"
        collapsible
        defaultValue="pregunta-0"
        className="border-t border-border"
      >
        {t.preguntas.lista.map((item, indice) => (
          <AccordionItem key={item.pregunta} value={`pregunta-${indice}`}>
            <AccordionTrigger className="text-base sm:text-lg">
              <span>
                <span aria-hidden className="font-mono text-primary">
                  {'<'}
                </span>
                {item.pregunta}
                <span aria-hidden className="font-mono text-primary">
                  {'>'}
                </span>
              </span>
            </AccordionTrigger>
            <AccordionContent className="max-w-3xl space-y-3 text-base leading-relaxed text-muted-foreground">
              {item.respuesta.split('\n\n').map((parrafo) => (
                <p key={parrafo}>{parrafo}</p>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Seccion>
  );
}
