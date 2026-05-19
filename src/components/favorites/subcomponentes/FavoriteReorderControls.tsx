'use client'

import { Button } from '@/components/ui/primitives/Button'
import { useFavoritesStore } from '@/store/useFavoritesStore'

type FavoriteReorderControlsProps = {
  characterId: number
  characterName: string
  index: number
  total: number
}

function ChevronUpIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4"
      aria-hidden
    >
      <path d="m18 15-6-6-6 6" />
    </svg>
  )
}

function ChevronDownIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4"
      aria-hidden
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

/**
 * Controles para subir o bajar un favorito en el orden persistido.
 */
export function FavoriteReorderControls({
  characterId,
  characterName,
  index,
  total,
}: FavoriteReorderControlsProps) {
  const moveFavoriteUp = useFavoritesStore((state) => state.moveFavoriteUp)
  const moveFavoriteDown = useFavoritesStore((state) => state.moveFavoriteDown)

  return (
    <div
      role="group"
      aria-label={`Reordenar ${characterName}`}
      className="flex items-center justify-center gap-1"
    >
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        disabled={index === 0}
        aria-label={`Subir ${characterName} en la lista`}
        onClick={() => moveFavoriteUp(characterId)}
      >
        <ChevronUpIcon />
      </Button>
      <span className="min-w-5 text-center text-xs font-medium text-zinc-500">
        {index + 1}
      </span>
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        disabled={index >= total - 1}
        aria-label={`Bajar ${characterName} en la lista`}
        onClick={() => moveFavoriteDown(characterId)}
      >
        <ChevronDownIcon />
      </Button>
    </div>
  )
}
