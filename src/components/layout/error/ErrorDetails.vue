<script setup lang="ts">
import { computed } from "vue";
import { Button } from "@/components/ui/button";
import { formatError } from "@/lib/error";

const props = defineProps<{ error: unknown }>();

const formatted = computed(() => formatError(props.error));

function reload() {
  window.location.reload();
}
</script>

<template>
  <div class="flex h-full min-h-0 flex-col gap-3">
    <p class="text-sm break-all">{{ formatted.message }}</p>
    <pre
      v-if="formatted.details"
      class="min-h-0 flex-1 overflow-auto rounded-md bg-muted p-2 text-[10px] leading-tight whitespace-pre-wrap break-all"
    ><code>{{ formatted.details }}</code></pre>
    <Button size="sm" variant="destructive" class="self-start" @click="reload">Seite neu laden</Button>
  </div>
</template>
