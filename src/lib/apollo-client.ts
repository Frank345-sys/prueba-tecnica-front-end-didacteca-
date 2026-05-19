import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'

export function createApolloClient() {
  const uri = process.env.NEXT_PUBLIC_GRAPHQL_URL

  if (!uri) {
    throw new Error(
      'Falta NEXT_PUBLIC_GRAPHQL_URL. Copia .env.example a .env.local'
    )
  }

  return new ApolloClient({
    link: new HttpLink({ uri }),
    cache: new InMemoryCache(),
  })
}
