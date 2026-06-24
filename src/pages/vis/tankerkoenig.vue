<script setup lang="ts">
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import Page from "@/components/shared/page/Page.vue";
import CardSubcard from "@/components/shared/card/CardSubcard.vue";
import TableBasic from "@/components/shared/table/TableBasic.vue";
import { computed } from "vue";
import { DatatableColumns, getColumns } from "@/lib/table.ts";
import { TankerkoenigStation } from "@/types/types.ts";

const { iobroker } = useIobrokerStore();

const parsedJson = computed(() => {
  const stations = iobroker.tankerKoenig?.jsonTable?.parsed;
  if (!stations) {
    return [];
  }
  return [...stations].sort((a, b) => a.e5 - b.e5);
});

const columns: DatatableColumns<TankerkoenigStation>[] = [
  { source: "station", labelKey: "Name", sortable: true },
  { source: "status", labelKey: "Offen/geschlossen" },
  { source: "e5", labelKey: "Super E5", sortable: true },
  { source: "differenceE5", labelKey: "Differenz E5" },
  { source: "diesel", labelKey: "Diesel", sortable: true },
  { source: "differenceDiesel", labelKey: "Differenz Diesel" },
];
</script>

<template>
  <Page title="Tanken">
    <CardSubcard class="p-2 flex flex-wrap gap-1">
      <TableBasic :columns="getColumns(columns)" :data="parsedJson" :loading="false" />
    </CardSubcard>
  </Page>
</template>
