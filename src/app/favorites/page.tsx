import { FavoritesList } from '@/components/favorites/FavoritesList'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Favoritos',
  description: 'Tus personajes favoritos de Rick and Morty (máximo 5)',
}

/** Página de favoritos con orden persistente y reordenamiento. */
export default function FavoritesPage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-8 sm:px-6 sm:py-10">
      <section className="mb-8 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900">
          Favoritos
        </h1>
        <p className="mt-2 text-zinc-600">
          Hasta 5 personajes. Usa las flechas para cambiar el orden; se guarda
          automáticamente.
        </p>
      </section>
      <FavoritesList />
    </main>
  )
}
