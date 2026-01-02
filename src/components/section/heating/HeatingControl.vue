<script setup lang="ts">
import Button from "../../shared/button/Button.vue";
import HeatingControlDialog from "@/components/section/heating/HeatingControlDialog.vue";
import Dialog from "@/components/shared/dialog/Dialog.vue";
import { ButtonVariantProps } from "@/components/shared/button";

defineProps<ButtonVariantProps>();
</script>
<template>
  <Dialog class-content="w-full max-w-full p-0 pt-7 ">
    <template #trigger>
      <Button v-bind="$props" class="h-full" variant="outline">
        <div class="flex justify-center mb-2">
          <slot />
        </div>

        Thermostat Steuerung
      </Button>
    </template>
    <template #content>
      <HeatingControlDialog />
    </template>
  </Dialog>
</template>

<style scoped lang="scss"></style>
