'use client'

import { useMemo, useState } from 'react'

import { useQuery } from '@apollo/client/react'

import { GET_CHARACTERS_BY_IDS } from '@/graphql/queries/characters-by-ids'
import { useFavoritesStore } from '@/store/useFavoritesStore'
import { sortCharactersByFavoriteOrder } from '@/utils/sort-characters-by-favorite-order'

import type { Character, CharacterViewMode } from '@/types/rick-and-morty'

type CharactersByIdsQueryResult = {
  charactersByIds: (Character | null)[] | null
}

type CharactersByIdsQueryVariables = {
  ids: string[]
}

/**
 * Carga los personajes favoritos respetando el orden del store.
 *
 * @returns Personajes ordenados, estado de carga/error y metadatos del store.
 */
export function useFavoriteCharacters() {
  const [viewMode, setViewMode] = useState<CharacterViewMode>('grid')
  const hasHydrated = useFavoritesStore((state) => state._hasHydrated)
  const favoriteIds = useFavoritesStore((state) => state.favoriteIds)

  const ids = useMemo(() => favoriteIds.map((id) => String(id)), [favoriteIds])
  const hasFavorites = ids.length > 0

  const { data, loading, error } = useQuery<
    CharactersByIdsQueryResult,
    CharactersByIdsQueryVariables
  >(GET_CHARACTERS_BY_IDS, {
    variables: { ids },
    skip: !hasHydrated || !hasFavorites,
  })

  const characters = useMemo(() => {
    const results =
      data?.charactersByIds?.filter(
        (character): character is Character => character !== null
      ) ?? []
    return sortCharactersByFavoriteOrder(results, favoriteIds)
  }, [data, favoriteIds])

  const isEmpty = hasHydrated && !hasFavorites
  const isLoading = !hasHydrated || (hasFavorites && loading)

  return {
    hasHydrated,
    favoriteIds,
    characters,
    data,
    loading: isLoading,
    error,
    isEmpty,
    viewMode,
    setViewMode,
  }
}
