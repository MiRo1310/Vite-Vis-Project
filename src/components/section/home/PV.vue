<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/card";
import { computed } from "vue";
import InfoCard, { InfoTypes } from "@/components/shared/card/InfoCard.vue";
import { useIobrokerStore } from "@/store/iobrokerStore.ts";

const { pv } = useIobrokerStore();

const infos = computed((): InfoTypes[][] => [
  [
    { title: "Grosse PV", value: pv?.pvGross?.val, unit: "Wh" },
    { title: "Kleine PV", value: pv?.smallPv?.val, unit: "Wh" },
  ],
  [
    {
      title: (pv?.feedIn?.val || 0) < 0 ? "Bezug" : "Einspeisung",
      value: (pv?.feedIn?.val || 0) < 0 ? (pv?.feedIn?.val || 0) * -1 : pv?.feedIn?.val,
      unit: "W",
      valueClass: (pv?.feedIn?.val || 0) < 0 ? "text-red-500" : "text-green-400",
    },
    { title: "Aktives Laden", value: pv?.activeCharging?.val, unit: "W" },
    { title: "Ladezustand", value: pv?.batteryCharging?.val, unit: "%" },
  ],
  [
    { title: "Berechneter Gewinn", value: pv?.profit?.val, unit: "€" },
    {
      title: "Genutzter Strom",
      value: ((pv?.savedMoney?.val || 0) - (pv?.profit?.val || 0)).toFixed(2),
      unit: "€",
    },
    { title: "Ersparnis", value: pv?.savedMoney?.val, unit: "€" },
  ],
]);
</script>

<template>
  <Card styling="blueDark" class="flex-row">
    <CardHeader>
      <CardTitle> PV</CardTitle>
    </CardHeader>
    <CardContent>
      <div class="-mt-2">
        <InfoCard v-for="(info, i) in infos" :key="i" :infos="info" />
      </div>
    </CardContent>
  </Card>
</template>
