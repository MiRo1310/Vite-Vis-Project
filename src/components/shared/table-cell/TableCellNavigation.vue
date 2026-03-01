<script setup lang="ts">
import { TableCellTypes } from "@/types/types.ts";
import { getValueByPath } from "@/lib/table.ts";
import { routes } from "@/router/routes.ts";

defineProps<TableCellTypes<string, unknown>>();
</script>

<template>
  <RouterLink :to="{ name: routes.product.name, params: { id: getValueByPath(row.original, customValue as string) } }"
    ><span class="underline">{{ value }}</span>
  </RouterLink>
</template>
