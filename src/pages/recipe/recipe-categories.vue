<script setup lang="ts">
import { BookOpen } from "@lucide/vue";
import InlineEditList from "@/components/shared/recipe/InlineEditList.vue";
import { useRecipeCategoriesCrud } from "@/composables/recipeMasterData.ts";

const crud = useRecipeCategoriesCrud();
</script>

<template>
  <InlineEditList
    :crud
    item-label="Rezept-Kategorie"
    items-label="Rezept-Kategorien"
    placeholder="z. B. Suppen, Kuchen, Salate"
    :icon="BookOpen"
    accent="berry"
    color-by-name
    e2e="recipe-categories"
  />
</template>
