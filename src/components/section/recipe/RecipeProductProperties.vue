<script setup lang="ts">
import CollapsibleShared from "@/components/shared/collapsible/CollapsibleShared.vue";
import { Button } from "@/components/shared/button";
import { computed, ref, watch } from "vue";
import { useLazyQuery } from "@vue/apollo-composable";
import { getProductById } from "@/api/query/getProductById";
import { useProductCategories } from "@/composables/querys/productCategories";
import { translation } from "@/lib/translation";

const props = defineProps<{ productId: string }>();

const { getCategoryNameById } = useProductCategories();

const { load, result } = useLazyQuery(getProductById);

watch(
  () => props.productId,
  async () => {
    if (props.productId) {
      await load(getProductById, { id: props.productId });
    }
  },
  { immediate: true },
);

const isOpen = ref(false);

const information = computed((): { name: string; value?: string | number | null; classCell?: string }[] => {
  const product = result.value?.product;

  if (!product) return [];

  return [
    { name: "Kategorie", value: getCategoryNameById(product.category || "") },
    { name: "Kohlenhydrate", value: product.carbs },
    { name: "Fett", value: product.fat },
    { name: "Kalorien", value: product.kcal },
    { name: "Protein", value: product.protein },
    { name: "Salz", value: product.salt },
    { name: "Zucker", value: product.sugar },
    { name: "pro", value: `${String(product.amount)} ${String(product.unit)}`, classCell: "bg-blue-300 px-2 pb-1 rounded-md" },
  ];
});
</script>

<template>
  <CollapsibleShared v-model:open="isOpen" :class="{ 'product-properties__collapsible--close': !isOpen }">
    <template #trigger>
      <Button as="div" size="icon" :icon="isOpen ? 'chevronDown' : 'chevronRight'" variant="outline" class="product-properties__trigger" />
    </template>
    <template #content>
      <p class="product-properties__title">{{ translation("recipe.ingredient.productProperties") }}</p>
      <div v-if="result?.product" class="product-properties__info-wrapper">
        <div v-for="info in information" :key="info.name">
          <p class="product-properties__info-name">{{ info.name }}</p>
          <p :class="['product-properties__info-value', info?.classCell]">{{ info.value }}</p>
        </div>
      </div>
    </template>
  </CollapsibleShared>
</template>

<style scoped>
.product-properties__trigger {
  @apply absolute right-2 top-1;
}
.product-properties__title {
  @apply my-2;
}
.product-properties__info-wrapper {
  @apply flex space-x-6 bg-accent p-2;
}
.product-properties__info-name {
  @apply font-bold text-sm text-muted-foreground min-h-8;
}
.product-properties__info-value {
  @apply whitespace-nowrap;
}
</style>
<style>
.product-properties__collapsible--close {
  @apply h-0;
}
</style>
