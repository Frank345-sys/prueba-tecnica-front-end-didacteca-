'use client'

import Link from 'next/link'

import { AnimatePresence, motion } from 'framer-motion'

import { ViewToggle } from '@/components/ui/compounds'
import { CardItem } from '@/components/ui/compounds/CardItem'
import { ListItem } from '@/components/ui/compounds/ListItem'
import { EmptyState, ErrorMessage, Spinner } from '@/components/ui/primitives'
import { OVERLAY_FADE } from '@/constants/animations'
import { MAX_FAVORITES } from '@/constants/favorites'
import { cn } from '@/lib/cn'
import {
  ASYNC_CONTENT_KEYS,
  getAsyncContentKey,
} from '@/utils/async-content-key'

import { useFavoriteCharacters } from './hooks/useFavoriteCharacters'
import { FavoriteReorderControls } from './subcomponentes/FavoriteReorderControls'

const gridClasses =
  'grid grid-cols-1 list-none gap-4 md:grid-cols-2 lg:grid-cols-3'

/**
 * Listado de favoritos con reordenamiento, persistencia y vistas tarjeta/lista.
 * Orquesta estados de carga, error y vacío con {@link getAsyncContentKey}.
 */
export function FavoritesList() {
  const {
    favoriteIds,
    characters,
    loading,
    error,
    data,
    isEmpty,
    viewMode,
    setViewMode,
  } = useFavoriteCharacters()

  const contentKey = getAsyncContentKey({
    loading,
    error,
    hasData: isEmpty || data !== undefined,
    isEmpty,
    dataKey: favoriteIds.join('-'),
  })

  const countLabel = `${favoriteIds.length}/${MAX_FAVORITES} favoritos`

  function renderContent() {
    if (contentKey === ASYNC_CONTENT_KEYS.loading) {
      return <Spinner className="py-16" />
    }

    if (contentKey === ASYNC_CONTENT_KEYS.error && error) {
      return (
        <ErrorMessage message={`Error al cargar favoritos: ${error.message}`} />
      )
    }

    if (contentKey === ASYNC_CONTENT_KEYS.empty) {
      return (
        <EmptyState
          title="Aún no tienes favoritos"
          description={`Marca hasta ${MAX_FAVORITES} personajes desde el listado principal. El orden se guardará aquí.`}
          action={
            <Link
              href="/"
              className="text-sm font-medium text-emerald-700 underline-offset-2 hover:underline"
            >
              Ir al listado de personajes
            </Link>
          }
        />
      )
    }

    if (viewMode === 'list') {
      return (
        <ul className={gridClasses}>
          {characters.map((character, index) => (
            <li key={character.id} className="flex list-none flex-col gap-2">
              <FavoriteReorderControls
                characterId={Number(character.id)}
                characterName={character.name}
                index={index}
                total={characters.length}
              />
              <ListItem character={character} index={index} embedded />
            </li>
          ))}
        </ul>
      )
    }

    return (
      <ul className={cn(gridClasses, 'xl:grid-cols-4')}>
        {characters.map((character, index) => (
          <li key={character.id} className="flex list-none flex-col gap-2">
            <FavoriteReorderControls
              characterId={Number(character.id)}
              characterName={character.name}
              index={index}
              total={characters.length}
            />
            <CardItem character={character} index={index} embedded />
          </li>
        ))}
      </ul>
    )
  }

  return (
    <div className="flex w-full max-w-6xl flex-col gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-center text-sm text-zinc-600">{countLabel}</p>
        {contentKey !== ASYNC_CONTENT_KEYS.empty ? (
          <ViewToggle view={viewMode} onViewChange={setViewMode} />
        ) : null}
      </div>

      {contentKey !== ASYNC_CONTENT_KEYS.empty &&
      favoriteIds.length >= MAX_FAVORITES ? (
        <p className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900">
          Has alcanzado el máximo de {MAX_FAVORITES} favoritos. Si añades otro
          desde el listado, se eliminará el último de esta lista.
        </p>
      ) : null}

      <AnimatePresence mode="wait">
        <motion.div key={contentKey} {...OVERLAY_FADE}>
          {renderContent()}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
