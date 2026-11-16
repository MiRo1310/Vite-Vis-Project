<script setup lang="ts">
import { computed } from "vue";
import { Barcode, Flame } from "@lucide/vue";
import { Card } from "@/components/ui/card";
import { getMacroShares } from "@/lib/product.ts";
import { nutrientAccent, recipeAccentClasses, type RecipeAccentKey } from "@/constants/recipe.ts";

interface ProductCardData {
  name: string;
  kcal?: number | null;
  carbs?: number | null;
  fat?: number | null;
  protein?: number | null;
  amount?: number | null;
  unit?: string | null;
  ean?: string | null;
}

const props = defineProps<{ product: ProductCardData; accent: RecipeAccentKey }>();
const emits = defineEmits<{ open: [] }>();

const shares = computed(() => getMacroShares(props.product));
const hasMacros = computed(() => shares.value.carbs + shares.value.fat + shares.value.protein > 0);

const macros = computed(() =>
  (["carbs", "fat", "protein"] as const).map((key) => ({
    key,
    short: { carbs: "KH", fat: "F", protein: "P" }[key],
    grams: props.product[key] ?? 0,
    share: shares.value[key],
    classes: recipeAccentClasses[nutrientAccent[key]],
  })),
);

const formatGrams = (value: number): string => (Number.isInteger(value) ? String(value) : value.toFixed(1));
</script>

<template>
  <!-- Mobil: schlanke Listenzeile (Name + kcal), ab sm: Karte mit Makros -->
  <Card
    role="button"
    tabindex="0"
    class="py-0 gap-0 overflow-hidden cursor-pointer group border-border/60 hover:shadow-md sm:hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring outline-none transition-all duration-200 max-sm:rounded-none max-sm:border-0 max-sm:shadow-none max-sm:hover:shadow-none max-sm:active:bg-accent"
    v-e2e="'product-card'"
    @click="emits('open')"
    @keydown.enter.prevent="emits('open')"
    @keydown.space.prevent="emits('open')"
  >
    <div :class="['h-1.5 max-sm:hidden', recipeAccentClasses[accent].solid]" />
    <div class="px-3 py-2.5 sm:p-3 flex flex-col gap-2 max-sm:min-h-11 max-sm:justify-center">
      <div class="flex items-center sm:items-start justify-between gap-2">
        <div class="min-w-0">
          <p class="font-medium sm:font-semibold leading-tight truncate">{{ product.name }}</p>
          <p class="text-xs text-muted-foreground mt-0.5 max-sm:hidden">pro {{ product.amount ?? 100 }} {{ product.unit ?? "g" }}</p>
        </div>
        <span :class="['inline-flex items-center gap-1 rounded-full px-2 h-6 text-xs font-semibold shrink-0', recipeAccentClasses[nutrientAccent.kcal].soft]">
          <Flame class="h-3 w-3" />{{ Math.round(product.kcal ?? 0) }} kcal
        </span>
      </div>

      <!-- Makro-Verteilung -->
      <div v-if="hasMacros" class="flex h-2 rounded-full overflow-hidden bg-muted max-sm:hidden">
        <span v-for="macro in macros" :key="macro.key" :class="macro.classes.solid" :style="{ width: `${macro.share}%` }" />
      </div>
      <div class="flex items-center gap-3 text-xs max-sm:hidden">
        <span v-for="macro in macros" :key="macro.key" :class="['inline-flex items-center gap-1', macro.classes.text]">
          <span :class="['h-1.5 w-1.5 rounded-full', macro.classes.solid]" />
          {{ macro.short }} {{ formatGrams(macro.grams) }} g
        </span>
        <Barcode v-if="product.ean" class="h-3.5 w-3.5 ml-auto text-muted-foreground" :title="product.ean" />
      </div>
    </div>
  </Card>
</template>
