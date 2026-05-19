import { cn } from '@/lib/cn'

import { Button } from './Button'

type PaginationProps = {
  /** Página actual (base 1). */
  page: number
  totalPages: number
  onPageChange: (page: number) => void
  className?: string
}

/**
 * Controles anterior / siguiente para listados paginados.
 * No renderiza nada si `totalPages <= 1`.
 *
 * @param props.page - Índice de página activa.
 * @param props.totalPages - Total de páginas disponibles.
 * @param props.onPageChange - Callback con la nueva página.
 */
export function Pagination({
  page,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null
  }

  return (
    <nav
      className={cn('flex items-center justify-center gap-3', className)}
      aria-label="Paginación"
    >
      <Button
        variant="secondary"
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        aria-label="Página anterior"
      >
        Anterior
      </Button>
      <span className="text-sm text-zinc-600">
        Página {page} de {totalPages}
      </span>
      <Button
        variant="secondary"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        aria-label="Página siguiente"
      >
        Siguiente
      </Button>
    </nav>
  )
}
