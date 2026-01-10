<script setup lang="ts">
import CollapsibleShared from "@/components/shared/collapsible/CollapsibleShared.vue";
import { Button } from "@/components/shared/button";
import { computed, ref } from "vue";
import { useProductCategories } from "@/composables/querys/productCategories";
import { GetRecipeDetailsQuery } from "@/api/gql/graphql.ts";

type ProductType = NonNullable<GetRecipeDetailsQuery["recipe"]>["recipeProducts"][number]["product"];
const props = defineProps<{ product: ProductType }>();

const { getCategoryNameById } = useProductCategories();

const isOpen = ref(false);

const information = computed((): { name: string; value?: string | number | null; classCell?: string }[] => {
  const product = props.product;

  if (!product) return [];

  return [
    { name: "Kategorie", value: getCategoryNameById(product.category || "") },
    { name: "Kohlenhydrate", value: product.carbs },
    { name: "Fett", value: product.fat },
    { name: "Kalorien", value: product.kcal },
    { name: "Protein", value: product.protein },
    { name: "Salz", value: product.salt },
    { name: "Zucker", value: product.sugar },
  ];
});
</script>

<template>
  <CollapsibleShared v-model:open="isOpen" :class="{ 'h-0': !isOpen }">
    <template #trigger>
      <Button as="div" size="iconRow" :icon="isOpen ? 'chevronDown' : 'chevronRight'" variant="outline" class="z-10 absolute left-px top-px" />
    </template>
    <template #content>
      <p class="my-2 ml-1 text-xs">Produkt Eigenschaften</p>
      <div v-if="product" class="flex space-x-6 bg-accent p-2 mx-1 text-sm">
        <div v-for="info in information" :key="info.name">
          <p class="font-bold text-muted-foreground min-h-8">{{ info.name }}</p>
          <p :class="['whitespace-nowrap', info?.classCell]">{{ info.value }}</p>
        </div>
      </div>
    </template>
  </CollapsibleShared>
</template>
