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
import ListingFilter from "@/components/section/finance/ListingFilter.vue";
import { type TravelCostFilterInput, type TravelCostSortInput } from "@/api/gql/graphql.ts";
import FinanceListingCheckbox from "@/components/section/finance/FinanceListingCheckbox.vue";
import { typedStorage } from "@/lib/local-storage.ts";
import { getCellClasses, getYearFilter, type TravelCostRow, yearRange } from "@/lib/finance.ts";
import { getTotalByPrice, Money } from "@/lib/money.ts";

const filter = computed((): TravelCostFilterInput => getYearFilter(year.value));

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

const columns: Array<DatatableColumns<TravelCostRow>> = [
  { source: "date", labelKey: "Datum", type: "date", cellClass: getCellClasses },
  {
    source: "address.city",
    labelKey: "Adresse",
    type: "component",
    component: ListingAddress,
    cellClass: getCellClasses,
  },
  {
    source: "description",
    labelKey: "Beschreibung",
    type: "preCode",
    cellClass: getCellClasses,
  },
  {
    source: "price",
    labelKey: "Betrag",
    type: "number",
    unit: "€",
    className: "text-right",
    cellClass: getCellClasses,
  },
  {
    source: "isValidated",
    labelKey: "Geprüft",
    type: "component",
    className: "text-right print-none",
    headerClass: "print-none",
    component: FinanceListingCheckbox,
  },
  {
    source: "hasInvoice",
    labelKey: "Rechnung",
    type: "component",
    className: "text-right print-none",
    headerClass: "print-none",
    component: FinanceListingCheckbox,
  },
  {
    source: "id",
    labelKey: "Aktionen",
    className: "text-right print-none",
    headerClass: "print-none",
    type: "component",
    component: ListingAction,
  },
];

const printPage = () => {
  window.print();
};

const total = computed(() => getTotalByPrice(result.value?.travelCost.map((cost) => new Money(cost.price ?? 0)) ?? []).formated);
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
  .print-none,
  td:has(.print-none) {
    display: none;
  }
}
</style>
