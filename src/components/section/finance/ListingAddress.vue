<script setup lang="ts">
import { TravelCostQuery } from "@/api/gql/graphql.ts";
import { ITableColumn } from "@/types/types.ts";

defineProps<ITableColumn<string, TravelCostQuery["travelCost"][number]>>();
</script>

<template>
  <div class="text-muted-foreground">
    <p>{{ row.original.address?.name }}</p>
    <p>{{ row.original.address?.street }} , {{ row.original.address?.city }}</p>
  </div>
</template>
