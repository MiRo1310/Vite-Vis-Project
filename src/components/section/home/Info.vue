<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useIobrokerStore } from "@/store/iobrokerStore.ts";
import { Card, CardContent, CardHeader } from "@/components/shared/card";
import CardTitle from "@/components/shared/card/CardTitle.vue";
import { getWindowInfos } from "@/composables/windows.ts";
import { useTime } from "@/composables/time.ts";
import { computed } from "vue";
import Badge from "@/components/shared/badge/Badge.vue";
import { useDynamicSubscribe } from "@/composables/dynamicSubscribe.ts";
import { infoStates } from "@/lib/iobroker/ids-to-subscribe/info.ts";

useDynamicSubscribe(infoStates);

const { hour } = useTime();

const { getOpenWindows } = getWindowInfos();
const ioBrokerStore = useIobrokerStore();
const { getParsedLogs, pv } = useIobrokerStore();
const { wetter, infos: infoStore } = storeToRefs(ioBrokerStore);

const isTimeToWarn = computed(() => {
  if (hour.value === null) {
    return false;
  }
  return hour.value >= 20 || hour.value <= 6;
});

const infos = computed(() => [
  { title: "Aussentemperatur", value: wetter.value.Aussentemperatur?.val, unit: "°C" },
  { title: "Luftfeuchtigkeit", value: wetter.value.Luftfeuchtigkeit?.val, unit: "%" },
  { title: "Regen Menge", value: wetter.value.RegenMenge?.val, unit: "mm" },
  { title: "", value: "" },
  { title: "Fenster offen", value: getOpenWindows, bounce: true },
  { title: "Berechneter Gewinn", value: pv?.profit?.val, unit: "€" }
]);

</script>
<template>
  <Card :class="{ 'border-4 border-destructive': isTimeToWarn && getOpenWindows > 0 }" styling="blue">
    <CardHeader>
      <CardTitle>Infos</CardTitle>
    </CardHeader>
    <CardContent class="text-xs">
      <div class="info__row ">
        <p>Updates</p>
        <p>
          <Badge :value="infoStore.updatesNumber?.val" />
        </p>
      </div>
      <div class="info__row">
        <p> Logs</p>
        <p class="flex">
          <Badge v-if="getParsedLogs.info?.length" :value="getParsedLogs.info?.length" class="bg-white info__badge" />
          <Badge
            v-if="getParsedLogs.warn?.length" :value="getParsedLogs.warn?.length"
            class="bg-yellow-200 ml-1 info__badge"
          />
          <Badge
            v-if="getParsedLogs.error?.length" :value="getParsedLogs.error?.length"
            class="bg-destructive ml-1 info__badge"
          />
        </p>
      </div>
      <div
        v-for="(info, index) in infos" :key="index" :class="{
          'info__row ': true,
          'animate-bounce': isTimeToWarn && getOpenWindows > 0 && info.bounce,

        }"
      >
        <p>{{ info.title }}</p>
        <p class="ml-3 mr-4">
          {{ info.value }} <span class="w-1 inline-block">{{ info.unit }} </span>
        </p>
      </div>
    </CardContent>
  </Card>
</template>
<style scoped lang="postcss">
.info__row {
  @apply flex justify-between items-center text-accent-foreground/50 font-bold mt-2
}

.info__badge {
  @apply text-3xs
}
</style>
