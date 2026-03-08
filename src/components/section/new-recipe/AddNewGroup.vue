<script setup lang="ts">
import { Button } from "@/components/shared/button";
import { TextPositionType, ProductObjType } from "@/types/types";
import { args, Logger } from "@/lib/logger.ts";
import { newIdPrefix } from "@/components/section/new-recipe/index.ts";

const productArray = defineModel<ProductObjType[]>("productArray", { default: [] });
const headersProductArray = defineModel<TextPositionType[]>("headersProductArray", { default: [] });
const countedProductGroups = defineModel<number>("countedProductGroups", { default: 1 });

const addNewProductGroup = () => {
  const productGroupLength = countedProductGroups.value;
  Logger(args("Adding new product group with position:", productGroupLength));
  productArray.value.push({
    productId: "",
    description: "",
    amount: 0,
    unit: "",
    groupPosition: productGroupLength,
    activeUnitId: "",
    id: newIdPrefix,
  });
  headersProductArray.value.push({
    position: productGroupLength,
    text: "",
  });
};
</script>
<template>
  <div class="flex justify-end">
    <Button size="icon" class="mt-2" variant="outline" icon="add" @click.prevent="addNewProductGroup" />
  </div>
</template>
