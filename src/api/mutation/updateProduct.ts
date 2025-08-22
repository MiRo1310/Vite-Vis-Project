import { graphql } from "@/api/gql/";

export const updateProduct = graphql(`
  mutation updateProduct($dto: ProductUpdateDtoInput!) {
    updateProduct(dto: $dto) {
      name
      id
    }
  }
`);
