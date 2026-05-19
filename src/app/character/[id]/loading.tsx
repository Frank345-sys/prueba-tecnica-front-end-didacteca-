import { Spinner } from '@/components/ui/primitives'

/** Estado de carga del segmento `/character/[id]` (streaming SSR). */
export default function CharacterLoading() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-8 sm:px-6 sm:py-10">
      <Spinner className="py-16" />
    </main>
  )
}
