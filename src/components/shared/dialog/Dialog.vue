<script setup lang="ts">
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { HTMLAttributes, ref, watchEffect } from "vue";

const props = withDefaults(defineProps<{
  open?: boolean,
  classContent?: HTMLAttributes["class"]
  styling?: keyof typeof style
}>(), { classContent: "", styling: "default" });
const emit = defineEmits(["update:open"]);

const style = {
  small: "p-0 bg-backgroundColor border-none rounded-none",
  default: ""
};

const localOpen = ref(false);

watchEffect(() => {
  localOpen.value = props.open;
});
const closeDialog = () => {
  emit("update:open", false);
};
</script>

<template>
  <Dialog v-model:open="localOpen" @update:open="emit('update:open', $event)">
    <DialogTrigger>
      <slot name="trigger" />
    </DialogTrigger>
    <DialogContent :class="[props.classContent, style[styling]]">
      <DialogHeader v-if="$slots.title || $slots.description">
        <DialogTitle v-if="$slots.title">
          <slot name="title" />
        </DialogTitle>
        <DialogDescription v-if="$slots.description">
          <slot name="description" />
        </DialogDescription>
      </DialogHeader>
      <slot name="content" />

      <DialogFooter @click="closeDialog">
        <slot name="footer" />
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
