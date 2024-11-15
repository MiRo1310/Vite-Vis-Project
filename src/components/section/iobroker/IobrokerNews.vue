<script setup lang="ts">


import { useIobrokerStore } from "@/store/iobrokerStore.ts";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import CardTitle from "@/components/shared/card/CardTitle.vue";
import { DatatableColumns, getColumns } from "@/lib/table.ts";
import { stringToJSON } from "@/lib/string.ts";
import TableBasic from "@/components/shared/table/TableBasic.vue";
import { IobrokerLanguages } from "@/types.ts";
import { computed } from "vue";

interface NewsFeed {
  title: Record<IobrokerLanguages, string>,
  content: Record<IobrokerLanguages, string>,
  id: string,
  class: string,
  "fa-icon": string,
  created: string,
  conditions: string,
}

const { infos } = useIobrokerStore();
const columns: DatatableColumns[] = [
  { source: "title.de", labelKey: "Title", accessorKey: "title", type: "text" },
  { source: "content.de", labelKey: "Inhalt", accessorKey: "content", type: "text" },
  { source: "created", labelKey: "Erstellt", accessorKey: "created", type: "datetime" }
];
const json = computed(() => stringToJSON<NewsFeed[]>(infos.newsFeeds?.val || "[]"));
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>
        News
      </CardTitle>
    </CardHeader>
    <CardContent class="max-h-56 overflow-auto">
      <TableBasic :columns="getColumns(columns)" :data="json" />
    </CardContent>
  </Card>
</template>