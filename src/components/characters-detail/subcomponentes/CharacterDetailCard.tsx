import Image from 'next/image'

import { motion } from 'framer-motion'

import {
  Badge,
  Card,
  CardContent,
  FavoriteButton,
} from '@/components/ui/primitives'
import { MOTION_ANIMATION } from '@/constants/animations'
import { MAX_FAVORITES } from '@/constants/favorites'
import { cn } from '@/lib/cn'
import {
  getStatusBadgeSolidClassName,
  getStatusBadgeVariant,
} from '@/utils/character-status'

import type { CharacterDetail } from '@/types/rick-and-morty'

type CharacterDetailCardProps = {
  character: CharacterDetail
  episodeCount: number
  isFavorite: boolean
  onToggleFavorite: () => void
  showFavoritesLimitWarning: boolean
}

/** Tarjeta principal del detalle con imagen, metadatos y favoritos. */
export function CharacterDetailCard({
  character,
  episodeCount,
  isFavorite,
  onToggleFavorite,
  showFavoritesLimitWarning,
}: CharacterDetailCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: MOTION_ANIMATION.easing.standard }}
      className="mx-auto w-full max-w-4xl"
    >
      <Card className="overflow-hidden border-sky-400">
        <div className="flex flex-col md:flex-row">
          <div className="relative aspect-square w-full shrink-0 bg-zinc-100 md:max-w-sm">
            <Image
              src={character.image}
              alt={character.name}
              width={400}
              height={400}
              className="size-full object-cover"
              sizes="(max-width: 768px) 100vw, 400px"
              priority
            />
            <Badge
              variant={getStatusBadgeVariant(character.status)}
              className={cn(
                getStatusBadgeSolidClassName(character.status),
                'absolute top-5 left-4'
              )}
            >
              {character.status}
            </Badge>
            <FavoriteButton
              isFavorite={isFavorite}
              onToggle={onToggleFavorite}
              size="md"
              className="absolute top-2.5 right-4"
            />
          </div>

          <CardContent className="flex flex-1 flex-col gap-6 p-6 md:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
                  {character.name}
                </h1>
                <dl className="mt-3 space-y-1 text-sm">
                  <div className="flex gap-1.5">
                    <dt className="text-zinc-500">Especie:</dt>
                    <dd className="text-zinc-800">{character.species}</dd>
                  </div>
                  <div className="flex gap-1.5">
                    <dt className="text-zinc-500">Género:</dt>
                    <dd className="text-zinc-800">{character.gender}</dd>
                  </div>
                </dl>
              </div>
            </div>

            <div className="grid gap-5 border-t border-zinc-100 pt-6 sm:grid-cols-3">
              <div>
                <p className="text-sm font-medium text-zinc-500">Origen</p>
                <p className="mt-1 text-base text-zinc-900">
                  {character.origin.name}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-zinc-500">Ubicación</p>
                <p className="mt-1 text-base text-zinc-900">
                  {character.location.name}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-zinc-500">Episodios</p>
                <p className="mt-1 text-base text-zinc-900">{episodeCount}</p>
              </div>
            </div>

            {showFavoritesLimitWarning ? (
              <p className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900">
                Ya tienes {MAX_FAVORITES} favoritos. Si añades este personaje,
                se eliminará el último de tu lista.
              </p>
            ) : null}
          </CardContent>
        </div>
      </Card>
    </motion.article>
  )
}
