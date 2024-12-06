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
type BatteryItem = {
  name: string;
  percent?: { val: number };
  lowBat?: { val: boolean };
  firmware?: { val: boolean };
  [key: string]: any;
};

const data = computed(() => {
  let data: any[] = [];
  Object.keys(batteries).forEach((key) => {
    const item = batteries[key as keyof typeof batteries] as BatteryItem;

    Object.keys(item).forEach((value) => {
      if (!item[value as keyof typeof item]) return;

      const existingElement = data.find((element) => element.name === key);
      if (existingElement) {
        existingElement[value] = item[value as keyof typeof item]?.val;
        return;
      }
      data.push({
        name: key,
        [value]: item[value as keyof typeof item]?.val
      });
    });
  });

  return data;
});

</script>

<template>
  <Card styling="blue">
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