<script setup lang="ts">
import { DatatableColumns, getColumns } from "@/lib/table.ts";
import TableBasic from "@/components/shared/table/TableBasic.vue";
import { Log } from "@/types/types.ts";

defineProps<{ logs: Log[] }>();

const columns: DatatableColumns<Log>[] = [
  { source: "ts", labelKey: "Zeit", type: "datetime" },
  { source: "from", labelKey: "Quelle", type: "text" },
  { source: "message", labelKey: "Nachricht", type: "text" },
];
</script>

<template>
  <TableBasic :columns="getColumns(columns)" :data="logs" :loading="false" />
</template>
