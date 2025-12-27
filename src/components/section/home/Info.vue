<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useIobrokerStore } from "@/store/iobrokerStore.ts";
import { Card, CardContent, CardHeader } from "@/components/shared/card";
import CardTitle from "@/components/shared/card/CardTitle.vue";
import { useTime } from "@/composables/time.ts";
import { computed } from "vue";
import { useDynamicSubscribe } from "@/composables/dynamicSubscribe.ts";
import { infoStates } from "@/subscribeIds/info.ts";
import InfoUpdatesLogs from "@/components/section/home/InfoUpdatesLogs.vue";
import InfoCard from "@/components/section/home/InfoCard.vue";
import { useRouter } from "vue-router";
import { getOpenWindows } from "@/composables/windows.ts";
import { InfoType } from "@/types/types.ts";

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

const info2 = computed((): InfoType[] => [
  {
    title: getOpenWindows.value ? "Fenster offen" : "Alle Fenster sind zu ",
    value: getOpenWindows.value ? getOpenWindows.value : "",
    bounce: true,
    class: getOpenWindows.value > 0 ? "bg-red-100" : "bg-green-100",
    callback: () => {
      router.push({ path: "/fenster" });
    },
  },
]);
</script>
<template>
  <Card
    :class="{
      'border-4 border-destructive': isTimeToWarn && getOpenWindows > 0,
    }"
    styling="info"
  >
    <CardHeader>
      <CardTitle>Infos</CardTitle>
    </CardHeader>
    <CardContent class="text-xs">
      <InfoUpdatesLogs :info="infoStore" :get-parsed-logs="getParsedLogs" />

      <InfoCard :infos="info" />
      <InfoCard :get-open-windows="getOpenWindows" :infos="info2" :is-time-to-warn="isTimeToWarn" />
    </CardContent>
  </Card>
</template>
