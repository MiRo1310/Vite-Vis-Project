<script setup lang="ts">
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import DialogFooterActions from "@/components/section/categories/DialogFooterActions.vue";

defineProps<{ title?: string; description?: string }>();
const emits = defineEmits(["update:confirm"]);

const dialogOpen = defineModel<boolean>("dialogOpen");

const confirm = () => {
  emits("update:confirm");
  dialogOpen.value = false;
};
</script>

<template>
  <Dialog v-model:open="dialogOpen">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{{ title }}</DialogTitle>
        <DialogDescription v-if="description">
          {{ description }}
        </DialogDescription>
      </DialogHeader>

      <DialogFooter>
        <DialogFooterActions variant="confirm" @close="dialogOpen = false" @update="confirm" />
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
