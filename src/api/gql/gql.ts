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
    "\n  mutation addRecipe($dto: RecipeCreateDtoInput!) {\n    createRecipe(dto: $dto) {\n      id\n    }\n  }\n": typeof types.AddRecipeDocument,
    "\n  mutation removeCategory($id: UUID!) {\n    removeProductCategory(id: $id)\n  }\n": typeof types.RemoveCategoryDocument,
    "\n  mutation RemoveRecipeGroup($dto: RecipeGroupRemoveDtoInput!) {\n    removeProductGroup(dto: $dto)\n  }\n": typeof types.RemoveRecipeGroupDocument,
    "\n  mutation removeProductUnit($id: UUID!) {\n    removeProductUnit(id: $id)\n  }\n": typeof types.RemoveProductUnitDocument,
    "\n  mutation removeRecipeProduct($id: UUID!) {\n    removeRecipeProduct(id: $id)\n  }\n": typeof types.RemoveRecipeProductDocument,
    "\n  mutation renameCategory($name: String!, $id: UUID!) {\n    updateProductCategory(dto: { id: $id, name: $name }) {\n      name\n      id\n    }\n  }\n": typeof types.RenameCategoryDocument,
    "\n  mutation updateRecipe($dto: RecipeUpdateDtoInput!) {\n    updateRecipe(dto: $dto) {\n      id\n    }\n  }\n": typeof types.UpdateRecipeDocument,
    "\n  query getProductById($id: UUID!) {\n    product(id: $id) {\n      id\n      carbs\n      category\n      fat\n      kcal\n      name\n      protein\n      salt\n      sugar\n      productUnits {\n        modifiedAt\n        createdAt\n        id\n        productId\n        amount\n        unit\n        isDefault\n      }\n    }\n  }\n": typeof types.GetProductByIdDocument,
    "\n  query getProductUnits {\n    productUnits {\n      id\n      createdAt\n      modifiedAt\n      productId\n      amount\n      unit\n    }\n  }\n": typeof types.GetProductUnitsDocument,
    "\n  query getProductUnitsByProductId($id: UUID!) {\n    productUnit(id: $id) {\n      id\n      unit\n      amount\n      productId\n      modifiedAt\n      createdAt\n    }\n  }\n": typeof types.GetProductUnitsByProductIdDocument,
    "\n  query getRecipeById($id: UUID!) {\n    recipe(id: $id) {\n      id\n      name\n      createdAt\n      modifiedAt\n      portions\n      recipeProducts {\n        amount\n        description\n        productId\n        groupPosition\n        productPosition\n        unit\n        id\n        kcal\n        activeUnitId\n        product {\n          name\n        }\n      }\n      recipeDescriptions {\n        position\n        text\n        id\n        header\n      }\n      recipeHeaderProducts {\n        id\n        position\n        recipeId\n        text\n      }\n    }\n  }\n": typeof types.GetRecipeByIdDocument,
    "\n  query recipes {\n    recipes {\n      id\n      name\n    }\n  }\n": typeof types.RecipesDocument,
    "\n  query Units {\n    units {   \n      id\n      name\n    }\n  }\n": typeof types.UnitsDocument,
    "\n  query products {\n    products {\n      id\n      carbs\n      category\n      fat\n      kcal\n      name\n      protein\n      salt\n      sugar\n      kcal\n      productUnits {\n        id\n        unit\n        amount\n        isDefault\n        faktor\n      }\n    }\n  }\n": typeof types.ProductsDocument,
    "\n  query productCategories {\n    productCategories {\n      id\n      name\n    }\n  }\n": typeof types.ProductCategoriesDocument,
    "\n    mutation DeleteCategory($id: UUID!) {\n      removeProductCategory(id: $id)\n    }\n  ": typeof types.DeleteCategoryDocument,
    "\n    mutation UpdateProductCategory($id: UUID!, $name: String!) {\n      updateProductCategory(dto: { name: $name, id: $id }) {\n        id\n      }\n    }\n  ": typeof types.UpdateProductCategoryDocument,
    "\n    mutation AddAddress($name: String!, $street: String!, $city: String!) {\n      createAddress(dto: { name: $name, street: $street, city: $city }) {\n        name\n        street\n        city\n      }\n    }\n  ": typeof types.AddAddressDocument,
    "\n    mutation AddDescription($text: String!) {\n      createDescription(text: $text) {\n        text\n      }\n    }\n  ": typeof types.AddDescriptionDocument,
    "\n    mutation AddTravelCost($price: Decimal, $description: String, $date: LocalDate, $addressId: UUID) {\n      createTravelCost(dto: { price: $price, description: $description, date: $date, addressId: $addressId }) {\n        id\n      }\n    }\n  ": typeof types.AddTravelCostDocument,
    "\n    mutation RemoveAddress($id: UUID!) {\n      removeAddress(id: $id)\n    }\n  ": typeof types.RemoveAddressDocument,
    "\n    mutation UpdateAddress($id: UUID!, $name: String!, $street: String!, $city: String!) {\n      updateAddress(dto: { name: $name, street: $street, city: $city, id: $id }) {\n        name\n        street\n        city\n        id\n      }\n    }\n  ": typeof types.UpdateAddressDocument,
    "\n    query AddressListing {\n      addresses {\n        id\n        name\n      }\n    }\n  ": typeof types.AddressListingDocument,
    "\n    mutation RemoveDescription($id: UUID!) {\n      removeDescription(id: $id)\n    }\n  ": typeof types.RemoveDescriptionDocument,
    "\n    mutation UpdateDescription($text: String!, $id: UUID!) {\n      updateDescription(text: $text, id: $id) {\n        text\n      }\n    }\n  ": typeof types.UpdateDescriptionDocument,
    "\n    query DescriptionsListing {\n      description {\n        id\n        text\n      }\n    }\n  ": typeof types.DescriptionsListingDocument,
    "\n    mutation RemoveTravelCost($id: UUID!) {\n      removeTravelCost(id: $id)\n    }\n  ": typeof types.RemoveTravelCostDocument,
    "\n    mutation UpdateTravelCost($id: UUID!, $price: Decimal, $addressId: UUID!, $date: LocalDate, $description: String) {\n      updateTravelCost(dto: { price: $price, addressId: $addressId, date: $date, description: $description, id: $id }) {\n        id\n      }\n    }\n  ": typeof types.UpdateTravelCostDocument,
    "\n    query GetProductsForSelect {\n      products {\n        id\n        name\n      }\n    }\n  ": typeof types.GetProductsForSelectDocument,
    "\n    mutation addProduct($dto: ProductCreateDtoInput!) {\n      createProduct(dto: $dto) {\n        name\n        id\n      }\n    }\n  ": typeof types.AddProductDocument,
    "\n    mutation updateProduct($dto: ProductUpdateDtoInput!) {\n      updateProduct(dto: $dto) {\n        name\n        id\n      }\n    }\n  ": typeof types.UpdateProductDocument,
    "\n    mutation removeProduct($id: UUID!) {\n      removeProduct(id: $id)\n    }\n  ": typeof types.RemoveProductDocument,
    "\n    mutation CreateUnit($name: String!) {\n      createUnit(dto: { name: $name }) {\n        name\n      }\n    }\n  ": typeof types.CreateUnitDocument,
    "\n    mutation DeleteUnit($id: UUID!) {\n      deleteUnit(id: $id)\n    }\n  ": typeof types.DeleteUnitDocument,
    "\n    mutation UpdateUnit($id: UUID!, $name: String!) {\n      updateUnit(dto: { name: $name, id: $id }) {\n        id\n      }\n    }\n  ": typeof types.UpdateUnitDocument,
    "\n    query Addresses {\n      addresses {\n        name\n        city\n        street\n        id\n      }\n    }\n  ": typeof types.AddressesDocument,
    "\n    query Descriptions {\n      description {\n        text\n        id\n      }\n    }\n  ": typeof types.DescriptionsDocument,
    "\n  query TravelCost($where: TravelCostFilterInput, $order: [TravelCostSortInput!]) {\n    travelCost(where: $where, order: $order) {\n      id\n      addressId\n      date\n      description\n      price\n      address {\n        name\n        street\n        city\n      }\n    }\n  }\n": typeof types.TravelCostDocument,
    "\n    query GetCategories {\n      productCategories {\n        name\n        id\n      }\n    }\n  ": typeof types.GetCategoriesDocument,
    "\n    query GetProducts {\n      products {\n        id\n        carbs\n        category\n        fat\n        kcal\n        name\n        protein\n        salt\n        sugar\n        unit\n        productUnits {\n          id\n          amount\n          unit\n          isDefault\n          faktor\n        }\n      }\n    }\n  ": typeof types.GetProductsDocument,
    "\n  query getRecipeDetails($id: UUID!) {\n    recipe(id: $id) {\n      id\n      name\n      portions\n      totalKcal\n      recipeProducts {\n        amount\n        description\n        groupPosition\n        productPosition\n        unit\n        kcal\n        activeUnitId\n        productId\n        product {\n          name\n        }\n      }\n      recipeDescriptions {\n        position\n        text\n        header\n      }\n      recipeHeaderProducts {\n        position\n        text\n      }\n    }\n  }\n": typeof types.GetRecipeDetailsDocument,
    "\n    query GetUnits {\n      units {\n        name\n        id\n      }\n    }\n  ": typeof types.GetUnitsDocument,
};
const documents: Documents = {
    "\n  mutation addCategory($name: String!) {\n    createProductCategory(dto: { name: $name }) {\n      data {\n        id\n        name\n      }\n      errorCode\n      isError\n    }\n  }\n": types.AddCategoryDocument,
    "\n  mutation addRecipe($dto: RecipeCreateDtoInput!) {\n    createRecipe(dto: $dto) {\n      id\n    }\n  }\n": types.AddRecipeDocument,
    "\n  mutation removeCategory($id: UUID!) {\n    removeProductCategory(id: $id)\n  }\n": types.RemoveCategoryDocument,
    "\n  mutation RemoveRecipeGroup($dto: RecipeGroupRemoveDtoInput!) {\n    removeProductGroup(dto: $dto)\n  }\n": types.RemoveRecipeGroupDocument,
    "\n  mutation removeProductUnit($id: UUID!) {\n    removeProductUnit(id: $id)\n  }\n": types.RemoveProductUnitDocument,
    "\n  mutation removeRecipeProduct($id: UUID!) {\n    removeRecipeProduct(id: $id)\n  }\n": types.RemoveRecipeProductDocument,
    "\n  mutation renameCategory($name: String!, $id: UUID!) {\n    updateProductCategory(dto: { id: $id, name: $name }) {\n      name\n      id\n    }\n  }\n": types.RenameCategoryDocument,
    "\n  mutation updateRecipe($dto: RecipeUpdateDtoInput!) {\n    updateRecipe(dto: $dto) {\n      id\n    }\n  }\n": types.UpdateRecipeDocument,
    "\n  query getProductById($id: UUID!) {\n    product(id: $id) {\n      id\n      carbs\n      category\n      fat\n      kcal\n      name\n      protein\n      salt\n      sugar\n      productUnits {\n        modifiedAt\n        createdAt\n        id\n        productId\n        amount\n        unit\n        isDefault\n      }\n    }\n  }\n": types.GetProductByIdDocument,
    "\n  query getProductUnits {\n    productUnits {\n      id\n      createdAt\n      modifiedAt\n      productId\n      amount\n      unit\n    }\n  }\n": types.GetProductUnitsDocument,
    "\n  query getProductUnitsByProductId($id: UUID!) {\n    productUnit(id: $id) {\n      id\n      unit\n      amount\n      productId\n      modifiedAt\n      createdAt\n    }\n  }\n": types.GetProductUnitsByProductIdDocument,
    "\n  query getRecipeById($id: UUID!) {\n    recipe(id: $id) {\n      id\n      name\n      createdAt\n      modifiedAt\n      portions\n      recipeProducts {\n        amount\n        description\n        productId\n        groupPosition\n        productPosition\n        unit\n        id\n        kcal\n        activeUnitId\n        product {\n          name\n        }\n      }\n      recipeDescriptions {\n        position\n        text\n        id\n        header\n      }\n      recipeHeaderProducts {\n        id\n        position\n        recipeId\n        text\n      }\n    }\n  }\n": types.GetRecipeByIdDocument,
    "\n  query recipes {\n    recipes {\n      id\n      name\n    }\n  }\n": types.RecipesDocument,
    "\n  query Units {\n    units {   \n      id\n      name\n    }\n  }\n": types.UnitsDocument,
    "\n  query products {\n    products {\n      id\n      carbs\n      category\n      fat\n      kcal\n      name\n      protein\n      salt\n      sugar\n      kcal\n      productUnits {\n        id\n        unit\n        amount\n        isDefault\n        faktor\n      }\n    }\n  }\n": types.ProductsDocument,
    "\n  query productCategories {\n    productCategories {\n      id\n      name\n    }\n  }\n": types.ProductCategoriesDocument,
    "\n    mutation DeleteCategory($id: UUID!) {\n      removeProductCategory(id: $id)\n    }\n  ": types.DeleteCategoryDocument,
    "\n    mutation UpdateProductCategory($id: UUID!, $name: String!) {\n      updateProductCategory(dto: { name: $name, id: $id }) {\n        id\n      }\n    }\n  ": types.UpdateProductCategoryDocument,
    "\n    mutation AddAddress($name: String!, $street: String!, $city: String!) {\n      createAddress(dto: { name: $name, street: $street, city: $city }) {\n        name\n        street\n        city\n      }\n    }\n  ": types.AddAddressDocument,
    "\n    mutation AddDescription($text: String!) {\n      createDescription(text: $text) {\n        text\n      }\n    }\n  ": types.AddDescriptionDocument,
    "\n    mutation AddTravelCost($price: Decimal, $description: String, $date: LocalDate, $addressId: UUID) {\n      createTravelCost(dto: { price: $price, description: $description, date: $date, addressId: $addressId }) {\n        id\n      }\n    }\n  ": types.AddTravelCostDocument,
    "\n    mutation RemoveAddress($id: UUID!) {\n      removeAddress(id: $id)\n    }\n  ": types.RemoveAddressDocument,
    "\n    mutation UpdateAddress($id: UUID!, $name: String!, $street: String!, $city: String!) {\n      updateAddress(dto: { name: $name, street: $street, city: $city, id: $id }) {\n        name\n        street\n        city\n        id\n      }\n    }\n  ": types.UpdateAddressDocument,
    "\n    query AddressListing {\n      addresses {\n        id\n        name\n      }\n    }\n  ": types.AddressListingDocument,
    "\n    mutation RemoveDescription($id: UUID!) {\n      removeDescription(id: $id)\n    }\n  ": types.RemoveDescriptionDocument,
    "\n    mutation UpdateDescription($text: String!, $id: UUID!) {\n      updateDescription(text: $text, id: $id) {\n        text\n      }\n    }\n  ": types.UpdateDescriptionDocument,
    "\n    query DescriptionsListing {\n      description {\n        id\n        text\n      }\n    }\n  ": types.DescriptionsListingDocument,
    "\n    mutation RemoveTravelCost($id: UUID!) {\n      removeTravelCost(id: $id)\n    }\n  ": types.RemoveTravelCostDocument,
    "\n    mutation UpdateTravelCost($id: UUID!, $price: Decimal, $addressId: UUID!, $date: LocalDate, $description: String) {\n      updateTravelCost(dto: { price: $price, addressId: $addressId, date: $date, description: $description, id: $id }) {\n        id\n      }\n    }\n  ": types.UpdateTravelCostDocument,
    "\n    query GetProductsForSelect {\n      products {\n        id\n        name\n      }\n    }\n  ": types.GetProductsForSelectDocument,
    "\n    mutation addProduct($dto: ProductCreateDtoInput!) {\n      createProduct(dto: $dto) {\n        name\n        id\n      }\n    }\n  ": types.AddProductDocument,
    "\n    mutation updateProduct($dto: ProductUpdateDtoInput!) {\n      updateProduct(dto: $dto) {\n        name\n        id\n      }\n    }\n  ": types.UpdateProductDocument,
    "\n    mutation removeProduct($id: UUID!) {\n      removeProduct(id: $id)\n    }\n  ": types.RemoveProductDocument,
    "\n    mutation CreateUnit($name: String!) {\n      createUnit(dto: { name: $name }) {\n        name\n      }\n    }\n  ": types.CreateUnitDocument,
    "\n    mutation DeleteUnit($id: UUID!) {\n      deleteUnit(id: $id)\n    }\n  ": types.DeleteUnitDocument,
    "\n    mutation UpdateUnit($id: UUID!, $name: String!) {\n      updateUnit(dto: { name: $name, id: $id }) {\n        id\n      }\n    }\n  ": types.UpdateUnitDocument,
    "\n    query Addresses {\n      addresses {\n        name\n        city\n        street\n        id\n      }\n    }\n  ": types.AddressesDocument,
    "\n    query Descriptions {\n      description {\n        text\n        id\n      }\n    }\n  ": types.DescriptionsDocument,
    "\n  query TravelCost($where: TravelCostFilterInput, $order: [TravelCostSortInput!]) {\n    travelCost(where: $where, order: $order) {\n      id\n      addressId\n      date\n      description\n      price\n      address {\n        name\n        street\n        city\n      }\n    }\n  }\n": types.TravelCostDocument,
    "\n    query GetCategories {\n      productCategories {\n        name\n        id\n      }\n    }\n  ": types.GetCategoriesDocument,
    "\n    query GetProducts {\n      products {\n        id\n        carbs\n        category\n        fat\n        kcal\n        name\n        protein\n        salt\n        sugar\n        unit\n        productUnits {\n          id\n          amount\n          unit\n          isDefault\n          faktor\n        }\n      }\n    }\n  ": types.GetProductsDocument,
    "\n  query getRecipeDetails($id: UUID!) {\n    recipe(id: $id) {\n      id\n      name\n      portions\n      totalKcal\n      recipeProducts {\n        amount\n        description\n        groupPosition\n        productPosition\n        unit\n        kcal\n        activeUnitId\n        productId\n        product {\n          name\n        }\n      }\n      recipeDescriptions {\n        position\n        text\n        header\n      }\n      recipeHeaderProducts {\n        position\n        text\n      }\n    }\n  }\n": types.GetRecipeDetailsDocument,
    "\n    query GetUnits {\n      units {\n        name\n        id\n      }\n    }\n  ": types.GetUnitsDocument,
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
export function graphql(source: "\n  mutation addRecipe($dto: RecipeCreateDtoInput!) {\n    createRecipe(dto: $dto) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation addRecipe($dto: RecipeCreateDtoInput!) {\n    createRecipe(dto: $dto) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation removeCategory($id: UUID!) {\n    removeProductCategory(id: $id)\n  }\n"): (typeof documents)["\n  mutation removeCategory($id: UUID!) {\n    removeProductCategory(id: $id)\n  }\n"];
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
export function graphql(source: "\n  mutation updateRecipe($dto: RecipeUpdateDtoInput!) {\n    updateRecipe(dto: $dto) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation updateRecipe($dto: RecipeUpdateDtoInput!) {\n    updateRecipe(dto: $dto) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getProductById($id: UUID!) {\n    product(id: $id) {\n      id\n      carbs\n      category\n      fat\n      kcal\n      name\n      protein\n      salt\n      sugar\n      productUnits {\n        modifiedAt\n        createdAt\n        id\n        productId\n        amount\n        unit\n        isDefault\n      }\n    }\n  }\n"): (typeof documents)["\n  query getProductById($id: UUID!) {\n    product(id: $id) {\n      id\n      carbs\n      category\n      fat\n      kcal\n      name\n      protein\n      salt\n      sugar\n      productUnits {\n        modifiedAt\n        createdAt\n        id\n        productId\n        amount\n        unit\n        isDefault\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getProductUnits {\n    productUnits {\n      id\n      createdAt\n      modifiedAt\n      productId\n      amount\n      unit\n    }\n  }\n"): (typeof documents)["\n  query getProductUnits {\n    productUnits {\n      id\n      createdAt\n      modifiedAt\n      productId\n      amount\n      unit\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getProductUnitsByProductId($id: UUID!) {\n    productUnit(id: $id) {\n      id\n      unit\n      amount\n      productId\n      modifiedAt\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  query getProductUnitsByProductId($id: UUID!) {\n    productUnit(id: $id) {\n      id\n      unit\n      amount\n      productId\n      modifiedAt\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getRecipeById($id: UUID!) {\n    recipe(id: $id) {\n      id\n      name\n      createdAt\n      modifiedAt\n      portions\n      recipeProducts {\n        amount\n        description\n        productId\n        groupPosition\n        productPosition\n        unit\n        id\n        kcal\n        activeUnitId\n        product {\n          name\n        }\n      }\n      recipeDescriptions {\n        position\n        text\n        id\n        header\n      }\n      recipeHeaderProducts {\n        id\n        position\n        recipeId\n        text\n      }\n    }\n  }\n"): (typeof documents)["\n  query getRecipeById($id: UUID!) {\n    recipe(id: $id) {\n      id\n      name\n      createdAt\n      modifiedAt\n      portions\n      recipeProducts {\n        amount\n        description\n        productId\n        groupPosition\n        productPosition\n        unit\n        id\n        kcal\n        activeUnitId\n        product {\n          name\n        }\n      }\n      recipeDescriptions {\n        position\n        text\n        id\n        header\n      }\n      recipeHeaderProducts {\n        id\n        position\n        recipeId\n        text\n      }\n    }\n  }\n"];
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
export function graphql(source: "\n  query products {\n    products {\n      id\n      carbs\n      category\n      fat\n      kcal\n      name\n      protein\n      salt\n      sugar\n      kcal\n      productUnits {\n        id\n        unit\n        amount\n        isDefault\n        faktor\n      }\n    }\n  }\n"): (typeof documents)["\n  query products {\n    products {\n      id\n      carbs\n      category\n      fat\n      kcal\n      name\n      protein\n      salt\n      sugar\n      kcal\n      productUnits {\n        id\n        unit\n        amount\n        isDefault\n        faktor\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query productCategories {\n    productCategories {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  query productCategories {\n    productCategories {\n      id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation DeleteCategory($id: UUID!) {\n      removeProductCategory(id: $id)\n    }\n  "): (typeof documents)["\n    mutation DeleteCategory($id: UUID!) {\n      removeProductCategory(id: $id)\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation UpdateProductCategory($id: UUID!, $name: String!) {\n      updateProductCategory(dto: { name: $name, id: $id }) {\n        id\n      }\n    }\n  "): (typeof documents)["\n    mutation UpdateProductCategory($id: UUID!, $name: String!) {\n      updateProductCategory(dto: { name: $name, id: $id }) {\n        id\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation AddAddress($name: String!, $street: String!, $city: String!) {\n      createAddress(dto: { name: $name, street: $street, city: $city }) {\n        name\n        street\n        city\n      }\n    }\n  "): (typeof documents)["\n    mutation AddAddress($name: String!, $street: String!, $city: String!) {\n      createAddress(dto: { name: $name, street: $street, city: $city }) {\n        name\n        street\n        city\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation AddDescription($text: String!) {\n      createDescription(text: $text) {\n        text\n      }\n    }\n  "): (typeof documents)["\n    mutation AddDescription($text: String!) {\n      createDescription(text: $text) {\n        text\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation AddTravelCost($price: Decimal, $description: String, $date: LocalDate, $addressId: UUID) {\n      createTravelCost(dto: { price: $price, description: $description, date: $date, addressId: $addressId }) {\n        id\n      }\n    }\n  "): (typeof documents)["\n    mutation AddTravelCost($price: Decimal, $description: String, $date: LocalDate, $addressId: UUID) {\n      createTravelCost(dto: { price: $price, description: $description, date: $date, addressId: $addressId }) {\n        id\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation RemoveAddress($id: UUID!) {\n      removeAddress(id: $id)\n    }\n  "): (typeof documents)["\n    mutation RemoveAddress($id: UUID!) {\n      removeAddress(id: $id)\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation UpdateAddress($id: UUID!, $name: String!, $street: String!, $city: String!) {\n      updateAddress(dto: { name: $name, street: $street, city: $city, id: $id }) {\n        name\n        street\n        city\n        id\n      }\n    }\n  "): (typeof documents)["\n    mutation UpdateAddress($id: UUID!, $name: String!, $street: String!, $city: String!) {\n      updateAddress(dto: { name: $name, street: $street, city: $city, id: $id }) {\n        name\n        street\n        city\n        id\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query AddressListing {\n      addresses {\n        id\n        name\n      }\n    }\n  "): (typeof documents)["\n    query AddressListing {\n      addresses {\n        id\n        name\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation RemoveDescription($id: UUID!) {\n      removeDescription(id: $id)\n    }\n  "): (typeof documents)["\n    mutation RemoveDescription($id: UUID!) {\n      removeDescription(id: $id)\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation UpdateDescription($text: String!, $id: UUID!) {\n      updateDescription(text: $text, id: $id) {\n        text\n      }\n    }\n  "): (typeof documents)["\n    mutation UpdateDescription($text: String!, $id: UUID!) {\n      updateDescription(text: $text, id: $id) {\n        text\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query DescriptionsListing {\n      description {\n        id\n        text\n      }\n    }\n  "): (typeof documents)["\n    query DescriptionsListing {\n      description {\n        id\n        text\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation RemoveTravelCost($id: UUID!) {\n      removeTravelCost(id: $id)\n    }\n  "): (typeof documents)["\n    mutation RemoveTravelCost($id: UUID!) {\n      removeTravelCost(id: $id)\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation UpdateTravelCost($id: UUID!, $price: Decimal, $addressId: UUID!, $date: LocalDate, $description: String) {\n      updateTravelCost(dto: { price: $price, addressId: $addressId, date: $date, description: $description, id: $id }) {\n        id\n      }\n    }\n  "): (typeof documents)["\n    mutation UpdateTravelCost($id: UUID!, $price: Decimal, $addressId: UUID!, $date: LocalDate, $description: String) {\n      updateTravelCost(dto: { price: $price, addressId: $addressId, date: $date, description: $description, id: $id }) {\n        id\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetProductsForSelect {\n      products {\n        id\n        name\n      }\n    }\n  "): (typeof documents)["\n    query GetProductsForSelect {\n      products {\n        id\n        name\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation addProduct($dto: ProductCreateDtoInput!) {\n      createProduct(dto: $dto) {\n        name\n        id\n      }\n    }\n  "): (typeof documents)["\n    mutation addProduct($dto: ProductCreateDtoInput!) {\n      createProduct(dto: $dto) {\n        name\n        id\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation updateProduct($dto: ProductUpdateDtoInput!) {\n      updateProduct(dto: $dto) {\n        name\n        id\n      }\n    }\n  "): (typeof documents)["\n    mutation updateProduct($dto: ProductUpdateDtoInput!) {\n      updateProduct(dto: $dto) {\n        name\n        id\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation removeProduct($id: UUID!) {\n      removeProduct(id: $id)\n    }\n  "): (typeof documents)["\n    mutation removeProduct($id: UUID!) {\n      removeProduct(id: $id)\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation CreateUnit($name: String!) {\n      createUnit(dto: { name: $name }) {\n        name\n      }\n    }\n  "): (typeof documents)["\n    mutation CreateUnit($name: String!) {\n      createUnit(dto: { name: $name }) {\n        name\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation DeleteUnit($id: UUID!) {\n      deleteUnit(id: $id)\n    }\n  "): (typeof documents)["\n    mutation DeleteUnit($id: UUID!) {\n      deleteUnit(id: $id)\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation UpdateUnit($id: UUID!, $name: String!) {\n      updateUnit(dto: { name: $name, id: $id }) {\n        id\n      }\n    }\n  "): (typeof documents)["\n    mutation UpdateUnit($id: UUID!, $name: String!) {\n      updateUnit(dto: { name: $name, id: $id }) {\n        id\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query Addresses {\n      addresses {\n        name\n        city\n        street\n        id\n      }\n    }\n  "): (typeof documents)["\n    query Addresses {\n      addresses {\n        name\n        city\n        street\n        id\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query Descriptions {\n      description {\n        text\n        id\n      }\n    }\n  "): (typeof documents)["\n    query Descriptions {\n      description {\n        text\n        id\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query TravelCost($where: TravelCostFilterInput, $order: [TravelCostSortInput!]) {\n    travelCost(where: $where, order: $order) {\n      id\n      addressId\n      date\n      description\n      price\n      address {\n        name\n        street\n        city\n      }\n    }\n  }\n"): (typeof documents)["\n  query TravelCost($where: TravelCostFilterInput, $order: [TravelCostSortInput!]) {\n    travelCost(where: $where, order: $order) {\n      id\n      addressId\n      date\n      description\n      price\n      address {\n        name\n        street\n        city\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetCategories {\n      productCategories {\n        name\n        id\n      }\n    }\n  "): (typeof documents)["\n    query GetCategories {\n      productCategories {\n        name\n        id\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetProducts {\n      products {\n        id\n        carbs\n        category\n        fat\n        kcal\n        name\n        protein\n        salt\n        sugar\n        unit\n        productUnits {\n          id\n          amount\n          unit\n          isDefault\n          faktor\n        }\n      }\n    }\n  "): (typeof documents)["\n    query GetProducts {\n      products {\n        id\n        carbs\n        category\n        fat\n        kcal\n        name\n        protein\n        salt\n        sugar\n        unit\n        productUnits {\n          id\n          amount\n          unit\n          isDefault\n          faktor\n        }\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getRecipeDetails($id: UUID!) {\n    recipe(id: $id) {\n      id\n      name\n      portions\n      totalKcal\n      recipeProducts {\n        amount\n        description\n        groupPosition\n        productPosition\n        unit\n        kcal\n        activeUnitId\n        productId\n        product {\n          name\n        }\n      }\n      recipeDescriptions {\n        position\n        text\n        header\n      }\n      recipeHeaderProducts {\n        position\n        text\n      }\n    }\n  }\n"): (typeof documents)["\n  query getRecipeDetails($id: UUID!) {\n    recipe(id: $id) {\n      id\n      name\n      portions\n      totalKcal\n      recipeProducts {\n        amount\n        description\n        groupPosition\n        productPosition\n        unit\n        kcal\n        activeUnitId\n        productId\n        product {\n          name\n        }\n      }\n      recipeDescriptions {\n        position\n        text\n        header\n      }\n      recipeHeaderProducts {\n        position\n        text\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetUnits {\n      units {\n        name\n        id\n      }\n    }\n  "): (typeof documents)["\n    query GetUnits {\n      units {\n        name\n        id\n      }\n    }\n  "];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;