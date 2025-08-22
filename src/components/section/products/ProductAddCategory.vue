<script setup lang="ts">
import { Button } from "@/components/shared/button";
import { Plus } from "lucide-vue-next";
import { useMutation } from "@vue/apollo-composable";
import { addCategory } from "@/api/mutation/addCategory";
import { productCategories } from "@/api/query/products";
import { ErrorCode } from "@/api/gql/graphql";

const { mutate } = useMutation(addCategory, { refetchQueries: [productCategories] });
const categoryExists = defineModel<boolean>("categoryExists");
const newCategory = defineModel<string>("newCategory");

async function addNewCategory() {
  if (!newCategory.value) return;
  const result = await mutate({ name: newCategory.value });

  if (result?.data) {
    newCategory.value = "";
    categoryExists.value = false;
  }

  if (result?.data?.createProductCategory.errorCode == ErrorCode.Exist) {
    categoryExists.value = true;
  }
}
</script>

<template>
  <Button variant="outline" size="icon" :disabled="newCategory === ''" @click.prevent="addNewCategory">
    <Plus />
  </Button>
</template>
