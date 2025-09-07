<script setup lang="ts">
import { Button } from "@/components/shared/button";
import { Plus } from "lucide-vue-next";
import { useMutation } from "@vue/apollo-composable";
import { ErrorCode } from "@/api/gql/graphql";
import { computed } from "vue";
import { graphql } from "@/api/gql";

const { mutate } = useMutation(
  graphql(`
    mutation addCategory($name: String!) {
      createProductCategory(dto: { name: $name }) {
        data {
          id
          name
        }
        errorCode
        isError
      }
    }
  `),
  { refetchQueries: ["GetCategories", "productCategories"] },
);

const categoryExists = defineModel<boolean>("categoryExists", { default: false });
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

const disabled = computed((): boolean => newCategory.value === "" || categoryExists.value);
</script>

<template>
  <Button variant="outline" size="icon" :disabled @click.prevent="addNewCategory">
    <Plus />
  </Button>
</template>
