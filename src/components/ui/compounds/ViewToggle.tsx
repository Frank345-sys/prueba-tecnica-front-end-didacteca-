import { Button } from '@/components/ui/primitives'
import { cn } from '@/lib/cn'

import type { CharacterViewMode } from '@/types/rick-and-morty'

type ViewToggleProps = {
  /** Modo de visualización activo. */
  view: CharacterViewMode
  onViewChange: (view: CharacterViewMode) => void
  className?: string
}

/**
 * Alterna entre vista de tarjetas (`grid`) y vista de lista (`list`).
 *
 * @param props.view - Modo seleccionado actualmente.
 * @param props.onViewChange - Callback al cambiar de modo.
 */
export function ViewToggle({ view, onViewChange, className }: ViewToggleProps) {
  return (
    <div
      role="group"
      aria-label="Modo de visualización"
      className={cn(
        'inline-flex justify-center gap-1 overflow-hidden rounded-lg border border-zinc-200 p-1',
        className
      )}
    >
      {(['grid', 'list'] as CharacterViewMode[]).map((mode) => (
        <Button
          key={mode}
          type="button"
          variant={view === mode ? 'primary' : 'ghost'}
          aria-pressed={view === mode}
          onClick={() => onViewChange(mode)}
        >
          {mode === 'grid' ? 'Tarjetas' : 'Lista'}
        </Button>
      ))}
    </div>
  )
}
