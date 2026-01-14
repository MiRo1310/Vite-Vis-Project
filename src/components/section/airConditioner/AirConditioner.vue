<script setup lang="ts">
import OnlineOffline from "@/components/shared/OnlineOffline.vue";
import { StoreValue } from "@/store/ioBrokerStore.ts";
import InputIobroker from "@/components/shared/input/InputIobroker.vue";
import ButtonIobroker from "@/components/shared/button/ButtonIobroker.vue";

defineProps<{
  online: boolean;
  powerWh: number;
  title: string;
  tempSet: StoreValue<number>;
  tempIs: number;
  power: StoreValue<boolean>;
}>();
</script>

<template>
  <div class="air-conditioner">
    <p class="text-xs text-muted-foreground min-w-40 bg-cardCustom-info p-1 flex justify-between items-center">
      <span>{{ title }}</span>

      <OnlineOffline :status="online" />
    </p>
    <div class="p-1 text-xs text-muted-foreground bg-cardCustom-info flex flex-col items-end w-full">
      <div class="flex justify-between items-center w-full">
        <p>{{ online ? powerWh : "0.00" }} W</p>
        <p>Ist: {{ tempIs }} °C</p>
      </div>
      <div class="flex justify-between items-center w-full">
        <ButtonIobroker variant="outline" size="icon" :state="power" icon="power" />
        <InputIobroker :state="tempSet" unit="°C" />
      </div>
    </div>
  </div>
</template>
