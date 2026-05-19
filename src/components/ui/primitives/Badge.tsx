import { cn } from '@/lib/cn'

import type { HTMLAttributes } from 'react'

/** Variante de color del badge según contexto o estado del personaje. */
export type BadgeVariant = 'default' | 'alive' | 'dead' | 'unknown'

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant
}

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-zinc-100 text-zinc-700',
  alive: 'bg-emerald-100 text-emerald-800',
  dead: 'bg-red-100 text-red-800',
  unknown: 'bg-zinc-200 text-zinc-700',
}

/**
 * Etiqueta compacta para estados o metadatos.
 *
 * @param props.variant - Paleta semántica (`alive`, `dead`, `unknown`, etc.).
 */
export function Badge({
  className,
  variant = 'default',
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium',
        variantClasses[variant],
        className
      )}
      {...props}
    />
  )
}
