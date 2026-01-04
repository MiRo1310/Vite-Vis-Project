<script setup lang="ts">
import { useIobrokerStore } from "@/store/iobrokerStore.ts";
import { DatatableColumns, getColumns } from "@/lib/table.ts";
import { stringToJSON } from "@/lib/string.ts";
import TableBasic from "@/components/shared/table/TableBasic.vue";
import { IobrokerLanguages } from "@/types/types.ts";
import { computed } from "vue";
import CardSubcard from "@/components/shared/card/CardSubcard.vue";

interface NewsFeed {
  title: Record<IobrokerLanguages, string>;
  content: Record<IobrokerLanguages, string>;
  id: string;
  class: string;
  "fa-icon": string;
  created: string;
  conditions: string;
}

const { infos } = useIobrokerStore();
const columns: DatatableColumns<NewsFeed>[] = [
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
const json = computed(() => stringToJSON<NewsFeed[]>(infos.newsFeeds?.val || "[]"));
</script>

<template>
  <CardSubcard class="flex-1">
    <p>News</p>

    <div class="max-h-full overflow-auto">
      <TableBasic :columns="getColumns(columns)" :data="json" />
    </div>
  </CardSubcard>
</template>
