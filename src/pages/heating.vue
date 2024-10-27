<script setup lang="ts">
import HeatingConfig from "@/components/section/HeatingConfig.vue";
import HeatingPump from "@/components/section/HeatingPump.vue";
import HeatingStatus from "@/components/section/HeatingStatus.vue";
import HeatingTemperature from "@/components/section/HeatingTemperature.vue";
import HeatingWarning from "@/components/section/HeatingWarning.vue";
import PageSection from "@/components/shared/PageSection/PageSection.vue";
</script>
<template>
  <PageSection class="flex flex-wrap -mt-1">
    <HeatingStatus />
    <HeatingTemperature />
    <HeatingWarning />
    <HeatingPump />
    <HeatingConfig />
  </PageSection>
</template>
