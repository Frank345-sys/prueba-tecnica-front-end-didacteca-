'use client'

import { useDeferredValue, useState } from 'react'

import { useQuery } from '@apollo/client/react'

import { GET_CHARACTERS } from '@/graphql/queries/characters'
import { formatCharacterCountLabel } from '@/utils/character-count-label'

import type {
  Character,
  CharactersQueryResult,
  CharactersQueryVariables,
  CharacterViewMode,
} from '@/types/rick-and-morty'

/**
 * Estado y petición GraphQL del listado de personajes.
 *
 * @returns Estado agrupado por UI, filtros y datos de la query.
 */
export function useCharacterList() {
  // —— UI ——
  const [viewMode, setViewMode] = useState<CharacterViewMode>('grid')

  // —— Filtros y paginación ——
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const deferredSearch = useDeferredValue(search.trim())

  function setSearchAndResetPage(value: string) {
    setSearch(value)
    setPage(1)
  }

  const filter = deferredSearch ? { name: deferredSearch } : undefined

  // —— Petición ——
  const { data, loading, error } = useQuery<
    CharactersQueryResult,
    CharactersQueryVariables
  >(GET_CHARACTERS, {
    variables: { page, filter },
  })

  const characters: Character[] = data?.characters.results ?? []
  const totalCount = data?.characters.info.count ?? 0
  const totalPages = data?.characters.info.pages ?? 0
  const safePage = totalPages > 0 ? Math.min(page, totalPages) : page
  const hasData = data !== undefined
  const totalCountLabel =
    !loading && !error && hasData
      ? formatCharacterCountLabel(totalCount)
      : '\u00A0'

  return {
    ui: {
      viewMode,
      setViewMode,
    },
    filters: {
      search,
      setSearch: setSearchAndResetPage,
      page: safePage,
      setPage,
    },
    query: {
      characters,
      totalPages,
      totalCount,
      totalCountLabel,
      hasData,
      loading,
      error,
    },
  }
}
