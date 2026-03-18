<script setup lang="ts">
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import DialogFooterActions from "@/components/section/categories/DialogFooterActions.vue";
import { ButtonVariants } from "@/components/shared/button/Button.vue";

withDefaults(defineProps<{ title?: string; description?: string; variant?: keyof ButtonVariants["variant"] }>(), { variant: "outline" });
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
        <DialogFooterActions namingButtons="confirm" @close="dialogOpen = false" @update="confirm" :variant />
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
