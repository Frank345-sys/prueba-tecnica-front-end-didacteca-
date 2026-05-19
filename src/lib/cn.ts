import { twMerge } from 'tailwind-merge'

type ClassValue = string | undefined | null | false

/**
 * Combina clases condicionales y resuelve conflictos de Tailwind con `tailwind-merge`.
 *
 * @param inputs - Clases en formato string o valores falsy que se omiten.
 * @returns Clases fusionadas listas para `className`.
 *
 * @example
 * ```tsx
 * cn('px-4', isActive && 'bg-green-500')
 * ```
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(inputs.filter(Boolean).join(''))
}
