<script setup lang="ts">
import { Card, CardContent, CardHeader } from "@/components/shared/card";
import CardTitle from "@/components/shared/card/CardTitle.vue";
import { storeToRefs } from "pinia";
import { useIobrokerStore } from "@/store/iobrokerStore.ts";
import { useRouter } from "vue-router";
import { computed } from "vue";

const router = useRouter();
const iobrokerStore = useIobrokerStore();
const { pv } = storeToRefs(iobrokerStore);

const values = computed(() => [
  { title: "Batterieladung", value: pv.value.batteryCharging?.val, unit: "%" },
  {
    title:
      pv.value.activeCharging?.val || 0 > 0
        ? "Batterie wird geladen"
        : "Batterie wird entladen",
    value: pv.value.activeCharging?.val,
    unit: "W"
  },
  {
    title: pv.value.feedIn?.val || 0 > 0 ? "Einspeisung" : "Bezug",
    value: pv.value.feedIn?.val,
    unit: "W",
    class: pv.value.feedIn?.val || 0 < 0 ? "text-destructive" : "text-green-500"
  },
  { title: "Erzeugnis grosse PV", value: pv.value.pvGross?.val, unit: "W" },
  { title: "Erzeugnis kleine PV", value: pv.value.smallPv?.val, unit: "W" },
  { title: "Berechneter Gewinn", value: pv.value.profit?.val, unit: "€" }
]);
</script>
<template>
  <Card class="w-auto cursor-pointer" styling="blue" @click="router.push('/pv')">
    <CardHeader>
      <CardTitle>PV Daten</CardTitle>
    </CardHeader>
    <CardContent>
      <div v-for="(value, index) in values" :key="index" class="flex justify-between items-center">
        <span
          :class="{
            'text-accent-foreground/50 text-xs font-bold': true,
            'mt-2': index > 0,
          }"
        >{{ value.title }}</span>

        <span
          :class="{ [value?.class as string]: true, 'text-accent-foreground/50 text-xs font-bold ml-6': true, 'mt-2': index > 0 }"
        >
          {{ value.value }} {{ value.unit }}
        </span>
      </div>
    </CardContent>
  </Card>
</template>
