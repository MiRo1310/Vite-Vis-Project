<script setup lang="ts">
import { ref } from "vue";
import { useLazyQuery } from "@vue/apollo-composable";
import { graphql } from "@/api/gql";
import { Input } from "@/components/shared/input";
import { Button } from "@/components/shared/button";

const foodFactsProductsBySearchQuery = graphql(`
  query foodFactsProductsBySearch($search: String!) {
    foodFactsProductsBySearch(search: $search)
  }
`);
const { load, refetch } = useLazyQuery(foodFactsProductsBySearchQuery);

let init = false;
const result = ref();
const loadDataByCode = async () => {
  if (modelValue.value === "") {
    return;
  }
  if (!init) {
    result.value = await load(foodFactsProductsBySearchQuery, { search: modelValue.value });
    init = true;
    return;
  }

  result.value = await refetch({ search: String(modelValue.value) });
};

const modelValue = ref("");
</script>

<template>
  <div class="flex gap-2">
    <Input v-model:model-value="modelValue" type="number" />
    <Button @click="loadDataByCode">Load</Button>
  </div>
</template>
