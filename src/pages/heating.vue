<script setup lang="ts">
import HeatingConfig from "@/components/section/heating/HeatingConfig.vue";
import HeatingPump from "@/components/section/heating/HeatingPump.vue";
import HeatingStatus from "@/components/section/heating/HeatingStatus.vue";
import HeatingTemperature from "@/components/section/heating/HeatingTemperature.vue";
import HeatingWarning from "@/components/section/heating/HeatingWarning.vue";
import Page from "@/components/shared/page/Page.vue";
import PageContent from "@/components/shared/page/PageContent.vue";
import HeatingControl from "@/components/section/heating/HeatingControl.vue";
</script>

<template>
  <Page title="Heizung">
    <template #default>
      <PageContent>
        <div class="flex flex-wrap gap-1">
          <HeatingStatus />
          <HeatingTemperature />
          <HeatingWarning />
          <HeatingPump />
          <HeatingConfig />
          <HeatingControl />
          <iframe src="http://192.168.1.4:3000/d-solo/feobdyuntkhs0d/temperaturen?orgId=1&refresh=30s&panelId=1" width="100%" height="400" />
        </div>
      </PageContent>
    </template>
  </Page>
</template>
