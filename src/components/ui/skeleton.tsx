/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: skeleton.tsx    Project: portfolio                                 */
/*   Created: 2026/11/25 22:18:47  by claude                                  */
/*   Updated: 2026/11/25 22:18:47  by claude                                  */
/* ************************************************************************** */

/** El hueco de algo que esta cargando y cuya forma ya se conoce. */

import { cn } from '@/lib/class-names';

export function Skeleton({ className }: { className?: string }): JSX.Element {
  return <div className={cn('animate-pulse rounded-md bg-secondary', className)} />;
}
