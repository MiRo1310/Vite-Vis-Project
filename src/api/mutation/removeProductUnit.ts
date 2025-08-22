import { graphql } from "@/api/gql/";

export const removeProductUnit = graphql(`
  mutation removeProductUnit($id: UUID!) {
    removeProductUnit(id: $id)
  }
`);
