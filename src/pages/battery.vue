<script setup lang="ts">
import { useDynamicSubscribe } from "@/composables/dynamicSubscribe.ts";
import TableBasic from "../../../../node_my_sql/frontend/src/components/table/TableBasic.vue";
import { DatatableColumns, getColumns } from "@/lib/table.ts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/card";
import { batteryIds } from "@/subscribeIds/batteriesType.ts";
import { useIobrokerStore } from "@/store/iobrokerStore.ts";
import { computed } from "vue";
import { createArrayByStore } from "@/lib/object.ts";

const { batteries } = useIobrokerStore();

useDynamicSubscribe([batteryIds]);

const columns: DatatableColumns[] = [
  { source: "name", labelKey: "Name", type: "text", accessorKey: "name" },
  { source: "percent", labelKey: "Batterieladung", type: "number", unit: "%", accessorKey: "Batterieladung" },
  { source: "voltage", labelKey: "Batteriespannung", type: "number", unit: "V", accessorKey: "voltage" },
  { source: "lowBat", labelKey: "Ladung okay", type: "bool", reverse: true, accessorKey: "lowBat" },
  { source: "firmware", labelKey: "Neue Firmware verfügbar", type: "bool", accessorKey: "firmware" },
  { source: "available", labelKey: "Erreichbar", type: "bool", accessorKey: "available" },
  {
    source: "timestamp",
    labelKey: "Letzte Aktualisierung",
    type: "datetime",
    accessorKey: "timestamp",
    className: "text-right"
  }
];


const data = computed(() => {
  return createArrayByStore(batteries);
});

</script>

<template>
  <Card styling="light" class="battery__card h-full">
    <CardHeader>
      <CardTitle>
        Batteriestatus von Aktoren
      </CardTitle>
    </CardHeader>
    <CardContent class="pt-2 overflow-auto max-h-full">
      <div class="default_card">
        <TableBasic :columns="getColumns(columns)" :data="data" />
      </div>
    </CardContent>
  </Card>
</template>
<style lang="postcss">
#app table td {
  @apply h-6 py-0
}

.battery__card {
  @apply overflow-hidden
}

table {
  @apply overflow-auto
}
</style>