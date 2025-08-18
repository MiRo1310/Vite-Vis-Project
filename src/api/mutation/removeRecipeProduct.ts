import { graphql } from "@/api/gql/";

export const removeRecipeProduct = graphql(`
  mutation removeRecipeProduct($id: UUID!) {
    removeRecipeProduct(id: $id)
  }
`);
