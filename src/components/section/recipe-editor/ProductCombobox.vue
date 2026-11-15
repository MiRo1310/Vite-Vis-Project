<script setup lang="ts">
import { computed, ref } from "vue";
import { ChevronDown, Clock, Plus, Search } from "@lucide/vue";
import { Combobox, ComboboxAnchor, ComboboxGroup, ComboboxInput, ComboboxItem, ComboboxList } from "@/components/ui/combobox";
import { type EditorProduct } from "@/composables/recipeEditor.ts";
import { searchProducts } from "@/lib/product.ts";

/** Auswahl läuft über `select`; der Editor setzt Produkt und Standard-Einheit und reicht `productId` zurück. */
const props = defineProps<{ productId: string; products: EditorProduct[]; recentIds: string[]; invalid?: boolean; id?: string }>();
const emits = defineEmits<{ select: [product: EditorProduct]; create: [name: string] }>();

const search = ref("");
const open = ref(false);

const term = computed(() => search.value.trim());
const result = computed(() => searchProducts(props.products, search.value, props.recentIds));
const nameOf = (id: unknown): string => props.products.find((product) => product.id === id)?.name ?? "";

const onSelect = (id: unknown) => {
  const product = props.products.find((p) => p.id === id);
  if (product) {
    emits("select", product);
  }
};

const create = () => {
  emits("create", term.value);
  open.value = false;
  search.value = "";
};
</script>

<template>
  <Combobox :model-value="productId" v-model:open="open" ignore-filter open-on-click @update:model-value="onSelect">
    <ComboboxAnchor>
      <Search class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
      <ComboboxInput
        :id
        v-model="search"
        :display-value="nameOf"
        placeholder="Produkt suchen …"
        :aria-invalid="invalid || undefined"
        class="h-11 rounded-xl pl-9 pr-9 text-base md:text-sm"
        v-e2e="'recipe-ingredient-product'"
      />
      <ChevronDown class="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
    </ComboboxAnchor>

    <ComboboxList>
      <ComboboxGroup v-if="result.recent.length" heading="Zuletzt verwendet">
        <ComboboxItem v-for="product in result.recent" :key="`recent-${product.id}`" :value="product.id" :text-value="product.name">
          <Clock class="h-3.5 w-3.5 text-muted-foreground" />
          <span class="flex-1 truncate">{{ product.name }}</span>
          <span v-if="product.productCategory" class="text-xs text-muted-foreground truncate">{{ product.productCategory.name }}</span>
        </ComboboxItem>
      </ComboboxGroup>

      <ComboboxGroup :heading="!term && result.recent.length ? 'Alle Produkte' : undefined">
        <ComboboxItem
          v-for="product in result.matches"
          :key="product.id"
          :value="product.id"
          :text-value="product.name"
          v-e2e="'recipe-ingredient-option'"
        >
          <span class="flex-1 truncate">{{ product.name }}</span>
          <span v-if="product.productCategory" class="text-xs text-muted-foreground truncate">{{ product.productCategory.name }}</span>
        </ComboboxItem>
      </ComboboxGroup>

      <p v-if="term && !result.matches.length" class="px-2.5 py-2 text-sm text-muted-foreground">Kein Produkt gefunden.</p>

      <ComboboxItem
        v-if="term && !result.hasExactMatch"
        value="__create__"
        :text-value="term"
        class="mt-1 border-t border-border/60 rounded-t-none text-recipe-basil-fg font-medium"
        v-e2e="'recipe-ingredient-create-product'"
        @select.prevent="create"
      >
        <Plus class="h-4 w-4" /> „{{ term }}“ als Produkt anlegen
      </ComboboxItem>
    </ComboboxList>
  </Combobox>
</template>
