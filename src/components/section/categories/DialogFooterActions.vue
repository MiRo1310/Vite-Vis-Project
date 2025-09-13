<script setup lang="ts">
import { Button } from "@/components/ui/button";

defineProps<{ variant: keyof typeof variants }>();

const emit = defineEmits(["update", "close"]);

const variants = {
  update: {
    action: "Aktualisieren",
    close: "Schließen",
  },
  confirm: {
    action: "Ja",
    close: "Nein",
  },
};
</script>

<template>
  <div class="dialog-footer-actions">
    <Button variant="outline" @click="emit('update')">{{ variants[variant].action }}</Button>
    <Button variant="default" @click="emit('close')">{{ variants[variant].close }}</Button>
  </div>
</template>

<style scoped lang="scss">
.dialog-footer-actions {
  @apply flex gap-4 justify-end;
}
</style>
