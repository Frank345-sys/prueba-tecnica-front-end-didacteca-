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
 * @returns Búsqueda, página, modo de vista, datos de Apollo y etiqueta de total.
 */
export function useCharacterList() {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [viewMode, setViewMode] = useState<CharacterViewMode>('grid')
  const deferredSearch = useDeferredValue(search.trim())

  function handleSearchChange(value: string) {
    setSearch(value)
    setPage(1)
  }

  const filter = deferredSearch ? { name: deferredSearch } : undefined

  const { data, loading, error } = useQuery<
    CharactersQueryResult,
    CharactersQueryVariables
  >(GET_CHARACTERS, {
    variables: { page, filter },
  })

  const characters: Character[] = data?.characters.results ?? []
  const totalCount = data?.characters.info.count ?? 0
  const totalPages = data?.characters.info.pages ?? 0

  const canShowTotalCount = !loading && !error && data !== undefined
  const totalCountLabel = canShowTotalCount
    ? formatCharacterCountLabel(totalCount)
    : '\u00A0'

  return {
    search,
    setSearch: handleSearchChange,
    page,
    setPage,
    loading,
    error,
    data,
    characters,
    totalCount,
    totalPages,
    totalCountLabel,
    viewMode,
    setViewMode,
  }
}
