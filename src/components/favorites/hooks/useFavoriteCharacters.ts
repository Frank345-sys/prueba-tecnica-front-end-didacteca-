'use client'

import { useEffect, useMemo, useState } from 'react'

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
 * @returns Estado agrupado por UI, lista persistida y datos de la query.
 */
export function useFavoriteCharacters() {
  // —— UI ——
  const [viewMode, setViewMode] = useState<CharacterViewMode>('grid')

  // —— Store ——
  const { ids: favoriteIds, hasHydrated } = useFavoritesStore(
    (state) => state.list
  )
  const syncIds = useFavoritesStore((state) => state.actions.syncIds)

  const queryIds = useMemo(
    () => favoriteIds.map((id) => String(id)),
    [favoriteIds]
  )
  const hasFavorites = queryIds.length > 0

  // —— Petición ——
  const { data, loading, error } = useQuery<
    CharactersByIdsQueryResult,
    CharactersByIdsQueryVariables
  >(GET_CHARACTERS_BY_IDS, {
    variables: { ids: queryIds },
    skip: !hasHydrated || !hasFavorites,
  })

  useEffect(() => {
    if (!hasHydrated || loading || !hasFavorites || !data?.charactersByIds) {
      return
    }

    const returnedIds = new Set(
      data.charactersByIds
        .filter((character): character is Character => character !== null)
        .map((character) => Number(character.id))
    )
    const validIds = favoriteIds.filter((id) => returnedIds.has(id))

    if (validIds.length !== favoriteIds.length) {
      syncIds(validIds)
    }
  }, [
    data?.charactersByIds,
    favoriteIds,
    hasFavorites,
    hasHydrated,
    loading,
    syncIds,
  ])

  const characters = useMemo(() => {
    const results =
      data?.charactersByIds?.filter(
        (character): character is Character => character !== null
      ) ?? []
    return sortCharactersByFavoriteOrder(results, favoriteIds)
  }, [data, favoriteIds])

  const isEmpty = hasHydrated && !hasFavorites
  const isLoading = !hasHydrated || (hasFavorites && loading)
  const hasData = isEmpty || data !== undefined

  return {
    ui: {
      viewMode,
      setViewMode,
    },
    list: {
      ids: favoriteIds,
      hasHydrated,
    },
    query: {
      characters,
      loading: isLoading,
      error,
      hasData,
      isEmpty,
    },
  }
}
