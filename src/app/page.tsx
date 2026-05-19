import { CharacterList } from '@/components/characters/CharacterList'

/** Página principal: listado de personajes con búsqueda, gráfico y favoritos. */
export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-8 sm:px-6 sm:py-10">
      <section className="mb-8 text-center">
        <h1 className="sr-only">Listado de personajes</h1>
        <p className="text-zinc-600">
          Busca, filtra y guarda tus personajes favoritos de la serie.
        </p>
      </section>
      <CharacterList />
    </main>
  )
}
