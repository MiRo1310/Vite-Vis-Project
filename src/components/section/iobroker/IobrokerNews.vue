<script setup lang="ts">
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import { type DatatableColumns, getColumns } from "@/lib/table.ts";
import TableBasic from "@/components/shared/table/TableBasic.vue";
import { computed } from "vue";
import CardSubcard from "@/components/shared/card/CardSubcard.vue";
import { type NewsFeed } from "@/components/section/iobroker/index.ts";

const { iobroker } = useIobrokerStore();
const columns: Array<DatatableColumns<NewsFeed>> = [
  { source: "title.de", labelKey: "Title", accessorKey: "title", type: "text" },
  {
    source: "content.de",
    labelKey: "Inhalt",
    accessorKey: "content",
    type: "text",
  },
  {
    source: "created",
    labelKey: "Erstellt",
    accessorKey: "created",
    type: "datetime",
  },
];

const json = computed(() => iobroker.infos.newsFeeds.parsed([]));
</script>

<template>
  <CardSubcard class="flex-1">
    <p>News</p>

    <div class="max-h-full overflow-auto">
      <TableBasic :columns="getColumns(columns)" :data="json" :loading="false" />
    </div>
  </CardSubcard>
</template>
