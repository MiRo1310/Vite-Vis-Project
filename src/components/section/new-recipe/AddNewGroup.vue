<script setup lang="ts">
import { Button } from "@/components/shared/button";
import { ProductObjType, TextPositionType } from "@/types/types";
import { Logger } from "@/lib/logger.ts";
import { newIdPrefix } from "@/components/section/new-recipe/index.ts";

const productArray = defineModel<ProductObjType[]>("productArray", { default: [] });
const headersProductArray = defineModel<TextPositionType[]>("headersProductArray", { default: [] });
const countedProductGroups = defineModel<number>("countedProductGroups", { default: 1 });

const addNewProductGroup = () => {
  const productGroupLength = countedProductGroups.value;
  Logger("Adding new product group with position:", { value: productGroupLength });
  const newProduct = {
    productId: "",
    description: "",
    amount: 0,
    unit: "",
    groupPosition: productGroupLength,
    activeUnitId: "",
    id: newIdPrefix,
    position: productArray.value.length,
    sortOrder: 0,
  };
  Logger("Adding new product group:", { value: newProduct, useDebugMode: true });
  productArray.value = [...productArray.value, newProduct];

  headersProductArray.value = [
    ...headersProductArray.value,
    {
      position: productGroupLength,
      text: "",
    },
  ];
};
</script>

<template>
  <div class="flex justify-end">
    <Button size="icon" class="mt-2" variant="outline" icon="add" @click.prevent="addNewProductGroup" />
  </div>
</template>
