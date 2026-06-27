<script setup lang="ts">
import { computed, ref } from "vue";
import { useProductCategories } from "@/composables/querys/productCategories";
import { type GetRecipeDetailsQuery } from "@/api/gql/graphql.ts";
import { ChevronDown, ChevronRight } from "lucide-vue-next";

type ProductType = NonNullable<GetRecipeDetailsQuery["recipe"]>["recipeProducts"][number]["product"];
const props = defineProps<{ product: ProductType }>();

const { getCategoryNameById } = useProductCategories();

const isOpen = ref(false);

const nutrients = computed(() => {
  const p = props.product;
  if (!p) {
    return [];
  }
  return [
    { name: "Kategorie", value: p.category ? getCategoryNameById(p.category) : null, unit: "" },
    { name: "Kalorien", value: p.kcal, unit: "kcal" },
    { name: "Kohlenhydrate", value: p.carbs, unit: "g" },
    { name: "Fett", value: p.fat, unit: "g" },
    { name: "Protein", value: p.protein, unit: "g" },
    { name: "Zucker", value: p.sugar, unit: "g" },
    { name: "Salz", value: p.salt, unit: "g" },
  ].filter((n) => n.value !== null && n.value !== "" && n.value !== 0);
});
</script>

<template>
  <div
    class="absolute left-0 inset-y-0 w-5 flex items-center justify-center text-muted-foreground/30 hover:text-muted-foreground hover:bg-muted/20 transition-colors cursor-pointer"
    @click.stop="isOpen = !isOpen"
  >
    <ChevronDown v-if="isOpen" class="h-3 w-3" />
    <ChevronRight v-else class="h-3 w-3" />
  </div>
  <div v-show="isOpen" class="mt-2 pl-5 pb-2">
    <p class="text-xs text-muted-foreground mb-1.5">Nährwerte (pro 100 g)</p>
    <div class="flex flex-wrap gap-1.5">
      <div
        v-for="n in nutrients"
        :key="n.name"
        class="flex items-center gap-1 rounded-md bg-muted/50 dark:bg-muted/30 px-2 py-1"
      >
        <span class="text-xs text-muted-foreground">{{ n.name }}:</span>
        <span class="text-xs font-semibold">{{ n.value }} {{ n.unit }}</span>
      </div>
    </div>
  </div>
</template>
