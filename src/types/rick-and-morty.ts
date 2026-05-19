/** Estado vital del personaje en la API. */
export type CharacterStatus = 'Alive' | 'Dead' | 'unknown'

/** Género del personaje en la API. */
export type CharacterGender = 'Female' | 'Male' | 'Genderless' | 'unknown'

/** Personaje devuelto por la API GraphQL de Rick and Morty. */
export type Character = {
  id: string
  name: string
  status: CharacterStatus
  species: string
  gender: CharacterGender
  image: string
}

/** Modo de visualización del listado de personajes. */
export type CharacterViewMode = 'grid' | 'list'

/** Metadatos de paginación del listado `characters`. */
export type CharactersInfo = {
  /** La API devuelve `null` cuando el filtro no tiene coincidencias. */
  count: number | null
  pages: number | null
}

/** Filtros admitidos por la query `GetCharacters`. */
export type CharacterFilter = {
  name?: string
}

/** Respuesta tipada de la query de listado de personajes. */
export type CharactersQueryResult = {
  characters: {
    info: CharactersInfo
    results: Character[] | null
  }
}

/** Variables de la query de listado de personajes. */
export type CharactersQueryVariables = {
  page?: number
  filter?: CharacterFilter
}
