import Link from 'next/link'

import { cn } from '@/lib/cn'

type EmptyStateProps = {
  /** Título principal del estado vacío. */
  title: string
  description?: string
  /** Texto del enlace de acción (p. ej. volver al listado). */
  actionLabel?: string
  /** Destino del enlace; por defecto `/`. */
  actionHref?: string
  className?: string
}

/**
 * Mensaje cuando no hay resultados que mostrar.
 *
 * @param props.title - Encabezado del bloque vacío.
 * @param props.description - Texto de ayuda opcional.
 * @param props.actionLabel - Etiqueta del enlace de acción opcional.
 * @param props.actionHref - Ruta del enlace; por defecto el listado principal.
 */
export function EmptyState({
  title,
  description,
  actionLabel,
  actionHref = '/',
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center rounded-xl border border-dashed border-zinc-300 bg-zinc-50 px-6 py-12 text-center',
        className
      )}
    >
      <p className="text-base font-medium text-zinc-900">{title}</p>
      {description ? (
        <p className="mt-2 max-w-md text-sm text-zinc-600">{description}</p>
      ) : null}
      {actionLabel ? (
        <Link
          href={actionHref}
          className="mt-4 text-sm font-medium text-emerald-700 underline-offset-2 hover:underline"
        >
          {actionLabel}
        </Link>
      ) : null}
    </div>
  )
}
