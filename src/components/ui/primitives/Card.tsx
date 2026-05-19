import { cn } from '@/lib/cn'

import type { HTMLAttributes } from 'react'

type CardProps = HTMLAttributes<HTMLDivElement>

/**
 * Contenedor con borde y fondo para agrupar contenido.
 */
export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(`rounded-xl border border-zinc-200 bg-white`, className)}
      {...props}
    />
  )
}

type CardSectionProps = HTMLAttributes<HTMLDivElement>

/** Cabecera del card con padding superior. */
export function CardHeader({ className, ...props }: CardSectionProps) {
  return <div className={cn('px-4 pt-4', className)} {...props} />
}

/** Cuerpo principal del card. */
export function CardContent({ className, ...props }: CardSectionProps) {
  return <div className={cn('p-4', className)} {...props} />
}

/** Pie del card con borde superior. */
export function CardFooter({ className, ...props }: CardSectionProps) {
  return (
    <div
      className={cn('border-t border-zinc-100 px-4 py-3', className)}
      {...props}
    />
  )
}
