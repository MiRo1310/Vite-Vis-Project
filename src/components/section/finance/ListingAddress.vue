<script setup lang="ts">
import { type TravelCostQuery } from "@/api/gql/graphql.ts";
import { type ITableColumn } from "@/types/types.ts";

// eslint-disable-next-line vue/no-unused-properties
defineProps<ITableColumn<string, TravelCostQuery["travelCost"][number]>>();
</script>

<template>
  <div class="text-muted-foreground">
    <p>{{ row.original.address?.name }}</p>
    <p>{{ row.original.address?.street }} , {{ row.original.address?.city }}</p>
  </div>
</template>
