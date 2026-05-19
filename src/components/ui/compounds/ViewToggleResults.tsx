'use client'

import { CardItem, ListItem } from '@/components/ui/compounds'
import { cn } from '@/lib/cn'

import type { Character, CharacterViewMode } from '@/types/rick-and-morty'

type ViewToggleResultsProps = {
  /** Personajes a renderizar en la página actual. */
  characters: Character[]
  /** Modo que determina si se usa {@link CardItem} o {@link ListItem}. */
  viewMode: CharacterViewMode
}

const gridClasses =
  'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 list-none gap-4'

/**
 * Grid o lista de personajes según el modo de visualización activo.
 *
 * @param props.characters - Colección de la página actual.
 * @param props.viewMode - `grid` para tarjetas, `list` para filas.
 */
export function ViewToggleResults({
  characters,
  viewMode,
}: ViewToggleResultsProps) {
  if (viewMode === 'list') {
    return (
      <ul className={gridClasses}>
        {characters.map((character, index) => (
          <ListItem key={character.id} character={character} index={index} />
        ))}
      </ul>
    )
  }

  return (
    <ul className={cn(gridClasses, 'xl:grid-cols-4')}>
      {characters.map((character, index) => (
        <CardItem key={character.id} character={character} index={index} />
      ))}
    </ul>
  )
}
