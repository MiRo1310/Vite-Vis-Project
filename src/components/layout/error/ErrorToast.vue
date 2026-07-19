<script setup lang="ts">
import { Button } from "@/components/ui/button";

defineProps<{ error: unknown }>();
const emit = defineEmits<{ details: [] }>();
</script>

<template>
  <div class="flex items-center gap-3">
    <span class="text-sm wrap-break-word">{{ (error as Error)?.message ?? "Unbekannter Fehler" }}</span>
    <Button size="sm" variant="secondary" class="shrink-0" @click="emit('details')">Details öffnen</Button>
  </div>
</template>
