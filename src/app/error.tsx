'use client'

import { useEffect } from 'react'

import { Button, ErrorMessage } from '@/components/ui/primitives'

type ErrorPageProps = {
  error: Error & { digest?: string }
  reset: () => void
}

/**
 * Límite de error de Next.js para recuperar fallos de render en rutas hijas.
 */
export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center gap-4 px-4 py-16">
      <ErrorMessage message="Algo salió mal al mostrar esta página." />
      <Button type="button" onClick={reset}>
        Reintentar
      </Button>
    </main>
  )
}
