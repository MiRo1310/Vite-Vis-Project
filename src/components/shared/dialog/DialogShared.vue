<script setup lang="ts">
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

defineProps<{ title?: string; description?: string }>();
const dialogOpen = defineModel<boolean>("dialogOpen");
</script>

<template>
  <Dialog v-model:open="dialogOpen">
    <DialogContent class="w-[90vw] max-w-[90vw] h-[90vh] flex flex-col">
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
