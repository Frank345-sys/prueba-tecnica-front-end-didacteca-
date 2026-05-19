'use client'

import { useQuery } from '@apollo/client/react'

import { MAX_FAVORITES } from '@/constants/favorites'
import { GET_CHARACTER } from '@/graphql/queries/character'
import { useFavoritesStore } from '@/store/useFavoritesStore'
import { isValidCharacterRouteId } from '@/utils/character-route-id'

import type { CharacterDetail } from '@/types/rick-and-morty'

type CharacterQueryResult = {
  character: CharacterDetail | null
}

type CharacterQueryVariables = {
  id: string
}

/**
 * Carga el detalle de un personaje por ID de ruta y expone favoritos.
 *
 * @param characterId - Segmento `[id]` de `/character/[id]`.
 * @returns Estado agrupado por ruta (`emptyTitle`), favoritos y datos de la query.
 */
export function useCharacterDetail(characterId: string) {
  const valid = isValidCharacterRouteId(characterId)
  const numericId = Number(characterId)

  // —— Favoritos ——
  const isFavorite = useFavoritesStore((state) =>
    state.actions.isFavorite(numericId)
  )
  const toggle = useFavoritesStore((state) => state.actions.toggle)
  const favoriteIds = useFavoritesStore((state) => state.list.ids)

  // —— Petición ——
  const { data, loading, error } = useQuery<
    CharacterQueryResult,
    CharacterQueryVariables
  >(GET_CHARACTER, {
    variables: { id: characterId },
    skip: !valid,
  })

  const character: CharacterDetail | null = data?.character ?? null
  const episodeCount = character?.episode.length ?? 0
  const notFound =
    valid && !loading && !error && data !== undefined && character === null

  const emptyTitle =
    !valid || notFound ? 'Personaje no encontrado' : 'Sin datos del personaje'

  return {
    route: {
      emptyTitle,
    },
    favorites: {
      isFavorite,
      onToggle: () => toggle(numericId),
      atLimit: !isFavorite && favoriteIds.length >= MAX_FAVORITES,
    },
    query: {
      character,
      episodeCount,
      loading: valid && loading,
      error,
      hasData: !valid || data !== undefined,
      isEmpty: !valid || notFound,
    },
  }
}
