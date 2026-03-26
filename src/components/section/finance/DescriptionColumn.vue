<script setup lang="ts">
import { DescriptionsQuery } from "@/api/gql/graphql.ts";
import { ITableColumn } from "@/types/types.ts";

defineProps<ITableColumn<string, DescriptionsQuery["description"][number]>>();
</script>

<template>
  <div class="description-colum">
    <pre><code class="text-muted-foreground font-sans">{{value}}</code></pre>
  </div>
</template>
