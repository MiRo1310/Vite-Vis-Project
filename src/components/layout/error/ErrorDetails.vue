<script setup lang="ts">
import { Button } from "@/components/ui/button";

defineProps<{ error: unknown }>();

function reload() {
  window.location.reload();
}
</script>

<template>
  <div class="flex h-full flex-col gap-3 overflow-hidden">
    <p class="text-sm wrap-break-word">{{ (error as Error)?.message ?? "Unbekannter Fehler" }}</p>
    <pre
      class="flex-1 overflow-auto rounded-md bg-muted p-2 text-[10px] leading-tight wrap-break-word"
    ><code>{{ (error as Error)?.stack }}</code></pre>
    <Button size="sm" variant="destructive" class="self-start" @click="reload">Seite neu laden</Button>
  </div>
</template>
