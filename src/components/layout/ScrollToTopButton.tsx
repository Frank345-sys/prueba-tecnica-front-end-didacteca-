'use client'

import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/primitives/Button'
import { cn } from '@/lib/cn'

const SCROLL_THRESHOLD = 400

function ArrowUpIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M12 19V5" />
      <path d="m5 12 7-7 7 7" />
    </svg>
  )
}

/**
 * Botón flotante que aparece al hacer scroll y vuelve al inicio con animación suave.
 * Usa la variante `accent` del primitivo {@link Button}.
 */
export function ScrollToTopButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > SCROLL_THRESHOLD)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <Button
      type="button"
      variant="accent"
      size="icon-lg"
      onClick={scrollToTop}
      aria-label="Volver al inicio"
      title="Volver al inicio"
      className={cn(
        'fixed right-4 bottom-4 z-50 transition-all duration-300 sm:right-6 sm:bottom-6',
        visible
          ? 'pointer-events-auto translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-2 opacity-0'
      )}
    >
      <ArrowUpIcon className="size-5" />
    </Button>
  )
}
