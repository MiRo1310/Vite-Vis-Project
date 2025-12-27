<script setup lang="ts">
import { useDynamicSubscribe } from "@/composables/dynamicSubscribe.ts";
import TableBasic from "@/components/shared/table/TableBasic.vue";
import { DatatableColumns, getColumns } from "@/lib/table.ts";
import { batteryIds, HMIPDevice, ShellyPlusSmoke, XiaomiWindowSensor } from "@/subscribeIds/batteriesType.ts";
import { useIobrokerStore } from "@/store/iobrokerStore.ts";
import { computed } from "vue";
import PageContent from "@/components/shared/page/PageContent.vue";
import Page from "@/components/shared/page/Page.vue";
import IndexButton from "@/components/layout/IndexButton.vue";

const { batteries } = useIobrokerStore();

useDynamicSubscribe([batteryIds]);

const columns: DatatableColumns<BatteryTableData>[] = [
  { source: "name", labelKey: "Name", type: "text", accessorKey: "name" },
  {
    source: "percent",
    labelKey: "Batterieladung",
    type: "number",
    unit: "%",
    accessorKey: "Batterieladung",
  },
  {
    source: "voltage",
    labelKey: "Batteriespannung",
    type: "number",
    unit: "V",
    accessorKey: "voltage",
  },
  {
    source: "lowBat",
    labelKey: "Ladung okay",
    type: "bool",
    reverse: true,
    accessorKey: "lowBat",
  },
  {
    source: "firmware",
    labelKey: "Neue Firmware verfügbar",
    type: "bool",
    accessorKey: "firmware",
  },
  {
    source: "available",
    labelKey: "Erreichbar",
    type: "bool",
    accessorKey: "available",
  },
  {
    source: "timestamp",
    labelKey: "Letzte Aktualisierung",
    type: "datetime",
    accessorKey: "timestamp",
    className: "text-right",
  },
];

interface BatteryTableData {
  name: string;
  percent?: number;
  voltage?: number;
  lowBat?: boolean;
  firmware?: boolean;
  available?: boolean;
  timestamp?: number;
}

const data = computed(() => {
  const data: BatteryTableData[] = [];
  Object.keys(batteries).forEach((key) => {
    const item = batteries[key as keyof typeof batteries];
    const timestamp = "percent" in item ? item.percent?.ts : "lowBat" in item ? item.lowBat?.ts : 0;
    data.push({
      name: key,
      firmware: (item as ShellyPlusSmoke)?.firmware?.val ?? false,
      timestamp,
      lowBat: (item as HMIPDevice)?.lowBat?.val ?? false,
      available: (item as XiaomiWindowSensor)?.available?.val ?? false,
      percent: (item as XiaomiWindowSensor)?.percent?.val ?? 0,
      voltage: (item as XiaomiWindowSensor)?.voltage?.val ?? 0,
    });
  });
  return data;
});
</script>

<template>
  <Page title="Batteriestatus von Aktoren">
    <template #default>
      <PageContent>
        <TableBasic :columns="getColumns(columns)" :data />
      </PageContent>
    </template>
  </Page>
</template>
