<script setup lang="ts">
import FormSelect from "@/components/shared/form/FormSelect.vue";
import { ProductObjType } from "@/types/types";
import { computed, ref, watchEffect } from "vue";
import { useProducts } from "@/composable/querys/products";
import { translation } from "@/lib/translation";

const props = defineProps<{ productIndex: number; groupIndex: number }>();
const productArray = defineModel<ProductObjType[]>("productArray", { default: [] });
const { selectableOptions, result } = useProducts();

const getValue = computed(
  () => (productIndex: number, target: keyof ProductObjType) =>
    productArray.value.find((product) => product.productPosition === productIndex && product.groupPosition === props.groupIndex)?.[target]
);

const updateName = (value?: string) => {
  const item = productArray.value.find((product) => product.productPosition === props.productIndex && product.groupPosition === props.groupIndex);
  if (item && value) {
    item.productId = value;
    const product = result.value?.find((product) => product?.id === getValue.value(props.productIndex, "productId"));
    item.unit = product?.unit ?? "";
  }
};

const selected = ref("");
const mounting = ref(false);

watchEffect(() => {
  if (!mounting.value) {
    selected.value = String(getValue.value(props.productIndex, "productId"));
  }
  mounting.value = false;
});
</script>

<template>
  <FormSelect
    v-model:selected="selected"
    label=""
    :placeholder="translation('addRecipe.chooseProduct')"
    :name="`name-${groupIndex}-${productIndex}`"
    :select-options="selectableOptions"
    @update:selected="updateName($event)"
  />
</template>

<style>
.product__group input {
  @apply bg-white;
}
</style>
