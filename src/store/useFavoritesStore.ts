import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { FAVORITES_STORAGE_KEY, MAX_FAVORITES } from '@/constants/favorites'

type FavoritesListState = {
  ids: number[]
  hasHydrated: boolean
}

type FavoritesActions = {
  toggle: (id: number) => void
  isFavorite: (id: number) => boolean
  /** Mantiene solo los IDs que la API confirmó. */
  syncIds: (validIds: number[]) => void
  moveUp: (id: number) => void
  moveDown: (id: number) => void
  setHydrated: (value: boolean) => void
}

type FavoritesState = {
  list: FavoritesListState
  actions: FavoritesActions
}

function swapAt(ids: number[], index: number, targetIndex: number): number[] {
  const next = [...ids]
  ;[next[index], next[targetIndex]] = [next[targetIndex], next[index]]
  return next
}

function sanitizeIds(ids: number[]): number[] {
  return ids
    .filter((id) => Number.isInteger(id) && id > 0)
    .slice(0, MAX_FAVORITES)
}

/**
 * Store Zustand de favoritos con orden persistente en `localStorage`.
 *
 * - Máximo {@link MAX_FAVORITES}; al añadir en el límite, se elimina el último del orden.
 * - `actions.syncIds` alinea el store con la respuesta de la API.
 * - Al rehidratar se sanitizan los IDs persistidos.
 */
export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      list: {
        ids: [],
        hasHydrated: false,
      },

      actions: {
        setHydrated: (value) =>
          set((state) => ({
            list: { ...state.list, hasHydrated: value },
          })),

        toggle: (id) =>
          set((state) => {
            const { ids } = state.list

            if (ids.includes(id)) {
              return {
                list: {
                  ...state.list,
                  ids: ids.filter((favoriteId) => favoriteId !== id),
                },
              }
            }

            if (ids.length < MAX_FAVORITES) {
              return { list: { ...state.list, ids: [...ids, id] } }
            }

            return {
              list: {
                ...state.list,
                ids: [...ids.slice(0, -1), id],
              },
            }
          }),

        isFavorite: (id) => get().list.ids.includes(id),

        syncIds: (validIds) =>
          set((state) => {
            const next = state.list.ids.filter((id) => validIds.includes(id))
            if (
              next.length === state.list.ids.length &&
              next.every((id, index) => id === state.list.ids[index])
            ) {
              return state
            }
            return { list: { ...state.list, ids: next } }
          }),

        moveUp: (id) =>
          set((state) => {
            const index = state.list.ids.indexOf(id)
            if (index <= 0) return state
            return {
              list: {
                ...state.list,
                ids: swapAt(state.list.ids, index, index - 1),
              },
            }
          }),

        moveDown: (id) =>
          set((state) => {
            const index = state.list.ids.indexOf(id)
            if (index < 0 || index >= state.list.ids.length - 1) return state
            return {
              list: {
                ...state.list,
                ids: swapAt(state.list.ids, index, index + 1),
              },
            }
          }),
      },
    }),
    {
      name: FAVORITES_STORAGE_KEY,
      partialize: (state) => ({ favoriteIds: state.list.ids }),
      merge: (persisted, current) => {
        const saved = persisted as { favoriteIds?: number[] } | undefined

        return {
          ...current,
          list: {
            ...current.list,
            ids: saved?.favoriteIds ?? current.list.ids,
            hasHydrated: true,
          },
        }
      },
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.list.ids = sanitizeIds(state.list.ids)
          state.actions.setHydrated(true)
        }
      },
    }
  )
)
