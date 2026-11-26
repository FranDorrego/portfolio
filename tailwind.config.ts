/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: tailwind.config.ts    Project: portfolio                           */
/*   Created: 2026/11/25 22:17:56  by claude                                  */
/*   Updated: 2026/11/26 13:36:13  by vm                                      */
/* ************************************************************************** */

/** Tailwind: los colores salen de las variables de src/index.css (claro y oscuro). */

import type { Config } from 'tailwindcss';

const color = (nombre: string): string => `hsl(var(--${nombre}) / <alpha-value>)`;

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: color('background'),
        foreground: color('foreground'),
        card: color('card'),
        popover: color('card'),
        'popover-foreground': color('foreground'),
        primary: color('primary'),
        'primary-foreground': color('background'),
        secondary: color('secondary'),
        muted: color('muted'),
        'muted-foreground': color('muted-foreground'),
        border: color('border'),
        input: color('input'),
        ring: color('primary'),
        action: color('action'),
        'action-foreground': color('action-foreground'),
        'action-hover': color('action-hover'),
        success: color('success'),
        warning: color('warning'),
      },
      boxShadow: {
        flotante: '0 12px 32px -8px rgb(0 0 0 / 0.25), 0 4px 12px -4px rgb(0 0 0 / 0.15)',
      },
    },
  },
} satisfies Config;
