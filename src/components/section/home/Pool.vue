<script lang="ts" setup>
import { Card, CardContent, CardHeader } from "@/components/shared/card";
import { storeToRefs } from "pinia";
import { useIobrokerStore } from "@/store/iobrokerStore.ts";
import InputUnit from "@/components/shared/InputWithUnit.vue";
import BoolIcon from "@/components/shared/table-cell/BoolIcon.vue";
import { BoolText, poolIds } from "@/subscribeIds/pool.ts";
import { computed } from "vue";
import CardTitle from "@/components/shared/card/CardTitle.vue";
import OnlineOffline from "@/components/shared/OnlineOffline.vue";
import { setstate } from "@/lib/setstate.ts";
import { useDynamicSubscribe } from "@/composables/dynamicSubscribe.ts";

const { pool } = storeToRefs(useIobrokerStore());

const handleChangeTempSet = (value: string | number) => {
  setstate(pool.value.tempSet?.id, value);
};

useDynamicSubscribe(poolIds);

interface Items {
  title: string;
  type: "bool" | "input" | "text" | "number";
  value: string | number | boolean;
  unit?: string;
  function?: (value: string | number) => void;
}

const items = computed(() => {
  const items: Items[] = [
    {
      title: "Heizung aktiv",
      type: "bool",
      value: (pool.value.consumption?.val ?? 0) > 30,
    },
    {
      title: "Pool Heizung durch Zeitplan aktiv",
      type: "bool",
      value: pool.value.heaterState?.val ?? false,
    },
    {
      title: "Modus",
      type: "text",
      value: getMode(pool.value.mode?.val ?? ""),
    },
    {
      title: "Verbrauch",
      type: "number",
      value: pool.value.status?.val ? (pool.value.consumption?.val ?? 0) : 0,
      unit: "W",
    },
    {
      title: "Wunschtemperatur",
      type: "input",
      value: pool.value.tempSet?.val ?? 0,
      function: handleChangeTempSet,
      unit: "°C",
    },
    {
      title: "Temperatur Eingang",
      type: "text",
      value: pool.value.status?.val ? (pool.value.tempIn?.val ?? 0) : 0,
      unit: "°C",
    },
    {
      title: "Temperatur Ausgang",
      type: "text",
      value: pool.value.status?.val ? pool.value.tempOut?.val || 0 : 0,
      unit: "°C",
    },
    {
      title: "Lüfterdrehzahl",
      type: "text",
      value: pool.value.rotor?.val || 0,
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
  <Card styling="light">
    <CardHeader>
      <CardTitle>
        <div class="pool__title">
          <span>Pool Wärmepumpe</span>
          <OnlineOffline :status="pool.status?.val" />
        </div>
      </CardTitle>
    </CardHeader>
    <CardContent class="pool__content">
      <div v-for="(item, index) in items" :key="index" class="flex justify-between items-center">
        <span :class="['mr-12 text-accent-foreground/50 font-bold text-xs', { 'mt-2': index > 0 }]">{{ item.title }}</span>
        <BoolIcon v-if="item.type === 'bool'" :value="item.value as BoolText" />
        <div v-else-if="item.type === 'input'" class="line">
          <InputUnit
            class="w-16 text-accent-foreground/50 text-xs font-bold border-0 shadow-none rounded-none bg-white"
            type="number"
            :model-value="item?.value.toString()"
            :unit="item.unit"
            :ack="pool.tempSet?.ack"
            @update:model-value="(value?: string | number) => value && item?.function?.(value)"
          />
        </div>
        <span v-else-if="item.type === 'number'" class="text-accent-foreground/50 text-xs font-bold"
          >{{ parseFloat(item.value?.toString()).toFixed(2) }} {{ item.unit }}
        </span>
        <span v-else class="text-accent-foreground/50 text-xs font-bold">{{ item.value }} {{ item.unit }} </span>
      </div>
    </CardContent>
  </Card>
</template>

<style scoped lang="scss">
.pool {
  &__title {
    @apply flex justify-between items-center;
  }

  &__content {
    @apply bg-white p-2 shadow-lg mx-2 mb-2;
  }
}
</style>
