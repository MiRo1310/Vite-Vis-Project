/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** The `DateTime` scalar represents an ISO-8601 compliant date time type. */
  DateTime: { input: string; output: string; }
  /** The `Decimal` scalar type represents a decimal floating-point number. */
  Decimal: { input: number; output: number; }
  /** The `LocalDate` scalar type represents a ISO date string, represented as UTF-8 character sequences YYYY-MM-DD. The scalar follows the specification defined in RFC3339 */
  LocalDate: { input: any; output: any; }
  UUID: { input: string; output: string; }
};

export type Address = {
  __typename?: 'Address';
  city?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['UUID']['output'];
  modifiedAt?: Maybe<Scalars['DateTime']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  street?: Maybe<Scalars['String']['output']>;
  travelCost: Array<TravelCost>;
};

export type AddressCreateDtoInput = {
  city?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  street?: InputMaybe<Scalars['String']['input']>;
};

export type AddressFilterInput = {
  and?: InputMaybe<Array<AddressFilterInput>>;
  city?: InputMaybe<StringOperationFilterInput>;
  createdAt?: InputMaybe<DateTimeOperationFilterInput>;
  id?: InputMaybe<UuidOperationFilterInput>;
  modifiedAt?: InputMaybe<DateTimeOperationFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<AddressFilterInput>>;
  street?: InputMaybe<StringOperationFilterInput>;
  travelCost?: InputMaybe<ListFilterInputTypeOfTravelCostFilterInput>;
};

export type AddressSortInput = {
  city?: InputMaybe<SortEnumType>;
  createdAt?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  modifiedAt?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
  street?: InputMaybe<SortEnumType>;
};

export type AddressUpdateDtoInput = {
  city?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['UUID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  street?: InputMaybe<Scalars['String']['input']>;
};

export type BooleanOperationFilterInput = {
  eq?: InputMaybe<Scalars['Boolean']['input']>;
  neq?: InputMaybe<Scalars['Boolean']['input']>;
};

export type DateTimeOperationFilterInput = {
  eq?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  neq?: InputMaybe<Scalars['DateTime']['input']>;
  ngt?: InputMaybe<Scalars['DateTime']['input']>;
  ngte?: InputMaybe<Scalars['DateTime']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  nlt?: InputMaybe<Scalars['DateTime']['input']>;
  nlte?: InputMaybe<Scalars['DateTime']['input']>;
};

export type DecimalOperationFilterInput = {
  eq?: InputMaybe<Scalars['Decimal']['input']>;
  gt?: InputMaybe<Scalars['Decimal']['input']>;
  gte?: InputMaybe<Scalars['Decimal']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Decimal']['input']>>>;
  lt?: InputMaybe<Scalars['Decimal']['input']>;
  lte?: InputMaybe<Scalars['Decimal']['input']>;
  neq?: InputMaybe<Scalars['Decimal']['input']>;
  ngt?: InputMaybe<Scalars['Decimal']['input']>;
  ngte?: InputMaybe<Scalars['Decimal']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Decimal']['input']>>>;
  nlt?: InputMaybe<Scalars['Decimal']['input']>;
  nlte?: InputMaybe<Scalars['Decimal']['input']>;
};

export type Description = {
  __typename?: 'Description';
  id: Scalars['UUID']['output'];
  text: Scalars['String']['output'];
};

export type DescriptionFilterInput = {
  and?: InputMaybe<Array<DescriptionFilterInput>>;
  id?: InputMaybe<UuidOperationFilterInput>;
  or?: InputMaybe<Array<DescriptionFilterInput>>;
  text?: InputMaybe<StringOperationFilterInput>;
};

export type DescriptionSortInput = {
  id?: InputMaybe<SortEnumType>;
  text?: InputMaybe<SortEnumType>;
};

export enum ErrorCode {
  Exist = 'EXIST',
  InUse = 'IN_USE',
  NotFound = 'NOT_FOUND',
  Success = 'SUCCESS'
}

export type IntOperationFilterInput = {
  eq?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  neq?: InputMaybe<Scalars['Int']['input']>;
  ngt?: InputMaybe<Scalars['Int']['input']>;
  ngte?: InputMaybe<Scalars['Int']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  nlt?: InputMaybe<Scalars['Int']['input']>;
  nlte?: InputMaybe<Scalars['Int']['input']>;
};

export type KeyValuePairOfStringAndListOfProduct = {
  __typename?: 'KeyValuePairOfStringAndListOfProduct';
  key: Scalars['String']['output'];
  value: Array<Product>;
};

export type KeyValuePairOfStringAndListOfProductFilterInput = {
  and?: InputMaybe<Array<KeyValuePairOfStringAndListOfProductFilterInput>>;
  key?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<KeyValuePairOfStringAndListOfProductFilterInput>>;
  value?: InputMaybe<ListFilterInputTypeOfProductFilterInput>;
};

export type ListFilterInputTypeOfProductFilterInput = {
  all?: InputMaybe<ProductFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<ProductFilterInput>;
  some?: InputMaybe<ProductFilterInput>;
};

export type ListFilterInputTypeOfProductUnitFilterInput = {
  all?: InputMaybe<ProductUnitFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<ProductUnitFilterInput>;
  some?: InputMaybe<ProductUnitFilterInput>;
};

export type ListFilterInputTypeOfRecipeDescriptionFilterInput = {
  all?: InputMaybe<RecipeDescriptionFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<RecipeDescriptionFilterInput>;
  some?: InputMaybe<RecipeDescriptionFilterInput>;
};

export type ListFilterInputTypeOfRecipeProductFilterInput = {
  all?: InputMaybe<RecipeProductFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<RecipeProductFilterInput>;
  some?: InputMaybe<RecipeProductFilterInput>;
};

export type ListFilterInputTypeOfRecipeProductHeaderFilterInput = {
  all?: InputMaybe<RecipeProductHeaderFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<RecipeProductHeaderFilterInput>;
  some?: InputMaybe<RecipeProductHeaderFilterInput>;
};

export type ListFilterInputTypeOfTravelCostFilterInput = {
  all?: InputMaybe<TravelCostFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<TravelCostFilterInput>;
  some?: InputMaybe<TravelCostFilterInput>;
};

export type LocalDateOperationFilterInput = {
  eq?: InputMaybe<Scalars['LocalDate']['input']>;
  gt?: InputMaybe<Scalars['LocalDate']['input']>;
  gte?: InputMaybe<Scalars['LocalDate']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['LocalDate']['input']>>>;
  lt?: InputMaybe<Scalars['LocalDate']['input']>;
  lte?: InputMaybe<Scalars['LocalDate']['input']>;
  neq?: InputMaybe<Scalars['LocalDate']['input']>;
  ngt?: InputMaybe<Scalars['LocalDate']['input']>;
  ngte?: InputMaybe<Scalars['LocalDate']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['LocalDate']['input']>>>;
  nlt?: InputMaybe<Scalars['LocalDate']['input']>;
  nlte?: InputMaybe<Scalars['LocalDate']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createAddress: Address;
  createDescription: Description;
  createProduct: Product;
  createProductCategory: ResponseOfProductCategory;
  createRecipe: Recipe;
  createRecipeCategory: ResponseOfRecipeCategory;
  createTravelCost: TravelCost;
  createUnit: Unit;
  deleteUnit: ResponseOfBoolean;
  removeAddress: Scalars['Boolean']['output'];
  removeDescription: Scalars['Boolean']['output'];
  removeProduct: ResponseOfBoolean;
  removeProductCategory: ResponseOfBoolean;
  removeProductGroup: Scalars['Boolean']['output'];
  removeProductUnit: Scalars['Boolean']['output'];
  removeRecipe: Scalars['Boolean']['output'];
  removeRecipeCategory: ResponseOfBoolean;
  removeRecipeProduct: Scalars['Boolean']['output'];
  removeTextArea: Scalars['Boolean']['output'];
  removeTravelCost: Scalars['Boolean']['output'];
  updateAddress?: Maybe<Address>;
  updateDescription?: Maybe<Description>;
  updateProduct?: Maybe<Product>;
  updateProductCategory?: Maybe<ProductCategory>;
  updateRecipe?: Maybe<Recipe>;
  updateRecipeCategory?: Maybe<RecipeCategory>;
  updateTravelCost?: Maybe<TravelCost>;
  updateUnit?: Maybe<Unit>;
};


export type MutationCreateAddressArgs = {
  dto: AddressCreateDtoInput;
};


export type MutationCreateDescriptionArgs = {
  text: Scalars['String']['input'];
};


export type MutationCreateProductArgs = {
  dto: ProductCreateDtoInput;
};


export type MutationCreateProductCategoryArgs = {
  dto: ProductCategoryCreateDtoInput;
};


export type MutationCreateRecipeArgs = {
  dto: RecipeCreateDtoInput;
};


export type MutationCreateRecipeCategoryArgs = {
  dto: RecipeCategoryCreateDtoInput;
};


export type MutationCreateTravelCostArgs = {
  dto: TravelCostCreateDtoInput;
};


export type MutationCreateUnitArgs = {
  dto: UnitCreateDtoInput;
};


export type MutationDeleteUnitArgs = {
  id: Scalars['UUID']['input'];
};


export type MutationRemoveAddressArgs = {
  id: Scalars['UUID']['input'];
};


export type MutationRemoveDescriptionArgs = {
  id: Scalars['UUID']['input'];
};


export type MutationRemoveProductArgs = {
  id: Scalars['UUID']['input'];
};


export type MutationRemoveProductCategoryArgs = {
  id: Scalars['UUID']['input'];
};


export type MutationRemoveProductGroupArgs = {
  dto: RecipeGroupRemoveDtoInput;
};


export type MutationRemoveProductUnitArgs = {
  id: Scalars['UUID']['input'];
};


export type MutationRemoveRecipeArgs = {
  id: Scalars['UUID']['input'];
};


export type MutationRemoveRecipeCategoryArgs = {
  id: Scalars['UUID']['input'];
};


export type MutationRemoveRecipeProductArgs = {
  id: Scalars['UUID']['input'];
};


export type MutationRemoveTextAreaArgs = {
  id: Scalars['UUID']['input'];
};


export type MutationRemoveTravelCostArgs = {
  id: Scalars['UUID']['input'];
};


export type MutationUpdateAddressArgs = {
  dto: AddressUpdateDtoInput;
};


export type MutationUpdateDescriptionArgs = {
  id: Scalars['UUID']['input'];
  text: Scalars['String']['input'];
};


export type MutationUpdateProductArgs = {
  dto: ProductUpdateDtoInput;
};


export type MutationUpdateProductCategoryArgs = {
  dto: ProductCategoryUpdateDtoInput;
};


export type MutationUpdateRecipeArgs = {
  dto: RecipeUpdateDtoInput;
};


export type MutationUpdateRecipeCategoryArgs = {
  dto: RecipeCategoryUpdateDtoInput;
};


export type MutationUpdateTravelCostArgs = {
  dto: TravelCostUpdateDtoInput;
};


export type MutationUpdateUnitArgs = {
  dto: UnitUpdateDtoInput;
};

export type Product = {
  __typename?: 'Product';
  amount: Scalars['Decimal']['output'];
  carbs?: Maybe<Scalars['Decimal']['output']>;
  category?: Maybe<Scalars['UUID']['output']>;
  createdAt: Scalars['DateTime']['output'];
  fat?: Maybe<Scalars['Decimal']['output']>;
  id: Scalars['UUID']['output'];
  kcal?: Maybe<Scalars['Decimal']['output']>;
  modifiedAt?: Maybe<Scalars['DateTime']['output']>;
  name: Scalars['String']['output'];
  productCategory?: Maybe<ProductCategory>;
  productUnits: Array<ProductUnit>;
  protein?: Maybe<Scalars['Decimal']['output']>;
  recipeProducts: Array<RecipeProduct>;
  salt?: Maybe<Scalars['Decimal']['output']>;
  sugar?: Maybe<Scalars['Decimal']['output']>;
  unit: Scalars['String']['output'];
};

export type ProductCategory = {
  __typename?: 'ProductCategory';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['UUID']['output'];
  modifiedAt?: Maybe<Scalars['DateTime']['output']>;
  name: Scalars['String']['output'];
  products: Array<Product>;
};

export type ProductCategoryCreateDtoInput = {
  name: Scalars['String']['input'];
};

export type ProductCategoryFilterInput = {
  and?: InputMaybe<Array<ProductCategoryFilterInput>>;
  createdAt?: InputMaybe<DateTimeOperationFilterInput>;
  id?: InputMaybe<UuidOperationFilterInput>;
  modifiedAt?: InputMaybe<DateTimeOperationFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<ProductCategoryFilterInput>>;
  products?: InputMaybe<ListFilterInputTypeOfProductFilterInput>;
};

export type ProductCategorySortInput = {
  createdAt?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  modifiedAt?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
};

export type ProductCategoryUpdateDtoInput = {
  id: Scalars['UUID']['input'];
  name: Scalars['String']['input'];
};

export type ProductCreateDtoInput = {
  amount: Scalars['Decimal']['input'];
  carbs?: InputMaybe<Scalars['Decimal']['input']>;
  category?: InputMaybe<Scalars['UUID']['input']>;
  fat?: InputMaybe<Scalars['Decimal']['input']>;
  kcal?: InputMaybe<Scalars['Decimal']['input']>;
  name: Scalars['String']['input'];
  productUnits?: InputMaybe<Array<InputMaybe<ProductUnitCreateOrUpdateDtoInput>>>;
  protein?: InputMaybe<Scalars['Decimal']['input']>;
  salt?: InputMaybe<Scalars['Decimal']['input']>;
  sugar?: InputMaybe<Scalars['Decimal']['input']>;
  unit: Scalars['String']['input'];
};

export type ProductFilterInput = {
  amount?: InputMaybe<DecimalOperationFilterInput>;
  and?: InputMaybe<Array<ProductFilterInput>>;
  carbs?: InputMaybe<DecimalOperationFilterInput>;
  category?: InputMaybe<UuidOperationFilterInput>;
  createdAt?: InputMaybe<DateTimeOperationFilterInput>;
  fat?: InputMaybe<DecimalOperationFilterInput>;
  id?: InputMaybe<UuidOperationFilterInput>;
  kcal?: InputMaybe<DecimalOperationFilterInput>;
  modifiedAt?: InputMaybe<DateTimeOperationFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<ProductFilterInput>>;
  productCategory?: InputMaybe<ProductCategoryFilterInput>;
  productUnits?: InputMaybe<ListFilterInputTypeOfProductUnitFilterInput>;
  protein?: InputMaybe<DecimalOperationFilterInput>;
  recipeProducts?: InputMaybe<ListFilterInputTypeOfRecipeProductFilterInput>;
  salt?: InputMaybe<DecimalOperationFilterInput>;
  sugar?: InputMaybe<DecimalOperationFilterInput>;
  unit?: InputMaybe<StringOperationFilterInput>;
};

export type ProductSortInput = {
  amount?: InputMaybe<SortEnumType>;
  carbs?: InputMaybe<SortEnumType>;
  category?: InputMaybe<SortEnumType>;
  createdAt?: InputMaybe<SortEnumType>;
  fat?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  kcal?: InputMaybe<SortEnumType>;
  modifiedAt?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
  productCategory?: InputMaybe<ProductCategorySortInput>;
  protein?: InputMaybe<SortEnumType>;
  salt?: InputMaybe<SortEnumType>;
  sugar?: InputMaybe<SortEnumType>;
  unit?: InputMaybe<SortEnumType>;
};

export type ProductUnit = {
  __typename?: 'ProductUnit';
  active: Scalars['Boolean']['output'];
  amount?: Maybe<Scalars['Decimal']['output']>;
  createdAt: Scalars['DateTime']['output'];
  faktor: Scalars['Decimal']['output'];
  id: Scalars['UUID']['output'];
  isDefault: Scalars['Boolean']['output'];
  modifiedAt?: Maybe<Scalars['DateTime']['output']>;
  product?: Maybe<Product>;
  productId: Scalars['UUID']['output'];
  unit: Scalars['String']['output'];
};

export type ProductUnitCreateOrUpdateDtoInput = {
  amount: Scalars['Decimal']['input'];
  id?: InputMaybe<Scalars['UUID']['input']>;
  unit: Scalars['String']['input'];
};

export type ProductUnitFilterInput = {
  active?: InputMaybe<BooleanOperationFilterInput>;
  amount?: InputMaybe<DecimalOperationFilterInput>;
  and?: InputMaybe<Array<ProductUnitFilterInput>>;
  createdAt?: InputMaybe<DateTimeOperationFilterInput>;
  faktor?: InputMaybe<DecimalOperationFilterInput>;
  id?: InputMaybe<UuidOperationFilterInput>;
  isDefault?: InputMaybe<BooleanOperationFilterInput>;
  modifiedAt?: InputMaybe<DateTimeOperationFilterInput>;
  or?: InputMaybe<Array<ProductUnitFilterInput>>;
  product?: InputMaybe<ProductFilterInput>;
  productId?: InputMaybe<UuidOperationFilterInput>;
  unit?: InputMaybe<StringOperationFilterInput>;
};

export type ProductUpdateDtoInput = {
  amount?: InputMaybe<Scalars['Decimal']['input']>;
  carbs?: InputMaybe<Scalars['Decimal']['input']>;
  category?: InputMaybe<Scalars['UUID']['input']>;
  fat?: InputMaybe<Scalars['Decimal']['input']>;
  id: Scalars['UUID']['input'];
  kcal?: InputMaybe<Scalars['Decimal']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  productUnits?: InputMaybe<Array<InputMaybe<ProductUnitCreateOrUpdateDtoInput>>>;
  protein?: InputMaybe<Scalars['Decimal']['input']>;
  salt?: InputMaybe<Scalars['Decimal']['input']>;
  sugar?: InputMaybe<Scalars['Decimal']['input']>;
  unit?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  address?: Maybe<Address>;
  addresses: Array<Address>;
  description: Array<Description>;
  product?: Maybe<Product>;
  productCategories: Array<ProductCategory>;
  productCategoryById?: Maybe<ProductCategory>;
  productUnit?: Maybe<ProductUnit>;
  productUnitByProductId?: Maybe<ProductUnit>;
  productUnits: Array<ProductUnit>;
  products: Array<Product>;
  productsGrouped: Array<KeyValuePairOfStringAndListOfProduct>;
  recipe?: Maybe<Recipe>;
  recipeCategories: Array<RecipeCategory>;
  recipeCategoryById?: Maybe<RecipeCategory>;
  recipeProducts: Array<RecipeProduct>;
  recipes: Array<Recipe>;
  travelCost: Array<TravelCost>;
  travelCostSortPerMonth: TravelCostSortPerMonthDto;
  unit?: Maybe<Unit>;
  units: Array<Unit>;
};


export type QueryAddressArgs = {
  id: Scalars['UUID']['input'];
};


export type QueryAddressesArgs = {
  order?: InputMaybe<Array<AddressSortInput>>;
  where?: InputMaybe<AddressFilterInput>;
};


export type QueryDescriptionArgs = {
  order?: InputMaybe<Array<DescriptionSortInput>>;
  where?: InputMaybe<DescriptionFilterInput>;
};


export type QueryProductArgs = {
  id: Scalars['UUID']['input'];
};


export type QueryProductCategoriesArgs = {
  order?: InputMaybe<Array<ProductCategorySortInput>>;
  where?: InputMaybe<ProductCategoryFilterInput>;
};


export type QueryProductCategoryByIdArgs = {
  id: Scalars['UUID']['input'];
};


export type QueryProductUnitArgs = {
  id: Scalars['UUID']['input'];
};


export type QueryProductUnitByProductIdArgs = {
  productId: Scalars['UUID']['input'];
};


export type QueryProductsArgs = {
  order?: InputMaybe<Array<ProductSortInput>>;
  where?: InputMaybe<ProductFilterInput>;
};


export type QueryProductsGroupedArgs = {
  where?: InputMaybe<KeyValuePairOfStringAndListOfProductFilterInput>;
};


export type QueryRecipeArgs = {
  id: Scalars['UUID']['input'];
};


export type QueryRecipeCategoriesArgs = {
  order?: InputMaybe<Array<RecipeCategorySortInput>>;
  where?: InputMaybe<RecipeCategoryFilterInput>;
};


export type QueryRecipeCategoryByIdArgs = {
  id: Scalars['UUID']['input'];
};


export type QueryTravelCostArgs = {
  order?: InputMaybe<Array<TravelCostSortInput>>;
  where?: InputMaybe<TravelCostFilterInput>;
};


export type QueryTravelCostSortPerMonthArgs = {
  year: Scalars['Int']['input'];
};


export type QueryUnitArgs = {
  id: Scalars['UUID']['input'];
};


export type QueryUnitsArgs = {
  order?: InputMaybe<Array<UnitSortInput>>;
  where?: InputMaybe<UnitFilterInput>;
};

export type Recipe = {
  __typename?: 'Recipe';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['UUID']['output'];
  modifiedAt?: Maybe<Scalars['DateTime']['output']>;
  name: Scalars['String']['output'];
  portions?: Maybe<Scalars['Int']['output']>;
  preparationTimeMin?: Maybe<Scalars['Int']['output']>;
  recipeCategory?: Maybe<RecipeCategory>;
  recipeCategoryId?: Maybe<Scalars['UUID']['output']>;
  recipeDescriptions: Array<RecipeDescription>;
  recipeHeaderProducts: Array<RecipeProductHeader>;
  recipeProducts: Array<RecipeProduct>;
  totalKcal: Scalars['Int']['output'];
  totalTimeMin?: Maybe<Scalars['Int']['output']>;
};

export type RecipeCategory = {
  __typename?: 'RecipeCategory';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['UUID']['output'];
  modifiedAt?: Maybe<Scalars['DateTime']['output']>;
  name: Scalars['String']['output'];
};

export type RecipeCategoryCreateDtoInput = {
  name: Scalars['String']['input'];
};

export type RecipeCategoryFilterInput = {
  and?: InputMaybe<Array<RecipeCategoryFilterInput>>;
  createdAt?: InputMaybe<DateTimeOperationFilterInput>;
  id?: InputMaybe<UuidOperationFilterInput>;
  modifiedAt?: InputMaybe<DateTimeOperationFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<RecipeCategoryFilterInput>>;
};

export type RecipeCategorySortInput = {
  createdAt?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  modifiedAt?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
};

export type RecipeCategoryUpdateDtoInput = {
  id: Scalars['UUID']['input'];
  name: Scalars['String']['input'];
};

export type RecipeCreateDtoInput = {
  name: Scalars['String']['input'];
  portions: Scalars['Int']['input'];
  preparationTimeMin?: InputMaybe<Scalars['Int']['input']>;
  recipeCategoryId?: InputMaybe<Scalars['UUID']['input']>;
  recipeDescriptions?: InputMaybe<Array<InputMaybe<RecipeDescriptionCreateOrUpdateDtoInput>>>;
  recipeHeaderProducts?: InputMaybe<Array<InputMaybe<RecipeHeaderProductCreateOrUpdateDtoInput>>>;
  recipeProducts?: InputMaybe<Array<InputMaybe<RecipeProductsCreateDtoInput>>>;
  totalTimeMin?: InputMaybe<Scalars['Int']['input']>;
};

export type RecipeDescription = {
  __typename?: 'RecipeDescription';
  createdAt: Scalars['DateTime']['output'];
  header: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
  modifiedAt?: Maybe<Scalars['DateTime']['output']>;
  position: Scalars['Int']['output'];
  recipe?: Maybe<Recipe>;
  recipeId: Scalars['UUID']['output'];
  text: Scalars['String']['output'];
};

export type RecipeDescriptionCreateOrUpdateDtoInput = {
  header: Scalars['String']['input'];
  id?: InputMaybe<Scalars['UUID']['input']>;
  position: Scalars['Int']['input'];
  text: Scalars['String']['input'];
};

export type RecipeDescriptionFilterInput = {
  and?: InputMaybe<Array<RecipeDescriptionFilterInput>>;
  createdAt?: InputMaybe<DateTimeOperationFilterInput>;
  header?: InputMaybe<StringOperationFilterInput>;
  id?: InputMaybe<UuidOperationFilterInput>;
  modifiedAt?: InputMaybe<DateTimeOperationFilterInput>;
  or?: InputMaybe<Array<RecipeDescriptionFilterInput>>;
  position?: InputMaybe<IntOperationFilterInput>;
  recipe?: InputMaybe<RecipeFilterInput>;
  recipeId?: InputMaybe<UuidOperationFilterInput>;
  text?: InputMaybe<StringOperationFilterInput>;
};

export type RecipeFilterInput = {
  and?: InputMaybe<Array<RecipeFilterInput>>;
  createdAt?: InputMaybe<DateTimeOperationFilterInput>;
  id?: InputMaybe<UuidOperationFilterInput>;
  modifiedAt?: InputMaybe<DateTimeOperationFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<RecipeFilterInput>>;
  portions?: InputMaybe<IntOperationFilterInput>;
  preparationTimeMin?: InputMaybe<IntOperationFilterInput>;
  recipeCategory?: InputMaybe<RecipeCategoryFilterInput>;
  recipeCategoryId?: InputMaybe<UuidOperationFilterInput>;
  recipeDescriptions?: InputMaybe<ListFilterInputTypeOfRecipeDescriptionFilterInput>;
  recipeHeaderProducts?: InputMaybe<ListFilterInputTypeOfRecipeProductHeaderFilterInput>;
  recipeProducts?: InputMaybe<ListFilterInputTypeOfRecipeProductFilterInput>;
  totalKcal?: InputMaybe<IntOperationFilterInput>;
  totalTimeMin?: InputMaybe<IntOperationFilterInput>;
};

export type RecipeGroupRemoveDtoInput = {
  position: Scalars['Int']['input'];
  recipeId: Scalars['UUID']['input'];
};

export type RecipeHeaderProductCreateOrUpdateDtoInput = {
  id?: InputMaybe<Scalars['UUID']['input']>;
  position: Scalars['Int']['input'];
  recipeId?: InputMaybe<Scalars['UUID']['input']>;
  text: Scalars['String']['input'];
};

export type RecipeProduct = {
  __typename?: 'RecipeProduct';
  activeUnitId: Scalars['UUID']['output'];
  amount: Scalars['Decimal']['output'];
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  groupPosition: Scalars['Int']['output'];
  id: Scalars['UUID']['output'];
  kcal: Scalars['Int']['output'];
  modifiedAt?: Maybe<Scalars['DateTime']['output']>;
  product?: Maybe<Product>;
  productId: Scalars['UUID']['output'];
  recipe?: Maybe<Recipe>;
  recipeId: Scalars['UUID']['output'];
  sortOrder: Scalars['Int']['output'];
  unit: Scalars['String']['output'];
};

export type RecipeProductFilterInput = {
  activeUnitId?: InputMaybe<UuidOperationFilterInput>;
  amount?: InputMaybe<DecimalOperationFilterInput>;
  and?: InputMaybe<Array<RecipeProductFilterInput>>;
  createdAt?: InputMaybe<DateTimeOperationFilterInput>;
  description?: InputMaybe<StringOperationFilterInput>;
  groupPosition?: InputMaybe<IntOperationFilterInput>;
  id?: InputMaybe<UuidOperationFilterInput>;
  kcal?: InputMaybe<IntOperationFilterInput>;
  modifiedAt?: InputMaybe<DateTimeOperationFilterInput>;
  or?: InputMaybe<Array<RecipeProductFilterInput>>;
  product?: InputMaybe<ProductFilterInput>;
  productId?: InputMaybe<UuidOperationFilterInput>;
  recipe?: InputMaybe<RecipeFilterInput>;
  recipeId?: InputMaybe<UuidOperationFilterInput>;
  sortOrder?: InputMaybe<IntOperationFilterInput>;
  unit?: InputMaybe<StringOperationFilterInput>;
};

export type RecipeProductHeader = {
  __typename?: 'RecipeProductHeader';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['UUID']['output'];
  modifiedAt?: Maybe<Scalars['DateTime']['output']>;
  position: Scalars['Int']['output'];
  recipe?: Maybe<Recipe>;
  recipeId: Scalars['UUID']['output'];
  text: Scalars['String']['output'];
};

export type RecipeProductHeaderFilterInput = {
  and?: InputMaybe<Array<RecipeProductHeaderFilterInput>>;
  createdAt?: InputMaybe<DateTimeOperationFilterInput>;
  id?: InputMaybe<UuidOperationFilterInput>;
  modifiedAt?: InputMaybe<DateTimeOperationFilterInput>;
  or?: InputMaybe<Array<RecipeProductHeaderFilterInput>>;
  position?: InputMaybe<IntOperationFilterInput>;
  recipe?: InputMaybe<RecipeFilterInput>;
  recipeId?: InputMaybe<UuidOperationFilterInput>;
  text?: InputMaybe<StringOperationFilterInput>;
};

export type RecipeProductsCreateDtoInput = {
  activeUnitId: Scalars['UUID']['input'];
  amount: Scalars['Decimal']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  factor?: InputMaybe<Scalars['Decimal']['input']>;
  groupPosition: Scalars['Int']['input'];
  id?: InputMaybe<Scalars['UUID']['input']>;
  productId: Scalars['UUID']['input'];
  recipeId?: InputMaybe<Scalars['UUID']['input']>;
  sortOrder: Scalars['Int']['input'];
};

export type RecipeUpdateDtoInput = {
  id: Scalars['UUID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  portions?: InputMaybe<Scalars['Int']['input']>;
  preparationTimeMin?: InputMaybe<Scalars['Int']['input']>;
  recipeCategoryId?: InputMaybe<Scalars['UUID']['input']>;
  recipeDescriptions?: InputMaybe<Array<InputMaybe<RecipeDescriptionCreateOrUpdateDtoInput>>>;
  recipeHeaderProducts?: InputMaybe<Array<InputMaybe<RecipeHeaderProductCreateOrUpdateDtoInput>>>;
  recipeProducts?: InputMaybe<Array<InputMaybe<RecipeProductsCreateDtoInput>>>;
  totalTimeMin?: InputMaybe<Scalars['Int']['input']>;
};

export type ResponseOfBoolean = {
  __typename?: 'ResponseOfBoolean';
  data: Scalars['Boolean']['output'];
  errorCode: ErrorCode;
  isError: Scalars['Boolean']['output'];
};

export type ResponseOfProductCategory = {
  __typename?: 'ResponseOfProductCategory';
  data?: Maybe<ProductCategory>;
  errorCode: ErrorCode;
  isError: Scalars['Boolean']['output'];
};

export type ResponseOfRecipeCategory = {
  __typename?: 'ResponseOfRecipeCategory';
  data?: Maybe<RecipeCategory>;
  errorCode: ErrorCode;
  isError: Scalars['Boolean']['output'];
};

export enum SortEnumType {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type StringOperationFilterInput = {
  and?: InputMaybe<Array<StringOperationFilterInput>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  eq?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  ncontains?: InputMaybe<Scalars['String']['input']>;
  nendsWith?: InputMaybe<Scalars['String']['input']>;
  neq?: InputMaybe<Scalars['String']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  nstartsWith?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<StringOperationFilterInput>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type TravelCost = {
  __typename?: 'TravelCost';
  address?: Maybe<Address>;
  addressId?: Maybe<Scalars['UUID']['output']>;
  createdAt: Scalars['DateTime']['output'];
  date?: Maybe<Scalars['LocalDate']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  modifiedAt?: Maybe<Scalars['DateTime']['output']>;
  price?: Maybe<Scalars['Decimal']['output']>;
};

export type TravelCostCreateDtoInput = {
  addressId?: InputMaybe<Scalars['UUID']['input']>;
  date?: InputMaybe<Scalars['LocalDate']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Decimal']['input']>;
};

export type TravelCostFilterInput = {
  address?: InputMaybe<AddressFilterInput>;
  addressId?: InputMaybe<UuidOperationFilterInput>;
  and?: InputMaybe<Array<TravelCostFilterInput>>;
  createdAt?: InputMaybe<DateTimeOperationFilterInput>;
  date?: InputMaybe<LocalDateOperationFilterInput>;
  description?: InputMaybe<StringOperationFilterInput>;
  id?: InputMaybe<UuidOperationFilterInput>;
  modifiedAt?: InputMaybe<DateTimeOperationFilterInput>;
  or?: InputMaybe<Array<TravelCostFilterInput>>;
  price?: InputMaybe<DecimalOperationFilterInput>;
};

export type TravelCostSortInput = {
  address?: InputMaybe<AddressSortInput>;
  addressId?: InputMaybe<SortEnumType>;
  createdAt?: InputMaybe<SortEnumType>;
  date?: InputMaybe<SortEnumType>;
  description?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  modifiedAt?: InputMaybe<SortEnumType>;
  price?: InputMaybe<SortEnumType>;
};

export type TravelCostSortPerMonthDto = {
  __typename?: 'TravelCostSortPerMonthDto';
  m1: Array<TravelCost>;
  m2: Array<TravelCost>;
  m3: Array<TravelCost>;
  m4: Array<TravelCost>;
  m5: Array<TravelCost>;
  m6: Array<TravelCost>;
  m7: Array<TravelCost>;
  m8: Array<TravelCost>;
  m9: Array<TravelCost>;
  m10: Array<TravelCost>;
  m11: Array<TravelCost>;
  m12: Array<TravelCost>;
};

export type TravelCostUpdateDtoInput = {
  addressId?: InputMaybe<Scalars['UUID']['input']>;
  date?: InputMaybe<Scalars['LocalDate']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  price?: InputMaybe<Scalars['Decimal']['input']>;
};

export type Unit = {
  __typename?: 'Unit';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['UUID']['output'];
  modifiedAt?: Maybe<Scalars['DateTime']['output']>;
  name: Scalars['String']['output'];
};

export type UnitCreateDtoInput = {
  name: Scalars['String']['input'];
};

export type UnitFilterInput = {
  and?: InputMaybe<Array<UnitFilterInput>>;
  createdAt?: InputMaybe<DateTimeOperationFilterInput>;
  id?: InputMaybe<UuidOperationFilterInput>;
  modifiedAt?: InputMaybe<DateTimeOperationFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<UnitFilterInput>>;
};

export type UnitSortInput = {
  createdAt?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  modifiedAt?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
};

export type UnitUpdateDtoInput = {
  id: Scalars['UUID']['input'];
  name: Scalars['String']['input'];
};

export type UuidOperationFilterInput = {
  eq?: InputMaybe<Scalars['UUID']['input']>;
  gt?: InputMaybe<Scalars['UUID']['input']>;
  gte?: InputMaybe<Scalars['UUID']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['UUID']['input']>>>;
  lt?: InputMaybe<Scalars['UUID']['input']>;
  lte?: InputMaybe<Scalars['UUID']['input']>;
  neq?: InputMaybe<Scalars['UUID']['input']>;
  ngt?: InputMaybe<Scalars['UUID']['input']>;
  ngte?: InputMaybe<Scalars['UUID']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['UUID']['input']>>>;
  nlt?: InputMaybe<Scalars['UUID']['input']>;
  nlte?: InputMaybe<Scalars['UUID']['input']>;
};

export type AddAddressMutationVariables = Exact<{
  name: Scalars['String']['input'];
  street: Scalars['String']['input'];
  city: Scalars['String']['input'];
}>;


export type AddAddressMutation = { __typename?: 'Mutation', createAddress: { __typename?: 'Address', name?: string | null, street?: string | null, city?: string | null } };

export type AddDescriptionMutationVariables = Exact<{
  text: Scalars['String']['input'];
}>;


export type AddDescriptionMutation = { __typename?: 'Mutation', createDescription: { __typename?: 'Description', text: string } };

export type AddTravelCostMutationVariables = Exact<{
  price?: InputMaybe<Scalars['Decimal']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  date?: InputMaybe<Scalars['LocalDate']['input']>;
  addressId?: InputMaybe<Scalars['UUID']['input']>;
}>;


export type AddTravelCostMutation = { __typename?: 'Mutation', createTravelCost: { __typename?: 'TravelCost', id: string } };

export type RemoveAddressMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type RemoveAddressMutation = { __typename?: 'Mutation', removeAddress: boolean };

export type UpdateAddressMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  name: Scalars['String']['input'];
  street: Scalars['String']['input'];
  city: Scalars['String']['input'];
}>;


export type UpdateAddressMutation = { __typename?: 'Mutation', updateAddress?: { __typename?: 'Address', name?: string | null, street?: string | null, city?: string | null, id: string } | null };

export type AddressListingQueryVariables = Exact<{ [key: string]: never; }>;


export type AddressListingQuery = { __typename?: 'Query', addresses: Array<{ __typename?: 'Address', id: string, name?: string | null }> };

export type RemoveDescriptionMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type RemoveDescriptionMutation = { __typename?: 'Mutation', removeDescription: boolean };

export type UpdateDescriptionMutationVariables = Exact<{
  text: Scalars['String']['input'];
  id: Scalars['UUID']['input'];
}>;


export type UpdateDescriptionMutation = { __typename?: 'Mutation', updateDescription?: { __typename?: 'Description', text: string } | null };

export type DescriptionsListingQueryVariables = Exact<{ [key: string]: never; }>;


export type DescriptionsListingQuery = { __typename?: 'Query', description: Array<{ __typename?: 'Description', id: string, text: string }> };

export type RemoveTravelCostMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type RemoveTravelCostMutation = { __typename?: 'Mutation', removeTravelCost: boolean };

export type UpdateTravelCostMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  price?: InputMaybe<Scalars['Decimal']['input']>;
  addressId: Scalars['UUID']['input'];
  date?: InputMaybe<Scalars['LocalDate']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateTravelCostMutation = { __typename?: 'Mutation', updateTravelCost?: { __typename?: 'TravelCost', id: string } | null };

export type AddCategoryMutationVariables = Exact<{
  name: Scalars['String']['input'];
}>;


export type AddCategoryMutation = { __typename?: 'Mutation', createProductCategory: { __typename?: 'ResponseOfProductCategory', errorCode: ErrorCode, isError: boolean, data?: { __typename?: 'ProductCategory', id: string, name: string } | null } };

export type DeleteCategoryMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type DeleteCategoryMutation = { __typename?: 'Mutation', removeProductCategory: { __typename?: 'ResponseOfBoolean', isError: boolean, errorCode: ErrorCode } };

export type UpdateProductCategoryMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  name: Scalars['String']['input'];
}>;


export type UpdateProductCategoryMutation = { __typename?: 'Mutation', updateProductCategory?: { __typename?: 'ProductCategory', id: string } | null };

export type AddProductMutationVariables = Exact<{
  dto: ProductCreateDtoInput;
}>;


export type AddProductMutation = { __typename?: 'Mutation', createProduct: { __typename?: 'Product', name: string, id: string } };

export type UpdateProductMutationVariables = Exact<{
  dto: ProductUpdateDtoInput;
}>;


export type UpdateProductMutation = { __typename?: 'Mutation', updateProduct?: { __typename?: 'Product', name: string, id: string } | null };

export type RemoveProductUnitMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type RemoveProductUnitMutation = { __typename?: 'Mutation', removeProductUnit: boolean };

export type RemoveCategoryMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type RemoveCategoryMutation = { __typename?: 'Mutation', removeProductCategory: { __typename?: 'ResponseOfBoolean', errorCode: ErrorCode, isError: boolean } };

export type RenameCategoryMutationVariables = Exact<{
  name: Scalars['String']['input'];
  id: Scalars['UUID']['input'];
}>;


export type RenameCategoryMutation = { __typename?: 'Mutation', updateProductCategory?: { __typename?: 'ProductCategory', name: string, id: string } | null };

export type GetProductByIdQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type GetProductByIdQuery = { __typename?: 'Query', product?: { __typename?: 'Product', id: string, carbs?: number | null, category?: string | null, fat?: number | null, kcal?: number | null, name: string, protein?: number | null, salt?: number | null, sugar?: number | null, productUnits: Array<{ __typename?: 'ProductUnit', modifiedAt?: string | null, createdAt: string, id: string, productId: string, amount?: number | null, unit: string, isDefault: boolean }> } | null };

export type RemoveProductMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type RemoveProductMutation = { __typename?: 'Mutation', removeProduct: { __typename?: 'ResponseOfBoolean', errorCode: ErrorCode, isError: boolean } };

export type AddRecipeCategoryMutationVariables = Exact<{
  name: Scalars['String']['input'];
}>;


export type AddRecipeCategoryMutation = { __typename?: 'Mutation', createRecipeCategory: { __typename?: 'ResponseOfRecipeCategory', errorCode: ErrorCode, isError: boolean, data?: { __typename?: 'RecipeCategory', id: string, name: string } | null } };

export type RemoveRecipeCategoryMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type RemoveRecipeCategoryMutation = { __typename?: 'Mutation', removeRecipeCategory: { __typename?: 'ResponseOfBoolean', isError: boolean, errorCode: ErrorCode } };

export type UpdateRecipeCategoryMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  name: Scalars['String']['input'];
}>;


export type UpdateRecipeCategoryMutation = { __typename?: 'Mutation', updateRecipeCategory?: { __typename?: 'RecipeCategory', id: string } | null };

export type ProductUnitsQueryVariables = Exact<{ [key: string]: never; }>;


export type ProductUnitsQuery = { __typename?: 'Query', productUnits: Array<{ __typename?: 'ProductUnit', id: string, unit: string }> };

export type AddRecipeMutationVariables = Exact<{
  dto: RecipeCreateDtoInput;
}>;


export type AddRecipeMutation = { __typename?: 'Mutation', createRecipe: { __typename?: 'Recipe', id: string } };

export type UpdateRecipeMutationVariables = Exact<{
  dto: RecipeUpdateDtoInput;
}>;


export type UpdateRecipeMutation = { __typename?: 'Mutation', updateRecipe?: { __typename?: 'Recipe', id: string } | null };

export type GetRecipeByIdQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type GetRecipeByIdQuery = { __typename?: 'Query', recipe?: { __typename?: 'Recipe', id: string, name: string, createdAt: string, modifiedAt?: string | null, portions?: number | null, recipeCategoryId?: string | null, preparationTimeMin?: number | null, totalTimeMin?: number | null, recipeProducts: Array<{ __typename?: 'RecipeProduct', amount: number, description: string, productId: string, groupPosition: number, unit: string, id: string, kcal: number, activeUnitId: string, sortOrder: number, product?: { __typename?: 'Product', name: string } | null }>, recipeDescriptions: Array<{ __typename?: 'RecipeDescription', position: number, text: string, id: string, header: string }>, recipeHeaderProducts: Array<{ __typename?: 'RecipeProductHeader', id: string, position: number, recipeId: string, text: string }> } | null };

export type ProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type ProductsQuery = { __typename?: 'Query', products: Array<{ __typename?: 'Product', id: string, carbs?: number | null, category?: string | null, fat?: number | null, kcal?: number | null, name: string, protein?: number | null, salt?: number | null, sugar?: number | null, productUnits: Array<{ __typename?: 'ProductUnit', id: string, unit: string, amount?: number | null, isDefault: boolean, faktor: number }> }> };

export type GetProductUnitsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProductUnitsQuery = { __typename?: 'Query', productUnits: Array<{ __typename?: 'ProductUnit', id: string, createdAt: string, modifiedAt?: string | null, productId: string, amount?: number | null, unit: string }> };

export type GetProductsForSelectQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProductsForSelectQuery = { __typename?: 'Query', products: Array<{ __typename?: 'Product', id: string, name: string, productCategory?: { __typename?: 'ProductCategory', name: string } | null }> };

export type RemoveTextAreaMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type RemoveTextAreaMutation = { __typename?: 'Mutation', removeTextArea: boolean };

export type RemoveRecipeGroupMutationVariables = Exact<{
  dto: RecipeGroupRemoveDtoInput;
}>;


export type RemoveRecipeGroupMutation = { __typename?: 'Mutation', removeProductGroup: boolean };

export type RemoveRecipeProductMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type RemoveRecipeProductMutation = { __typename?: 'Mutation', removeRecipeProduct: boolean };

export type RemoveRecipeMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type RemoveRecipeMutation = { __typename?: 'Mutation', removeRecipe: boolean };

export type CreateUnitMutationVariables = Exact<{
  name: Scalars['String']['input'];
}>;


export type CreateUnitMutation = { __typename?: 'Mutation', createUnit: { __typename?: 'Unit', name: string } };

export type DeleteUnitMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type DeleteUnitMutation = { __typename?: 'Mutation', deleteUnit: { __typename?: 'ResponseOfBoolean', errorCode: ErrorCode, isError: boolean } };

export type UpdateUnitMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  name: Scalars['String']['input'];
}>;


export type UpdateUnitMutation = { __typename?: 'Mutation', updateUnit?: { __typename?: 'Unit', id: string } | null };

export type ProductCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type ProductCategoriesQuery = { __typename?: 'Query', productCategories: Array<{ __typename?: 'ProductCategory', id: string, name: string }> };

export type RecipeCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type RecipeCategoriesQuery = { __typename?: 'Query', recipeCategories: Array<{ __typename?: 'RecipeCategory', id: string, name: string }> };

export type UnitsQueryVariables = Exact<{ [key: string]: never; }>;


export type UnitsQuery = { __typename?: 'Query', units: Array<{ __typename?: 'Unit', id: string, name: string }> };

export type AddressesQueryVariables = Exact<{ [key: string]: never; }>;


export type AddressesQuery = { __typename?: 'Query', addresses: Array<{ __typename?: 'Address', name?: string | null, city?: string | null, street?: string | null, id: string }> };

export type DescriptionsQueryVariables = Exact<{ [key: string]: never; }>;


export type DescriptionsQuery = { __typename?: 'Query', description: Array<{ __typename?: 'Description', text: string, id: string }> };

export type TravelCostQueryVariables = Exact<{
  where?: InputMaybe<TravelCostFilterInput>;
  order?: InputMaybe<Array<TravelCostSortInput> | TravelCostSortInput>;
}>;


export type TravelCostQuery = { __typename?: 'Query', travelCost: Array<{ __typename?: 'TravelCost', id: string, addressId?: string | null, date?: any | null, description?: string | null, price?: number | null, address?: { __typename?: 'Address', name?: string | null, street?: string | null, city?: string | null } | null }> };

export type GetProductsQueryVariables = Exact<{
  where?: InputMaybe<KeyValuePairOfStringAndListOfProductFilterInput>;
}>;


export type GetProductsQuery = { __typename?: 'Query', productsGrouped: Array<{ __typename?: 'KeyValuePairOfStringAndListOfProduct', key: string, value: Array<{ __typename?: 'Product', id: string, carbs?: number | null, fat?: number | null, kcal?: number | null, name: string, protein?: number | null, salt?: number | null, sugar?: number | null, unit: string, amount: number, productUnits: Array<{ __typename?: 'ProductUnit', id: string, amount?: number | null, unit: string }> }> }> };

export type GetRecipeDetailsQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type GetRecipeDetailsQuery = { __typename?: 'Query', recipe?: { __typename?: 'Recipe', id: string, name: string, portions?: number | null, totalKcal: number, preparationTimeMin?: number | null, totalTimeMin?: number | null, recipeProducts: Array<{ __typename?: 'RecipeProduct', amount: number, description: string, groupPosition: number, unit: string, kcal: number, activeUnitId: string, productId: string, product?: { __typename?: 'Product', name: string, category?: string | null, carbs?: number | null, fat?: number | null, kcal?: number | null, protein?: number | null, salt?: number | null, sugar?: number | null } | null }>, recipeDescriptions: Array<{ __typename?: 'RecipeDescription', position: number, text: string, header: string }>, recipeHeaderProducts: Array<{ __typename?: 'RecipeProductHeader', position: number, text: string }> } | null };

export type RecipesQueryVariables = Exact<{ [key: string]: never; }>;


export type RecipesQuery = { __typename?: 'Query', recipes: Array<{ __typename?: 'Recipe', id: string, name: string, createdAt: string, totalTimeMin?: number | null, preparationTimeMin?: number | null, totalKcal: number, recipeCategory?: { __typename?: 'RecipeCategory', name: string, id: string } | null }> };


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
export const AddCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createProductCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"dto"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errorCode"}},{"kind":"Field","name":{"kind":"Name","value":"isError"}}]}}]}}]} as unknown as DocumentNode<AddCategoryMutation, AddCategoryMutationVariables>;
export const DeleteCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeProductCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isError"}},{"kind":"Field","name":{"kind":"Name","value":"errorCode"}}]}}]}}]} as unknown as DocumentNode<DeleteCategoryMutation, DeleteCategoryMutationVariables>;
export const UpdateProductCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateProductCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateProductCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"dto"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateProductCategoryMutation, UpdateProductCategoryMutationVariables>;
export const AddProductDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addProduct"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ProductCreateDtoInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createProduct"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"dto"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<AddProductMutation, AddProductMutationVariables>;
export const UpdateProductDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateProduct"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ProductUpdateDtoInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateProduct"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"dto"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateProductMutation, UpdateProductMutationVariables>;
export const RemoveProductUnitDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"removeProductUnit"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeProductUnit"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<RemoveProductUnitMutation, RemoveProductUnitMutationVariables>;
export const RemoveCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"removeCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeProductCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"errorCode"}},{"kind":"Field","name":{"kind":"Name","value":"isError"}}]}}]}}]} as unknown as DocumentNode<RemoveCategoryMutation, RemoveCategoryMutationVariables>;
export const RenameCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"renameCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateProductCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"dto"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<RenameCategoryMutation, RenameCategoryMutationVariables>;
export const GetProductByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getProductById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"product"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"carbs"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"fat"}},{"kind":"Field","name":{"kind":"Name","value":"kcal"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"protein"}},{"kind":"Field","name":{"kind":"Name","value":"salt"}},{"kind":"Field","name":{"kind":"Name","value":"sugar"}},{"kind":"Field","name":{"kind":"Name","value":"productUnits"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"modifiedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"productId"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"isDefault"}}]}}]}}]}}]} as unknown as DocumentNode<GetProductByIdQuery, GetProductByIdQueryVariables>;
export const RemoveProductDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"removeProduct"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeProduct"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"errorCode"}},{"kind":"Field","name":{"kind":"Name","value":"isError"}}]}}]}}]} as unknown as DocumentNode<RemoveProductMutation, RemoveProductMutationVariables>;
export const AddRecipeCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addRecipeCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createRecipeCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"dto"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errorCode"}},{"kind":"Field","name":{"kind":"Name","value":"isError"}}]}}]}}]} as unknown as DocumentNode<AddRecipeCategoryMutation, AddRecipeCategoryMutationVariables>;
export const RemoveRecipeCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveRecipeCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeRecipeCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isError"}},{"kind":"Field","name":{"kind":"Name","value":"errorCode"}}]}}]}}]} as unknown as DocumentNode<RemoveRecipeCategoryMutation, RemoveRecipeCategoryMutationVariables>;
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
export const DeleteUnitDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteUnit"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteUnit"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"errorCode"}},{"kind":"Field","name":{"kind":"Name","value":"isError"}}]}}]}}]} as unknown as DocumentNode<DeleteUnitMutation, DeleteUnitMutationVariables>;
export const UpdateUnitDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUnit"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUnit"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"dto"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateUnitMutation, UpdateUnitMutationVariables>;
export const ProductCategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ProductCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"productCategories"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"order"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"EnumValue","value":"ASC"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<ProductCategoriesQuery, ProductCategoriesQueryVariables>;
export const RecipeCategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"recipeCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"recipeCategories"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"order"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"EnumValue","value":"ASC"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<RecipeCategoriesQuery, RecipeCategoriesQueryVariables>;
export const UnitsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Units"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"units"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"order"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"EnumValue","value":"ASC"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<UnitsQuery, UnitsQueryVariables>;
export const AddressesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Addresses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addresses"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"order"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"EnumValue","value":"ASC"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"street"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<AddressesQuery, AddressesQueryVariables>;
export const DescriptionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Descriptions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"description"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DescriptionsQuery, DescriptionsQueryVariables>;
export const TravelCostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TravelCost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"TravelCostFilterInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"order"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TravelCostSortInput"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"travelCost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}},{"kind":"Argument","name":{"kind":"Name","value":"order"},"value":{"kind":"Variable","name":{"kind":"Name","value":"order"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"addressId"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"address"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"street"}},{"kind":"Field","name":{"kind":"Name","value":"city"}}]}}]}}]}}]} as unknown as DocumentNode<TravelCostQuery, TravelCostQueryVariables>;
export const GetProductsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetProducts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"KeyValuePairOfStringAndListOfProductFilterInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"productsGrouped"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"carbs"}},{"kind":"Field","name":{"kind":"Name","value":"fat"}},{"kind":"Field","name":{"kind":"Name","value":"kcal"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"protein"}},{"kind":"Field","name":{"kind":"Name","value":"salt"}},{"kind":"Field","name":{"kind":"Name","value":"sugar"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"productUnits"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetProductsQuery, GetProductsQueryVariables>;
export const GetRecipeDetailsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getRecipeDetails"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"recipe"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"portions"}},{"kind":"Field","name":{"kind":"Name","value":"totalKcal"}},{"kind":"Field","name":{"kind":"Name","value":"preparationTimeMin"}},{"kind":"Field","name":{"kind":"Name","value":"totalTimeMin"}},{"kind":"Field","name":{"kind":"Name","value":"recipeProducts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"groupPosition"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"kcal"}},{"kind":"Field","name":{"kind":"Name","value":"activeUnitId"}},{"kind":"Field","name":{"kind":"Name","value":"productId"}},{"kind":"Field","name":{"kind":"Name","value":"product"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"carbs"}},{"kind":"Field","name":{"kind":"Name","value":"fat"}},{"kind":"Field","name":{"kind":"Name","value":"kcal"}},{"kind":"Field","name":{"kind":"Name","value":"protein"}},{"kind":"Field","name":{"kind":"Name","value":"salt"}},{"kind":"Field","name":{"kind":"Name","value":"sugar"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"recipeDescriptions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"header"}}]}},{"kind":"Field","name":{"kind":"Name","value":"recipeHeaderProducts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"text"}}]}}]}}]}}]} as unknown as DocumentNode<GetRecipeDetailsQuery, GetRecipeDetailsQueryVariables>;
export const RecipesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"recipes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"recipes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"totalTimeMin"}},{"kind":"Field","name":{"kind":"Name","value":"preparationTimeMin"}},{"kind":"Field","name":{"kind":"Name","value":"totalKcal"}},{"kind":"Field","name":{"kind":"Name","value":"recipeCategory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<RecipesQuery, RecipesQueryVariables>;