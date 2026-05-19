import { CharacterDetail } from '@/components/characters-detail/CharacterDetail'
import { fetchGraphQL } from '@/lib/graphql-server'
import { isValidCharacterRouteId } from '@/utils/character-route-id'

import type { Metadata } from 'next'

const SITE_TITLE = 'Rick and Morty — Didacteca'

const DEFAULT_METADATA: Metadata = {
  title: 'Detalle del personaje',
  description:
    'Origen, ubicación, episodios y favoritos del personaje de Rick and Morty',
}

type CharacterPageProps = {
  params: Promise<{ id: string }>
}

/** IDs pregenerados en build para `/character/[id]` (ISR). */
const CHARACTER_STATIC_PARAMS_COUNT = 20

/** ISR: metadatos y shell de rutas conocidas; revalidación cada hora. */
export const revalidate = 3600

/** Permite IDs no incluidos en `generateStaticParams` (SSR bajo demanda). */
export const dynamicParams = true

/** Pre-genera los primeros IDs en build (ISR / SSG híbrido). */
export function generateStaticParams() {
  return Array.from({ length: CHARACTER_STATIC_PARAMS_COUNT }, (_, index) => ({
    id: String(index + 1),
  }))
}

async function fetchCharacterName(id: string): Promise<string | null> {
  if (!isValidCharacterRouteId(id)) {
    return null
  }

  const data = await fetchGraphQL<{ character: { name: string } | null }>(
    `query GetCharacterName($id: ID!) { character(id: $id) { name } }`,
    { id },
    revalidate
  )

  return data?.character?.name ?? null
}

/**
 * Metadatos dinámicos del detalle según el nombre del personaje en la API.
 *
 * @param props.params - Segmento dinámico `[id]` de la ruta.
 */
export async function generateMetadata({
  params,
}: CharacterPageProps): Promise<Metadata> {
  const { id } = await params

  if (!isValidCharacterRouteId(id)) {
    return {
      ...DEFAULT_METADATA,
      title: `Personaje no encontrado | ${SITE_TITLE}`,
    }
  }

  const name = await fetchCharacterName(id)

  if (!name) {
    return {
      ...DEFAULT_METADATA,
      title: `Personaje no encontrado | ${SITE_TITLE}`,
    }
  }

  return {
    title: `${name} | ${SITE_TITLE}`,
    description: `Detalle de ${name}: origen, ubicación, episodios y favoritos.`,
  }
}

/**
 * Shell en servidor (ISR) + datos interactivos en {@link CharacterDetail} (CSR / Apollo).
 */
export default async function CharacterPage({ params }: CharacterPageProps) {
  const { id } = await params

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-8 sm:px-6 sm:py-10">
      <CharacterDetail characterId={id} />
    </main>
  )
}
