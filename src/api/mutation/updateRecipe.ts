import { graphql } from "@/api/gql/";

export const updateRecipe = graphql(`
  mutation updateRecipe($dto: RecipeUpdateDtoInput!) {
    updateRecipe(dto: $dto) {
      id
    }
  }
`);
