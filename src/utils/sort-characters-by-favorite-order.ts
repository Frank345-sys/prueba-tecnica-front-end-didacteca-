import type { Character } from '@/types/rick-and-morty'

/**
 * Ordena personajes según el array de IDs favoritos (primer ID = primero en lista).
 *
 * @param characters - Resultados de la API (orden arbitrario).
 * @param favoriteIds - Orden persistido en el store.
 */
export function sortCharactersByFavoriteOrder(
  characters: Character[],
  favoriteIds: number[]
): Character[] {
  const byId = new Map(
    characters.map((character) => [Number(character.id), character])
  )

  return favoriteIds
    .map((id) => byId.get(id))
    .filter((character): character is Character => character !== undefined)
}
