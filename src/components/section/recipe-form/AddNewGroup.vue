<script setup lang="ts">
import { Button } from "@/components/shared/button";
import { Logger } from "@/lib/logger.ts";
import { newIdPrefix, TForm } from "@/components/section/recipe-form/index.ts";
import { useRecipeStore } from "@/store/recipeStore.ts";
import { computed } from "vue";
import { fieldsRecipe, TProductHeaderSchema, TProductSchema } from "@/components/section/recipe-form/formSchema.ts";

const store = useRecipeStore();

const props = defineProps<{ form: TForm }>();

const formProducts = computed((): TProductSchema[] => props.form.values[fieldsRecipe.products]);
const formProductHeaders = computed((): TProductHeaderSchema[] => props.form.values[fieldsRecipe.headers]);

const saveToFormProducts = (products: TProductSchema[]) => {
  props.form.setFieldValue(fieldsRecipe.products, products);
};
const saveToFormProductHeaders = (headers: TProductHeaderSchema[]) => {
  props.form.setFieldValue(fieldsRecipe.headers, headers);
};

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
    position: formProducts.value.length,
    sortOrder: 0,
  };
  Logger("Adding new product group:", { value: newProduct, useDebugMode: true });
  saveToFormProducts([...formProducts.value, newProduct]);

  saveToFormProductHeaders([
    ...formProductHeaders.value,
    {
      position: productGroupLength,
      text: "",
    },
  ]);
};
</script>

<template>
  <div class="flex justify-end">
    <Button class="mt-2" variant="warning" @click.prevent="addNewProductGroup">Neue Produktgruppe anlegen</Button>
  </div>
</template>
