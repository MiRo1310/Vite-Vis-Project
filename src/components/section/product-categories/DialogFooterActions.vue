<script setup lang="ts">
import { Button } from "@/components/shared/button/button.variants";
import { ButtonVariants } from "@/components/shared/button/Button.vue";

withDefaults(defineProps<{ namingButtons: keyof typeof buttons; variant?: keyof ButtonVariants["variant"] }>(), { variant: "outline" });

const emit = defineEmits(["update", "close"]);

const buttons = {
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
  <div class="flex gap-4 justify-end">
    <Button :variant @click="emit('update')" class="w-24">{{ buttons[namingButtons].action }}</Button>
    <Button variant="default" @click="emit('close')" class="w-24">{{ buttons[namingButtons].close }}</Button>
  </div>
</template>
