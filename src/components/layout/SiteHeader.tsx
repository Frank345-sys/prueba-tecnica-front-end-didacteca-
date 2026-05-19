import Link from 'next/link'

import { SiteNav } from '@/components/layout/SiteNav'
import { cn } from '@/lib/cn'

type SiteHeaderProps = {
  className?: string
}

/**
 * Cabecera global con marca y navegación principal.
 */
export function SiteHeader({ className }: SiteHeaderProps) {
  return (
    <header
      className={cn(
        'border-b border-zinc-200 bg-white/90 backdrop-blur-sm',
        className
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 p-4 sm:px-6">
        <Link href="/" className="group min-w-0">
          <p className="text-lg font-bold tracking-tight text-zinc-900 transition-colors group-hover:text-emerald-700 sm:text-xl">
            Rick and Morty
          </p>
          <p className="truncate text-xs text-zinc-500 sm:text-sm">
            Explora personajes · Didacteca
          </p>
        </Link>
        <SiteNav />
      </div>
    </header>
  )
}
