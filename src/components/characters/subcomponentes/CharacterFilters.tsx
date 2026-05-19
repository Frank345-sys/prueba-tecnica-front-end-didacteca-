import { Input } from '@/components/ui/primitives'

type CharacterFiltersProps = {
  /** Valor controlado del campo de búsqueda. */
  search: string
  /** Al cambiar el texto se reinicia la paginación en el hook padre. */
  onSearchChange: (value: string) => void
}

/**
 * Campo de búsqueda por nombre para filtrar el listado de personajes.
 */
export function CharacterFilters({
  search,
  onSearchChange,
}: CharacterFiltersProps) {
  return (
    <div className="w-full max-w-md">
      <label htmlFor="character-search" className="sr-only">
        Buscar personaje por nombre
      </label>
      <Input
        id="character-search"
        type="search"
        placeholder="Buscar por nombre…"
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        autoComplete="off"
      />
    </div>
  )
}
