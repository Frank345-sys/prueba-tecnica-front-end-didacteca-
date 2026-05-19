import Link from 'next/link'

import { cn } from '@/lib/cn'

type SiteFooterProps = {
  className?: string
}

/**
 * Pie de página con atribución a la API y copyright del proyecto.
 */
export function SiteFooter({ className }: SiteFooterProps) {
  const year = new Date().getFullYear()

  return (
    <footer
      className={cn('mt-auto border-t border-zinc-200 bg-white', className)}
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 py-8 text-center text-sm text-zinc-500 sm:px-6">
        <p>
          Datos desde la{' '}
          <Link
            href="https://rickandmortyapi.com/graphql"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-emerald-700 underline-offset-2 hover:underline"
          >
            Rick and Morty GraphQL API
          </Link>
        </p>
        <p className="text-xs text-zinc-400">
          © {year} Didacteca · Prueba técnica front-end
        </p>
      </div>
    </footer>
  )
}
