import { graphql } from "@/api/gql/";

export const removeProduct = graphql(`
  mutation removeProduct($id: UUID!) {
    removeProduct(id: $id)
  }
`);
