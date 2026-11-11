<script setup lang="ts">
import { type TravelCostQuery } from "@/api/gql/graphql.ts";
import { type ITableColumn } from "@/types/types.ts";
import { listingAddress } from "@/lib/finance.ts";

// eslint-disable-next-line vue/no-unused-properties
defineProps<ITableColumn<string | undefined, TravelCostQuery["travelCost"][number]>>();
</script>

<template>
  <div :class="['text-muted-foreground', cellClass?.(row.original) ?? '']">
    <p>{{ row.original.address?.name }}</p>
    <p>{{ listingAddress(row.original.address) }}</p>
  </div>
</template>
