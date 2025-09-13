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
  <CollapsibleShared v-model:open="isOpen" :class="{ 'product-properties__collapsible--close': !isOpen }">
    <template #trigger>
      <Button as="div" size="iconRow" :icon="isOpen ? 'chevronDown' : 'chevronRight'" variant="outline" class="product-properties__trigger" />
    </template>
    <template #content>
      <p class="product-properties__title">Produkt Eigenschaften</p>
      <div v-if="product" class="product-properties__info-wrapper">
        <div v-for="info in information" :key="info.name">
          <p class="product-properties__info-name">{{ info.name }}</p>
          <p :class="['product-properties__info-value', info?.classCell]">{{ info.value }}</p>
        </div>
      </div>
    </template>
  </CollapsibleShared>
</template>

<style scoped lang="scss">
.product-properties {
  &__trigger {
    @apply z-10 absolute left-[1px] top-[1px];
  }

  &__title {
    @apply my-2 ml-1;
  }

  &__info-wrapper {
    @apply flex space-x-6 bg-accent p-2 mx-1;
  }

  &__info-name {
    @apply font-bold text-sm text-muted-foreground min-h-8;
  }

  &__info-value {
    @apply whitespace-nowrap;
  }
}
</style>
<style lang="scss">
.product-properties {
  &__collapsible {
    &--close {
      @apply h-0;
    }
  }
}
</style>
