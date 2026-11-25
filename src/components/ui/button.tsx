/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: button.tsx    Project: portfolio                                   */
/*   Created: 2026/11/25 22:18:47  by claude                                  */
/*   Updated: 2026/11/25 22:18:47  by claude                                  */
/* ************************************************************************** */

/** El boton: tres variantes y la misma respuesta al apretarlo en toda la pagina. */

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/class-names';

const variantes = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm ' +
    'font-medium transition-[color,background-color,border-color,transform] duration-200 ' +
    'ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] focus-visible:outline-none ' +
    'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ' +
    'focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 ' +
    '[&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-action text-background hover:bg-primary',
        outline: 'border border-input text-foreground hover:bg-secondary',
        ghost: 'text-muted-foreground hover:bg-secondary hover:text-foreground',
      },
      size: {
        default: 'h-10 px-4',
        sm: 'h-9 px-3',
        lg: 'h-11 px-6',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  },
);

interface Props
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof variantes> {
  /** Dibuja el hijo (un enlace) con el aspecto del boton. */
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, Props>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Pieza = asChild ? Slot : 'button';
    return <Pieza ref={ref} className={cn(variantes({ variant, size }), className)} {...props} />;
  },
);
Button.displayName = 'Button';
