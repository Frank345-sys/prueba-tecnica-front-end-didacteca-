'use client'

import { AnimatePresence, motion } from 'framer-motion'

import { EmptyState, ErrorMessage, Spinner } from '@/components/ui/primitives'
import { OVERLAY_FADE } from '@/constants/animations'
import {
  ASYNC_CONTENT_KEYS,
  getAsyncContentKey,
} from '@/utils/async-content-key'
import { USER_FACING_FETCH_ERROR } from '@/utils/user-facing-error'

import { useCharacterDetail } from './hooks/useCharacterDetail'
import { CharacterDetailCard } from './subcomponentes'

type CharacterDetailProps = {
  characterId: string
}

/**
 * Vista de detalle: origen, ubicación, episodios y favoritos.
 */
export function CharacterDetail({ characterId }: CharacterDetailProps) {
  const { route, favorites, query } = useCharacterDetail(characterId)

  const contentKey = getAsyncContentKey({
    loading: query.loading,
    error: query.error,
    hasData: query.hasData,
    isEmpty: query.isEmpty,
    dataKey: characterId,
  })

  function renderContent() {
    if (contentKey === ASYNC_CONTENT_KEYS.loading) {
      return <Spinner className="py-16" />
    }

    if (contentKey === ASYNC_CONTENT_KEYS.error && query.error) {
      return <ErrorMessage message={USER_FACING_FETCH_ERROR} />
    }

    if (contentKey === ASYNC_CONTENT_KEYS.empty) {
      return (
        <EmptyState
          title={route.emptyTitle}
          description="Comprueba el enlace o vuelve al listado para elegir otro personaje."
          actionLabel="Volver al listado"
        />
      )
    }

    if (!query.character) return null

    return (
      <CharacterDetailCard
        character={query.character}
        episodeCount={query.episodeCount}
        isFavorite={favorites.isFavorite}
        onToggleFavorite={favorites.onToggle}
        showFavoritesLimitWarning={favorites.atLimit}
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
