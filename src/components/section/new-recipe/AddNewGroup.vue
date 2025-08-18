<script setup lang="ts">
import { Button } from "@/components/shared/button";
import { TextPositionType, ProductObjType } from "@/types/types";

const productArray = defineModel<ProductObjType[]>("productArray", { default: [] });
const headersProductArray = defineModel<TextPositionType[]>("headersProductArray", { default: [] });
const countedProductGroups = defineModel<number>("countedProductGroups", { default: 1 });

const addNewProductGroup = () => {
  const productGroupLength = countedProductGroups.value;
  productArray.value.push({
    productId: "",
    description: "",
    amount: 0,
    unit: "",
    productPosition: 1,
    groupPosition: productGroupLength + 1,
  });
  headersProductArray.value.push({
    position: productGroupLength + 1,
    text: "",
  });
};
</script>
<template>
  <div class="flex justify-end">
    <Button size="icon" class="mt-2" variant="outline" icon="add" @click.prevent="addNewProductGroup" />
  </div>
</template>
