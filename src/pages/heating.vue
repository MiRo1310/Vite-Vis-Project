<script setup lang="ts">
import HeatingConfig from "@/components/section/heating/HeatingConfig.vue";
import HeatingPump from "@/components/section/heating/HeatingPump.vue";
import HeatingStatus from "@/components/section/heating/HeatingStatus.vue";
import HeatingTemperature from "@/components/section/heating/HeatingTemperature.vue";
import HeatingWarning from "@/components/section/heating/HeatingWarning.vue";
import Dialog from "@/components/shared/dialog/Dialog.vue";
import Button from "@/components/ui/button/Button.vue";
import HeatingControl from "@/components/section/heating/HeatingControl.vue";
</script>
<template>
  <div class="flex flex-wrap space-x-1 space-y-1 -mt-1 -ml-1">
    <HeatingStatus class="mt-1 ml-1" />
    <HeatingTemperature />
    <HeatingWarning />
    <HeatingPump />
    <HeatingConfig />
    <Dialog class-content="h-full w-full max-w-full p-0 pt-7 " stying="small">
      <template #trigger>
        <Button class="border-none rounded-none h-full">
          HeatingControl
        </Button>
      </template>
      <template #content>
        <HeatingControl />
      </template>
    </Dialog>
    <iframe
      src="http://192.168.1.4:3000/d-solo/feobdyuntkhs0d/temperaturen?orgId=1&refresh=30s&panelId=1"
      width="100%"
      height="400"
      frameborder="0"
    />
  </div>
</template>
