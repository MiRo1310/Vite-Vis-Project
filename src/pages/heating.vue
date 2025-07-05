<script setup lang="ts">
import HeatingConfig from "@/components/section/heating/HeatingConfig.vue";
import HeatingPump from "@/components/section/heating/HeatingPump.vue";
import HeatingStatus from "@/components/section/heating/HeatingStatus.vue";
import HeatingTemperature from "@/components/section/heating/HeatingTemperature.vue";
import HeatingWarning from "@/components/section/heating/HeatingWarning.vue";
import Dialog from "@/components/shared/dialog/Dialog.vue";
import Button from "@/components/ui/button/Button.vue";
import HeatingControl from "@/components/section/heating/HeatingControl.vue";
import Page from "@/components/shared/page/Page.vue";
import PageContent from "@/components/shared/page/PageContent.vue";
</script>
<template>
  <Page title="Heizung">
    <template #default>
      <PageContent>
        <div class="heating__cards">
          <HeatingStatus />
          <HeatingTemperature />
          <HeatingWarning />
          <HeatingPump />
          <HeatingConfig />
          <Dialog class-content="w-full max-w-full p-0 pt-7 ">
            <template #trigger>
              <Button variant="outline" class="h-full">HeatingControl</Button>
            </template>
            <template #content>
              <HeatingControl />
            </template>
          </Dialog>
          <iframe src="http://192.168.1.4:3000/d-solo/feobdyuntkhs0d/temperaturen?orgId=1&refresh=30s&panelId=1" width="100%" height="400" />
        </div>
      </PageContent>
    </template>
  </Page>
</template>

<style scoped lang="scss">
.heating {
  &__cards {
    @apply flex flex-wrap gap-1;
  }
}
</style>
