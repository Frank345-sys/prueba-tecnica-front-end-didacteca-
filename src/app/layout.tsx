import { Geist, Geist_Mono } from 'next/font/google'

import { ScrollToTopButton, SiteFooter, SiteHeader } from '@/components/layout'
import { Providers } from '@/components/providers/Providers'
import { cn } from '@/lib/cn'

import type { Metadata } from 'next'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default: 'Rick and Morty | Didacteca',
    template: '%s | Rick and Morty',
  },
  description: 'Listado de personajes — prueba técnica front-end',
}

/**
 * Layout raíz: fuentes, proveedores, cabecera, contenido, pie y botón «subir».
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="es"
      className={cn(geistSans.variable, geistMono.variable, 'h-full')}
      suppressHydrationWarning
    >
      <body
        className={cn(
          'flex min-h-dvh flex-col bg-zinc-50 font-sans text-zinc-900 antialiased'
        )}
        suppressHydrationWarning
      >
        <Providers>
          <SiteHeader />
          <div className="flex flex-1 flex-col">{children}</div>
          <SiteFooter />
          <ScrollToTopButton />
        </Providers>
      </body>
    </html>
  )
}
