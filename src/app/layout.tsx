import { Geist, Geist_Mono } from 'next/font/google'

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
  title: 'Prueba técnica | Didacteca',
  description: 'Prueba técnica front-end',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="es"
      className={cn(
        geistSans.variable,
        geistMono.variable,
        'h-full antialiased'
      )}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col" suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
