/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: seccion-de-contacto.tsx    Project: portfolio                      */
/*   Created: 2026/11/25 22:17:56  by claude                                  */
/*   Updated: 2026/11/25 22:21:17  by claude                                  */
/* ************************************************************************** */

/** Contacto: tres accesos directos (correo, LinkedIn, GitHub) y la ubicacion. Todos reales. */

import { Github, Linkedin, Mail, MapPin, MessageCircle } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Seccion } from '@/components/layout/seccion';
import { PERFIL } from '@/data/perfil';
import { useIdioma } from '@/i18n';
import { cn } from '@/lib/class-names';
import { TARJETA_PULSABLE } from '@/lib/movimiento';

const sinProtocolo = (direccion: string): string =>
  direccion.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');

export function SeccionDeContacto(): JSX.Element {
  const { t } = useIdioma();
  const accesos: { Icono: LucideIcon; nombre: string; valor: string; href: string }[] = [
    { Icono: Mail, nombre: t.contacto.email, valor: PERFIL.email, href: `mailto:${PERFIL.email}` },
    {
      Icono: Linkedin,
      nombre: 'LinkedIn',
      valor: sinProtocolo(PERFIL.linkedin),
      href: PERFIL.linkedin,
    },
    { Icono: Github, nombre: 'GitHub', valor: sinProtocolo(PERFIL.github), href: PERFIL.github },
  ];
  return (
    <Seccion id="contacto" titulo={t.contacto.titulo} Icono={MessageCircle}>
      <ul className="grid gap-4 md:grid-cols-3">
        {accesos.map(({ Icono, nombre, valor, href }) => (
          <li key={nombre}>
            <a
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              className={cn(
                'flex items-center gap-4 rounded-xl border border-border bg-card p-5',
                TARJETA_PULSABLE,
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
              )}
            >
              <Icono aria-hidden className="h-6 w-6 shrink-0 text-primary" />
              <span className="min-w-0">
                <span className="block font-semibold text-foreground">{nombre}</span>
                <span className="block truncate text-sm text-muted-foreground">{valor}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-6 flex items-center gap-2 text-muted-foreground">
        <MapPin aria-hidden className="h-4 w-4" />
        {t.barra.ubicacion}
      </p>
    </Seccion>
  );
}
