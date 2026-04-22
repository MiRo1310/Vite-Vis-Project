<script setup lang="ts">
import { ref } from "vue";
import { useLazyQuery } from "@vue/apollo-composable";
import { graphql } from "@/api/gql";
import { Input } from "@/components/shared/input";
import { Button } from "@/components/shared/button";
import { LocalProductsByCodeQuery } from "@/api/gql/graphql.ts";
import { isDefined } from "@vueuse/core";
import { Undo } from "lucide-vue-next";
import { TProduct } from "@/components/section/products/index.ts";

const props = defineProps<{ ean: string }>();

const product = defineModel<TProduct>("modelValue", {
  default: [],
});

const localProductsByCodeQuery = graphql(`
  query localProductsByCode($code: String!) {
    localProducts(skip: 0, take: 10, where: { code: { eq: $code } }) {
      items {
        code
        brands
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

const { load: loadByCode, refetch } = useLazyQuery(localProductsByCodeQuery);

let init = false;

const loadDataByCode = async () => {
  if (!isDefined(modelValue.value) && modelValue.value === "") {
    return;
  }
  if (!init) {
    const result = await loadByCode(localProductsByCodeQuery, { code: String(modelValue.value) });
    if (typeof result === "boolean") {
      return;
    }
    product.value = getFirstItem(result);
    init = true;
    return;
  }

  const result = await refetch({ code: String(modelValue.value) });
  product.value = getFirstItem(result?.data);
};

const getFirstItem = (result?: LocalProductsByCodeQuery): TProduct | undefined => {
  return result?.localProducts?.items?.[0];
};

const modelValue = ref(props.ean);
</script>

<template>
  <div class="flex gap-2 mb-2">
    <Input v-model:model-value="modelValue" type="number" placeholder="Ean nummer" />
    <Button variant="ghost" size="icon" @click.prevent="modelValue = ean" :disabled="modelValue === ean">
      <Undo />
    </Button>
    <Button @click.prevent="loadDataByCode">Abrufen </Button>

    <slot />
  </div>
</template>
