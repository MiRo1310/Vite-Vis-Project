<script setup lang="ts">
import { computed } from "vue";
import { ProductObjType, SelectOption } from "@/types/types";
import { getSelectableOptions } from "@/composables/querys/options.ts";
import { useQuery } from "@vue/apollo-composable";

import { graphql } from "@/api/gql";

const props = defineProps<{ productIndex: number; product?: ProductObjType }>();

const { result } = useQuery(
  graphql(`
    query products {
      products {
        id
        carbs
        category
        fat
        kcal
        name
        protein
        salt
        sugar
        kcal
        productUnits {
          id
          unit
          amount
          isDefault
          faktor
        }
      }
    }
  `),
);

const selectableProducts = computed((): SelectOption[] => getSelectableOptions(result.value?.products));

const productLabel = computed(() => selectableProducts.value.find((option) => option.value === props.product?.productId)?.label);
</script>
<template>
  <div class="flex justify-between items-center">
    <div>
      <span>{{ productIndex }}.</span>
      <span class="ml-2">{{ productLabel }}</span>
      <span class="text-xs font-bold ml-2">{{ product?.description }}</span>
    </div>
    <span v-if="product?.unit" class="font-semibold">{{ product?.amount }} {{ product.unit }}</span>
  </div>
</template>
