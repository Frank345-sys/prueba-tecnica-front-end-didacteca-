import { cn } from '@/lib/cn'

import type { InputHTMLAttributes } from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement>

/**
 * Campo de texto con estilos consistentes del diseño.
 * Extiende los atributos nativos de `<input>`.
 */
export function Input({ className, type = 'text', ...props }: InputProps) {
  return (
    <input
      type={type}
      className={cn(
        `w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 transition-colors placeholder:text-zinc-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none`,
        className
      )}
      {...props}
    />
  )
}
