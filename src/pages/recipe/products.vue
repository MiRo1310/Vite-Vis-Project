<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useQuery } from "@vue/apollo-composable";
import { useRouteQuery } from "@vueuse/router";
import { PackageSearch, Plus, Search, X } from "@lucide/vue";
import { graphql } from "@/api/gql";
import { Button } from "@/components/ui/button";
import { InputShadcn } from "@/components/ui/input";
import EmptyState from "@/components/shared/recipe/EmptyState.vue";
import ProductCard from "@/components/section/products/ProductCard.vue";
import ProductEditorSheet from "@/components/section/products/ProductEditorSheet.vue";
import BarcodeScanButton from "@/components/shared/barcode/BarcodeScanButton.vue";
import { useToast } from "@/components/ui/toast/use-toast";
import { useUnits } from "@/composables/querys/units.ts";
import { useProductCategories } from "@/composables/querys/productCategories.ts";
import { filterProductGroups, findProductByEan } from "@/lib/product.ts";
import { getCategoryColor } from "@/lib/recipe.ts";
import { recipeAccentClasses } from "@/constants/recipe.ts";

useUnits();
useProductCategories();

const productIdQuery = useRouteQuery<string | null>("productId", null);

const { result, loading } = useQuery(
  graphql(`
    query GetProducts($where: KeyValuePairOfStringAndListOfProductFilterInput) {
      productsGrouped(where: $where) {
        key
        value {
          id
          carbs
          fat
          kcal
          name
          protein
          salt
          sugar
          unit
          ean
          amount
          productUnits {
            id
            amount
            unit
          }
        }
      }
    }
  `),
  {},
  { fetchPolicy: "network-only" },
);

// --- Filter ---
const search = ref("");
const selectedCategories = ref<string[]>([]);

const allGroups = computed(() => result.value?.productsGrouped ?? []);
const categories = computed(() =>
  allGroups.value
    .map((group) => ({ name: group.key, count: group.value.length }))
    .sort((a, b) => a.name.localeCompare(b.name, "de")),
);
const filteredGroups = computed(() => filterProductGroups(allGroups.value, search.value, selectedCategories.value));
const totalCount = computed(() => allGroups.value.reduce((sum, group) => sum + group.value.length, 0));
const filteredCount = computed(() => filteredGroups.value.reduce((sum, group) => sum + group.value.length, 0));

const toggleCategory = (name: string) => {
  selectedCategories.value = selectedCategories.value.includes(name)
    ? selectedCategories.value.filter((category) => category !== name)
    : [...selectedCategories.value, name];
};

const resetFilter = () => {
  search.value = "";
  selectedCategories.value = [];
};

// --- Bearbeiten / Anlegen ---
const editorOpen = ref(false);
const editProductId = ref<string | null>(null);
const newProductEan = ref<string | undefined>(undefined);

const openEditor = (productId: string | null, ean?: string) => {
  editProductId.value = productId;
  newProductEan.value = ean;
  editorOpen.value = true;
};

const { toast } = useToast();

/** Gescannt: vorhandenes Produkt öffnen statt doppelt anlegen, sonst neues Produkt mit dieser EAN */
const onScanned = (ean: string) => {
  const existing = findProductByEan(allGroups.value, ean);
  if (existing) {
    toast({ title: "Schon vorhanden", description: existing.name });
    openEditor(existing.id);
    return;
  }
  openEditor(null, ean);
};

onMounted(() => {
  if (productIdQuery.value) {
    openEditor(productIdQuery.value);
    productIdQuery.value = null;
  }
});
</script>

<template>
  <div class="h-full flex flex-col gap-3">
    <!-- Suche + Neu -->
    <div class="flex gap-2 shrink-0">
      <div class="relative flex-1 min-w-0">
        <Search class="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10 pointer-events-none" />
        <InputShadcn v-model="search" type="text" placeholder="Produkt oder EAN suchen" class="h-11 rounded-full pl-10 text-base md:text-sm" e2e="products-search" />
      </div>
      <!-- Mobil nur Icon: Breite = Höhe, sonst staucht has-[>svg]:px-3 den Kreis -->
      <BarcodeScanButton icon-only-on-mobile class="h-11 rounded-full px-4 max-sm:w-11! max-sm:px-0!" @detected="onScanned" />
      <Button class="h-11 rounded-full px-4 shrink-0 max-sm:w-11! max-sm:px-0!" :class="recipeAccentClasses.basil.solid" aria-label="Neues Produkt" v-e2e="'products-add'" @click="openEditor(null)">
        <Plus class="h-4 w-4" />
        <span class="hidden sm:inline">Neues Produkt</span>
      </Button>
    </div>

    <!-- Kategorie-Chips -->
    <div v-if="categories.length" class="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 shrink-0">
      <button
        type="button"
        class="h-9 px-3.5 rounded-full text-sm font-medium whitespace-nowrap border transition-colors"
        :class="selectedCategories.length === 0 ? 'bg-foreground text-background border-foreground' : 'border-border text-muted-foreground hover:bg-accent'"
        @click="selectedCategories = []"
      >
        Alle · {{ totalCount }}
      </button>
      <button
        v-for="category in categories"
        :key="category.name"
        type="button"
        class="h-9 px-3.5 rounded-full text-sm font-medium whitespace-nowrap border inline-flex items-center gap-1.5 transition-all"
        :class="
          selectedCategories.includes(category.name)
            ? [recipeAccentClasses[getCategoryColor(category.name)].soft, recipeAccentClasses[getCategoryColor(category.name)].border]
            : 'border-border text-muted-foreground hover:bg-accent'
        "
        @click="toggleCategory(category.name)"
      >
        <span :class="['h-2 w-2 rounded-full', recipeAccentClasses[getCategoryColor(category.name)].solid]" />
        {{ category.name }}
        <span class="opacity-60">{{ category.count }}</span>
      </button>
    </div>

    <!-- Liste -->
    <div class="flex-1 min-h-0 overflow-y-auto pb-4">
      <div v-for="group in filteredGroups" :key="group.key" class="mb-4 sm:mb-5">
        <div class="flex items-center gap-2 mb-1.5 sm:mb-2">
          <span :class="['h-2.5 w-2.5 rounded-full', recipeAccentClasses[getCategoryColor(group.key)].solid]" />
          <p :class="['text-sm font-semibold', recipeAccentClasses[getCategoryColor(group.key)].text]">{{ group.key }}</p>
          <span class="text-xs text-muted-foreground">{{ group.value.length }}</span>
        </div>
        <!-- Mobil eine Liste mit Trennlinien, ab sm ein Kachel-Raster -->
        <div
          class="grid grid-cols-1 max-sm:divide-y max-sm:divide-border/60 max-sm:rounded-2xl max-sm:border max-sm:border-border/60 max-sm:overflow-hidden max-sm:bg-card sm:grid-cols-2 sm:gap-3 xl:grid-cols-3 2xl:grid-cols-4"
        >
          <ProductCard v-for="product in group.value" :key="product.id" :product :accent="getCategoryColor(group.key)" @open="openEditor(product.id)" />
        </div>
      </div>

      <EmptyState
        v-if="!loading && filteredCount === 0"
        :icon="PackageSearch"
        accent="basil"
        :title="totalCount ? 'Nichts gefunden' : 'Noch keine Produkte'"
        :description="totalCount ? 'Probier einen anderen Suchbegriff oder eine andere Kategorie.' : 'Leg dein erstes Lebensmittel an – mit Barcode geht das ganz schnell.'"
      >
        <Button v-if="totalCount" variant="outline" class="rounded-full" @click="resetFilter"><X class="h-4 w-4" /> Filter zurücksetzen</Button>
        <Button v-else class="rounded-full" :class="recipeAccentClasses.basil.solid" @click="openEditor(null)"><Plus class="h-4 w-4" /> Produkt anlegen</Button>
      </EmptyState>
    </div>

    <ProductEditorSheet v-model:open="editorOpen" :product-id="editProductId" :initial-ean="newProductEan" />
  </div>
</template>
