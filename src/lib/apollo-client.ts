import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'

import { apolloTypePolicies } from './apollo-cache'

/**
 * Crea el cliente Apollo para peticiones GraphQL.
 * Caché compartida entre rutas con políticas por campo en {@link apolloTypePolicies}.
 *
 * @throws Si falta la variable de entorno `NEXT_PUBLIC_GRAPHQL_URL`.
 */
export function createApolloClient() {
  const uri = process.env.NEXT_PUBLIC_GRAPHQL_URL

  if (!uri) {
    throw new Error(
      'Falta NEXT_PUBLIC_GRAPHQL_URL. Copia .env.example a .env.local'
    )
  }

  return new ApolloClient({
    link: new HttpLink({ uri }),
    cache: new InMemoryCache({
      typePolicies: apolloTypePolicies,
    }),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-first',
      },
      query: {
        fetchPolicy: 'cache-first',
      },
    },
  })
}
