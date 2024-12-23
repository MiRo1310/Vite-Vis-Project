<script lang="ts" setup>
import { Card, CardContent, CardHeader } from "@/components/shared/card";
import { storeToRefs } from "pinia";
import { useIobrokerStore } from "@/store/iobrokerStore.ts";
import { adminConnection } from "@/lib/connecter-to-iobroker.ts";
import InputUnit from "@/components/shared/InputWithUnit.vue";
import BoolIcon from "@/components/shared/BoolIcon.vue";
import { BoolText } from "@/subscribeIds/pool.ts";
import { computed } from "vue";
import CardTitle from "@/components/shared/card/CardTitle.vue";

const { pool, idsToControl } = storeToRefs(useIobrokerStore());
const handleChangeTempSet = (value: string | number) => {
  if (adminConnection) {
    adminConnection.setState(
      idsToControl.value.tempSetId,
      parseInt(value?.toString())
    );
  }
};

interface Items {
  title: string;
  type: "bool" | "input" | "text" | "number";
  value: string | number | boolean;
  unit?: string;
  function?: (value: string | number) => void;
}

const items = computed(() => {
  const items: Items[] = [
    { title: "Heizung ist aktiv", type: "bool", value: pool.value.consumption?.val || 0 > 100 },
    {
      title: "Pool Heizung durch Zeitplan aktiv",
      type: "bool",
      value: pool.value.heaterState?.val || false
    },
    { title: "Modus", type: "text", value: getMode(pool.value.mode?.val || "") },
    {
      title: "Pool Heizung Energie Verbrauch",
      type: "number",
      value: pool.value.consumption?.val || 0,
      unit: "W"
    },
    {
      title: "Wunschtemperatur",
      type: "input",
      value: pool.value.tempSet?.val || 0,
      function: handleChangeTempSet,
      unit: "°C"
    },
    {
      title: "Temperatur Eingang",
      type: "text",
      value: pool.value.tempIn?.val || 0,
      unit: "°C"
    },
    {
      title: "Temperatur Ausgang",
      type: "text",
      value: pool.value.tempOut?.val || 0,
      unit: "°C"
    },
    { title: "Lüfterdrehzahl", type: "text", value: pool.value.rotor?.val || 0, unit: "Rpm" }
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
  <Card styling="blue">
    <CardHeader>
      <CardTitle>
        <div class="flex justify-between">
          <span>Pool Wärmepumpe</span>
          <span class="text-accent-foreground/50 text-xs font-bold text-right">{{
            pool.status?.val ? "Online" : "Offline"
          }}</span>
        </div>
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div v-for="(item, index) in items" :key="index" class="flex justify-between items-center">
        <span
          :class="{
            'mr-12 text-accent-foreground/50 font-bold text-xs': true,
            'mt-2': index > 0,
          }"
        >{{ item.title }}</span>
        <BoolIcon v-if="item.type === 'bool'" :value="item.value as BoolText" />
        <InputUnit
          v-else-if="item.type === 'input'"
          class="w-16 text-accent-foreground/50 text-xs font-bold border-0 border-b shadow-none rounded-none bg-white"
          type="number" :model-value="item?.value.toString()" :unit="item.unit"
          @update:model-value="(value: string | number) => item && item.function && item.function(value)"
        />
        <span v-else-if="item.type === 'number'" class="text-accent-foreground/50 text-xs font-bold">{{
          parseFloat(item.value?.toString()).toFixed(2) }} {{ item.unit }}
        </span>
        <span v-else class="text-accent-foreground/50 text-xs font-bold">{{ item.value }} {{ item.unit }}
        </span>
      </div>
    </CardContent>
  </Card>
</template>
