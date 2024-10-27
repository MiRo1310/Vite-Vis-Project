<script setup lang="ts">
import HeatingStatus from "@/components/section/HeatingStatus.vue";
import HeatingTemperature from "@/components/section/HeatingTemperature.vue";
import PageSection from "@/components/shared/PageSection/PageSection.vue";
</script>
<template>
  <PageSection>
    <HeatingStatus />
    <HeatingTemperature />
  </PageSection>
</template>