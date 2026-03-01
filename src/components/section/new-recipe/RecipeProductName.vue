<script setup lang="ts">
import FormSelectDeprecated from "@/components/shared/form/FormSelectDeprecated.vue";
import { ProductObjType } from "@/types/types";
import { computed, ref, watchEffect } from "vue";
import { useQuery } from "@vue/apollo-composable";
import { graphql } from "@/api/gql";
import { getSelectableOptions } from "@/composables/querys/options.ts";
import { args, Logger } from "@/lib/logger.ts";

const props = defineProps<{ productIndex: number; groupIndex: number }>();
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

const product = computed(() => productArray.value.find((p) => p.productPosition === props.productIndex && p.groupPosition === props.groupIndex));

const updateName = (value?: string) => {
  if (product.value && value) {
    product.value.productId = value;
    Logger(args("Selected product:", product.value));
    Logger(args("Selected product id:", value));
  }
};

const selected = ref("");
const mounting = ref(false);

watchEffect(() => {
  if (!mounting.value) {
    selected.value = String(product.value?.productId ?? "");
  }
  mounting.value = false;
});

const selectableOptions = computed(() => getSelectableOptions(result.value?.products));
</script>

<template>
  <FormSelectDeprecated
    v-model:selected="selected"
    label=""
    placeholder="Produkt wählen"
    :name="`name-${groupIndex}-${productIndex}`"
    :select-options="selectableOptions"
    @update:selected="updateName($event)"
  />
</template>
