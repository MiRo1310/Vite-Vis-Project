import { graphql } from "@/api/gql/";

export const renameCategory = graphql(`
  mutation renameCategory($name: String!, $id: UUID!) {
    updateProductCategory(dto: { id: $id, name: $name }) {
      name
      id
    }
  }
`);
