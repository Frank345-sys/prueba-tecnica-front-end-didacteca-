import { CharacterDetail } from '@/components/characters-detail/CharacterDetail'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Detalle del personaje',
  description:
    'Origen, ubicación, episodios y favoritos del personaje de Rick and Morty',
}

type CharacterPageProps = {
  params: Promise<{ id: string }>
}

/** Página de detalle en `/character/[id]`. */
export default async function CharacterPage({ params }: CharacterPageProps) {
  const { id } = await params

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-8 sm:px-6 sm:py-10">
      <CharacterDetail characterId={id} />
    </main>
  )
}
