<script setup lang="ts">
import { Button } from "@/components/shared/button";
import { TextPositionType } from "@/types/types";
import { Logger } from "@/lib/logger.ts";
import { newIdPrefix, TForm } from "@/components/section/recipe-form/index.ts";
import { useRecipeStore } from "@/store/recipeStore.ts";
import { computed } from "vue";
import { TProductSchema } from "@/components/section/recipe-form/formSchema.ts";

const store = useRecipeStore();

const props = defineProps<{ form: TForm }>();

const formProductArray = computed((): TProductSchema[] => props.form.values.productArray);
const saveToFormProductArray = (productArray: TProductSchema[]) => {
  props.form.setFieldValue("productArray", productArray);
};

const headersProductArray = defineModel<TextPositionType[]>("headersProductArray", { default: [] });

const addNewProductGroup = () => {
  const productGroupLength = store.getProductGroupsCount;
  Logger("Adding new product group with position:", { value: productGroupLength });
  const newProduct = {
    productId: "",
    description: "",
    amount: 0,
    unit: "",
    groupPosition: productGroupLength,
    activeUnitId: "",
    id: newIdPrefix,
    position: formProductArray.value.length,
    sortOrder: 0,
  };
  Logger("Adding new product group:", { value: newProduct, useDebugMode: true });
  saveToFormProductArray([...formProductArray.value, newProduct]);

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
    <Button class="mt-2" variant="warning" @click.prevent="addNewProductGroup">Neue Produktgruppe anlegen</Button>
  </div>
</template>
