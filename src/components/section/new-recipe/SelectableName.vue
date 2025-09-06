<script setup lang="ts">
import FormSelect from "@/components/shared/form/FormSelect.vue";
import { ProductObjType } from "@/types/types";
import { computed, ref, watchEffect, onMounted } from "vue";
import { useQuery } from "@vue/apollo-composable";
import { graphql } from "@/api/gql";
import { getSelectableOptions } from "@/composables/querys/options.ts";

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

const product = ref<ProductObjType | null | undefined>(null);

onMounted(() => {
  product.value = getProductsByIds();
});

const getProductsByIds = () =>
  productArray.value.find((product) => product.productPosition === props.productIndex && product.groupPosition === props.groupIndex);

const updateName = (value?: string) => {
  if (product.value && value) {
    product.value.productId = value;
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
  <FormSelect
    v-model:selected="selected"
    label=""
    placeholder="Produkt wählen"
    :name="`name-${groupIndex}-${productIndex}`"
    :select-options="selectableOptions"
    @update:selected="updateName($event)"
  />
</template>

<style>
.product__group input {
  @apply bg-white;
}
</style>
