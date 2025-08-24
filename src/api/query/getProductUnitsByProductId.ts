import { graphql } from "@/api/gql";

export const GetProductUnitsByProductId = graphql(`
  query getProductUnitsByProductId($id: UUID!) {
    productUnit(id: $id) {
      id
      unit
      amount
      productId
      modifiedAt
      createdAt
    }
  }
`);
