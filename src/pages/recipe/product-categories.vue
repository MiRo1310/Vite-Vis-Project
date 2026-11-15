<script setup lang="ts">
import { Tag } from "@lucide/vue";
import InlineEditList from "@/components/shared/recipe/InlineEditList.vue";
import { useProductCategoriesCrud } from "@/composables/recipeMasterData.ts";

const crud = useProductCategoriesCrud();
</script>

<template>
  <InlineEditList
    :crud
    item-label="Produkt-Kategorie"
    items-label="Produkt-Kategorien"
    placeholder="z. B. Obst, Gemüse, Milchprodukte"
    :icon="Tag"
    accent="mango"
    color-by-name
    e2e="product-categories"
  />
</template>
