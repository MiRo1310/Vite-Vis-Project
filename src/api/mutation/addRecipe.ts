import { graphql } from "@/api/gql/";

export const addRecipe = graphql(`
  mutation addRecipe($dto: RecipeCreateDtoInput!) {
    createRecipe(dto: $dto) {
      id
    }
  }
`);
