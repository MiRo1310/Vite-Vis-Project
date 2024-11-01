<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useIobrokerStore } from "@/store/iobrokerStore";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import CardTitle from "@/components/shared/card/CardTitle.vue";
import { getWindowInfos } from "@/composables/windows";
import { useTime } from "@/composables/time";
import { computed } from "vue";

const { hour } = useTime();

const { getOpenWindows } = getWindowInfos();
const iobrokerStore = useIobrokerStore();
const { wetter } = storeToRefs(iobrokerStore);

const isTimeToWarn = computed(() => {
  return hour.value >= 20 || hour.value <= 6;
});

const infos = computed(() => [
  { title: "Aussentemperatur", value: wetter.value.Aussentemperatur?.val, unit: "°C" },
  { title: "Luftfeuchtigkeit", value: wetter.value.Luftfeuchtigkeit?.val, unit: "%" },
  { title: "Regen Menge", value: wetter.value.RegenMenge?.val, unit: "mm" },
  { title: "", value: "" },
  { title: "Fenster offen", value: getOpenWindows, bounce: true },
]);
</script>
<template>
  <Card :class="{ 'border-4 border-destructive': isTimeToWarn && getOpenWindows > 0 }">
    <CardHeader>
      <CardTitle> Infos </CardTitle>
    </CardHeader>
    <CardContent class="text-xs">
      <div v-for="(info, index) in infos" :class="{
        'flex justify-between items-center text-accent-foreground/50 font-bold': true,
        'animate-bounce': isTimeToWarn && getOpenWindows > 0 && info.bounce,
        'mt-2': index > 0,
      }" :key="index">
        <p>{{ info.title }}</p>
        <p class="ml-3 mr-4">
          {{ info.value }} <span class="w-1 inline-block">{{ info.unit }} </span>
        </p>
      </div>
    </CardContent>
  </Card>
</template>
