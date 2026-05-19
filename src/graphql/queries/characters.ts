import { gql } from '@apollo/client'

/** Listado paginado de personajes con filtro opcional por nombre. */
export const GET_CHARACTERS = gql`
  query GetCharacters($page: Int, $filter: FilterCharacter) {
    characters(page: $page, filter: $filter) {
      info {
        count
        pages
      }
      results {
        id
        name
        status
        species
        gender
        image
      }
    }
  }
`
