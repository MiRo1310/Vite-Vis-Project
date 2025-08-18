<script setup lang="ts">
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/shared/button";

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
        <Button variant="outline" @click="dialogOpen = false">Nein</Button>
        <Button @click="confirm">Ja</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
