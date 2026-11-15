<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { ArrowLeft, ChefHat, ListChecks, Pencil, RotateCcw, SearchX, ShoppingBasket, Trash2, UtensilsCrossed } from "@lucide/vue";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import EmptyState from "@/components/shared/recipe/EmptyState.vue";
import RecipePageHeader from "@/components/shared/recipe/RecipePageHeader.vue";
import DeleteRecipe from "@/components/section/recipe/action/DeleteRecipe.vue";
import AlexaTimerStrip from "@/components/section/recipe/AlexaTimerStrip.vue";
import RecipeMetaInfo from "@/components/section/recipe/RecipeMetaInfo.vue";
import RecipeServings from "@/components/section/recipe/RecipeServings.vue";
import RecipeIngredientList from "@/components/section/recipe/RecipeIngredientList.vue";
import RecipeSteps from "@/components/section/recipe/RecipeSteps.vue";
import AddToShoppingListSheet from "@/components/section/recipe/AddToShoppingListSheet.vue";
import { useShoppingListEntries } from "@/composables/shoppingList.ts";
import { matchIngredientsWithShoppingList } from "@/lib/shopping-list.ts";
import { useRecipeDetails } from "@/composables/querys/recipeDetails.ts";
import { useRecipeStore } from "@/store/recipeStore.ts";
import { getCategoryColor, kcalPerPortion, scaleAmount } from "@/lib/recipe.ts";
import { recipeAccentClasses } from "@/constants/recipe.ts";
import { routes } from "@/router/routes.ts";

const props = defineProps<{ recipeId?: string }>();

const { recipe, loading } = useRecipeDetails(() => props.recipeId);
const recipeStore = useRecipeStore();

const basePortions = computed(() => Math.max(recipe.value?.portions ?? 1, 1));
const portions = ref(1);
const checked = ref<string[]>([]);

// Neues Rezept geladen: Portionen zurücksetzen, Häkchen leeren, in „Zuletzt geöffnet“ merken
watch(
  () => recipe.value?.id,
  (id) => {
    if (!id || !recipe.value) {
      return;
    }
    portions.value = basePortions.value;
    checked.value = [];
    recipeStore.addNewOpenedRecipeToLastRecipes({ id, name: recipe.value.name });
  },
  { immediate: true },
);

const accent = computed(() => getCategoryColor(recipe.value?.recipeCategory?.name));
const kcalPortion = computed(() => kcalPerPortion(recipe.value?.totalKcal, recipe.value?.portions));
const totalKcalScaled = computed(() => Math.round(scaleAmount(recipe.value?.totalKcal ?? 0, basePortions.value, portions.value) ?? 0));
const ingredientCount = computed(() => recipe.value?.recipeProducts.length ?? 0);
const stepCount = computed(() => recipe.value?.recipeDescriptions.length ?? 0);

const shoppingOpen = ref(false);
const { names: shoppingListNames } = useShoppingListEntries();
const onShoppingList = computed(() =>
  matchIngredientsWithShoppingList(
    (recipe.value?.recipeProducts ?? []).map((ingredient) => ingredient.product?.name ?? ""),
    shoppingListNames.value,
  ),
);

const cookingRoute = computed(() => ({
  name: routes.cookingMode.name,
  params: { recipeId: props.recipeId },
  query: portions.value === basePortions.value ? {} : { portionen: String(portions.value) },
}));
</script>

<template>
  <div class="h-full overflow-y-auto pb-6">
    <div class="flex flex-col gap-4 max-w-6xl mx-auto">
      <AlexaTimerStrip />

      <!-- Laden -->
      <template v-if="!recipe && loading">
        <Skeleton class="h-32 rounded-2xl" />
        <div class="grid lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-4">
          <Skeleton class="h-72 rounded-2xl" />
          <Skeleton class="h-72 rounded-2xl" />
        </div>
      </template>

      <!-- Nicht gefunden -->
      <EmptyState v-else-if="!recipe" :icon="SearchX" title="Rezept nicht gefunden" description="Vielleicht wurde es gelöscht.">
        <Button as-child variant="outline" class="rounded-full">
          <RouterLink :to="{ name: routes.recipes.name }"><ArrowLeft class="h-4 w-4" /> Zu den Rezepten</RouterLink>
        </Button>
      </EmptyState>

      <template v-else>
        <!-- Hero -->
        <RecipePageHeader :title="recipe.name" :icon="UtensilsCrossed" :accent>
          <template #meta>
            <div class="flex flex-wrap items-center gap-x-3 gap-y-1.5 mt-2">
              <span
                v-if="recipe.recipeCategory"
                :class="['rounded-full px-2.5 h-6 inline-flex items-center text-xs font-semibold', recipeAccentClasses[accent].soft]"
              >
                {{ recipe.recipeCategory.name }}
              </span>
              <RecipeMetaInfo
                size="md"
                :preparation-time-min="recipe.preparationTimeMin"
                :total-time-min="recipe.totalTimeMin"
                :portions="recipe.portions"
                :kcal="kcalPortion"
              />
            </div>
          </template>
          <template #actions>
            <Button as-child class="h-11 rounded-full px-5 shadow-sm" :class="recipeAccentClasses.primary.solid" v-e2e="'recipe-start-cooking'">
              <RouterLink :to="cookingRoute"><ChefHat class="h-5 w-5" /> Kochen</RouterLink>
            </Button>
            <Button as-child variant="outline" size="icon-lg" class="rounded-full" title="Bearbeiten">
              <RouterLink :to="{ name: routes.editRecipe.name, params: { id: recipe.id } }" aria-label="Bearbeiten"><Pencil class="h-4 w-4" /></RouterLink>
            </Button>
            <Button
              variant="outline"
              size="icon-lg"
              class="rounded-full"
              :disabled="!ingredientCount"
              title="Auf die Einkaufsliste"
              aria-label="Auf die Einkaufsliste"
              v-e2e="'recipe-add-to-shopping-list'"
              @click="shoppingOpen = true"
            >
              <ShoppingBasket class="h-4 w-4" />
            </Button>
            <DeleteRecipe :recipe-id="recipe.id">
              <Button variant="outline" size="icon-lg" class="rounded-full text-destructive hover:text-destructive" title="Löschen" aria-label="Rezept löschen">
                <Trash2 class="h-4 w-4" />
              </Button>
            </DeleteRecipe>
          </template>
        </RecipePageHeader>

        <div class="grid lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-4 items-start">
          <!-- Zutaten (Desktop: bleibt beim Scrollen stehen) -->
          <Card class="py-0 gap-0 rounded-2xl border-border/60 lg:sticky lg:top-0">
            <div class="p-4 flex flex-col gap-3">
              <div class="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 class="text-lg font-bold">Zutaten</h2>
                  <p class="text-xs text-muted-foreground">
                    {{ ingredientCount }} Zutaten<template v-if="totalKcalScaled"> · {{ totalKcalScaled }} kcal gesamt</template>
                  </p>
                </div>
                <RecipeServings v-model="portions" :base-portions="basePortions" />
              </div>

              <RecipeIngredientList v-if="ingredientCount" v-model:checked="checked" :recipe :portions :on-shopping-list="onShoppingList" />
              <p v-else class="text-sm text-muted-foreground py-4 text-center">Noch keine Zutaten eingetragen.</p>

              <div v-if="checked.length" class="flex items-center justify-between gap-2 text-xs text-muted-foreground border-t border-border/60 pt-3">
                <span class="inline-flex items-center gap-1.5"><ListChecks class="h-4 w-4" /> {{ checked.length }} von {{ ingredientCount }} bereit</span>
                <Button variant="ghost" size="sm" class="rounded-full" @click="checked = []"><RotateCcw class="h-3.5 w-3.5" /> Zurücksetzen</Button>
              </div>
            </div>
          </Card>

          <!-- Zubereitung -->
          <Card class="py-0 gap-0 rounded-2xl border-border/60">
            <div class="p-4 flex flex-col gap-4">
              <div class="flex items-center justify-between gap-3">
                <div>
                  <h2 class="text-lg font-bold">Zubereitung</h2>
                  <p class="text-xs text-muted-foreground">{{ stepCount }} {{ stepCount === 1 ? "Schritt" : "Schritte" }}</p>
                </div>
                <Button v-if="stepCount" as-child variant="outline" class="rounded-full">
                  <RouterLink :to="cookingRoute"><ChefHat class="h-4 w-4" /> Schritt für Schritt</RouterLink>
                </Button>
              </div>
              <RecipeSteps v-if="stepCount" :steps="recipe.recipeDescriptions" />
              <p v-else class="text-sm text-muted-foreground py-4 text-center">Noch keine Schritte eingetragen.</p>
            </div>
          </Card>
        </div>

        <AddToShoppingListSheet v-model:open="shoppingOpen" :recipe :portions />
      </template>
    </div>
  </div>
</template>
