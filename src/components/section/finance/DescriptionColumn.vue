<script setup lang="ts">
import { Row } from "@tanstack/vue-table";
import { DescriptionsQuery } from "@/api/gql/graphql.ts";
import { TableColumnProps } from "@/types/types.ts";

defineProps<TableColumnProps<string, Row<DescriptionsQuery["description"][number]>, undefined>>();
</script>

<template>
  <div class="description-colum">
    <pre><code class="text-muted-foreground font-sans">{{value}}</code></pre>
  </div>
</template>
