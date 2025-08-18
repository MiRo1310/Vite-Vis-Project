/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  mutation addCategory($name: String!) {\n    createProductCategory(dto: { name: $name }) {\n      data {\n        id\n        name\n      }\n      errorCode\n      isError\n    }\n  }\n": typeof types.AddCategoryDocument,
    "\n  mutation addProduct($dto: ProductCreateDtoInput!) {\n    createProduct(dto: $dto) {\n      name\n      id\n    }\n  }\n": typeof types.AddProductDocument,
    "\n  mutation addRecipe($dto: RecipeCreateDtoInput!) {\n    createRecipe(dto: $dto) {\n      id\n    }\n  }\n": typeof types.AddRecipeDocument,
    "\n  mutation removeCategory($id: UUID!) {\n    removeProductCategory(id: $id)\n  }\n": typeof types.RemoveCategoryDocument,
    "\n  mutation removeProduct($id: UUID!) {\n    removeProduct(id: $id)\n  }\n": typeof types.RemoveProductDocument,
    "\n  mutation RemoveRecipeGroup($dto: RecipeGroupRemoveDtoInput!) {\n    removeProductGroup(dto: $dto)\n  }\n": typeof types.RemoveRecipeGroupDocument,
    "\n  mutation removeProductUnit($id: UUID!) {\n    removeProductUnit(id: $id)\n  }\n": typeof types.RemoveProductUnitDocument,
    "\n  mutation removeRecipeProduct($id: UUID!) {\n    removeRecipeProduct(id: $id)\n  }\n": typeof types.RemoveRecipeProductDocument,
    "\n  mutation renameCategory($name: String!, $id: UUID!) {\n    updateProductCategory(dto: { id: $id, name: $name }) {\n      name\n      id\n    }\n  }\n": typeof types.RenameCategoryDocument,
    "\n  mutation updateProduct($dto: ProductUpdateDtoInput!) {\n    updateProduct(dto: $dto) {\n      name\n      id\n    }\n  }\n": typeof types.UpdateProductDocument,
    "\n  mutation updateRecipe($dto: RecipeUpdateDtoInput!) {\n    updateRecipe(dto: $dto) {\n      id\n    }\n  }\n": typeof types.UpdateRecipeDocument,
    "\n  query getProductById($id: UUID!) {\n    product(id: $id) {\n      id\n      carbs\n      category\n      fat\n      kcal\n      name\n      protein\n      salt\n      sugar\n      unit\n      amount\n        productUnits {      \n        modifiedAt\n        createdAt\n        id\n        productId\n        amount\n        unit\n        defaultUnit\n      }\n    }\n  }\n": typeof types.GetProductByIdDocument,
    "\n  query getProductUnits {\n    productUnits {        \n      id\n      createdAt\n      modifiedAt\n      productId\n      amount\n      unit\n      defaultUnit\n    }\n  }\n": typeof types.GetProductUnitsDocument,
    "\n  query getProductUnitsByProductId($id: UUID!) {\n    productUnit(id: $id) {\n      id\n      unit\n      amount\n      productId\n      modifiedAt\n      createdAt\n      defaultUnit\n    }\n  }\n": typeof types.GetProductUnitsByProductIdDocument,
    "\n  query getRecipeById($id: UUID!) {\n    recipe(id: $id) {\n      id\n      name\n      createdAt\n      modifiedAt\n      portions\n      recipeProducts {\n        amount\n        description\n        productId\n        groupPosition\n        productPosition\n        unit\n        id\n        factor\n        productUnits {\n          defaultUnit\n          unit\n          amount\n          id\n          createdAt\n          modifiedAt\n        }\n      }\n      recipeDescriptions {\n        position\n        text\n        id\n        header\n      }\n      recipeHeaderProducts {\n        id\n        position\n        recipeId\n        text\n      }\n    }\n  }\n": typeof types.GetRecipeByIdDocument,
    "\n  query recipes {\n    recipes {\n      id\n      name\n    }\n  }\n": typeof types.RecipesDocument,
    "\n  query Units {\n    units {   \n      id\n      name\n    }\n  }\n": typeof types.UnitsDocument,
    "\n  query products {\n    products {\n      id\n      carbs\n      category\n      fat\n      kcal\n      name\n      protein\n      salt\n      sugar\n      amount\n      unit\n      productUnits {\n        defaultUnit\n        id\n        unit\n        amount\n      }\n    }\n  }\n": typeof types.ProductsDocument,
    "\n  query productCategories {\n    productCategories {\n      id\n      name\n    }\n  }\n": typeof types.ProductCategoriesDocument,
};
const documents: Documents = {
    "\n  mutation addCategory($name: String!) {\n    createProductCategory(dto: { name: $name }) {\n      data {\n        id\n        name\n      }\n      errorCode\n      isError\n    }\n  }\n": types.AddCategoryDocument,
    "\n  mutation addProduct($dto: ProductCreateDtoInput!) {\n    createProduct(dto: $dto) {\n      name\n      id\n    }\n  }\n": types.AddProductDocument,
    "\n  mutation addRecipe($dto: RecipeCreateDtoInput!) {\n    createRecipe(dto: $dto) {\n      id\n    }\n  }\n": types.AddRecipeDocument,
    "\n  mutation removeCategory($id: UUID!) {\n    removeProductCategory(id: $id)\n  }\n": types.RemoveCategoryDocument,
    "\n  mutation removeProduct($id: UUID!) {\n    removeProduct(id: $id)\n  }\n": types.RemoveProductDocument,
    "\n  mutation RemoveRecipeGroup($dto: RecipeGroupRemoveDtoInput!) {\n    removeProductGroup(dto: $dto)\n  }\n": types.RemoveRecipeGroupDocument,
    "\n  mutation removeProductUnit($id: UUID!) {\n    removeProductUnit(id: $id)\n  }\n": types.RemoveProductUnitDocument,
    "\n  mutation removeRecipeProduct($id: UUID!) {\n    removeRecipeProduct(id: $id)\n  }\n": types.RemoveRecipeProductDocument,
    "\n  mutation renameCategory($name: String!, $id: UUID!) {\n    updateProductCategory(dto: { id: $id, name: $name }) {\n      name\n      id\n    }\n  }\n": types.RenameCategoryDocument,
    "\n  mutation updateProduct($dto: ProductUpdateDtoInput!) {\n    updateProduct(dto: $dto) {\n      name\n      id\n    }\n  }\n": types.UpdateProductDocument,
    "\n  mutation updateRecipe($dto: RecipeUpdateDtoInput!) {\n    updateRecipe(dto: $dto) {\n      id\n    }\n  }\n": types.UpdateRecipeDocument,
    "\n  query getProductById($id: UUID!) {\n    product(id: $id) {\n      id\n      carbs\n      category\n      fat\n      kcal\n      name\n      protein\n      salt\n      sugar\n      unit\n      amount\n        productUnits {      \n        modifiedAt\n        createdAt\n        id\n        productId\n        amount\n        unit\n        defaultUnit\n      }\n    }\n  }\n": types.GetProductByIdDocument,
    "\n  query getProductUnits {\n    productUnits {        \n      id\n      createdAt\n      modifiedAt\n      productId\n      amount\n      unit\n      defaultUnit\n    }\n  }\n": types.GetProductUnitsDocument,
    "\n  query getProductUnitsByProductId($id: UUID!) {\n    productUnit(id: $id) {\n      id\n      unit\n      amount\n      productId\n      modifiedAt\n      createdAt\n      defaultUnit\n    }\n  }\n": types.GetProductUnitsByProductIdDocument,
    "\n  query getRecipeById($id: UUID!) {\n    recipe(id: $id) {\n      id\n      name\n      createdAt\n      modifiedAt\n      portions\n      recipeProducts {\n        amount\n        description\n        productId\n        groupPosition\n        productPosition\n        unit\n        id\n        factor\n        productUnits {\n          defaultUnit\n          unit\n          amount\n          id\n          createdAt\n          modifiedAt\n        }\n      }\n      recipeDescriptions {\n        position\n        text\n        id\n        header\n      }\n      recipeHeaderProducts {\n        id\n        position\n        recipeId\n        text\n      }\n    }\n  }\n": types.GetRecipeByIdDocument,
    "\n  query recipes {\n    recipes {\n      id\n      name\n    }\n  }\n": types.RecipesDocument,
    "\n  query Units {\n    units {   \n      id\n      name\n    }\n  }\n": types.UnitsDocument,
    "\n  query products {\n    products {\n      id\n      carbs\n      category\n      fat\n      kcal\n      name\n      protein\n      salt\n      sugar\n      amount\n      unit\n      productUnits {\n        defaultUnit\n        id\n        unit\n        amount\n      }\n    }\n  }\n": types.ProductsDocument,
    "\n  query productCategories {\n    productCategories {\n      id\n      name\n    }\n  }\n": types.ProductCategoriesDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation addCategory($name: String!) {\n    createProductCategory(dto: { name: $name }) {\n      data {\n        id\n        name\n      }\n      errorCode\n      isError\n    }\n  }\n"): (typeof documents)["\n  mutation addCategory($name: String!) {\n    createProductCategory(dto: { name: $name }) {\n      data {\n        id\n        name\n      }\n      errorCode\n      isError\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation addProduct($dto: ProductCreateDtoInput!) {\n    createProduct(dto: $dto) {\n      name\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation addProduct($dto: ProductCreateDtoInput!) {\n    createProduct(dto: $dto) {\n      name\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation addRecipe($dto: RecipeCreateDtoInput!) {\n    createRecipe(dto: $dto) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation addRecipe($dto: RecipeCreateDtoInput!) {\n    createRecipe(dto: $dto) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation removeCategory($id: UUID!) {\n    removeProductCategory(id: $id)\n  }\n"): (typeof documents)["\n  mutation removeCategory($id: UUID!) {\n    removeProductCategory(id: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation removeProduct($id: UUID!) {\n    removeProduct(id: $id)\n  }\n"): (typeof documents)["\n  mutation removeProduct($id: UUID!) {\n    removeProduct(id: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveRecipeGroup($dto: RecipeGroupRemoveDtoInput!) {\n    removeProductGroup(dto: $dto)\n  }\n"): (typeof documents)["\n  mutation RemoveRecipeGroup($dto: RecipeGroupRemoveDtoInput!) {\n    removeProductGroup(dto: $dto)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation removeProductUnit($id: UUID!) {\n    removeProductUnit(id: $id)\n  }\n"): (typeof documents)["\n  mutation removeProductUnit($id: UUID!) {\n    removeProductUnit(id: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation removeRecipeProduct($id: UUID!) {\n    removeRecipeProduct(id: $id)\n  }\n"): (typeof documents)["\n  mutation removeRecipeProduct($id: UUID!) {\n    removeRecipeProduct(id: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation renameCategory($name: String!, $id: UUID!) {\n    updateProductCategory(dto: { id: $id, name: $name }) {\n      name\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation renameCategory($name: String!, $id: UUID!) {\n    updateProductCategory(dto: { id: $id, name: $name }) {\n      name\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateProduct($dto: ProductUpdateDtoInput!) {\n    updateProduct(dto: $dto) {\n      name\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation updateProduct($dto: ProductUpdateDtoInput!) {\n    updateProduct(dto: $dto) {\n      name\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateRecipe($dto: RecipeUpdateDtoInput!) {\n    updateRecipe(dto: $dto) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation updateRecipe($dto: RecipeUpdateDtoInput!) {\n    updateRecipe(dto: $dto) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getProductById($id: UUID!) {\n    product(id: $id) {\n      id\n      carbs\n      category\n      fat\n      kcal\n      name\n      protein\n      salt\n      sugar\n      unit\n      amount\n        productUnits {      \n        modifiedAt\n        createdAt\n        id\n        productId\n        amount\n        unit\n        defaultUnit\n      }\n    }\n  }\n"): (typeof documents)["\n  query getProductById($id: UUID!) {\n    product(id: $id) {\n      id\n      carbs\n      category\n      fat\n      kcal\n      name\n      protein\n      salt\n      sugar\n      unit\n      amount\n        productUnits {      \n        modifiedAt\n        createdAt\n        id\n        productId\n        amount\n        unit\n        defaultUnit\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getProductUnits {\n    productUnits {        \n      id\n      createdAt\n      modifiedAt\n      productId\n      amount\n      unit\n      defaultUnit\n    }\n  }\n"): (typeof documents)["\n  query getProductUnits {\n    productUnits {        \n      id\n      createdAt\n      modifiedAt\n      productId\n      amount\n      unit\n      defaultUnit\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getProductUnitsByProductId($id: UUID!) {\n    productUnit(id: $id) {\n      id\n      unit\n      amount\n      productId\n      modifiedAt\n      createdAt\n      defaultUnit\n    }\n  }\n"): (typeof documents)["\n  query getProductUnitsByProductId($id: UUID!) {\n    productUnit(id: $id) {\n      id\n      unit\n      amount\n      productId\n      modifiedAt\n      createdAt\n      defaultUnit\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getRecipeById($id: UUID!) {\n    recipe(id: $id) {\n      id\n      name\n      createdAt\n      modifiedAt\n      portions\n      recipeProducts {\n        amount\n        description\n        productId\n        groupPosition\n        productPosition\n        unit\n        id\n        factor\n        productUnits {\n          defaultUnit\n          unit\n          amount\n          id\n          createdAt\n          modifiedAt\n        }\n      }\n      recipeDescriptions {\n        position\n        text\n        id\n        header\n      }\n      recipeHeaderProducts {\n        id\n        position\n        recipeId\n        text\n      }\n    }\n  }\n"): (typeof documents)["\n  query getRecipeById($id: UUID!) {\n    recipe(id: $id) {\n      id\n      name\n      createdAt\n      modifiedAt\n      portions\n      recipeProducts {\n        amount\n        description\n        productId\n        groupPosition\n        productPosition\n        unit\n        id\n        factor\n        productUnits {\n          defaultUnit\n          unit\n          amount\n          id\n          createdAt\n          modifiedAt\n        }\n      }\n      recipeDescriptions {\n        position\n        text\n        id\n        header\n      }\n      recipeHeaderProducts {\n        id\n        position\n        recipeId\n        text\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query recipes {\n    recipes {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  query recipes {\n    recipes {\n      id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Units {\n    units {   \n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  query Units {\n    units {   \n      id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query products {\n    products {\n      id\n      carbs\n      category\n      fat\n      kcal\n      name\n      protein\n      salt\n      sugar\n      amount\n      unit\n      productUnits {\n        defaultUnit\n        id\n        unit\n        amount\n      }\n    }\n  }\n"): (typeof documents)["\n  query products {\n    products {\n      id\n      carbs\n      category\n      fat\n      kcal\n      name\n      protein\n      salt\n      sugar\n      amount\n      unit\n      productUnits {\n        defaultUnit\n        id\n        unit\n        amount\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query productCategories {\n    productCategories {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  query productCategories {\n    productCategories {\n      id\n      name\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;