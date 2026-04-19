<script setup lang="ts">
import { ref } from "vue";
import { useLazyQuery } from "@vue/apollo-composable";
import { graphql } from "@/api/gql";
import { Input } from "@/components/shared/input";
import { Button } from "@/components/shared/button";
import { FoodFactsProductByCodeQuery } from "@/api/gql/graphql.ts";
import { isDefined } from "@vueuse/core";
import { Undo } from "lucide-vue-next";

const props = defineProps<{ ean: string }>();

const product = defineModel<FoodFactsProductByCodeQuery["foodFactsProductByCode"] | undefined>("modelValue", { default: [] });

const foodFactsProductByCodeQuery = graphql(`
  query foodFactsProductByCode($code: String!) {
    foodFactsProductByCode(code: $code) {
      code
      statusVerbose
      openFoodFactProduct {
        brands
        additionalProductData {
          key
          value
        }
        nutriments {
          carbohydrates100g
          addedSugars100g
          energy100g
          fat100g
          energyKcal100g
          proteins100g
          salt100g
        }
      }
    }
  }
`);

const { load: loadByCode, refetch } = useLazyQuery(foodFactsProductByCodeQuery);

let init = false;

const loadDataByCode = async () => {
  if (!isDefined(modelValue.value) && modelValue.value === "") {
    return;
  }
  if (!init) {
    const result = await loadByCode(foodFactsProductByCodeQuery, { code: String(modelValue.value) });
    if (typeof result === "boolean") {
      return;
    }
    product.value = result.foodFactsProductByCode;
    init = true;
    return;
  }

  const result = await refetch({ code: String(modelValue.value) });
  product.value = result?.data.foodFactsProductByCode;
};

const modelValue = ref(props.ean);
</script>

<template>
  <div class="flex gap-2 mb-2">
    <Input v-model:model-value="modelValue" type="number" placeholder="Ean nummer" />
    <Button variant="ghost" size="icon" @click.prevent="modelValue = ean" :disabled="modelValue === ean">
      <Undo />
    </Button>
    <Button @click.prevent="loadDataByCode">Load</Button>

    <slot />
  </div>
</template>
