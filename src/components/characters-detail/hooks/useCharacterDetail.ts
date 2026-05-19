'use client'

import { useMemo } from 'react'

import { useQuery } from '@apollo/client/react'

import { GET_CHARACTER } from '@/graphql/queries/character'

import type { CharacterDetail } from '@/types/rick-and-morty'

type CharacterQueryResult = {
  character: CharacterDetail | null
}

type CharacterQueryVariables = {
  id: string
}

function isValidCharacterId(id: string): boolean {
  const numericId = Number(id)
  return Number.isInteger(numericId) && numericId > 0
}

/**
 * Carga el detalle de un personaje por ID de ruta.
 *
 * @param characterId - Segmento `[id]` de `/character/[id]`.
 */
export function useCharacterDetail(characterId: string) {
  const isValidId = isValidCharacterId(characterId)

  const { data, loading, error } = useQuery<
    CharacterQueryResult,
    CharacterQueryVariables
  >(GET_CHARACTER, {
    variables: { id: characterId },
    skip: !isValidId,
  })

  const character: CharacterDetail | null = data?.character ?? null
  const episodeCount = character?.episode.length ?? 0
  const isNotFound =
    isValidId && !loading && !error && data !== undefined && character === null

  const asyncState = useMemo(
    () => ({
      loading: isValidId && loading,
      error,
      hasData: !isValidId || data !== undefined,
      isEmpty: !isValidId || isNotFound,
    }),
    [data, error, isNotFound, isValidId, loading]
  )

  return {
    character,
    episodeCount,
    isValidId,
    isNotFound,
    ...asyncState,
  }
}
