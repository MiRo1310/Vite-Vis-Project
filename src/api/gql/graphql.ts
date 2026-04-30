/* eslint-disable */
/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type AddressFilterInput = {
  and?: Array<AddressFilterInput> | null | undefined;
  city?: StringOperationFilterInput | null | undefined;
  createdAt?: DateTimeOperationFilterInput | null | undefined;
  id?: UuidOperationFilterInput | null | undefined;
  modifiedAt?: DateTimeOperationFilterInput | null | undefined;
  name?: StringOperationFilterInput | null | undefined;
  or?: Array<AddressFilterInput> | null | undefined;
  street?: StringOperationFilterInput | null | undefined;
  travelCost?: ListFilterInputTypeOfTravelCostFilterInput | null | undefined;
};

export type AddressSortInput = {
  city?: SortEnumType | null | undefined;
  createdAt?: SortEnumType | null | undefined;
  id?: SortEnumType | null | undefined;
  modifiedAt?: SortEnumType | null | undefined;
  name?: SortEnumType | null | undefined;
  street?: SortEnumType | null | undefined;
};

export type BooleanOperationFilterInput = {
  eq?: boolean | null | undefined;
  neq?: boolean | null | undefined;
};

export type DateTimeOperationFilterInput = {
  eq?: string | null | undefined;
  gt?: string | null | undefined;
  gte?: string | null | undefined;
  in?: Array<string | null | undefined> | null | undefined;
  lt?: string | null | undefined;
  lte?: string | null | undefined;
  neq?: string | null | undefined;
  ngt?: string | null | undefined;
  ngte?: string | null | undefined;
  nin?: Array<string | null | undefined> | null | undefined;
  nlt?: string | null | undefined;
  nlte?: string | null | undefined;
};

export type DecimalOperationFilterInput = {
  eq?: number | null | undefined;
  gt?: number | null | undefined;
  gte?: number | null | undefined;
  in?: Array<number | null | undefined> | null | undefined;
  lt?: number | null | undefined;
  lte?: number | null | undefined;
  neq?: number | null | undefined;
  ngt?: number | null | undefined;
  ngte?: number | null | undefined;
  nin?: Array<number | null | undefined> | null | undefined;
  nlt?: number | null | undefined;
  nlte?: number | null | undefined;
};

export type IntOperationFilterInput = {
  eq?: number | null | undefined;
  gt?: number | null | undefined;
  gte?: number | null | undefined;
  in?: Array<number | null | undefined> | null | undefined;
  lt?: number | null | undefined;
  lte?: number | null | undefined;
  neq?: number | null | undefined;
  ngt?: number | null | undefined;
  ngte?: number | null | undefined;
  nin?: Array<number | null | undefined> | null | undefined;
  nlt?: number | null | undefined;
  nlte?: number | null | undefined;
};

export type KeyValuePairOfStringAndListOfProductFilterInput = {
  and?: Array<KeyValuePairOfStringAndListOfProductFilterInput> | null | undefined;
  key?: StringOperationFilterInput | null | undefined;
  or?: Array<KeyValuePairOfStringAndListOfProductFilterInput> | null | undefined;
  value?: ListFilterInputTypeOfProductFilterInput | null | undefined;
};

export type ListFilterInputTypeOfProductFilterInput = {
  all?: ProductFilterInput | null | undefined;
  any?: boolean | null | undefined;
  none?: ProductFilterInput | null | undefined;
  some?: ProductFilterInput | null | undefined;
};

export type ListFilterInputTypeOfProductUnitFilterInput = {
  all?: ProductUnitFilterInput | null | undefined;
  any?: boolean | null | undefined;
  none?: ProductUnitFilterInput | null | undefined;
  some?: ProductUnitFilterInput | null | undefined;
};

export type ListFilterInputTypeOfRecipeDescriptionFilterInput = {
  all?: RecipeDescriptionFilterInput | null | undefined;
  any?: boolean | null | undefined;
  none?: RecipeDescriptionFilterInput | null | undefined;
  some?: RecipeDescriptionFilterInput | null | undefined;
};

export type ListFilterInputTypeOfRecipeProductFilterInput = {
  all?: RecipeProductFilterInput | null | undefined;
  any?: boolean | null | undefined;
  none?: RecipeProductFilterInput | null | undefined;
  some?: RecipeProductFilterInput | null | undefined;
};

export type ListFilterInputTypeOfRecipeProductHeaderFilterInput = {
  all?: RecipeProductHeaderFilterInput | null | undefined;
  any?: boolean | null | undefined;
  none?: RecipeProductHeaderFilterInput | null | undefined;
  some?: RecipeProductHeaderFilterInput | null | undefined;
};

export type ListFilterInputTypeOfTravelCostFilterInput = {
  all?: TravelCostFilterInput | null | undefined;
  any?: boolean | null | undefined;
  none?: TravelCostFilterInput | null | undefined;
  some?: TravelCostFilterInput | null | undefined;
};

export type LocalDateOperationFilterInput = {
  eq?: string | null | undefined;
  gt?: string | null | undefined;
  gte?: string | null | undefined;
  in?: Array<string | null | undefined> | null | undefined;
  lt?: string | null | undefined;
  lte?: string | null | undefined;
  neq?: string | null | undefined;
  ngt?: string | null | undefined;
  ngte?: string | null | undefined;
  nin?: Array<string | null | undefined> | null | undefined;
  nlt?: string | null | undefined;
  nlte?: string | null | undefined;
};

export type ProductCategoryFilterInput = {
  and?: Array<ProductCategoryFilterInput> | null | undefined;
  createdAt?: DateTimeOperationFilterInput | null | undefined;
  id?: UuidOperationFilterInput | null | undefined;
  modifiedAt?: DateTimeOperationFilterInput | null | undefined;
  name?: StringOperationFilterInput | null | undefined;
  or?: Array<ProductCategoryFilterInput> | null | undefined;
  products?: ListFilterInputTypeOfProductFilterInput | null | undefined;
};

export type ProductCreateDtoInput = {
  amount: number;
  carbs?: number | null | undefined;
  category?: string | null | undefined;
  ean?: string | null | undefined;
  fat?: number | null | undefined;
  kcal?: number | null | undefined;
  name: string;
  productUnits?: Array<ProductUnitCreateOrUpdateDtoInput | null | undefined> | null | undefined;
  protein?: number | null | undefined;
  salt?: number | null | undefined;
  sugar?: number | null | undefined;
  unit: string;
};

export type ProductFilterInput = {
  amount?: DecimalOperationFilterInput | null | undefined;
  and?: Array<ProductFilterInput> | null | undefined;
  carbs?: DecimalOperationFilterInput | null | undefined;
  category?: UuidOperationFilterInput | null | undefined;
  createdAt?: DateTimeOperationFilterInput | null | undefined;
  ean?: StringOperationFilterInput | null | undefined;
  fat?: DecimalOperationFilterInput | null | undefined;
  id?: UuidOperationFilterInput | null | undefined;
  kcal?: DecimalOperationFilterInput | null | undefined;
  modifiedAt?: DateTimeOperationFilterInput | null | undefined;
  name?: StringOperationFilterInput | null | undefined;
  or?: Array<ProductFilterInput> | null | undefined;
  productCategory?: ProductCategoryFilterInput | null | undefined;
  productUnits?: ListFilterInputTypeOfProductUnitFilterInput | null | undefined;
  protein?: DecimalOperationFilterInput | null | undefined;
  recipeProducts?: ListFilterInputTypeOfRecipeProductFilterInput | null | undefined;
  salt?: DecimalOperationFilterInput | null | undefined;
  sugar?: DecimalOperationFilterInput | null | undefined;
  unit?: StringOperationFilterInput | null | undefined;
};

export type ProductUnitCreateOrUpdateDtoInput = {
  amount: number;
  id?: string | null | undefined;
  unit: string;
};

export type ProductUnitFilterInput = {
  active?: BooleanOperationFilterInput | null | undefined;
  amount?: DecimalOperationFilterInput | null | undefined;
  and?: Array<ProductUnitFilterInput> | null | undefined;
  createdAt?: DateTimeOperationFilterInput | null | undefined;
  faktor?: DecimalOperationFilterInput | null | undefined;
  id?: UuidOperationFilterInput | null | undefined;
  isDefault?: BooleanOperationFilterInput | null | undefined;
  modifiedAt?: DateTimeOperationFilterInput | null | undefined;
  or?: Array<ProductUnitFilterInput> | null | undefined;
  product?: ProductFilterInput | null | undefined;
  productId?: UuidOperationFilterInput | null | undefined;
  unit?: StringOperationFilterInput | null | undefined;
};

export type ProductUpdateDtoInput = {
  amount?: number | null | undefined;
  carbs?: number | null | undefined;
  category?: string | null | undefined;
  ean?: string | null | undefined;
  fat?: number | null | undefined;
  id: string;
  kcal?: number | null | undefined;
  name?: string | null | undefined;
  productUnits?: Array<ProductUnitCreateOrUpdateDtoInput | null | undefined> | null | undefined;
  protein?: number | null | undefined;
  salt?: number | null | undefined;
  sugar?: number | null | undefined;
  unit?: string | null | undefined;
};

export type RecipeCategoryFilterInput = {
  and?: Array<RecipeCategoryFilterInput> | null | undefined;
  createdAt?: DateTimeOperationFilterInput | null | undefined;
  id?: UuidOperationFilterInput | null | undefined;
  modifiedAt?: DateTimeOperationFilterInput | null | undefined;
  name?: StringOperationFilterInput | null | undefined;
  or?: Array<RecipeCategoryFilterInput> | null | undefined;
};

export type RecipeCreateDtoInput = {
  name: string;
  portions: number;
  preparationTimeMin?: number | null | undefined;
  recipeCategoryId?: string | null | undefined;
  recipeDescriptions?: Array<RecipeDescriptionCreateOrUpdateDtoInput | null | undefined> | null | undefined;
  recipeHeaderProducts?: Array<RecipeHeaderProductCreateOrUpdateDtoInput | null | undefined> | null | undefined;
  recipeProducts?: Array<RecipeProductsCreateDtoInput | null | undefined> | null | undefined;
  totalTimeMin?: number | null | undefined;
};

export type RecipeDescriptionCreateOrUpdateDtoInput = {
  header: string;
  id?: string | null | undefined;
  position: number;
  text: string;
};

export type RecipeDescriptionFilterInput = {
  and?: Array<RecipeDescriptionFilterInput> | null | undefined;
  createdAt?: DateTimeOperationFilterInput | null | undefined;
  header?: StringOperationFilterInput | null | undefined;
  id?: UuidOperationFilterInput | null | undefined;
  modifiedAt?: DateTimeOperationFilterInput | null | undefined;
  or?: Array<RecipeDescriptionFilterInput> | null | undefined;
  position?: IntOperationFilterInput | null | undefined;
  recipe?: RecipeFilterInput | null | undefined;
  recipeId?: UuidOperationFilterInput | null | undefined;
  text?: StringOperationFilterInput | null | undefined;
};

export type RecipeFilterInput = {
  and?: Array<RecipeFilterInput> | null | undefined;
  createdAt?: DateTimeOperationFilterInput | null | undefined;
  id?: UuidOperationFilterInput | null | undefined;
  modifiedAt?: DateTimeOperationFilterInput | null | undefined;
  name?: StringOperationFilterInput | null | undefined;
  or?: Array<RecipeFilterInput> | null | undefined;
  portions?: IntOperationFilterInput | null | undefined;
  preparationTimeMin?: IntOperationFilterInput | null | undefined;
  recipeCategory?: RecipeCategoryFilterInput | null | undefined;
  recipeCategoryId?: UuidOperationFilterInput | null | undefined;
  recipeDescriptions?: ListFilterInputTypeOfRecipeDescriptionFilterInput | null | undefined;
  recipeHeaderProducts?: ListFilterInputTypeOfRecipeProductHeaderFilterInput | null | undefined;
  recipeProducts?: ListFilterInputTypeOfRecipeProductFilterInput | null | undefined;
  totalKcal?: IntOperationFilterInput | null | undefined;
  totalTimeMin?: IntOperationFilterInput | null | undefined;
};

export type RecipeGroupRemoveDtoInput = {
  position: number;
  recipeId: string;
};

export type RecipeHeaderProductCreateOrUpdateDtoInput = {
  id?: string | null | undefined;
  position: number;
  recipeId?: string | null | undefined;
  text: string;
};

export type RecipeProductFilterInput = {
  activeUnitId?: UuidOperationFilterInput | null | undefined;
  amount?: DecimalOperationFilterInput | null | undefined;
  and?: Array<RecipeProductFilterInput> | null | undefined;
  createdAt?: DateTimeOperationFilterInput | null | undefined;
  description?: StringOperationFilterInput | null | undefined;
  groupPosition?: IntOperationFilterInput | null | undefined;
  id?: UuidOperationFilterInput | null | undefined;
  kcal?: IntOperationFilterInput | null | undefined;
  modifiedAt?: DateTimeOperationFilterInput | null | undefined;
  or?: Array<RecipeProductFilterInput> | null | undefined;
  product?: ProductFilterInput | null | undefined;
  productId?: UuidOperationFilterInput | null | undefined;
  recipe?: RecipeFilterInput | null | undefined;
  recipeId?: UuidOperationFilterInput | null | undefined;
  sortOrder?: IntOperationFilterInput | null | undefined;
  unit?: StringOperationFilterInput | null | undefined;
};

export type RecipeProductHeaderFilterInput = {
  and?: Array<RecipeProductHeaderFilterInput> | null | undefined;
  createdAt?: DateTimeOperationFilterInput | null | undefined;
  id?: UuidOperationFilterInput | null | undefined;
  modifiedAt?: DateTimeOperationFilterInput | null | undefined;
  or?: Array<RecipeProductHeaderFilterInput> | null | undefined;
  position?: IntOperationFilterInput | null | undefined;
  recipe?: RecipeFilterInput | null | undefined;
  recipeId?: UuidOperationFilterInput | null | undefined;
  text?: StringOperationFilterInput | null | undefined;
};

export type RecipeProductsCreateDtoInput = {
  activeUnitId: string;
  amount: number;
  description?: string | null | undefined;
  factor?: number | null | undefined;
  groupPosition: number;
  id?: string | null | undefined;
  productId: string;
  recipeId?: string | null | undefined;
  sortOrder: number;
};

export type RecipeUpdateDtoInput = {
  id: string;
  name?: string | null | undefined;
  portions?: number | null | undefined;
  preparationTimeMin?: number | null | undefined;
  recipeCategoryId?: string | null | undefined;
  recipeDescriptions?: Array<RecipeDescriptionCreateOrUpdateDtoInput | null | undefined> | null | undefined;
  recipeHeaderProducts?: Array<RecipeHeaderProductCreateOrUpdateDtoInput | null | undefined> | null | undefined;
  recipeProducts?: Array<RecipeProductsCreateDtoInput | null | undefined> | null | undefined;
  totalTimeMin?: number | null | undefined;
};

export type SortEnumType =
  | 'ASC'
  | 'DESC';

export type StringOperationFilterInput = {
  and?: Array<StringOperationFilterInput> | null | undefined;
  contains?: string | null | undefined;
  endsWith?: string | null | undefined;
  eq?: string | null | undefined;
  in?: Array<string | null | undefined> | null | undefined;
  ncontains?: string | null | undefined;
  nendsWith?: string | null | undefined;
  neq?: string | null | undefined;
  nin?: Array<string | null | undefined> | null | undefined;
  nstartsWith?: string | null | undefined;
  or?: Array<StringOperationFilterInput> | null | undefined;
  startsWith?: string | null | undefined;
};

export type TravelCostFilterInput = {
  address?: AddressFilterInput | null | undefined;
  addressId?: UuidOperationFilterInput | null | undefined;
  and?: Array<TravelCostFilterInput> | null | undefined;
  createdAt?: DateTimeOperationFilterInput | null | undefined;
  date?: LocalDateOperationFilterInput | null | undefined;
  description?: StringOperationFilterInput | null | undefined;
  id?: UuidOperationFilterInput | null | undefined;
  modifiedAt?: DateTimeOperationFilterInput | null | undefined;
  or?: Array<TravelCostFilterInput> | null | undefined;
  price?: DecimalOperationFilterInput | null | undefined;
};

export type TravelCostSortInput = {
  address?: AddressSortInput | null | undefined;
  addressId?: SortEnumType | null | undefined;
  createdAt?: SortEnumType | null | undefined;
  date?: SortEnumType | null | undefined;
  description?: SortEnumType | null | undefined;
  id?: SortEnumType | null | undefined;
  modifiedAt?: SortEnumType | null | undefined;
  price?: SortEnumType | null | undefined;
};

export type UuidOperationFilterInput = {
  eq?: string | null | undefined;
  gt?: string | null | undefined;
  gte?: string | null | undefined;
  in?: Array<string | null | undefined> | null | undefined;
  lt?: string | null | undefined;
  lte?: string | null | undefined;
  neq?: string | null | undefined;
  ngt?: string | null | undefined;
  ngte?: string | null | undefined;
  nin?: Array<string | null | undefined> | null | undefined;
  nlt?: string | null | undefined;
  nlte?: string | null | undefined;
};

export type AddAddressMutationVariables = Exact<{
  name: string;
  street: string;
  city: string;
}>;


export type AddAddressMutation = { createAddress: { name: string | null, street: string | null, city: string | null } };

export type AddDescriptionMutationVariables = Exact<{
  text: string;
}>;


export type AddDescriptionMutation = { createDescription: { text: string } };

export type AddTravelCostMutationVariables = Exact<{
  price?: number | null | undefined;
  description?: string | null | undefined;
  date?: string | null | undefined;
  addressId?: string | null | undefined;
}>;


export type AddTravelCostMutation = { createTravelCost: { id: string } };

export type RemoveAddressMutationVariables = Exact<{
  id: string;
}>;


export type RemoveAddressMutation = { removeAddress: boolean };

export type UpdateAddressMutationVariables = Exact<{
  id: string;
  name: string;
  street: string;
  city: string;
}>;


export type UpdateAddressMutation = { updateAddress: { name: string | null, street: string | null, city: string | null, id: string } | null };

export type AddressListingQueryVariables = Exact<{ [key: string]: never; }>;


export type AddressListingQuery = { addresses: Array<{ id: string, name: string | null }> };

export type RemoveDescriptionMutationVariables = Exact<{
  id: string;
}>;


export type RemoveDescriptionMutation = { removeDescription: boolean };

export type UpdateDescriptionMutationVariables = Exact<{
  text: string;
  id: string;
}>;


export type UpdateDescriptionMutation = { updateDescription: { text: string } | null };

export type DescriptionsListingQueryVariables = Exact<{ [key: string]: never; }>;


export type DescriptionsListingQuery = { description: Array<{ id: string, text: string }> };

export type RemoveTravelCostMutationVariables = Exact<{
  id: string;
}>;


export type RemoveTravelCostMutation = { removeTravelCost: boolean };

export type UpdateTravelCostMutationVariables = Exact<{
  id: string;
  price?: number | null | undefined;
  addressId: string;
  date?: string | null | undefined;
  description?: string | null | undefined;
}>;


export type UpdateTravelCostMutation = { updateTravelCost: { id: string } | null };

export type AddCategoryMutationVariables = Exact<{
  name: string;
}>;


export type AddCategoryMutation = { createProductCategory: { id: string, name: string } | null };

export type DeleteCategoryMutationVariables = Exact<{
  id: string;
}>;


export type DeleteCategoryMutation = { removeProductCategory: boolean };

export type UpdateProductCategoryMutationVariables = Exact<{
  id: string;
  name: string;
}>;


export type UpdateProductCategoryMutation = { updateProductCategory: { id: string } | null };

export type AddProductMutationVariables = Exact<{
  dto: ProductCreateDtoInput;
}>;


export type AddProductMutation = { createProduct: { name: string, id: string } | null };

export type UpdateProductMutationVariables = Exact<{
  dto: ProductUpdateDtoInput;
}>;


export type UpdateProductMutation = { updateProduct: { name: string, id: string } | null };

export type RemoveProductUnitMutationVariables = Exact<{
  id: string;
}>;


export type RemoveProductUnitMutation = { removeProductUnit: boolean };

export type LocalProductsByCodeQueryVariables = Exact<{
  code: string;
}>;


export type LocalProductsByCodeQuery = { foodFactsProductByCode: { code: string, additionalData: Array<{ key: string, value: unknown }>, openFoodFactProduct: { brands: string | null, additionalProductData: Array<{ value: unknown, key: string }>, nutriments: { carbohydrates100g: number | null, addedSugars100g: number | null, energy100g: number | null, fat100g: number | null, energyKcal100g: number | null, proteins100g: number | null, salt100g: number | null } | null } | null } | null };

export type FoodFactsProductsBySearchQueryVariables = Exact<{
  search: string;
}>;


export type FoodFactsProductsBySearchQuery = { foodFactsProductsBySearch: { count: number, page: number, pageCount: number, pageSize: number, additionalData: Array<{ value: unknown, key: string }>, products: Array<{ brands: string | null, categoriesTags: Array<string> | null, genericNameDe: string | null, manufacturingPlacesTags: Array<string> | null, additionalProductData: Array<{ value: unknown, key: string }> }> } | null };

export type GetProductByIdQueryVariables = Exact<{
  id: string;
}>;


export type GetProductByIdQuery = { product: { id: string, carbs: number | null, category: string | null, fat: number | null, kcal: number | null, name: string, protein: number | null, salt: number | null, sugar: number | null, ean: string | null, productUnits: Array<{ modifiedAt: string | null, createdAt: string, id: string, productId: string, amount: number | null, unit: string, isDefault: boolean }> } | null };

export type RemoveCategoryMutationVariables = Exact<{
  id: string;
}>;


export type RemoveCategoryMutation = { removeProductCategory: boolean };

export type RenameCategoryMutationVariables = Exact<{
  name: string;
  id: string;
}>;


export type RenameCategoryMutation = { updateProductCategory: { name: string, id: string } | null };

export type RemoveProductMutationVariables = Exact<{
  id: string;
}>;


export type RemoveProductMutation = { removeProduct: boolean };

export type AddRecipeCategoryMutationVariables = Exact<{
  name: string;
}>;


export type AddRecipeCategoryMutation = { createRecipeCategory: { id: string, name: string } | null };

export type RemoveRecipeCategoryMutationVariables = Exact<{
  id: string;
}>;


export type RemoveRecipeCategoryMutation = { removeRecipeCategory: boolean };

export type UpdateRecipeCategoryMutationVariables = Exact<{
  id: string;
  name: string;
}>;


export type UpdateRecipeCategoryMutation = { updateRecipeCategory: { id: string } | null };

export type ProductUnitsQueryVariables = Exact<{ [key: string]: never; }>;


export type ProductUnitsQuery = { productUnits: Array<{ id: string, unit: string }> };

export type AddRecipeMutationVariables = Exact<{
  dto: RecipeCreateDtoInput;
}>;


export type AddRecipeMutation = { createRecipe: { id: string } };

export type UpdateRecipeMutationVariables = Exact<{
  dto: RecipeUpdateDtoInput;
}>;


export type UpdateRecipeMutation = { updateRecipe: { id: string } | null };

export type GetRecipeByIdQueryVariables = Exact<{
  id: string;
}>;


export type GetRecipeByIdQuery = { recipe: { id: string, name: string, createdAt: string, modifiedAt: string | null, portions: number | null, recipeCategoryId: string | null, preparationTimeMin: number | null, totalTimeMin: number | null, recipeProducts: Array<{ amount: number, description: string, productId: string, groupPosition: number, unit: string, id: string, kcal: number, activeUnitId: string, sortOrder: number, product: { name: string } | null }>, recipeDescriptions: Array<{ position: number, text: string, id: string, header: string }>, recipeHeaderProducts: Array<{ id: string, position: number, recipeId: string, text: string }> } | null };

export type ProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type ProductsQuery = { products: Array<{ id: string, carbs: number | null, category: string | null, fat: number | null, kcal: number | null, name: string, protein: number | null, salt: number | null, sugar: number | null, productUnits: Array<{ id: string, unit: string, amount: number | null, isDefault: boolean, faktor: number }> }> };

export type GetProductUnitsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProductUnitsQuery = { productUnits: Array<{ id: string, createdAt: string, modifiedAt: string | null, productId: string, amount: number | null, unit: string }> };

export type GetProductsForSelectQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProductsForSelectQuery = { products: Array<{ id: string, name: string, productCategory: { name: string } | null }> };

export type RemoveTextAreaMutationVariables = Exact<{
  id: string;
}>;


export type RemoveTextAreaMutation = { removeTextArea: boolean };

export type RemoveRecipeGroupMutationVariables = Exact<{
  dto: RecipeGroupRemoveDtoInput;
}>;


export type RemoveRecipeGroupMutation = { removeProductGroup: boolean };

export type RemoveRecipeProductMutationVariables = Exact<{
  id: string;
}>;


export type RemoveRecipeProductMutation = { removeRecipeProduct: boolean };

export type RemoveRecipeMutationVariables = Exact<{
  id: string;
}>;


export type RemoveRecipeMutation = { removeRecipe: boolean };

export type CreateUnitMutationVariables = Exact<{
  name: string;
}>;


export type CreateUnitMutation = { createUnit: { name: string } };

export type DeleteUnitMutationVariables = Exact<{
  id: string;
}>;


export type DeleteUnitMutation = { deleteUnit: boolean };

export type UpdateUnitMutationVariables = Exact<{
  id: string;
  name: string;
}>;


export type UpdateUnitMutation = { updateUnit: { id: string } | null };

export type ProductCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type ProductCategoriesQuery = { productCategories: Array<{ id: string, name: string }> };

export type RecipeCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type RecipeCategoriesQuery = { recipeCategories: Array<{ id: string, name: string }> };

export type UnitsQueryVariables = Exact<{ [key: string]: never; }>;


export type UnitsQuery = { units: Array<{ id: string, name: string }> };

export type AddressesQueryVariables = Exact<{ [key: string]: never; }>;


export type AddressesQuery = { addresses: Array<{ name: string | null, city: string | null, street: string | null, id: string }> };

export type DescriptionsQueryVariables = Exact<{ [key: string]: never; }>;


export type DescriptionsQuery = { description: Array<{ text: string, id: string }> };

export type TravelCostQueryVariables = Exact<{
  where?: TravelCostFilterInput | null | undefined;
  order?: Array<TravelCostSortInput> | TravelCostSortInput | null | undefined;
}>;


export type TravelCostQuery = { travelCost: Array<{ id: string, addressId: string | null, date: string | null, description: string | null, price: number | null, address: { name: string | null, street: string | null, city: string | null } | null }> };

export type GetProductsQueryVariables = Exact<{
  where?: KeyValuePairOfStringAndListOfProductFilterInput | null | undefined;
}>;


export type GetProductsQuery = { productsGrouped: Array<{ key: string, value: Array<{ id: string, carbs: number | null, fat: number | null, kcal: number | null, name: string, protein: number | null, salt: number | null, sugar: number | null, unit: string, ean: string | null, amount: number, productUnits: Array<{ id: string, amount: number | null, unit: string }> }> }> };

export type GetRecipeDetailsQueryVariables = Exact<{
  id: string;
}>;


export type GetRecipeDetailsQuery = { recipe: { id: string, name: string, portions: number | null, totalKcal: number, preparationTimeMin: number | null, totalTimeMin: number | null, recipeProducts: Array<{ amount: number, description: string, groupPosition: number, unit: string, kcal: number, activeUnitId: string, productId: string, product: { name: string, category: string | null, carbs: number | null, fat: number | null, kcal: number | null, protein: number | null, salt: number | null, sugar: number | null } | null }>, recipeDescriptions: Array<{ position: number, text: string, header: string }>, recipeHeaderProducts: Array<{ position: number, text: string }> } | null };

export type RecipesQueryVariables = Exact<{ [key: string]: never; }>;


export type RecipesQuery = { recipes: Array<{ id: string, name: string, createdAt: string, totalTimeMin: number | null, preparationTimeMin: number | null, totalKcal: number, recipeCategory: { name: string, id: string } | null }> };


export const AddAddressDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddAddress"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"street"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"city"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createAddress"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"dto"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"street"},"value":{"kind":"Variable","name":{"kind":"Name","value":"street"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"city"},"value":{"kind":"Variable","name":{"kind":"Name","value":"city"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"street"}},{"kind":"Field","name":{"kind":"Name","value":"city"}}]}}]}}]} as unknown as DocumentNode<AddAddressMutation, AddAddressMutationVariables>;
export const AddDescriptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddDescription"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"text"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createDescription"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"text"},"value":{"kind":"Variable","name":{"kind":"Name","value":"text"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"text"}}]}}]}}]} as unknown as DocumentNode<AddDescriptionMutation, AddDescriptionMutationVariables>;
export const AddTravelCostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddTravelCost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"price"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Decimal"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"date"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"LocalDate"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"addressId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTravelCost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"dto"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"price"},"value":{"kind":"Variable","name":{"kind":"Name","value":"price"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"date"},"value":{"kind":"Variable","name":{"kind":"Name","value":"date"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"addressId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"addressId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<AddTravelCostMutation, AddTravelCostMutationVariables>;
export const RemoveAddressDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveAddress"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeAddress"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<RemoveAddressMutation, RemoveAddressMutationVariables>;
export const UpdateAddressDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateAddress"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"street"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"city"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateAddress"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"dto"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"street"},"value":{"kind":"Variable","name":{"kind":"Name","value":"street"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"city"},"value":{"kind":"Variable","name":{"kind":"Name","value":"city"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"street"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateAddressMutation, UpdateAddressMutationVariables>;
export const AddressListingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AddressListing"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addresses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<AddressListingQuery, AddressListingQueryVariables>;
export const RemoveDescriptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveDescription"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeDescription"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<RemoveDescriptionMutation, RemoveDescriptionMutationVariables>;
export const UpdateDescriptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateDescription"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"text"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateDescription"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"text"},"value":{"kind":"Variable","name":{"kind":"Name","value":"text"}}},{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"text"}}]}}]}}]} as unknown as DocumentNode<UpdateDescriptionMutation, UpdateDescriptionMutationVariables>;
export const DescriptionsListingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"DescriptionsListing"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"description"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}}]}}]}}]} as unknown as DocumentNode<DescriptionsListingQuery, DescriptionsListingQueryVariables>;
export const RemoveTravelCostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveTravelCost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeTravelCost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<RemoveTravelCostMutation, RemoveTravelCostMutationVariables>;
export const UpdateTravelCostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateTravelCost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"price"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Decimal"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"addressId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"date"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"LocalDate"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateTravelCost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"dto"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"price"},"value":{"kind":"Variable","name":{"kind":"Name","value":"price"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"addressId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"addressId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"date"},"value":{"kind":"Variable","name":{"kind":"Name","value":"date"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateTravelCostMutation, UpdateTravelCostMutationVariables>;
export const AddCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createProductCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"dto"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<AddCategoryMutation, AddCategoryMutationVariables>;
export const DeleteCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeProductCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteCategoryMutation, DeleteCategoryMutationVariables>;
export const UpdateProductCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateProductCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateProductCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"dto"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateProductCategoryMutation, UpdateProductCategoryMutationVariables>;
export const AddProductDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addProduct"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ProductCreateDtoInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createProduct"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"dto"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<AddProductMutation, AddProductMutationVariables>;
export const UpdateProductDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateProduct"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ProductUpdateDtoInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateProduct"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"dto"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateProductMutation, UpdateProductMutationVariables>;
export const RemoveProductUnitDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"removeProductUnit"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeProductUnit"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<RemoveProductUnitMutation, RemoveProductUnitMutationVariables>;
export const LocalProductsByCodeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"localProductsByCode"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"code"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"foodFactsProductByCode"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"code"},"value":{"kind":"Variable","name":{"kind":"Name","value":"code"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"additionalData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"openFoodFactProduct"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"brands"}},{"kind":"Field","name":{"kind":"Name","value":"additionalProductData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"key"}}]}},{"kind":"Field","name":{"kind":"Name","value":"nutriments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"carbohydrates100g"}},{"kind":"Field","name":{"kind":"Name","value":"addedSugars100g"}},{"kind":"Field","name":{"kind":"Name","value":"energy100g"}},{"kind":"Field","name":{"kind":"Name","value":"fat100g"}},{"kind":"Field","name":{"kind":"Name","value":"energyKcal100g"}},{"kind":"Field","name":{"kind":"Name","value":"proteins100g"}},{"kind":"Field","name":{"kind":"Name","value":"salt100g"}}]}}]}}]}}]}}]} as unknown as DocumentNode<LocalProductsByCodeQuery, LocalProductsByCodeQueryVariables>;
export const FoodFactsProductsBySearchDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"foodFactsProductsBySearch"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"search"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"foodFactsProductsBySearch"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"search"},"value":{"kind":"Variable","name":{"kind":"Name","value":"search"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"additionalData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"key"}}]}},{"kind":"Field","name":{"kind":"Name","value":"products"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"additionalProductData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"key"}}]}},{"kind":"Field","name":{"kind":"Name","value":"brands"}},{"kind":"Field","name":{"kind":"Name","value":"categoriesTags"}},{"kind":"Field","name":{"kind":"Name","value":"genericNameDe"}},{"kind":"Field","name":{"kind":"Name","value":"manufacturingPlacesTags"}}]}},{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"pageCount"}},{"kind":"Field","name":{"kind":"Name","value":"pageSize"}}]}}]}}]} as unknown as DocumentNode<FoodFactsProductsBySearchQuery, FoodFactsProductsBySearchQueryVariables>;
export const GetProductByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getProductById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"product"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"carbs"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"fat"}},{"kind":"Field","name":{"kind":"Name","value":"kcal"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"protein"}},{"kind":"Field","name":{"kind":"Name","value":"salt"}},{"kind":"Field","name":{"kind":"Name","value":"sugar"}},{"kind":"Field","name":{"kind":"Name","value":"ean"}},{"kind":"Field","name":{"kind":"Name","value":"productUnits"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"modifiedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"productId"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"isDefault"}}]}}]}}]}}]} as unknown as DocumentNode<GetProductByIdQuery, GetProductByIdQueryVariables>;
export const RemoveCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"removeCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeProductCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<RemoveCategoryMutation, RemoveCategoryMutationVariables>;
export const RenameCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"renameCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateProductCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"dto"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<RenameCategoryMutation, RenameCategoryMutationVariables>;
export const RemoveProductDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"removeProduct"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeProduct"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<RemoveProductMutation, RemoveProductMutationVariables>;
export const AddRecipeCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addRecipeCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createRecipeCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"dto"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<AddRecipeCategoryMutation, AddRecipeCategoryMutationVariables>;
export const RemoveRecipeCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveRecipeCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeRecipeCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<RemoveRecipeCategoryMutation, RemoveRecipeCategoryMutationVariables>;
export const UpdateRecipeCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateRecipeCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateRecipeCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"dto"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateRecipeCategoryMutation, UpdateRecipeCategoryMutationVariables>;
export const ProductUnitsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"productUnits"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"productUnits"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}}]}}]}}]} as unknown as DocumentNode<ProductUnitsQuery, ProductUnitsQueryVariables>;
export const AddRecipeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addRecipe"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RecipeCreateDtoInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createRecipe"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"dto"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<AddRecipeMutation, AddRecipeMutationVariables>;
export const UpdateRecipeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateRecipe"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RecipeUpdateDtoInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateRecipe"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"dto"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateRecipeMutation, UpdateRecipeMutationVariables>;
export const GetRecipeByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getRecipeById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"recipe"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"modifiedAt"}},{"kind":"Field","name":{"kind":"Name","value":"portions"}},{"kind":"Field","name":{"kind":"Name","value":"recipeCategoryId"}},{"kind":"Field","name":{"kind":"Name","value":"preparationTimeMin"}},{"kind":"Field","name":{"kind":"Name","value":"totalTimeMin"}},{"kind":"Field","name":{"kind":"Name","value":"recipeProducts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"productId"}},{"kind":"Field","name":{"kind":"Name","value":"groupPosition"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"kcal"}},{"kind":"Field","name":{"kind":"Name","value":"activeUnitId"}},{"kind":"Field","name":{"kind":"Name","value":"sortOrder"}},{"kind":"Field","name":{"kind":"Name","value":"product"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"recipeDescriptions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"header"}}]}},{"kind":"Field","name":{"kind":"Name","value":"recipeHeaderProducts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"recipeId"}},{"kind":"Field","name":{"kind":"Name","value":"text"}}]}}]}}]}}]} as unknown as DocumentNode<GetRecipeByIdQuery, GetRecipeByIdQueryVariables>;
export const ProductsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"products"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"products"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"carbs"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"fat"}},{"kind":"Field","name":{"kind":"Name","value":"kcal"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"protein"}},{"kind":"Field","name":{"kind":"Name","value":"salt"}},{"kind":"Field","name":{"kind":"Name","value":"sugar"}},{"kind":"Field","name":{"kind":"Name","value":"kcal"}},{"kind":"Field","name":{"kind":"Name","value":"productUnits"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"isDefault"}},{"kind":"Field","name":{"kind":"Name","value":"faktor"}}]}}]}}]}}]} as unknown as DocumentNode<ProductsQuery, ProductsQueryVariables>;
export const GetProductUnitsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getProductUnits"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"productUnits"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"modifiedAt"}},{"kind":"Field","name":{"kind":"Name","value":"productId"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}}]}}]}}]} as unknown as DocumentNode<GetProductUnitsQuery, GetProductUnitsQueryVariables>;
export const GetProductsForSelectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetProductsForSelect"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"products"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"productCategory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetProductsForSelectQuery, GetProductsForSelectQueryVariables>;
export const RemoveTextAreaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveTextArea"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeTextArea"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<RemoveTextAreaMutation, RemoveTextAreaMutationVariables>;
export const RemoveRecipeGroupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveRecipeGroup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RecipeGroupRemoveDtoInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeProductGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"dto"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dto"}}}]}]}}]} as unknown as DocumentNode<RemoveRecipeGroupMutation, RemoveRecipeGroupMutationVariables>;
export const RemoveRecipeProductDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"removeRecipeProduct"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeRecipeProduct"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<RemoveRecipeProductMutation, RemoveRecipeProductMutationVariables>;
export const RemoveRecipeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"removeRecipe"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeRecipe"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<RemoveRecipeMutation, RemoveRecipeMutationVariables>;
export const CreateUnitDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateUnit"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUnit"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"dto"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CreateUnitMutation, CreateUnitMutationVariables>;
export const DeleteUnitDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteUnit"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteUnit"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteUnitMutation, DeleteUnitMutationVariables>;
export const UpdateUnitDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUnit"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUnit"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"dto"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateUnitMutation, UpdateUnitMutationVariables>;
export const ProductCategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ProductCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"productCategories"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"order"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"EnumValue","value":"ASC"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<ProductCategoriesQuery, ProductCategoriesQueryVariables>;
export const RecipeCategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"recipeCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"recipeCategories"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"order"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"EnumValue","value":"ASC"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<RecipeCategoriesQuery, RecipeCategoriesQueryVariables>;
export const UnitsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Units"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"units"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"order"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"EnumValue","value":"ASC"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<UnitsQuery, UnitsQueryVariables>;
export const AddressesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Addresses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addresses"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"order"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"EnumValue","value":"ASC"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"street"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<AddressesQuery, AddressesQueryVariables>;
export const DescriptionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Descriptions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"description"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DescriptionsQuery, DescriptionsQueryVariables>;
export const TravelCostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TravelCost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"TravelCostFilterInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"order"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TravelCostSortInput"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"travelCost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}},{"kind":"Argument","name":{"kind":"Name","value":"order"},"value":{"kind":"Variable","name":{"kind":"Name","value":"order"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"addressId"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"address"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"street"}},{"kind":"Field","name":{"kind":"Name","value":"city"}}]}}]}}]}}]} as unknown as DocumentNode<TravelCostQuery, TravelCostQueryVariables>;
export const GetProductsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetProducts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"KeyValuePairOfStringAndListOfProductFilterInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"productsGrouped"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"carbs"}},{"kind":"Field","name":{"kind":"Name","value":"fat"}},{"kind":"Field","name":{"kind":"Name","value":"kcal"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"protein"}},{"kind":"Field","name":{"kind":"Name","value":"salt"}},{"kind":"Field","name":{"kind":"Name","value":"sugar"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"ean"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"productUnits"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetProductsQuery, GetProductsQueryVariables>;
export const GetRecipeDetailsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getRecipeDetails"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"recipe"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"portions"}},{"kind":"Field","name":{"kind":"Name","value":"totalKcal"}},{"kind":"Field","name":{"kind":"Name","value":"preparationTimeMin"}},{"kind":"Field","name":{"kind":"Name","value":"totalTimeMin"}},{"kind":"Field","name":{"kind":"Name","value":"recipeProducts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"groupPosition"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"kcal"}},{"kind":"Field","name":{"kind":"Name","value":"activeUnitId"}},{"kind":"Field","name":{"kind":"Name","value":"productId"}},{"kind":"Field","name":{"kind":"Name","value":"product"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"carbs"}},{"kind":"Field","name":{"kind":"Name","value":"fat"}},{"kind":"Field","name":{"kind":"Name","value":"kcal"}},{"kind":"Field","name":{"kind":"Name","value":"protein"}},{"kind":"Field","name":{"kind":"Name","value":"salt"}},{"kind":"Field","name":{"kind":"Name","value":"sugar"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"recipeDescriptions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"header"}}]}},{"kind":"Field","name":{"kind":"Name","value":"recipeHeaderProducts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"text"}}]}}]}}]}}]} as unknown as DocumentNode<GetRecipeDetailsQuery, GetRecipeDetailsQueryVariables>;
export const RecipesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"recipes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"recipes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"totalTimeMin"}},{"kind":"Field","name":{"kind":"Name","value":"preparationTimeMin"}},{"kind":"Field","name":{"kind":"Name","value":"totalKcal"}},{"kind":"Field","name":{"kind":"Name","value":"recipeCategory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<RecipesQuery, RecipesQueryVariables>;