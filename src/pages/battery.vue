<script setup lang="ts">
import { useDynamicSubscribe } from "@/composables/dynamicSubscribe.ts";
import TableBasic from "@/components/shared/table/TableBasic.vue";
import { DatatableColumns, getColumns } from "@/lib/table.ts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/card";
import { batteryIds } from "@/lib/iobroker/ids-to-subscribe/batteriesType.ts";
import { useIobrokerStore } from "@/store/iobrokerStore.ts";
import { computed } from "vue";

const { batteries } = useIobrokerStore();

useDynamicSubscribe([batteryIds]);

const columns: DatatableColumns[] = [
  { source: "name", labelKey: "Name", type: "text", accessorKey: "name" },
  { source: "percent", labelKey: "Batterieladung", type: "number", unit: "%", accessorKey: "Batterieladung" },
  { source: "lowBat", labelKey: "Niedrige Ladung", type: "bool", accessorKey: "lowBat" },
  { source: "firmware", labelKey: "Neue Firmware verfügbar", type: "bool", accessorKey: "firmware" }
];
const data = computed(() =>
  [{
    name: "Shelly Smoke Flur OG",
    percent: batteries.ShellyPlusSmokeFloorOG?.percent?.val,
    firmware: batteries.ShellyPlusSmokeFloorOG?.firmware?.val
  }, {
    name: "HMIP Flur", lowBat: batteries["HMIP Flur"]?.lowBat?.val
  }
  ]);


</script>

<template>
  <Card styling="blue">
    {{ batteries }}
    <CardHeader>
      <CardTitle>Batteriesensoren</CardTitle>
    </CardHeader>
    <CardContent class="pt-2">
      <div class="bg-white">
        <TableBasic :columns="getColumns(columns)" :data="data" />
      </div>
    </CardContent>
  </Card>
</template>

<style scoped lang="postcss">

</style>