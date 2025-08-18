/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
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
  UUID: { input: string; output: string; }
};

export enum ErrorCode {
  Exist = 'EXIST',
  NotFound = 'NOT_FOUND',
  Success = 'SUCCESS'
}

export type Mutation = {
  __typename?: 'Mutation';
  createProduct: Product;
  createProductCategory: ResponseObjectOfProductCategory;
  createRecipe: Recipe;
  createUnit: Unit;
  deleteUnit: Scalars['Boolean']['output'];
  removeProduct: Scalars['Boolean']['output'];
  removeProductCategory: Scalars['Boolean']['output'];
  removeProductGroup: Scalars['Boolean']['output'];
  removeProductUnit: Scalars['Boolean']['output'];
  removeRecipe: Scalars['Boolean']['output'];
  removeRecipeProduct: Scalars['Boolean']['output'];
  updateProduct?: Maybe<Product>;
  updateProductCategory?: Maybe<ProductCategory>;
  updateRecipe?: Maybe<Recipe>;
  updateUnit?: Maybe<Unit>;
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


export type MutationCreateUnitArgs = {
  dto: UnitCreateDtoInput;
};


export type MutationDeleteUnitArgs = {
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


export type MutationRemoveRecipeProductArgs = {
  id: Scalars['UUID']['input'];
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


export type MutationUpdateUnitArgs = {
  dto: UnitUpdateDtoInput;
};

export type Product = {
  __typename?: 'Product';
  amount?: Maybe<Scalars['Decimal']['output']>;
  carbs?: Maybe<Scalars['Decimal']['output']>;
  category?: Maybe<Scalars['UUID']['output']>;
  createdAt: Scalars['DateTime']['output'];
  fat?: Maybe<Scalars['Decimal']['output']>;
  id: Scalars['UUID']['output'];
  kcal?: Maybe<Scalars['Decimal']['output']>;
  modifiedAt?: Maybe<Scalars['DateTime']['output']>;
  name: Scalars['String']['output'];
  productUnits: Array<ProductUnit>;
  protein?: Maybe<Scalars['Decimal']['output']>;
  salt?: Maybe<Scalars['Decimal']['output']>;
  sugar?: Maybe<Scalars['Decimal']['output']>;
  unit?: Maybe<Scalars['String']['output']>;
};

export type ProductCategory = {
  __typename?: 'ProductCategory';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['UUID']['output'];
  modifiedAt?: Maybe<Scalars['DateTime']['output']>;
  name: Scalars['String']['output'];
};

export type ProductCategoryCreateDtoInput = {
  name: Scalars['String']['input'];
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
  unit?: InputMaybe<Scalars['String']['input']>;
};

export type ProductUnit = {
  __typename?: 'ProductUnit';
  amount?: Maybe<Scalars['Decimal']['output']>;
  createdAt: Scalars['DateTime']['output'];
  defaultUnit: Scalars['Int']['output'];
  id: Scalars['UUID']['output'];
  modifiedAt?: Maybe<Scalars['DateTime']['output']>;
  product?: Maybe<Product>;
  productId: Scalars['UUID']['output'];
  unit: Scalars['String']['output'];
};

export type ProductUnitCreateOrUpdateDtoInput = {
  amount: Scalars['Decimal']['input'];
  defaultUnit: Scalars['Int']['input'];
  id?: InputMaybe<Scalars['UUID']['input']>;
  unit: Scalars['String']['input'];
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
  product?: Maybe<Product>;
  productCategories: Array<ProductCategory>;
  productUnit?: Maybe<ProductUnit>;
  productUnitByProductId?: Maybe<ProductUnit>;
  productUnits: Array<ProductUnit>;
  products: Array<Product>;
  recipe?: Maybe<Recipe>;
  recipes: Array<Recipe>;
  unit?: Maybe<Unit>;
  units: Array<Unit>;
};


export type QueryProductArgs = {
  id: Scalars['UUID']['input'];
};


export type QueryProductUnitArgs = {
  id: Scalars['UUID']['input'];
};


export type QueryProductUnitByProductIdArgs = {
  productId: Scalars['UUID']['input'];
};


export type QueryRecipeArgs = {
  id: Scalars['UUID']['input'];
};


export type QueryUnitArgs = {
  id: Scalars['UUID']['input'];
};

export type Recipe = {
  __typename?: 'Recipe';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['UUID']['output'];
  modifiedAt?: Maybe<Scalars['DateTime']['output']>;
  name: Scalars['String']['output'];
  portions?: Maybe<Scalars['Int']['output']>;
  recipeDescriptions: Array<RecipeDescription>;
  recipeHeaderProducts: Array<RecipeHeaderProduct>;
  recipeProducts: Array<RecipeProduct>;
};

export type RecipeCreateDtoInput = {
  name: Scalars['String']['input'];
  portions: Scalars['Int']['input'];
  recipeDescriptions?: InputMaybe<Array<InputMaybe<RecipeDescriptionCreateOrUpdateDtoInput>>>;
  recipeHeaderProducts?: InputMaybe<Array<InputMaybe<RecipeHeaderProductCreateOrUpdateDtoInput>>>;
  recipeProducts?: InputMaybe<Array<InputMaybe<RecipeProductsCreateDtoInput>>>;
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

export type RecipeGroupRemoveDtoInput = {
  position: Scalars['Int']['input'];
  recipeId: Scalars['UUID']['input'];
};

export type RecipeHeaderProduct = {
  __typename?: 'RecipeHeaderProduct';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['UUID']['output'];
  modifiedAt?: Maybe<Scalars['DateTime']['output']>;
  position: Scalars['Int']['output'];
  recipe: Recipe;
  recipeId: Scalars['UUID']['output'];
  text: Scalars['String']['output'];
};

export type RecipeHeaderProductCreateOrUpdateDtoInput = {
  id?: InputMaybe<Scalars['UUID']['input']>;
  position: Scalars['Int']['input'];
  recipeId?: InputMaybe<Scalars['UUID']['input']>;
  text: Scalars['String']['input'];
};

export type RecipeProduct = {
  __typename?: 'RecipeProduct';
  amount?: Maybe<Scalars['Decimal']['output']>;
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  factor?: Maybe<Scalars['Decimal']['output']>;
  groupPosition: Scalars['Int']['output'];
  id: Scalars['UUID']['output'];
  modifiedAt?: Maybe<Scalars['DateTime']['output']>;
  productId: Scalars['UUID']['output'];
  productPosition: Scalars['Int']['output'];
  productUnits: Array<ProductUnit>;
  recipe?: Maybe<Recipe>;
  recipeId: Scalars['UUID']['output'];
  unit: Scalars['String']['output'];
};

export type RecipeProductsCreateDtoInput = {
  amount?: InputMaybe<Scalars['Decimal']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  factor?: InputMaybe<Scalars['Decimal']['input']>;
  groupPosition: Scalars['Int']['input'];
  id?: InputMaybe<Scalars['UUID']['input']>;
  productId: Scalars['UUID']['input'];
  productPosition: Scalars['Int']['input'];
  recipeId?: InputMaybe<Scalars['UUID']['input']>;
  unit?: InputMaybe<Scalars['String']['input']>;
};

export type RecipeUpdateDtoInput = {
  id: Scalars['UUID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  portions?: InputMaybe<Scalars['Int']['input']>;
  recipeDescriptions?: InputMaybe<Array<InputMaybe<RecipeDescriptionCreateOrUpdateDtoInput>>>;
  recipeHeaderProducts?: InputMaybe<Array<InputMaybe<RecipeHeaderProductCreateOrUpdateDtoInput>>>;
  recipeProducts?: InputMaybe<Array<InputMaybe<RecipeProductsCreateDtoInput>>>;
};

export type ResponseObjectOfProductCategory = {
  __typename?: 'ResponseObjectOfProductCategory';
  data?: Maybe<ProductCategory>;
  errorCode: ErrorCode;
  isError: Scalars['Boolean']['output'];
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

export type UnitUpdateDtoInput = {
  id: Scalars['UUID']['input'];
  name: Scalars['String']['input'];
};

export type AddCategoryMutationVariables = Exact<{
  name: Scalars['String']['input'];
}>;


export type AddCategoryMutation = { __typename?: 'Mutation', createProductCategory: { __typename?: 'ResponseObjectOfProductCategory', errorCode: ErrorCode, isError: boolean, data?: { __typename?: 'ProductCategory', id: string, name: string } | null } };

export type AddProductMutationVariables = Exact<{
  dto: ProductCreateDtoInput;
}>;


export type AddProductMutation = { __typename?: 'Mutation', createProduct: { __typename?: 'Product', name: string, id: string } };

export type AddRecipeMutationVariables = Exact<{
  dto: RecipeCreateDtoInput;
}>;


export type AddRecipeMutation = { __typename?: 'Mutation', createRecipe: { __typename?: 'Recipe', id: string } };

export type RemoveCategoryMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type RemoveCategoryMutation = { __typename?: 'Mutation', removeProductCategory: boolean };

export type RemoveProductMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type RemoveProductMutation = { __typename?: 'Mutation', removeProduct: boolean };

export type RemoveRecipeGroupMutationVariables = Exact<{
  dto: RecipeGroupRemoveDtoInput;
}>;


export type RemoveRecipeGroupMutation = { __typename?: 'Mutation', removeProductGroup: boolean };

export type RemoveProductUnitMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type RemoveProductUnitMutation = { __typename?: 'Mutation', removeProductUnit: boolean };

export type RemoveRecipeProductMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type RemoveRecipeProductMutation = { __typename?: 'Mutation', removeRecipeProduct: boolean };

export type RenameCategoryMutationVariables = Exact<{
  name: Scalars['String']['input'];
  id: Scalars['UUID']['input'];
}>;


export type RenameCategoryMutation = { __typename?: 'Mutation', updateProductCategory?: { __typename?: 'ProductCategory', name: string, id: string } | null };

export type UpdateProductMutationVariables = Exact<{
  dto: ProductUpdateDtoInput;
}>;


export type UpdateProductMutation = { __typename?: 'Mutation', updateProduct?: { __typename?: 'Product', name: string, id: string } | null };

export type UpdateRecipeMutationVariables = Exact<{
  dto: RecipeUpdateDtoInput;
}>;


export type UpdateRecipeMutation = { __typename?: 'Mutation', updateRecipe?: { __typename?: 'Recipe', id: string } | null };

export type GetProductByIdQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type GetProductByIdQuery = { __typename?: 'Query', product?: { __typename?: 'Product', id: string, carbs?: number | null, category?: string | null, fat?: number | null, kcal?: number | null, name: string, protein?: number | null, salt?: number | null, sugar?: number | null, unit?: string | null, amount?: number | null, productUnits: Array<{ __typename?: 'ProductUnit', modifiedAt?: string | null, createdAt: string, id: string, productId: string, amount?: number | null, unit: string, defaultUnit: number }> } | null };

export type GetProductUnitsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProductUnitsQuery = { __typename?: 'Query', productUnits: Array<{ __typename?: 'ProductUnit', id: string, createdAt: string, modifiedAt?: string | null, productId: string, amount?: number | null, unit: string, defaultUnit: number }> };

export type GetProductUnitsByProductIdQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type GetProductUnitsByProductIdQuery = { __typename?: 'Query', productUnit?: { __typename?: 'ProductUnit', id: string, unit: string, amount?: number | null, productId: string, modifiedAt?: string | null, createdAt: string, defaultUnit: number } | null };

export type GetRecipeByIdQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type GetRecipeByIdQuery = { __typename?: 'Query', recipe?: { __typename?: 'Recipe', id: string, name: string, createdAt: string, modifiedAt?: string | null, portions?: number | null, recipeProducts: Array<{ __typename?: 'RecipeProduct', amount?: number | null, description: string, productId: string, groupPosition: number, productPosition: number, unit: string, id: string, factor?: number | null, productUnits: Array<{ __typename?: 'ProductUnit', defaultUnit: number, unit: string, amount?: number | null, id: string, createdAt: string, modifiedAt?: string | null }> }>, recipeDescriptions: Array<{ __typename?: 'RecipeDescription', position: number, text: string, id: string, header: string }>, recipeHeaderProducts: Array<{ __typename?: 'RecipeHeaderProduct', id: string, position: number, recipeId: string, text: string }> } | null };

export type RecipesQueryVariables = Exact<{ [key: string]: never; }>;


export type RecipesQuery = { __typename?: 'Query', recipes: Array<{ __typename?: 'Recipe', id: string, name: string }> };

export type UnitsQueryVariables = Exact<{ [key: string]: never; }>;


export type UnitsQuery = { __typename?: 'Query', units: Array<{ __typename?: 'Unit', id: string, name: string }> };

export type ProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type ProductsQuery = { __typename?: 'Query', products: Array<{ __typename?: 'Product', id: string, carbs?: number | null, category?: string | null, fat?: number | null, kcal?: number | null, name: string, protein?: number | null, salt?: number | null, sugar?: number | null, amount?: number | null, unit?: string | null, productUnits: Array<{ __typename?: 'ProductUnit', defaultUnit: number, id: string, unit: string, amount?: number | null }> }> };

export type ProductCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type ProductCategoriesQuery = { __typename?: 'Query', productCategories: Array<{ __typename?: 'ProductCategory', id: string, name: string }> };


export const AddCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createProductCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"dto"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errorCode"}},{"kind":"Field","name":{"kind":"Name","value":"isError"}}]}}]}}]} as unknown as DocumentNode<AddCategoryMutation, AddCategoryMutationVariables>;
export const AddProductDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addProduct"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ProductCreateDtoInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createProduct"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"dto"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<AddProductMutation, AddProductMutationVariables>;
export const AddRecipeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addRecipe"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RecipeCreateDtoInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createRecipe"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"dto"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<AddRecipeMutation, AddRecipeMutationVariables>;
export const RemoveCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"removeCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeProductCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<RemoveCategoryMutation, RemoveCategoryMutationVariables>;
export const RemoveProductDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"removeProduct"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeProduct"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<RemoveProductMutation, RemoveProductMutationVariables>;
export const RemoveRecipeGroupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveRecipeGroup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RecipeGroupRemoveDtoInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeProductGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"dto"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dto"}}}]}]}}]} as unknown as DocumentNode<RemoveRecipeGroupMutation, RemoveRecipeGroupMutationVariables>;
export const RemoveProductUnitDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"removeProductUnit"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeProductUnit"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<RemoveProductUnitMutation, RemoveProductUnitMutationVariables>;
export const RemoveRecipeProductDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"removeRecipeProduct"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeRecipeProduct"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<RemoveRecipeProductMutation, RemoveRecipeProductMutationVariables>;
export const RenameCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"renameCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateProductCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"dto"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<RenameCategoryMutation, RenameCategoryMutationVariables>;
export const UpdateProductDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateProduct"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ProductUpdateDtoInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateProduct"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"dto"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateProductMutation, UpdateProductMutationVariables>;
export const UpdateRecipeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateRecipe"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RecipeUpdateDtoInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateRecipe"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"dto"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateRecipeMutation, UpdateRecipeMutationVariables>;
export const GetProductByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getProductById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"product"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"carbs"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"fat"}},{"kind":"Field","name":{"kind":"Name","value":"kcal"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"protein"}},{"kind":"Field","name":{"kind":"Name","value":"salt"}},{"kind":"Field","name":{"kind":"Name","value":"sugar"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"productUnits"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"modifiedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"productId"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"defaultUnit"}}]}}]}}]}}]} as unknown as DocumentNode<GetProductByIdQuery, GetProductByIdQueryVariables>;
export const GetProductUnitsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getProductUnits"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"productUnits"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"modifiedAt"}},{"kind":"Field","name":{"kind":"Name","value":"productId"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"defaultUnit"}}]}}]}}]} as unknown as DocumentNode<GetProductUnitsQuery, GetProductUnitsQueryVariables>;
export const GetProductUnitsByProductIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getProductUnitsByProductId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"productUnit"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"productId"}},{"kind":"Field","name":{"kind":"Name","value":"modifiedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"defaultUnit"}}]}}]}}]} as unknown as DocumentNode<GetProductUnitsByProductIdQuery, GetProductUnitsByProductIdQueryVariables>;
export const GetRecipeByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getRecipeById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"recipe"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"modifiedAt"}},{"kind":"Field","name":{"kind":"Name","value":"portions"}},{"kind":"Field","name":{"kind":"Name","value":"recipeProducts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"productId"}},{"kind":"Field","name":{"kind":"Name","value":"groupPosition"}},{"kind":"Field","name":{"kind":"Name","value":"productPosition"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"factor"}},{"kind":"Field","name":{"kind":"Name","value":"productUnits"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"defaultUnit"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"modifiedAt"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"recipeDescriptions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"header"}}]}},{"kind":"Field","name":{"kind":"Name","value":"recipeHeaderProducts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"recipeId"}},{"kind":"Field","name":{"kind":"Name","value":"text"}}]}}]}}]}}]} as unknown as DocumentNode<GetRecipeByIdQuery, GetRecipeByIdQueryVariables>;
export const RecipesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"recipes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"recipes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<RecipesQuery, RecipesQueryVariables>;
export const UnitsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Units"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"units"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<UnitsQuery, UnitsQueryVariables>;
export const ProductsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"products"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"products"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"carbs"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"fat"}},{"kind":"Field","name":{"kind":"Name","value":"kcal"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"protein"}},{"kind":"Field","name":{"kind":"Name","value":"salt"}},{"kind":"Field","name":{"kind":"Name","value":"sugar"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"productUnits"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"defaultUnit"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}}]}}]}}]}}]} as unknown as DocumentNode<ProductsQuery, ProductsQueryVariables>;
export const ProductCategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"productCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"productCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<ProductCategoriesQuery, ProductCategoriesQueryVariables>;