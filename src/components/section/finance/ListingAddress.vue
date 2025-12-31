<script setup lang="ts">
import { TableColumnProps } from "@/types/types.ts";
import { Row } from "@tanstack/vue-table";
import { TravelCostQuery } from "@/api/gql/graphql.ts";

defineProps<TableColumnProps<string, Row<TravelCostQuery["travelCost"][number]>, undefined>>();
</script>

<template>
  <div class="text-muted-foreground">
    <p>{{ row.original.address.name }}</p>
    <p>{{ row.original.address.street }} , {{ row.original.address.city }}</p>
  </div>
</template>
