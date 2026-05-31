<script lang="ts" setup>
import { Card, CardContent, CardHeader } from "@/components/shared/card";
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import BoolIcon from "@/components/shared/table-cell/BoolIcon.vue";
import { computed } from "vue";
import CardTitle from "@/components/shared/card/CardTitle.vue";
import OnlineOffline from "@/components/shared/OnlineOffline.vue";
import InputIobroker from "@/components/shared/input/InputIobroker.vue";
import { getStoreValBoolean, getStoreValNumber, getStoreValString } from "@/lib/object.ts";

export type BoolText = "true" | "false";

const { iobroker } = useIobrokerStore();

interface Items {
  title: string;
  type: "bool" | "input" | "text" | "number";
  value: string | number | boolean;
  unit?: string;
  function?: (value: string | number) => void;
}

// eslint-disable-next-line complexity
const items = computed(() => {
  const pool = iobroker.pool;
  const status = getStoreValBoolean(pool?.status);
  const items: Items[] = [
    {
      title: "Heizung aktiv",
      type: "bool",
      value: getStoreValNumber(pool?.consumption) > 30,
    },
    {
      title: "Pool Heizung durch Zeitplan aktiv",
      type: "bool",
      value: pool?.heaterState?.val ?? "false",
    },
    {
      title: "Modus",
      type: "text",
      value: getMode(getStoreValString(pool?.mode)),
    },
    {
      title: "Verbrauch",
      type: "number",
      value: status ? getStoreValNumber(pool?.consumption) : 0,
      unit: "W",
    },
    {
      title: "Wunschtemperatur",
      type: "input",
      value: getStoreValNumber(pool?.tempSet),
      unit: "°C",
    },
    {
      title: "Temperatur Eingang",
      type: "text",
      value: status ? getStoreValNumber(pool?.tempIn) : 0,
      unit: "°C",
    },
    {
      title: "Temperatur Ausgang",
      type: "text",
      value: status ? getStoreValNumber(pool?.tempOut) : 0,
      unit: "°C",
    },
    {
      title: "Lüfterdrehzahl",
      type: "text",
      value: getStoreValNumber(pool?.rotor),
      unit: "Rpm",
    },
  ];
  return items;
});

const getMode = (mode: string) => {
  switch (mode) {
    case "-1":
      return "Aus";
    case "0":
      return "Kühlen";
    case "1":
      return "Heizen";
    case "2":
      return "Auto";
    default:
      return "Unbekannt";
  }
};
</script>

<template>
  <Card styling="info">
    <CardHeader>
      <CardTitle>
        <div class="flex justify-between items-center">
          <span>Pool Wärmepumpe</span>
          <OnlineOffline :status="iobroker.pool?.status?.val ?? false" />
        </div>
      </CardTitle>
    </CardHeader>
    <CardContent class="bg-cardCustom-info p-2 shadow-lg mx-2 mb-2">
      <div v-for="(item, index) in items" :key="index" class="flex justify-between items-center">
        <span :class="['mr-12 text-accent-foreground/50 font-bold text-xs', { 'mt-2': index > 0 }]">{{ item.title }}</span>
        <BoolIcon v-if="item.type === 'bool'" :value="item.value as BoolText" />
        <div v-else-if="item.type === 'input'">
          <InputIobroker :state="iobroker.pool?.tempSet" unit="°C" />
        </div>
        <span v-else-if="item.type === 'number'" class="text-accent-foreground/50 text-xs font-bold"
          >{{ parseFloat(item.value?.toString()).toFixed(2) }} {{ item.unit }}
        </span>
        <span v-else class="text-accent-foreground/50 text-xs font-bold">{{ item.value }} {{ item.unit }} </span>
      </div>
    </CardContent>
  </Card>
</template>
