import { graphql } from "@/api/gql/";

export const addCategory = graphql(`
  mutation addCategory($name: String!) {
    createProductCategory(dto: { name: $name }) {
      data {
        id
        name
      }
      errorCode
      isError
    }
  }
`);
