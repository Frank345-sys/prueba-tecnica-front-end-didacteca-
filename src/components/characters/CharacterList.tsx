'use client'

import { AnimatePresence, motion } from 'framer-motion'

import { ViewToggle, ViewToggleResults } from '@/components/ui/compounds'
import {
  EmptyState,
  ErrorMessage,
  Pagination,
  Spinner,
} from '@/components/ui/primitives'
import { OVERLAY_FADE } from '@/constants/animations'
import {
  ASYNC_CONTENT_KEYS,
  getAsyncContentKey,
} from '@/utils/async-content-key'

import { useCharacterList } from './hooks/useCharacterList'
import { CharacterFilters, CharacterSpeciesChart } from './subcomponentes'

/**
 * Contenedor del listado: filtros, gráfico por especie, resultados y paginación.
 * Orquesta estados de carga, error y vacío con {@link getAsyncContentKey}.
 */
export function CharacterList() {
  const {
    search,
    setSearch,
    page,
    setPage,
    loading,
    error,
    data,
    characters,
    totalPages,
    totalCountLabel,
    viewMode,
    setViewMode,
  } = useCharacterList()

  const contentKey = getAsyncContentKey({
    loading,
    error,
    hasData: data !== undefined,
    isEmpty: characters.length === 0,
    page,
  })

  function renderContent() {
    if (contentKey === ASYNC_CONTENT_KEYS.loading) {
      return <Spinner className="py-16" />
    }

    if (contentKey === ASYNC_CONTENT_KEYS.error && error) {
      return (
        <ErrorMessage
          message={`Error al cargar personajes: ${error.message}`}
        />
      )
    }

    if (contentKey === ASYNC_CONTENT_KEYS.noData) {
      return (
        <EmptyState
          title="Sin datos"
          description="No se recibió respuesta del servidor."
        />
      )
    }

    if (contentKey === ASYNC_CONTENT_KEYS.empty) {
      return (
        <EmptyState
          title="Sin resultados"
          description="Prueba con otro nombre o limpia el filtro de búsqueda."
        />
      )
    }

    return (
      <div className="flex flex-col gap-8">
        <CharacterSpeciesChart characters={characters} />
        <ViewToggleResults characters={characters} viewMode={viewMode} />
        <div className="flex flex-col items-center justify-center gap-2">
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
          <p className="min-h-5 text-sm text-zinc-600">{totalCountLabel}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex w-full max-w-6xl flex-col gap-8">
      <div className="flex flex-col gap-4">
        <div
          className={`flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between`}
        >
          <CharacterFilters search={search} onSearchChange={setSearch} />
          <ViewToggle view={viewMode} onViewChange={setViewMode} />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={contentKey} {...OVERLAY_FADE}>
          {renderContent()}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
