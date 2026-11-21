import { computed, type MaybeRefOrGetter, toValue } from "vue";
import { useQuery } from "@vue/apollo-composable";
import { graphql } from "@/api/gql";
import { type GetRecipeDetailsQuery } from "@/api/gql/graphql.ts";

export type RecipeDetails = NonNullable<GetRecipeDetailsQuery["recipe"]>;
export type RecipeIngredient = RecipeDetails["recipeProducts"][number];
export type RecipeStep = RecipeDetails["recipeDescriptions"][number];

const recipeDetailsQuery = graphql(`
  query getRecipeDetails($id: UUID!) {
    recipe(id: $id) {
      id
      name
      portions
      totalKcal
      preparationTimeMin
      totalTimeMin
      cookedCount
      lastCookedAt
      recipeCategory {
        id
        name
      }
      recipeProducts {
        amount
        description
        groupPosition
        unit
        kcal
        activeUnitId
        productId
        product {
          name
          category
          carbs
          fat
          kcal
          protein
          salt
          sugar
        }
      }
      recipeDescriptions {
        position
        text
        header
      }
      recipeHeaderProducts {
        position
        text
      }
    }
  }
`);

/**
 * Lädt ein Rezept mit Zutaten und Schritten – geteilt von Detailseite und Kochmodus.
 * Reagiert auf eine geänderte ID; `cache-and-network` zeigt sofort den Cache und holt danach frische Daten.
 *
 * @param recipeId - Rezept-ID (Ref, Getter oder Wert); ohne ID wird nichts geladen.
 */
export const useRecipeDetails = (recipeId: MaybeRefOrGetter<string | undefined>) => {
  const { result, loading, refetch } = useQuery(
    recipeDetailsQuery,
    () => ({ id: toValue(recipeId) ?? "" }),
    () => ({ enabled: !!toValue(recipeId), fetchPolicy: "cache-and-network" }),
  );

  const recipe = computed((): RecipeDetails | null => result.value?.recipe ?? null);

  return { recipe, loading, refetch };
};
