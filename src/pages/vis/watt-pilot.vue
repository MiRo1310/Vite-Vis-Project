<script setup lang="ts">
import Page from "@/components/shared/page/Page.vue";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import { computed } from "vue";
import Date from "@/components/shared/date-time/Date.vue";
import { type WattPilotJson } from "@/types/types.ts";
import { tabToLocalStorage } from "@/composables/tabToLocalStorage.ts";
import WattPilotDataTab from "@/components/section/watt-pilot-and-car/WattPilotDataTab.vue";
import WattPilotValuesTab from "@/components/section/watt-pilot-and-car/WattPilotValuesTab.vue";

const { iobroker } = useIobrokerStore();

const wallboxJson = computed(() => iobroker.wattPilot.jsonScriptChargeLevel.parsed({} as WattPilotJson));

const { clickTab, activeTab } = tabToLocalStorage({ defaultTab: "daten", id: "wattpilot" });
</script>

<template>
  <Page title="Wallbox">
    <Tabs default-value="daten" :model-value="activeTab" class="mr-2">
      <div class="sticky top-0 z-10 bg-background flex justify-between items-center">
        <TabsList class="mb-3">
          <TabsTrigger value="daten" @click="clickTab('daten')">Daten</TabsTrigger>
          <TabsTrigger value="werte" @click="clickTab('werte')">Werte</TabsTrigger>
        </TabsList>
        <p v-if="wallboxJson?.updatedAt" class="text-xs text-muted-foreground">Aktualisiert: <Date :date="wallboxJson.updatedAt" /></p>
      </div>
      <WattPilotDataTab value="daten" :data="wallboxJson" />
      <WattPilotValuesTab value="werte" />
    </Tabs>
  </Page>
</template>
