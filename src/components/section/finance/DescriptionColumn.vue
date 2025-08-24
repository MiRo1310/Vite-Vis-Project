<script setup lang="ts">
import { Row } from "@tanstack/vue-table";
import { DescriptionsQuery } from "@/api/gql/graphql.ts";
import { TableColumnProps } from "@/types/types.ts";

defineProps<TableColumnProps<string, Row<DescriptionsQuery["description"][number]>, undefined>>();
</script>

<template>
  <div class="description-colum">
    <pre><code>{{value}}</code></pre>
  </div>
</template>

<style scoped lang="scss">
.description-colum {
  code {
    @apply text-muted-foreground font-sans;
  }
}
</style>
