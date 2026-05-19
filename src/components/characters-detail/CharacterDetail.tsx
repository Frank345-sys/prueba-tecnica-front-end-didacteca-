'use client'

import Link from 'next/link'

import { AnimatePresence, motion } from 'framer-motion'

import { EmptyState, ErrorMessage, Spinner } from '@/components/ui/primitives'
import { OVERLAY_FADE } from '@/constants/animations'
import { MAX_FAVORITES } from '@/constants/favorites'
import { useFavoritesStore } from '@/store/useFavoritesStore'
import {
  ASYNC_CONTENT_KEYS,
  getAsyncContentKey,
} from '@/utils/async-content-key'

import { useCharacterDetail } from './hooks/useCharacterDetail'
import { CharacterDetailCard } from './subcomponentes'

type CharacterDetailProps = {
  characterId: string
}

/**
 * Vista de detalle: origen, ubicación, episodios y favoritos.
 */
export function CharacterDetail({ characterId }: CharacterDetailProps) {
  const {
    character,
    episodeCount,
    loading,
    error,
    hasData,
    isEmpty,
    isNotFound,
    isValidId,
  } = useCharacterDetail(characterId)

  const numericId = Number(characterId)
  const isFavorite = useFavoritesStore((state) => state.isFavorite(numericId))
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite)
  const favoriteIds = useFavoritesStore((state) => state.favoriteIds)

  const contentKey = getAsyncContentKey({
    loading,
    error,
    hasData,
    isEmpty,
    dataKey: characterId,
  })

  function renderContent() {
    if (contentKey === ASYNC_CONTENT_KEYS.loading) {
      return <Spinner className="py-16" />
    }

    if (contentKey === ASYNC_CONTENT_KEYS.error && error) {
      return (
        <ErrorMessage
          message={`Error al cargar el personaje: ${error.message}`}
        />
      )
    }

    if (contentKey === ASYNC_CONTENT_KEYS.empty) {
      return (
        <EmptyState
          title={
            isNotFound || !isValidId
              ? 'Personaje no encontrado'
              : 'Sin datos del personaje'
          }
          description="Comprueba el enlace o vuelve al listado para elegir otro personaje."
          action={
            <Link
              href="/"
              className="text-sm font-medium text-emerald-700 underline-offset-2 hover:underline"
            >
              Volver al listado
            </Link>
          }
        />
      )
    }

    if (!character) return null

    return (
      <CharacterDetailCard
        character={character}
        episodeCount={episodeCount}
        isFavorite={isFavorite}
        onToggleFavorite={() => toggleFavorite(numericId)}
        showFavoritesLimitWarning={
          !isFavorite && favoriteIds.length >= MAX_FAVORITES
        }
      />
    )
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div key={contentKey} {...OVERLAY_FADE}>
        {renderContent()}
      </motion.div>
    </AnimatePresence>
  )
}
