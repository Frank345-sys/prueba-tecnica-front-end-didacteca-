/**
 * Catálogo de animaciones Motion / Framer Motion del proyecto.
 *
 * @remarks Coordinar duración y easing entre vistas que usan `AnimatePresence`.
 */

import type { Variants } from 'framer-motion'

/**
 * Curvas de easing y springs reutilizables para Motion.
 */
export const MOTION_ANIMATION = {
  easing: {
    /** Salidas suaves para transiciones de entrada/salida de cards y paneles. */
    expressive: [0.25, 0.46, 0.45, 0.94] as const,
    /** Curva estándar para transiciones de estado en UI. */
    standard: [0.4, 0, 0.2, 1] as const,
    /** Curva con desaceleración marcada para movimientos más largos. */
    smoothOut: [0.23, 1, 0.32, 1] as const,
  },
} as const

const overlayFadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3, ease: MOTION_ANIMATION.easing.standard },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3, ease: MOTION_ANIMATION.easing.standard },
  },
}

type PresenceFadePreset = {
  readonly variants: Variants
  readonly initial: 'hidden'
  readonly animate: 'visible'
  readonly exit: 'exit'
}

/**
 * Overlay / velo con `AnimatePresence` (easing standard).
 * Uso: `<motion.div {...OVERLAY_FADE} />`.
 */
export const OVERLAY_FADE = {
  variants: overlayFadeVariants,
  initial: 'hidden',
  animate: 'visible',
  exit: 'exit',
} as const satisfies PresenceFadePreset
