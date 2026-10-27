<script setup lang="ts">
import { Card, CardContent, CardHeader } from "@/components/shared/card";
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import { computed } from "vue";
import BoolIcon from "@/components/shared/table-cell/BoolIcon.vue";
import OnlineOffline from "@/components/shared/OnlineOffline.vue";
import CardTitle from "../../components/shared/card/CardTitle.vue";
import Page from "@/components/shared/page/Page.vue";
import { landroidData } from "@/constants/landroid.ts";

const { iobroker } = useIobrokerStore();

const infos = computed(() => {
  const landroid = iobroker.landroid;
  return [
    {
      title: "Firmware",
      value: landroid.firmware.value,
      unit: "",
    },
    {
      title: `Akku ${landroid.batteryCharging.val ? " läd" : " ist geladen"}`,
      value: landroid.battery.val,
      unit: "%",
    },
    {
      title: "Status",
      value: landroidData.status(landroid.status.val),
      unit: "",
    },
    {
      title: "Edgecut",
      value: landroid.edgecut.val,
      unit: "",
      type: "bool",
    },
    {
      title: "Error",
      value: landroidData.error(landroid.error.val),
      unit: "",
    },
    { title: "Gefahren", value: landroid.totalDistance.val, unit: "m" },
    {
      title: "Messer in Gebrauch",
      value: landroid.totalBladeTime.val,
      unit: "min",
    },
  ];
});
</script>

<template>
  <Page title="Rasenmäher">
    <Card>
      <CardHeader>
        <CardTitle>
          <div class="flex justify-between">
            <div class="w-12">Rasenmäher</div>
            <div>
              <OnlineOffline :status="iobroker.landroid.online.val" />
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent class="text-accent-foreground/50 text-xs font-bold p-2 shadow-lg mx-2 mb-2">
        <div
          v-for="(info, index) in infos"
          :key="index"
          :class="{
            'flex justify-between items-center text-accent-foreground/50 font-bold w-full': true,
            'mt-2': index > 0,
          }"
        >
          <p>{{ info.title }}</p>
          <p class="flex justify-end ml-4 text-right w-26">
            <BoolIcon v-if="info.type === 'bool'" :value="info.value || false" class="mr-5" />
            <span v-else>
              <span>{{ info.value }}</span>
              <span class="w-5 inline-block text-left ml-1">{{ info.unit }} </span>
            </span>
          </p>
        </div>
      </CardContent>
    </Card>
  </Page>
</template>
