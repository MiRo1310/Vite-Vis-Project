<script setup lang="ts">
import { ref } from "vue";
import { Button } from "@/components/shared/button";
import PageContent from "@/components/shared/page/PageContent.vue";
import Page from "@/components/shared/page/Page.vue";

const diagrams: string[] = [
  "http://192.168.1.4:3000/d/feobdyuntkhs0d/temperaturen?orgId=1&from=now-24h&to=now&refresh=30s&kiosk",
  "http://192.168.1.4:3000/d/de48h6zf94jcwe/pv-fuer-vis?orgId=1&refresh=10s&kiosk",
  "http://192.168.1.4:3000/d/aep1w0j2gjsowd/pool-temperatur?orgId=1&kiosk",
];

const diagramIndex = ref(0);

const clickHandler = (direction: number) => {
  diagramIndex.value += direction;
  if (diagramIndex.value < 0) {
    diagramIndex.value = diagrams.length - 1;
    return;
  }
  if (diagramIndex.value >= diagrams.length) {
    diagramIndex.value = 0;
  }
};
</script>

<template>
  <Page title="Diagramme">
    <template #default>
      <PageContent>
        <div class="flex flex-col h-full">
          <div class="diagrams">
            <Button variant="outline" @click="clickHandler(1)"> Zurück</Button>
            <Button variant="outline" @click="clickHandler(-1)"> Vor</Button>
          </div>
          <div class="flex-1">
            <iframe :src="diagrams[diagramIndex]" width="100%" height="100%" />
          </div>
        </div>
      </PageContent>
    </template>
  </Page>
</template>

<style scoped lang="scss">
.diagrams {
  @apply flex gap-2 items-center mb-2;
}
</style>
