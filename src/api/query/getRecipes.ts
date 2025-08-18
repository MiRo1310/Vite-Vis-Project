import { graphql } from "@/api/gql";

export const recipes = graphql(`
  query recipes {
    recipes {
      id
      name
    }
  }
`);