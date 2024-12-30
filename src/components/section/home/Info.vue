<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useIobrokerStore } from "@/store/iobrokerStore.ts";
import { Card, CardContent, CardHeader } from "@/components/shared/card";
import CardTitle from "@/components/shared/card/CardTitle.vue";
import { getWindowInfos } from "@/composables/windows.ts";
import { useTime } from "@/composables/time.ts";
import { computed } from "vue";
import { useDynamicSubscribe } from "@/composables/dynamicSubscribe.ts";
import { infoStates } from "@/subscribeIds/info.ts";
import InfoUpdatesLogs from "@/components/section/home/InfoUpdatesLogs.vue";
import InfoCard from "@/components/section/home/InfoCard.vue";
import { useRouter } from "vue-router";

const router = useRouter();

useDynamicSubscribe(infoStates);


const { getOpenWindows } = getWindowInfos();
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

const infos = computed(() => [[
  { title: "Aussentemperatur", value: wetter.value.Aussentemperatur?.val, unit: "°C" },
  { title: "Luftfeuchtigkeit", value: wetter.value.Luftfeuchtigkeit?.val, unit: "%" },
  { title: "Regen Menge", value: wetter.value.RegenMenge?.val, unit: "mm" }
],
  [
    {
      title: "Fenster offen",
      value: getOpenWindows,
      bounce: true,
      class: getOpenWindows.value > 0 ? "bg-red-100" : "bg-green-100",
      callback: () => {
        router.push({ path: "/fenster" });
      }
    }
  ]
]);

</script>
<template>
  <Card :class="{ 'border-4 border-destructive': isTimeToWarn && getOpenWindows > 0 }" styling="light">
    <CardHeader>
      <CardTitle>Infos</CardTitle>
    </CardHeader>
    <CardContent class="text-xs">
      <InfoUpdatesLogs :info="infoStore" :get-parsed-logs="getParsedLogs" />

      <InfoCard
        v-for="(info, i ) in infos" :key="i" :get-open-windows="getOpenWindows"
        :infos="info" :is-time-to-warn="isTimeToWarn"
      />
    </CardContent>
  </Card>
</template>
