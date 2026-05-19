'use client'

import Image from 'next/image'
import Link from 'next/link'

import { motion } from 'framer-motion'

import {
  Badge,
  Card,
  CardContent,
  FavoriteButton,
} from '@/components/ui/primitives'
import { MOTION_ANIMATION } from '@/constants/animations'
import { cn } from '@/lib/cn'
import { useFavoritesStore } from '@/store/useFavoritesStore'
import {
  getStatusBadgeSolidClassName,
  getStatusBadgeVariant,
} from '@/utils/character-status'

import type { Character } from '@/types/rick-and-morty'

type CardItemProps = {
  character: Character
  /** Índice en la lista para escalonar la animación de entrada. */
  index?: number
}

/**
 * Tarjeta de personaje con imagen, estado, especie y favoritos.
 * Enlaza al detalle (`/character/[id]`) y persiste favoritos en Zustand.
 *
 * @param props.character - Datos del personaje desde GraphQL.
 * @param props.index - Retraso incremental en la animación Framer Motion.
 */
export function CardItem({ character, index = 0 }: CardItemProps) {
  const id = Number(character.id)
  const isFavorite = useFavoritesStore((state) => state.isFavorite(id))
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite)

  return (
    <motion.li
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        delay: index * 0.04,
        ease: MOTION_ANIMATION.easing.standard,
      }}
      className="list-none"
    >
      <Card className="flex h-full flex-col overflow-hidden border-sky-400">
        <div className="relative aspect-square overflow-hidden bg-zinc-100">
          <Link
            href={`/character/${character.id}`}
            className="group absolute inset-0 z-0 focus-visible:outline-none"
          >
            <Image
              src={character.image}
              alt={character.name}
              width={300}
              height={300}
              className={`size-full object-cover transition-transform duration-300 group-hover:scale-105`}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </Link>
          <FavoriteButton
            isFavorite={isFavorite}
            onToggle={() => toggleFavorite(id)}
            className="absolute top-2.5 right-2.5 z-20"
          />
          <Badge
            variant={getStatusBadgeVariant(character.status)}
            className={cn(
              getStatusBadgeSolidClassName(character.status),
              'pointer-events-none absolute top-5 left-2.5 z-20'
            )}
          >
            {character.status}
          </Badge>
        </div>
        <CardContent>
          <h3 className="mb-4 line-clamp-1 text-lg font-bold text-zinc-900 group-hover:text-emerald-700">
            {character.name}
          </h3>
          <div>
            <p className="text-sm font-medium text-zinc-500">Especie</p>
            <p className="text-base text-zinc-800">{character.species}</p>
          </div>
        </CardContent>
      </Card>
    </motion.li>
  )
}
