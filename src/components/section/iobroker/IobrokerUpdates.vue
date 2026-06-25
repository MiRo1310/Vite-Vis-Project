<script setup lang="ts">
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import { computed } from "vue";
import TableBasic from "@/components/shared/table/TableBasic.vue";
import { DatatableColumns, getColumns } from "@/lib/table.ts";
import Badge from "@/components/shared/badge/Badge.vue";
import CardSubcard from "@/components/shared/card/CardSubcard.vue";
import { AdapterUpdate } from "@/types/types.ts";

const { iobroker } = useIobrokerStore();

interface UpdatesType extends AdapterUpdate {
  name: string;
}

const availableUpdates = computed((): UpdatesType[] => {
  const json = iobroker.infos.updatesJson.parsed({});

  return Object.keys(json).map((key) => ({
    name: key,
    availableVersion: json[key].availableVersion,
    installedVersion: json[key].installedVersion,
  }));
});

const columns: DatatableColumns<UpdatesType>[] = [
  {
    source: "name",
    labelKey: "Name",
    accessorKey: "name",
    type: "text",
  },
  {
    source: "installedVersion",
    labelKey: "Installiert",
    accessorKey: "installedVersion",
    type: "text",
  },
  {
    source: "availableVersion",
    labelKey: "Verfügbar",
    accessorKey: "availableVersion",
    type: "text",
  },
];
</script>

<template>
  <CardSubcard class="inline-block" styling="blueDark">
    <div class="flex justify-between items-center">
      <p>Updates</p>
      <Badge :value="availableUpdates.length" />
    </div>

    <TableBasic :columns="getColumns(columns)" :data="availableUpdates" :loading="false" />
  </CardSubcard>
</template>
