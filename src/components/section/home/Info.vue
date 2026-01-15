<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/card";
import { useTime } from "@/composables/time.ts";
import { computed } from "vue";
import { useDynamicSubscribe } from "@/composables/dynamicSubscribe.ts";
import { infoStates } from "@/subscribeIds/info.ts";
import InfoUpdatesLogs from "@/components/section/home/InfoUpdatesLogs.vue";
import InfoCard from "@/components/section/home/InfoCard.vue";
import { useRouter } from "vue-router";
import { getOpenWindows } from "@/composables/windows.ts";
import { InfoType } from "@/types/types.ts";
import CardSubcard from "@/components/shared/card/CardSubcard.vue";
import Badge from "@/components/shared/badge/Badge.vue";

const router = useRouter();

useDynamicSubscribe(infoStates);

const ioBrokerStore = useIobrokerStore();
const { getParsedLogs } = ioBrokerStore;
const { wetter, infos: infoStore } = storeToRefs(ioBrokerStore);

const { hour } = useTime();
const isTimeToWarn = computed(() => {
  if (hour.value === null) {
    return false;
  }
  return hour.value >= 20 || hour.value <= 6;
});

const info = computed((): InfoType[] => [
  {
    title: "Aussentemperatur",
    value: wetter.value.Aussentemperatur?.val,
    unit: "°C",
  },
  {
    title: "Luftfeuchtigkeit",
    value: wetter.value.Luftfeuchtigkeit?.val,
    unit: "%",
  },
  { title: "Regen Menge", value: wetter.value.RegenMenge?.val, unit: "mm" },
]);
</script>
<template>
  <Card
    color="primary"
    styling="small"
    :class="{
      'border-4 border-destructive': isTimeToWarn && getOpenWindows > 0,
    }"
  >
    <CardHeader>
      <CardTitle>Infos</CardTitle>
    </CardHeader>
    <CardContent class="text-xs">
      <InfoUpdatesLogs :info="infoStore" :get-parsed-logs="getParsedLogs" />

      <InfoCard :infos="info" />

      <CardSubcard class="mt-2">
        <div
          :class="['flex justify-between cursor-pointer', { 'animate-bounce': isTimeToWarn && (getOpenWindows ?? 0) > 0 }]"
          @click="router.push({ path: '/fenster' })"
        >
          <p>{{ getOpenWindows ? "Fenster offen" : "Alle Fenster sind zu " }}</p>
          <div>
            <Badge color="orange" :value="getOpenWindows ?? ''" />
          </div>
        </div>
      </CardSubcard>
    </CardContent>
  </Card>
</template>
