<script setup lang="ts">
import { Button } from "@/components/shared/button/button.variants";
defineProps<{ abortLabel?: string; disabled?: boolean; saveLabel?: string }>();
const emits = defineEmits(["update:close"]);
</script>

<template>
  <div class="flex justify-end space-x-2">
    <Button variant="outline" type="button" @click.prevent.stop="emits('update:close')">{{ abortLabel ?? "Abbrechen" }}</Button>
    <Button type="submit" variant="default" :disabled>{{ saveLabel ?? "Speichern" }}</Button>
  </div>
</template>
