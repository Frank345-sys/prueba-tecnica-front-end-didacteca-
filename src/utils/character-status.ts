import type { BadgeVariant } from '@/components/ui/primitives'
import type { CharacterStatus } from '@/types/rick-and-morty'

const statusVariantMap: Record<CharacterStatus, BadgeVariant> = {
  Alive: 'alive',
  Dead: 'dead',
  unknown: 'unknown',
}

/**
 * Variante visual del badge según el estado del personaje.
 *
 * @param status - Estado devuelto por la API (`Alive`, `Dead`, `unknown`).
 */
export function getStatusBadgeVariant(status: CharacterStatus): BadgeVariant {
  return statusVariantMap[status]
}

const statusSolidBadgeClasses: Record<BadgeVariant, string> = {
  default: 'rounded-md bg-zinc-500 text-white',
  alive: 'rounded-md bg-emerald-500 text-white',
  dead: 'rounded-md bg-red-500 text-white',
  unknown: 'rounded-md bg-zinc-500 text-white',
}

/**
 * Clases Tailwind para badge de estado con fondo sólido (tarjetas y lista).
 *
 * @param status - Estado del personaje.
 */
export function getStatusBadgeSolidClassName(status: CharacterStatus): string {
  return statusSolidBadgeClasses[getStatusBadgeVariant(status)]
}
