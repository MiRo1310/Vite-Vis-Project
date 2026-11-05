<script setup lang="ts">
import { Button } from "@/components/shared/button/button.variants";
import TableBasic from "@/components/shared/table/TableBasic.vue";
import { type DatatableColumns, getColumns } from "@/lib/table.ts";
import { graphql } from "@/api/gql";
import { useLazyQuery } from "@vue/apollo-composable";
import AddListing from "@/components/section/finance/AddListing.vue";
import ListingAction from "@/components/section/finance/ListingAction.vue";
import { computed, onMounted, ref } from "vue";
import Navigation from "@/components/section/finance/Navigation.vue";
import ListingAddress from "@/components/section/finance/ListingAddress.vue";
import DescriptionColumn from "@/components/section/finance/DescriptionColumn.vue";
import ListingFilter from "@/components/section/finance/ListingFilter.vue";
import { type TravelCostFilterInput, type TravelCostQuery, type TravelCostSortInput } from "@/api/gql/graphql.ts";
import FinanceListingTableIsValid from "@/components/section/finance/FinanceListingTableIsValid.vue";
import FinanceListingTableHasInvoice from "@/components/section/finance/FinanceListingTableHasInvoice.vue";
import { typedStorage } from "@/lib/local-storage.ts";
import { yearRange } from "@/lib/finance.ts";
import { formatMoney, getTotalByPrice } from "@/lib/money.ts";

const filter = computed((): TravelCostFilterInput => {
  return { and: [{ date: { lte: `${year.value}-12-31` } }, { date: { gte: `${year.value}-01-01` } }] };
});

const order: TravelCostSortInput = { date: "DESC" };

const query = graphql(`
  query TravelCost($where: TravelCostFilterInput, $order: [TravelCostSortInput!]) {
    travelCost(where: $where, order: $order) {
      id
      addressId
      date
      description
      isValidated
      hasInvoice
      price
      address {
        name
        street
        city
      }
    }
  }
`);
const { result, load, loading } = useLazyQuery(query);

onMounted(async () => {
  loadFromLocalStorage();
  await load(query, { order: order, where: filter.value }, { fetchPolicy: "network-only" });
});

const year = ref(new Date().getFullYear());

const loadFromLocalStorage = () => {
  const active = typedStorage.getItem("activeYear");

  if (active && yearRange().isValidYear(active)) {
    year.value = active;
  }
};

const updateYear = async (y: number) => {
  year.value = y;
  typedStorage.setItem("activeYear", y);
  await load(query, { order, where: filter.value }, { fetchPolicy: "network-only" });
};

const columns: Array<DatatableColumns<TravelCostQuery["travelCost"][number]>> = [
  { source: "date", labelKey: "Datum", type: "date", className: "listing__cell" },
  { source: "address.city", labelKey: "Adresse", type: "component", component: ListingAddress, className: "listing__cell" },
  { source: "description", labelKey: "Beschreibung", type: "component", component: DescriptionColumn, className: "listing__cell" },
  {
    source: "price",
    labelKey: "Betrag",
    type: "number",
    unit: "€",
    className: "text-right listing__cell",
  },
  {
    source: "isValidated",
    labelKey: "Geprüft",
    type: "component",
    className: "text-right",
    component: FinanceListingTableIsValid,
  },
  {
    source: "hasInvoice",
    labelKey: "Rechnung",
    type: "component",
    className: "text-right",
    component: FinanceListingTableHasInvoice,
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

const total = computed(() => formatMoney(getTotalByPrice(result.value?.travelCost)));
</script>

<template>
  <div class="m-4">
    <div class="print-none">
      <Navigation>
        <Button @click="printPage" variant="default">Drucken</Button>
      </Navigation>
      <AddListing />
      <ListingFilter @update:active-year="updateYear" :active-year="year" />
    </div>
    <p class="font-semibold mb-4 mt-4">Außerordentliche Aufwendungen - Krankheitskosten {{ year }}</p>
    <TableBasic :columns="getColumns(columns)" :data="result?.travelCost ?? []" :loading />
    <div class="text-muted-foreground flex justify-end mt-4">Gesamtbetrag: {{ total }}</div>
  </div>
</template>

<style lang="scss">
@media print {
  .print-none {
    display: none;
  }

  td:nth-child(5),
  th:nth-child(5),
  td:nth-child(6),
  th:nth-child(6),
  td:last-child,
  th:last-child {
    display: none;
  }
}
</style>
