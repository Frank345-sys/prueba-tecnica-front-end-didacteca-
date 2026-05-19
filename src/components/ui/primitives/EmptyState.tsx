import { cn } from '@/lib/cn'

import type { ReactNode } from 'react'

type EmptyStateProps = {
  /** Título principal del estado vacío. */
  title: string
  description?: string
  /** Contenido opcional (p. ej. botón para limpiar filtros). */
  action?: ReactNode
  className?: string
}

/**
 * Mensaje cuando no hay resultados que mostrar.
 *
 * @param props.title - Encabezado del bloque vacío.
 * @param props.description - Texto de ayuda opcional.
 * @param props.action - Slot para acciones secundarias.
 */
export function EmptyState({
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        `flex flex-col items-center justify-center rounded-xl border border-dashed border-zinc-300 bg-zinc-50 px-6 py-12 text-center`,
        className
      )}
    >
      <p className="text-base font-medium text-zinc-900">{title}</p>
      {description ? (
        <p className="mt-2 max-w-md text-sm text-zinc-600">{description}</p>
      ) : null}
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  )
}
