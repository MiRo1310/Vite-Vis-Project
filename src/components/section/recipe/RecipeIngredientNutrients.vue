<script setup lang="ts">
import { computed } from "vue";
import { ExternalLink } from "@lucide/vue";
import { useProductCategories } from "@/composables/querys/productCategories";
import { type RecipeIngredient } from "@/composables/querys/recipeDetails.ts";
import { type Nutrient, nutrientAccent, nutrientLabel, recipeAccentClasses } from "@/constants/recipe.ts";
import { formatAmount } from "@/lib/recipe.ts";
import { routes } from "@/router/routes.ts";

const props = defineProps<{ product: NonNullable<RecipeIngredient["product"]>; productId: string }>();

const { getCategoryNameById } = useProductCategories();

const categoryName = computed(() => (props.product.category ? getCategoryNameById(props.product.category) : ""));

const nutrients = computed(() =>
  (["kcal", "carbs", "fat", "protein", "sugar", "salt"] as Nutrient[])
    .map((key) => ({ key, label: nutrientLabel[key], value: props.product[key], unit: key === "kcal" ? "kcal" : "g" }))
    .filter((n) => !!n.value),
);
</script>

<template>
  <div class="rounded-xl bg-muted/40 px-3 py-2.5 flex flex-col gap-2">
    <div class="flex items-center justify-between gap-2 text-xs text-muted-foreground">
      <span>Nährwerte pro 100 g<template v-if="categoryName"> · {{ categoryName }}</template></span>
      <RouterLink
        :to="{ name: routes.recipeManage.name, query: { tab: 'products', productId } }"
        class="inline-flex items-center gap-1 font-medium hover:text-foreground transition-colors"
      >
        Produkt <ExternalLink class="h-3 w-3" />
      </RouterLink>
    </div>
    <div v-if="nutrients.length" class="flex flex-wrap gap-1.5">
      <span
        v-for="n in nutrients"
        :key="n.key"
        :class="['inline-flex items-center gap-1 rounded-full px-2 h-6 text-xs', recipeAccentClasses[nutrientAccent[n.key]].soft]"
      >
        {{ n.label }} <span class="font-semibold">{{ formatAmount(n.value) }} {{ n.unit }}</span>
      </span>
    </div>
    <p v-else class="text-xs text-muted-foreground">Keine Nährwerte hinterlegt.</p>
  </div>
</template>
