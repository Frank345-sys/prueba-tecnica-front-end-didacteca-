import { cn } from '@/lib/cn'

type ErrorMessageProps = {
  /** Texto del error mostrado al usuario. */
  message: string
  className?: string
}

/**
 * Aviso de error con `role="alert"` para lectores de pantalla.
 *
 * @param props.message - Contenido del mensaje de error.
 */
export function ErrorMessage({ message, className }: ErrorMessageProps) {
  return (
    <p
      role="alert"
      className={cn(
        `rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800`,
        className
      )}
    >
      {message}
    </p>
  )
}
