'use client'

import Image from 'next/image'
import Link from 'next/link'

import { motion } from 'framer-motion'

import { Badge, Card, FavoriteButton } from '@/components/ui/primitives'
import { MOTION_ANIMATION } from '@/constants/animations'
import { cn } from '@/lib/cn'
import { useFavoritesStore } from '@/store/useFavoritesStore'
import {
  getStatusBadgeSolidClassName,
  getStatusBadgeVariant,
} from '@/utils/character-status'

import type { Character } from '@/types/rick-and-morty'

type ListItemProps = {
  character: Character
  /** Índice en la lista para escalonar la animación de entrada. */
  index?: number
  /** Elemento raíz animado (`li` en listados, `div` en filas compuestas de favoritos). */
  as?: 'li' | 'div'
}

/**
 * Fila de personaje para vista lista (imagen, nombre, género, especie y estado).
 *
 * @param props.character - Datos del personaje desde GraphQL.
 * @param props.index - Retraso incremental en la animación Framer Motion.
 * @param props.as - Etiqueta del contenedor animado; por defecto `li`.
 */
export function ListItem({
  character,
  index = 0,
  as: Tag = 'li',
}: ListItemProps) {
  const id = Number(character.id)
  const isFavorite = useFavoritesStore((state) => state.actions.isFavorite(id))
  const toggle = useFavoritesStore((state) => state.actions.toggle)
  const MotionTag = motion[Tag]

  return (
    <MotionTag
      className={cn(Tag === 'li' ? 'list-none' : 'min-w-0')}
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.25,
        delay: index * 0.03,
        ease: MOTION_ANIMATION.easing.standard,
      }}
    >
      <Card className="flex items-center gap-4 p-3">
        <div className="relative size-28 shrink-0 overflow-hidden rounded-lg bg-zinc-100">
          <Link
            href={`/character/${character.id}`}
            className="group block size-full focus-visible:outline-none"
          >
            <Image
              src={character.image}
              alt={character.name}
              width={100}
              height={100}
              className={`size-full object-cover transition-transform duration-300 group-hover:scale-105`}
              sizes="100px"
            />
          </Link>
          <FavoriteButton
            isFavorite={isFavorite}
            onToggle={() => toggle(id)}
            size="sm"
            className="absolute top-1 right-1 z-10"
          />
        </div>
        <div className="group flex-1 space-y-2">
          <h3 className="line-clamp-2 font-semibold text-zinc-900 group-hover:text-emerald-700">
            {character.name}
          </h3>
          <dl className="space-y-1 text-sm">
            <div className="flex items-center gap-1.5">
              <dt className="text-zinc-500">Género:</dt>
              <dd className="text-zinc-800">{character.gender}</dd>
            </div>
            <div className="flex items-center gap-1.5">
              <dt className="text-zinc-500">Especie:</dt>
              <dd className="text-zinc-800">{character.species}</dd>
            </div>
            <div className="flex items-center gap-1.5">
              <dt className="text-zinc-500">Estado:</dt>
              <dd>
                <Badge
                  variant={getStatusBadgeVariant(character.status)}
                  className={getStatusBadgeSolidClassName(character.status)}
                >
                  {character.status}
                </Badge>
              </dd>
            </div>
          </dl>
        </div>
      </Card>
    </MotionTag>
  )
}
