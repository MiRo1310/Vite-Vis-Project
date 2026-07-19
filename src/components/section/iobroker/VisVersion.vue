<script setup lang="ts">
import { DataCard } from "@/components/shared/card";
import MetricValue from "@/components/shared/display/MetricValue.vue";

const version = import.meta.env.VITE_APP_VERSION;
</script>

<template>
  <DataCard title="Vis Version">
    <MetricValue :val="version ?? '-'" />
  </DataCard>
</template>
