<script setup lang="ts">
import HeatingConfig from "@/components/section/heating/HeatingConfig.vue";
import HeatingControl from "@/components/section/heating/HeatingControl.vue";
import HeatingPump from "@/components/section/heating/HeatingPump.vue";
import HeatingStatus from "@/components/section/heating/HeatingStatus.vue";
import HeatingTemperature from "@/components/section/heating/HeatingTemperature.vue";
import HeatingWarning from "@/components/section/heating/HeatingWarning.vue";
import PageSection from "@/components/shared/page-section/PageSection.vue";
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
        <Button>
          HeatingControl
        </Button>
      </template>
      <template #description>
        <HeatingControl />
      </template>
    </Dialog>
  </PageSection>
</template>
