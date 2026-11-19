import { unitHelper } from "./unit.ts";
import { categoryHelper } from "./category.ts";
import { productHelper } from "./product.ts";
import { recipeHelper } from "./recipe.ts";

/**
 * E2E helpers for the recipe app that create master data and recipes through the UI against the real backend.
 *
 * Requires `gql.aliasGraphqlOperations()` from `../utils.ts` in `beforeEach`, because the helpers wait on
 * GraphQL operation aliases such as `@Units`, `@ProductCategories` and `@addRecipe`.
 *
 * @example
 * beforeEach(() => {
 *   gql.aliasGraphqlOperations();
 * });
 *
 * it("creates a recipe", () => {
 *   recipe.category.add(categoryName);
 *   recipe.unit.add("g");
 *   recipe.product.add(productName, categoryName, "g");
 *   recipe.add(recipeName, productName);
 * });
 */
export const recipe = { unit: unitHelper, category: categoryHelper, product: productHelper, ...recipeHelper };
