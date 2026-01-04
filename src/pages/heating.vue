<script setup lang="ts">
import HeatingConfig from "@/components/section/heating/HeatingConfig.vue";
import HeatingPump from "@/components/section/heating/HeatingPump.vue";
import HeatingStatus from "@/components/section/heating/HeatingStatus.vue";
import HeatingTemperature from "@/components/section/heating/HeatingTemperature.vue";
import HeatingWarning from "@/components/section/heating/HeatingWarning.vue";
import Page from "@/components/shared/page/Page.vue";
import HeatingControl from "@/components/section/heating/HeatingControl.vue";
</script>

<template>
  <Page title="Heizung">
    <template #header>
      <HeatingControl />
    </template>
    <template #default>
      <div class="flex flex-wrap gap-2">
        <HeatingStatus />
        <HeatingTemperature />
        <HeatingWarning />
        <HeatingPump />
        <HeatingConfig />
      </div>
      <iframe
        src="http://192.168.1.4:3000/d-solo/feobdyuntkhs0d/temperaturen?orgId=1&refresh=30s&panelId=1"
        width="100%"
        height="400"
        class="mt-2 rounded-md"
      />
    </template>
  </Page>
</template>
