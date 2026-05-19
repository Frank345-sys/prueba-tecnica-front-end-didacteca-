import type { TypePolicies } from '@apollo/client/cache'

/**
 * Clave de caché para `charactersByIds` independiente del orden del array.
 * El orden visual se aplica en cliente (`sortCharactersByFavoriteOrder`).
 */
function charactersByIdsKeyArgs(args: Record<string, unknown> | null): string {
  const ids = args?.ids
  if (!Array.isArray(ids) || ids.length === 0) return 'empty'
  return [...ids].map(String).sort().join(',')
}

/** Políticas de caché del cliente Apollo. */
export const apolloTypePolicies: TypePolicies = {
  Query: {
    fields: {
      characters: {
        // page + filter ya forman parte de keyArgs por defecto.
        keyArgs: ['page', 'filter'],
      },
      character: {
        keyArgs: ['id'],
      },
      charactersByIds: {
        keyArgs: charactersByIdsKeyArgs,
      },
    },
  },
}
