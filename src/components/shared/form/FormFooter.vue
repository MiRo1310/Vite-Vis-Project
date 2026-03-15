<script setup lang="ts">
import { Button } from "@/components/shared/button";
defineProps<{ abortLabel?: string; disabled?: boolean }>();
const emits = defineEmits(["update:close"]);
</script>

<template>
  <div class="flex justify-end space-x-2">
    <Button variant="outline" type="button" @click.prevent.stop="emits('update:close')">{{ abortLabel ?? "Abbrechen" }}</Button>
    <Button type="submit" variant="default" :disabled>Speichern</Button>
  </div>
</template>
