<script setup lang="ts">
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

defineProps<{ title?: string; description?: string }>();
const dialogOpen = defineModel<boolean>("dialogOpen");
</script>

<template>
  <Dialog v-model:open="dialogOpen">
    <DialogContent class="dialog__content">
      <DialogHeader>
        <DialogTitle>{{ title }}</DialogTitle>
        <DialogDescription v-if="description">
          {{ description }}
        </DialogDescription>
      </DialogHeader>
      <div class="flex-1 h-full">
        <slot />
      </div>
      <DialogFooter><slot name="footer" /></DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<style scoped lang="postcss">
:global(.dialog__content) {
  width: 90vw;
  max-width: 90vw;
  height: 90vh;
  display: flex;
  flex-direction: column;
}
</style>
