type GraphQLResponse<T> = {
  data?: T
  errors?: unknown[]
}

/**
 * Petición GraphQL en el servidor (RSC, `generateMetadata`, ISR).
 * No sustituye a Apollo Client en el navegador.
 *
 * @param query - Cadena de la operación.
 * @param variables - Variables opcionales.
 * @param revalidate - Segundos para ISR; si se omite, sin caché de datos.
 */
export async function fetchGraphQL<TData>(
  query: string,
  variables?: Record<string, unknown>,
  revalidate?: number
): Promise<TData | null> {
  const url = process.env.NEXT_PUBLIC_GRAPHQL_URL
  if (!url) {
    return null
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables }),
      next: revalidate !== undefined ? { revalidate } : undefined,
    })

    if (!response.ok) {
      return null
    }

    const payload = (await response.json()) as GraphQLResponse<TData>

    if (payload.errors?.length) {
      return null
    }

    return payload.data ?? null
  } catch {
    return null
  }
}
