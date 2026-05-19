import { Button } from '@/components/ui/primitives/Button'
import { cn } from '@/lib/cn'

type FavoriteButtonProps = {
  /** Si el personaje está marcado como favorito. */
  isFavorite: boolean
  /** Callback al pulsar; no propaga el evento al contenedor padre. */
  onToggle: () => void
  className?: string
  /** Tamaño del botón circular (`sm` en lista, `md` en tarjetas). */
  size?: 'sm' | 'md'
}

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth={filled ? 0 : 2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-5"
      aria-hidden
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  )
}

/**
 * Botón circular de favoritos con icono de corazón.
 * Usa la variante `icon` del primitivo {@link Button}.
 */
export function FavoriteButton({
  isFavorite,
  onToggle,
  className,
  size = 'md',
}: FavoriteButtonProps) {
  return (
    <Button
      type="button"
      variant="icon"
      size={size === 'sm' ? 'icon-sm' : 'icon-md'}
      className={cn(
        isFavorite && 'text-rose-500 hover:text-rose-600',
        className
      )}
      aria-label={isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
      aria-pressed={isFavorite}
      onClick={(event) => {
        event.preventDefault()
        event.stopPropagation()
        onToggle()
      }}
    >
      <HeartIcon filled={isFavorite} />
    </Button>
  )
}
