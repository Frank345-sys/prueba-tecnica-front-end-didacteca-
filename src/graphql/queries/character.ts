import { gql } from '@apollo/client'

/** Personaje por ID con origen, ubicación y episodios. */
export const GET_CHARACTER = gql`
  query GetCharacter($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      gender
      image
      origin {
        name
      }
      location {
        name
      }
      episode {
        id
      }
    }
  }
`
