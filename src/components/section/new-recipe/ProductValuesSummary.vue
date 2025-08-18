<script setup lang="ts">
import { useProducts } from "@/composable/querys/products";
import { computed } from "vue";
import { ProductObjType } from "@/types/types";

const props = defineProps<{ productIndex: number; product?: ProductObjType }>();
const { selectableOptions: selectableProducts } = useProducts();

const productLabel = computed(() => selectableProducts.value.find((option) => option.value === props.product?.productId)?.label);
</script>
<template>
  <div class="flex justify-between items-center">
    <div>
      <span>{{ productIndex }}.</span>
      <span class="ml-2">{{ productLabel }}</span>
      <span class="text-xs font-bold ml-2">{{ product?.description }}</span>
    </div>
    <span v-if="product?.unit" class="font-semibold">{{ product?.amount }} {{ product.unit }}</span>
  </div>
</template>

<style>
.product__group input {
  @apply bg-white text-xs py-0;
}
</style>
