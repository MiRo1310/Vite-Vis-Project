<script setup lang="ts">
import { ProductObjType } from "@/types/types";
import { computed, ref, watchEffect } from "vue";
import { useQuery } from "@vue/apollo-composable";
import { graphql } from "@/api/gql";
import { getSelectableOptions } from "@/composables/querys/options.ts";
import { args, Logger } from "@/lib/logger.ts";
import Select from "@/components/shared/select/Select.vue";

const props = defineProps<{ product: ProductObjType }>();
const productArray = defineModel<ProductObjType[]>("productArray", { default: [] });

const { result } = useQuery(
  graphql(`
    query GetProductsForSelect {
      products {
        id
        name
      }
    }
  `),
);

const updateName = () => {
  Logger(args("Selected product id:", selected.value));
  productArray.value = productArray.value.map((product) => {
    if (product.id === props.product.id) {
      return { ...product, productId: selected.value };
    }
    return product;
  });
};

const selected = ref("");
const mounting = ref(false);

watchEffect(() => {
  if (!mounting.value) {
    selected.value = String(props.product.productId);
  }
  mounting.value = false;
});

const selectableOptions = computed(() => getSelectableOptions(result.value?.products));
</script>

<template>
  <Select
    v-model:model-value="selected"
    label=""
    placeholder="Produkt wählen"
    :name="`name-${product.id}`"
    @update:model-value="updateName()"
    :items="selectableOptions"
  />
</template>
