/** Claves base para estados de contenido asíncrono (p. ej. AnimatePresence). */
export const ASYNC_CONTENT_KEYS = {
  loading: 'loading',
  error: 'error',
  noData: 'no-data',
  empty: 'empty',
  data: 'data',
} as const

/**
 * Claves dinámicas `data-*` para reanimar contenido con datos.
 * Incluye `data-{page}` (paginación) y `data-{dataKey}` (p. ej. orden de favoritos o ID).
 */
type AsyncContentKeyData = `data-${string}`

/** Clave usada como `key` de React / Framer Motion según el estado de la petición. */
export type AsyncContentKey =
  | (typeof ASYNC_CONTENT_KEYS)[keyof typeof ASYNC_CONTENT_KEYS]
  | AsyncContentKeyData

type GetAsyncContentKeyBase = {
  loading: boolean
  error?: Error | null
  /** Si la petición devolvió un payload utilizable (p. ej. `data !== undefined`). */
  hasData: boolean
  /** Lista o recurso vacío tras una respuesta exitosa. */
  isEmpty?: boolean
}

/** Opciones para {@link getAsyncContentKey}. `page` y `dataKey` son mutuamente excluyentes. */
export type GetAsyncContentKeyOptions = GetAsyncContentKeyBase &
  (
    | { page: number; dataKey?: never }
    | { dataKey: string; page?: never }
    | { page?: never; dataKey?: never }
  )

/**
 * Deriva una clave estable para transiciones entre estados de carga de datos.
 * Útil con Framer Motion (`key` + `AnimatePresence`) en listados, favoritos, detalle, etc.
 *
 * @param options - Flags de carga, error, datos y vacío. Usa `page` o `dataKey`, no ambos.
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
