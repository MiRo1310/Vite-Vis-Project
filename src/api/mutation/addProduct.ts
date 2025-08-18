import { graphql } from "@/api/gql/";

export const addProduct = graphql(`
  mutation addProduct($dto: ProductCreateDtoInput!) {
    createProduct(dto: $dto) {
      name
      id
    }
  }
`);
