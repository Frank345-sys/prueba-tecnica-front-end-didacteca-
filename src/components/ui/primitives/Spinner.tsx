import { cn } from '@/lib/cn'

type SpinnerProps = {
  className?: string
  /** Texto anunciado a lectores de pantalla (`role="status"`). */
  label?: string
}

/**
 * Indicador de carga accesible con spinner animado.
 *
 * @param props.label - Mensaje visible y para `aria-live`; por defecto «Cargando…».
 */
export function Spinner({ className, label = 'Cargando…' }: SpinnerProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-3',
        className
      )}
      role="status"
      aria-live="polite"
    >
      <span
        className={`size-8 animate-spin rounded-full border-2 border-zinc-200 border-t-emerald-600`}
        aria-hidden
      />
      <span className="text-sm text-zinc-600">{label}</span>
    </div>
  )
}
