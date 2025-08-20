<script setup lang="ts">
import { Button } from "@/components/shared/button";
import TableBasic from "@/components/shared/table/TableBasic.vue";
import { DatatableColumns, getColumns } from "@/lib/table.ts";
import { graphql } from "@/api/gql";
import { useQuery } from "@vue/apollo-composable";
import AddListing from "@/components/section/travelcost/AddListing.vue";
import TravelCostAction from "@/components/section/travelcost/TravelCostAction.vue";
import { computed } from "vue";
import Navigation from "@/components/section/travelcost/Navigation.vue";

const { result } = useQuery(
  graphql(`
    query TravelCost {
      travelCost(order: { date: DESC }) {
        id
        addressId
        date
        description
        price
        address {
          name
          street
          city
        }
      }
    }
  `),
);

const columns: DatatableColumns[] = [
  {
    source: "date",
    labelKey: "Datum",
  },
  {
    source: "address.name",
    labelKey: "Name",
  },
  {
    source: "address.street",
    labelKey: "Straße",
  },
  {
    source: "address.city",
    labelKey: "Ort",
  },
  {
    source: "description",
    labelKey: "Beschreibung",
  },
  {
    source: "price",
    labelKey: "Betrag",
    type: "number",
    unit: "€",
    className: "text-right",
  },
  {
    source: "id",
    labelKey: "Aktionen",
    className: "text-right",
    type: "component",
    component: TravelCostAction,
  },
];

const printPage = () => {
  window.print();
};

const total = computed(() => {
  return result.value?.travelCost.reduce((acc, item) => acc + (item.price ?? 0), 0) ?? 0;
});
</script>

<template>
  <div class="listing">
    <div class="print-none">
      <h1 class="listing__title">Listing</h1>
      <Navigation>
        <Button @click="printPage" variant="default">Drucken</Button>
      </Navigation>
      <AddListing />
    </div>
    <TableBasic :columns="getColumns(columns)" :data="result?.travelCost ?? []" />
    <div v-if="total" class="text-muted-foreground flex justify-end mt-4">Gesamtbetrag: {{ total }} €</div>
  </div>
</template>

<style scoped lang="scss">
.listing {
  @apply m-4;

  &__title {
    @apply text-2xl font-bold mb-4;
  }
}
</style>

<style lang="scss">
@media print {
  .print-none {
    @apply hidden;
  }
  table th:last-child {
    @apply hidden;
  }
}
</style>
