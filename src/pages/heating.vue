<script setup lang="ts">
import HeatingConfig from "@/components/section/HeatingConfig.vue";
import HeatingControl from "@/components/section/HeatingControl.vue";
import HeatingPump from "@/components/section/HeatingPump.vue";
import HeatingStatus from "@/components/section/HeatingStatus.vue";
import HeatingTemperature from "@/components/section/HeatingTemperature.vue";
import HeatingWarning from "@/components/section/HeatingWarning.vue";
import PageSection from "@/components/shared/PageSection/PageSection.vue";
import Dialog from "@/components/shared/dialog/Dialog.vue";
import Button from "@/components/ui/button/Button.vue";

</script>
<template>
  <PageSection class="flex flex-wrap -mt-2">
    <HeatingStatus />
    <HeatingTemperature />
    <HeatingWarning />
    <HeatingPump />
    <HeatingConfig />
    <Dialog class-content="h-full w-full max-w-full">
      <template #trigger>
        <Button>HeatingControl</Button>
      </template>
      <template #description>
        <HeatingControl />
      </template>
    </Dialog>
  </PageSection>
</template>
