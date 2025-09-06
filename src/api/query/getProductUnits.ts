import { graphql } from "@/api/gql";

export const GetProductUnits = graphql(`
  query getProductUnits {
    productUnits {
      id
      createdAt
      modifiedAt
      productId
      amount
      unit
    }
  }
`);
