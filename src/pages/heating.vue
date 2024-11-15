<script setup lang="ts">
import HeatingConfig from "@/components/section/heating/HeatingConfig.vue";
import HeatingControl from "@/components/section/heating/HeatingControl.vue";
import HeatingPump from "@/components/section/heating/HeatingPump.vue";
import HeatingStatus from "@/components/section/heating/HeatingStatus.vue";
import HeatingTemperature from "@/components/section/heating/HeatingTemperature.vue";
import HeatingWarning from "@/components/section/heating/HeatingWarning.vue";
import Dialog from "@/components/shared/dialog/Dialog.vue";
import Button from "@/components/ui/button/Button.vue";
</script>
<template>
  <div class="flex flex-wrap space-x-2 space-y-2 -mt-2 -ml-2">
    <HeatingStatus class="mt-2 ml-2" />
    <HeatingTemperature />
    <HeatingWarning />
    <HeatingPump />
    <HeatingConfig />
    <Dialog class-content="h-full w-full max-w-full">
      <template #trigger>
        <Button>
          HeatingControl
        </Button>
      </template>
      <template #description>
        <HeatingControl />
      </template>
    </Dialog>
  </div>
</template>
