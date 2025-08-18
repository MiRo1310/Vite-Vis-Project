import { graphql } from "@/api/gql";

export const products = graphql(`
  query products {
    products {
      id
      carbs
      category
      fat
      kcal
      name
      protein
      salt
      sugar
      amount
      unit
      productUnits {
        defaultUnit
        id
        unit
        amount
      }
    }
  }
`);

export const productCategories = graphql(`
  query productCategories {
    productCategories {
      id
      name
    }
  }
`);
