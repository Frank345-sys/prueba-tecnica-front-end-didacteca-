/** Claves base para estados de contenido asíncrono (p. ej. AnimatePresence). */
export const ASYNC_CONTENT_KEYS = {
  loading: 'loading',
  error: 'error',
  noData: 'no-data',
  empty: 'empty',
  data: 'data',
} as const

/** Clave usada como `key` de React / Framer Motion según el estado de la petición. */
export type AsyncContentKey =
  | (typeof ASYNC_CONTENT_KEYS)[keyof typeof ASYNC_CONTENT_KEYS]
  | `data-${number}`
  | `data-${string}`

export type GetAsyncContentKeyOptions = {
  loading: boolean
  error?: Error | null
  /** Si la petición devolvió un payload utilizable (p. ej. `data !== undefined`). */
  hasData: boolean
  /** Lista o recurso vacío tras una respuesta exitosa. */
  isEmpty?: boolean
  /** Si se indica, la clave de éxito será `data-{page}` para reanimar al paginar. */
  page?: number
  /** Clave arbitraria para `data-{dataKey}` (p. ej. orden de favoritos). */
  dataKey?: string
}

/**
 * Deriva una clave estable para transiciones entre estados de carga de datos.
 * Útil con Framer Motion (`key` + `AnimatePresence`) en listados, favoritos, detalle, etc.
 *
 * @param options - Flags de carga, error, datos y vacío.
 * @returns Clave para `AnimatePresence` o `key` de contenedor.
 */
export function getAsyncContentKey({
  loading,
  error,
  hasData,
  isEmpty = false,
  page,
  dataKey,
}: GetAsyncContentKeyOptions): AsyncContentKey {
  if (loading) return ASYNC_CONTENT_KEYS.loading
  if (error) return ASYNC_CONTENT_KEYS.error
  if (!hasData) return ASYNC_CONTENT_KEYS.noData
  if (isEmpty) return ASYNC_CONTENT_KEYS.empty
  if (dataKey !== undefined) return `data-${dataKey}`
  if (page !== undefined) return `data-${page}`

  return ASYNC_CONTENT_KEYS.data
}
