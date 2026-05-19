import { create } from 'zustand'

type FavoritesState = {
  favoriteIds: number[]
  toggleFavorite: (id: number) => void
  isFavorite: (id: number) => boolean
}

/**
 * Store Zustand de favoritos en memoria (sesión actual).
 * La rama `feat/favorites` puede persistir `favoriteIds` en `localStorage`.
 */
export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  favoriteIds: [],

  toggleFavorite: (id) =>
    set((state) => ({
      favoriteIds: state.favoriteIds.includes(id)
        ? state.favoriteIds.filter((favoriteId) => favoriteId !== id)
        : [...state.favoriteIds, id],
    })),

  isFavorite: (id) => get().favoriteIds.includes(id),
}))
