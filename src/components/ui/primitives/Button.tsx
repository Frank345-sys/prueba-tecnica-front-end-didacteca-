import { cn } from '@/lib/cn'

import type { ButtonHTMLAttributes } from 'react'

/** Variante visual del botón. */
export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'icon'
  | 'accent'

/**
 * Tamaño del botón.
 * Los valores `icon-*` aplican forma circular y dimensiones fijas.
 */
export type ButtonSize = 'default' | 'icon-sm' | 'icon-md' | 'icon-lg'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  size?: ButtonSize
}

const variantClasses: Record<ButtonVariant, string> = {
  // Índigo profundo — acción principal clara y accesible
  primary: 'bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800',

  // Gris neutro con borde sutil — segunda acción sin competir con primary
  secondary:
    'bg-zinc-100 text-zinc-900 ring-1 ring-inset ring-zinc-300 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-100 dark:ring-zinc-700 dark:hover:bg-zinc-700',

  // Completamente transparente — acción terciaria o de navegación
  ghost:
    'bg-transparent text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-100',

  // Circular sobre tarjetas — favoritos e iconos sobre contenido
  icon: 'bg-white text-zinc-500 shadow-lg ring-1 ring-zinc-200 hover:bg-white hover:text-rose-500',

  // Acción flotante / destacada con acento de marca
  accent:
    'bg-emerald-600 text-white shadow-lg shadow-emerald-900/20 hover:bg-emerald-700 active:bg-emerald-800',
}

const sizeClasses: Record<ButtonSize, string> = {
  default: 'rounded-lg px-3 py-2 text-sm font-medium',
  'icon-sm': 'size-7 shrink-0 rounded-full p-1.5',
  'icon-md': 'size-9 shrink-0 rounded-full p-1.5',
  'icon-lg': 'size-11 shrink-0 rounded-full p-0',
}

/**
 * Botón reutilizable con variantes y tamaños predefinidos.
 *
 * @param props.variant - Estilo de fondo y texto (`primary`, `secondary`, `ghost`, `icon`, `accent`).
 * @param props.size - Dimensiones; por defecto `default` (texto con padding).
 */
export function Button({
  className,
  variant = 'secondary',
  size = 'default',
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex cursor-pointer items-center justify-center transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      {...props}
    />
  )
}
