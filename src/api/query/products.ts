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
      kcal
      productUnits {
        id
        unit
        amount
        isDefault
        faktor
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
