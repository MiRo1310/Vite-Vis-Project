<script setup lang="ts">
import { useIobrokerStore } from "@/store/iobrokerStore.ts";
import { computed } from "vue";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shared/card";
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

interface UpdatesArray extends AdapterUpdate {
  name: string;
}

const availableUpdates = computed((): UpdatesArray[] => {
  if (!infos.updatesJson?.val) {
    return [];
  }
  const json = stringToJSON<UpdatesAsJSON>(infos.updatesJson?.val);

  const jsonArray: UpdatesArray[] = [];
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

const columns: DatatableColumns[] = [
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
  <Card :class="['inline-block', $props.class]" styling="light">
    <CardHeader>
      <CardTitle>
        <div class="flex justify-between items-center">
          <p>ioBroker Updates</p>
          <Badge :value="availableUpdates.length" />
        </div>
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div class="default_card">
        <TableBasic :columns="getColumns(columns)" :data="availableUpdates" />
      </div>
    </CardContent>
  </Card>
</template>
