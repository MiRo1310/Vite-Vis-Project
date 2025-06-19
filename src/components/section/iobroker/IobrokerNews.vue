<script setup lang="ts">
import { useIobrokerStore } from "@/store/iobrokerStore.ts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shared/card";
import { DatatableColumns, getColumns } from "@/lib/table.ts";
import { stringToJSON } from "@/lib/string.ts";
import TableBasic from "@/components/shared/table/TableBasic.vue";
import { IobrokerLanguages } from "@/types/types.ts";
import { computed } from "vue";

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
const columns: DatatableColumns[] = [
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
const json = computed(() =>
  stringToJSON<NewsFeed[]>(infos.newsFeeds?.val || "[]"),
);
</script>

<template>
  <Card class="flex-1" styling="light">
    <CardHeader>
      <CardTitle> News </CardTitle>
    </CardHeader>
    <CardContent class="max-h-full overflow-auto">
      <div class="default_card">
        <TableBasic :columns="getColumns(columns)" :data="json" />
      </div>
    </CardContent>
  </Card>
</template>
