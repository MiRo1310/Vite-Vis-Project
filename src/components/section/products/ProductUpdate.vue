<script setup lang="ts">
import DialogAddUpdateProduct from "@/components/section/products/DialogAddUpdateProduct.vue";
import { onMounted, ref } from "vue";
import { graphql } from "@/api/gql";
import { useLazyQuery } from "@vue/apollo-composable";
import { GetProductsQuery } from "@/api/gql/graphql.ts";
import { ITableColumn } from "@/types/types.ts";
import { useRouteQuery } from "@vueuse/router";

const props = defineProps<ITableColumn<string, GetProductsQuery["productsGrouped"][number]["value"][number], string | undefined>>();
const productId = useRouteQuery("productId", null);
const dialogOpen = ref(false);

const getProductByIdQuery = graphql(`
  query getProductById($id: UUID!) {
    product(id: $id) {
      id
      carbs
      category
      fat
      kcal
      name
      protein
      salt
      sugar
      productUnits {
        modifiedAt
        createdAt
        id
        productId
        amount
        unit
        isDefault
      }
    }
  }
`);

const { load, result, onResult, refetch } = useLazyQuery(getProductByIdQuery);

onMounted(() => {
  const id = props.customValue;
  if (id) {
    getProduct(id);
    productId.value = null;
  }
});

const clickHandler = () => {
  const id = props.row.original?.id;
  if (id) {
    getProduct(id);
  }
};

const getProduct = (id: string) => {
  load(getProductByIdQuery, { id });
  refetch({ id });
};

onResult(() => {
  dialogOpen.value = true;
});
</script>

<template>
  <DialogAddUpdateProduct v-if="result?.product" v-model:dialog-open="dialogOpen" :data="result.product" />
  <span class="underline cursor-pointer" @click="clickHandler">{{ value }}</span>
</template>
