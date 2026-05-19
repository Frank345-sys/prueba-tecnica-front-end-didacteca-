'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/cn'

const navItems = [
  { href: '/', label: 'Personajes' },
  { href: '/favorites', label: 'Favoritos' },
] as const

/**
 * Enlaces de navegación principal con estado activo según la ruta.
 */
export function SiteNav() {
  const pathname = usePathname()

  return (
    <nav aria-label="Principal" className="flex shrink-0 gap-2">
      {navItems.map(({ href, label }) => {
        const isActive =
          href === '/' ? pathname === '/' : pathname.startsWith(href)

        return (
          <Link
            key={href}
            href={href}
            className={cn(
              'rounded-md px-3 py-1.5 text-sm font-medium ring-1 transition-colors',
              isActive
                ? 'bg-emerald-50 text-emerald-700 ring-emerald-200/80'
                : 'text-zinc-600 ring-transparent hover:bg-zinc-100 hover:text-zinc-900'
            )}
            aria-current={isActive ? 'page' : undefined}
          >
            {label}
          </Link>
        )
      })}
    </nav>
  )
}
