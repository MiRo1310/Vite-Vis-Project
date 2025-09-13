<script setup lang="ts">
import TableBasic from "@/components/shared/table/TableBasic.vue";
import { DatatableColumns, getColumns } from "@/lib/table.ts";
import { useQuery } from "@vue/apollo-composable";
import { graphql } from "@/api/gql";
import AddAddress from "@/components/section/finance/AddAddress.vue";
import { Card } from "@/components/shared/card";
import AddressAction from "@/components/section/finance/AddressAction.vue";
import Navigation from "@/components/section/finance/Navigation.vue";
import { AddressesQuery } from "@/api/gql/graphql.ts";

const { result } = useQuery(
  graphql(`
    query Addresses {
      addresses {
        name
        city
        street
        id
      }
    }
  `),
);

const columns: DatatableColumns<AddressesQuery["addresses"][number]>[] = [
  {
    source: "name",
    labelKey: "Name",
  },
  {
    source: "street",
    labelKey: "Straße",
  },
  {
    source: "city",
    labelKey: "Ort",
  },
  {
    source: "id",
    labelKey: "Aktionen",
    className: "text-right",
    type: "component",
    component: AddressAction,
  },
];
</script>

<template>
  <div class="addresses">
    <h1 class="addresses__title">Adressen</h1>
    <Navigation />
    <AddAddress />
    <Card class="p-4">
      <TableBasic :columns="getColumns(columns)" :data="result?.addresses ?? []" />
    </Card>
  </div>
</template>

<style scoped lang="scss">
.addresses {
  @apply m-4;

  &__title {
    @apply text-2xl font-bold mb-4;
  }
}
</style>
