<script setup lang="ts">
import { Button } from "@/components/shared/button";
import TableBasic from "@/components/shared/table/TableBasic.vue";
import { DatatableColumns, getColumns } from "@/lib/table.ts";
import { graphql } from "@/api/gql";
import { useLazyQuery } from "@vue/apollo-composable";
import AddListing from "@/components/section/finance/AddListing.vue";
import ListingAction from "@/components/section/finance/ListingAction.vue";
import { computed, onMounted, ref } from "vue";
import Navigation from "@/components/section/finance/Navigation.vue";
import ListingAddress from "@/components/section/finance/ListingAddress.vue";
import DescriptionColumn from "@/components/section/finance/DescriptionColumn.vue";
import ListingFilter from "@/components/section/finance/ListingFilter.vue";
import { SortEnumType, TravelCostFilterInput } from "@/api/gql/graphql.ts";

const filter = computed((): TravelCostFilterInput => {
  return { and: [{ date: { lte: `${year.value}-12-31` } }, { date: { gte: `${year.value}-01-01` } }] };
});

const order = { date: SortEnumType.Desc };

const query = graphql(`
  query TravelCost($where: TravelCostFilterInput, $order: [TravelCostSortInput!]) {
    travelCost(where: $where, order: $order) {
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
`);
const { result, load } = useLazyQuery(query);

onMounted(() => {
  load(query, { order: order, where: filter.value }, { fetchPolicy: "network-only" });
});

const year = ref(new Date().getFullYear());
const updateYear = (y: number) => {
  year.value = y;
  load(query, { order, where: filter.value }, { fetchPolicy: "network-only" });
};

const columns: DatatableColumns[] = [
  {
    source: "date",
    labelKey: "Datum",
  },
  {
    source: "address.city",
    labelKey: "Adresse",
    type: "component",
    component: ListingAddress,
  },
  {
    source: "description",
    labelKey: "Beschreibung",
    type: "component",
    component: DescriptionColumn,
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
    component: ListingAction,
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
      <ListingFilter @update:active-year="updateYear" />
    </div>
    <p class="linting__header">Außerordentliche Aufwendungen - Krankheitskosten {{ year }}</p>
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

  &__header {
    @apply font-semibold mb-4 mt-4;
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
