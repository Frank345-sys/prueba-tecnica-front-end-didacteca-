import { gql } from '@apollo/client'

/** Personajes por lista de IDs (orden se aplica en cliente). */
export const GET_CHARACTERS_BY_IDS = gql`
  query GetCharactersByIds($ids: [ID!]!) {
    charactersByIds(ids: $ids) {
      id
      name
      status
      species
      gender
      image
    }
  }
`
