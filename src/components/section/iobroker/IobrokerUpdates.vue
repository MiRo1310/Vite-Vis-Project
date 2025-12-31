<script setup lang="ts">
import { useIobrokerStore } from "@/store/iobrokerStore.ts";
import { computed } from "vue";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/card";
import TableBasic from "@/components/shared/table/TableBasic.vue";
import { DatatableColumns, getColumns } from "@/lib/table.ts";
import { stringToJSON } from "@/lib/string.ts";
import Badge from "@/components/shared/badge/Badge.vue";

const { infos } = useIobrokerStore();

interface UpdatesAsJSON {
  [key: string]: AdapterUpdate;
}

interface AdapterUpdate {
  availableVersion: string;
  installedVersion: string;
}

interface UpdatesType extends AdapterUpdate {
  name: string;
}

const availableUpdates = computed((): UpdatesType[] => {
  if (!infos.updatesJson?.val) {
    return [];
  }
  const json = stringToJSON<UpdatesAsJSON>(infos.updatesJson?.val);

  const jsonArray: UpdatesType[] = [];
  if (json) {
    Object.keys(json).forEach((key) => {
      jsonArray.push({
        name: key,
        availableVersion: json[key].availableVersion,
        installedVersion: json[key].installedVersion,
      });
    });
  }
  return jsonArray;
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
  <Card class="inline-block" styling="blueDark">
    <CardHeader>
      <CardTitle>
        <div class="flex justify-between items-center">
          <p>Updates</p>
          <Badge :value="availableUpdates.length" />
        </div>
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div class="bg-cardCustom-info p-2 shadow-lg">
        <TableBasic :columns="getColumns(columns)" :data="availableUpdates" />
      </div>
    </CardContent>
  </Card>
</template>
