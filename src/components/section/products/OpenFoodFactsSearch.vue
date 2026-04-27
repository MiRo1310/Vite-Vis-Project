<script setup lang="ts">
import { ref } from "vue";
import { useLazyQuery } from "@vue/apollo-composable";
import { graphql } from "@/api/gql";
import { Input } from "@/components/shared/input/input.variants";
import { Button } from "@/components/shared/button/button.variants";

const foodFactsProductsBySearchQuery = graphql(`
  query foodFactsProductsBySearch($search: String!) {
    foodFactsProductsBySearch(search: $search) {
      additionalData {
        value
        key
      }
      products {
        additionalProductData {
          value
          key
        }
        brands
        categoriesTags
        genericNameDe
        manufacturingPlacesTags
      }
      count
      page
      pageCount
      pageSize
    }
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
    console.log(result.value);
    return;
  }

  result.value = await refetch({ search: String(modelValue.value) });
  console.log(result.value);
};

const modelValue = ref("");
</script>

<template>
  <div class="flex gap-2">
    <Input v-model:model-value="modelValue" />
    <Button @click.prevent="loadDataByCode">Suchen</Button>
  </div>
</template>
