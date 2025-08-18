import { graphql } from "@/api/gql/";

export const removeCategory = graphql(`
  mutation removeCategory($id: UUID!) {
    removeProductCategory(id: $id)
  }
`);
