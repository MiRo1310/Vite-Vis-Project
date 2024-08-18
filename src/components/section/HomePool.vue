<script lang="ts" setup>
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { storeToRefs } from "pinia";
import { useIobrokerStore } from "@/store/iobrokerStore";
import { adminConnection } from '@/lib/iobroker/connecterToIobroker'
import InputUnit from '@/components/shared/InputUnit.vue';
import BoolIcon from '@/components/shared/BoolIcon.vue';
import { BoolText } from '@/lib/iobroker/idsToSubscribe/pool';
import { computed } from 'vue';

const { pool, idsToControl } = storeToRefs(useIobrokerStore());
const handleChangeTempSet = (value: string | number) => {
  if (adminConnection.value) {
    adminConnection.value.setState(idsToControl.value.tempSetId, parseInt(value?.toString()))
  }
}

interface Items {
  title: string;
  type: 'bool' | 'input' | "text" | "number";
  value: string | number | boolean;
  unit?: string
  function?: (value: string | number) => void;
}
const items = computed(() => {
  const items: Items[] = [
    { title: "Pool Heizung durch Zeitplan aktiv", type: 'bool', value: pool.value.heaterState },
    { title: "Modus", type: 'text', value: getMode(pool.value.mode) },
    { title: "Pool Heizung Energie Verbrauch", type: 'number', value: pool.value.consumption, unit: "W" },
    { title: "Wunschtemperatur", type: 'input', value: pool.value.tempSet, function: handleChangeTempSet, unit: "°C" },
    { title: "Temperatur Eingang", type: 'text', value: pool.value.tempIn, unit: "°C" },
    { title: "Temperatur Ausgang", type: 'text', value: pool.value.tempOut, unit: "°C" },
    { title: "Lüfterdrehzahl", type: 'text', value: pool.value.rotor, unit: "Rpm" },

  ]
  return items
})

const getMode = (mode: string) => {
  console.log(typeof mode)
  switch (mode) {
    case "-1":
      return "Aus"
    case "0":
      return "Kühlen"
    case "1":
      return "eizen"
    case "2":
      return "Auto"
    default:
      return "Unbekannt"
  }
}

</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Pool</CardTitle>
    </CardHeader>
    <CardContent>
      <p v-for="(item, index) in items" :key="index" class="flex justify-between items-center">
        <span class="mr-12">{{ item.title }}</span>
        <BoolIcon v-if="item.type === 'bool'" :value="item.value as BoolText" />

        <InputUnit v-else-if="item.type === 'input'" class="w-16" type="number"
          :model-value="item.value as number | string" :unit="item.unit"
          @update:model-value="(value: string | number) => item && item.function && item.function(value)" />
        <span v-else-if="item.type === 'number'">{{ parseFloat(item.value?.toString()).toFixed(2) }} {{
          item.unit
        }} </span>
        <span v-else>{{ item.value }} {{ item.unit }} </span>
      </p>
    </CardContent>
  </Card>
</template>
