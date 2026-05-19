'use client'

import { ApolloProvider } from './ApolloProvider'

/**
 * Agrupa los proveedores de contexto de la aplicación (Apollo, etc.).
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return <ApolloProvider>{children}</ApolloProvider>
}
