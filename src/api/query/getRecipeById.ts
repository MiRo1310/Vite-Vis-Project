import { graphql } from "@/api/gql";

export const getRecipeById = graphql(`
  query getRecipeById($id: UUID!) {
    recipe(id: $id) {
      id
      name
      createdAt
      modifiedAt
      portions
      recipeProducts {
        amount
        description
        productId
        groupPosition
        productPosition
        unit
        id
        factor
        productUnits {
          defaultUnit
          unit
          amount
          id
          createdAt
          modifiedAt
        }
      }
      recipeDescriptions {
        position
        text
        id
        header
      }
      recipeHeaderProducts {
        id
        position
        recipeId
        text
      }
    }
  }
`);
