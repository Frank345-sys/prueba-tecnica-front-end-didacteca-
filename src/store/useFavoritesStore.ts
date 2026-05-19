import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { FAVORITES_STORAGE_KEY, MAX_FAVORITES } from '@/constants/favorites'

type FavoritesState = {
  favoriteIds: number[]
  _hasHydrated: boolean
  setHasHydrated: (value: boolean) => void
  toggleFavorite: (id: number) => void
  isFavorite: (id: number) => boolean
  canAddFavorite: () => boolean
  moveFavoriteUp: (id: number) => void
  moveFavoriteDown: (id: number) => void
}

function swapAt(ids: number[], index: number, targetIndex: number): number[] {
  const next = [...ids]
  ;[next[index], next[targetIndex]] = [next[targetIndex], next[index]]
  return next
}

/**
 * Store Zustand de favoritos con orden persistente en `localStorage`.
 * Máximo {@link MAX_FAVORITES}; al añadir uno nuevo en el límite, se elimina el último del orden.
 */
export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favoriteIds: [],
      _hasHydrated: false,

      setHasHydrated: (value) => set({ _hasHydrated: value }),

      toggleFavorite: (id) =>
        set((state) => {
          if (state.favoriteIds.includes(id)) {
            return {
              favoriteIds: state.favoriteIds.filter(
                (favoriteId) => favoriteId !== id
              ),
            }
          }

          if (state.favoriteIds.length < MAX_FAVORITES) {
            return { favoriteIds: [...state.favoriteIds, id] }
          }

          return {
            favoriteIds: [...state.favoriteIds.slice(0, -1), id],
          }
        }),

      isFavorite: (id) => get().favoriteIds.includes(id),

      canAddFavorite: () => get().favoriteIds.length < MAX_FAVORITES,

      moveFavoriteUp: (id) =>
        set((state) => {
          const index = state.favoriteIds.indexOf(id)
          if (index <= 0) return state
          return { favoriteIds: swapAt(state.favoriteIds, index, index - 1) }
        }),

      moveFavoriteDown: (id) =>
        set((state) => {
          const index = state.favoriteIds.indexOf(id)
          if (index < 0 || index >= state.favoriteIds.length - 1) return state
          return { favoriteIds: swapAt(state.favoriteIds, index, index + 1) }
        }),
    }),
    {
      name: FAVORITES_STORAGE_KEY,
      partialize: (state) => ({ favoriteIds: state.favoriteIds }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true)
      },
    }
  )
)
