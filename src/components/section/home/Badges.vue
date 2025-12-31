<script setup lang="ts">
import Badge from "@/components/shared/badge/Badge.vue";
import { ParsedLogs } from "@/store/iobrokerStore.ts";

defineProps<{ getParsedLogs: ParsedLogs }>();
</script>

<template>
  <Badge v-if="getParsedLogs.info?.length" :value="getParsedLogs.info?.length" class="bg-white text-3xs" />
  <Badge v-if="getParsedLogs.warn?.length" :value="getParsedLogs.warn?.length" class="bg-yellow-200 ml-1 text-3xs" />
  <Badge v-if="getParsedLogs.error?.length" :value="getParsedLogs.error?.length" class="bg-destructive ml-1 text-3xs" />
</template>
