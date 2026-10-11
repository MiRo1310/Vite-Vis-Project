<script setup lang="ts">
import { computed } from "vue";
import { Button } from "@/components/ui/button";
import { formatError } from "@/lib/error";

const props = defineProps<{ error: unknown }>();
const emit = defineEmits<{ details: [] }>();

const formatted = computed(() => formatError(props.error));
</script>

<template>
  <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
    <span class="min-w-0 text-sm break-all">{{ formatted.message }}</span>
    <Button size="sm" variant="secondary" class="shrink-0 self-start sm:self-auto" @click="emit('details')">Details öffnen</Button>
  </div>
</template>
