<script setup lang="ts">
import InputIobroker from "@/components/shared/input/InputIobroker.vue";
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import { Checkbox } from "@/components/ui/checkbox";
import { ref, watch } from "vue";

const { iobroker } = useIobrokerStore();

const checked = ref(iobroker.wattPilot.gridDrawAllowance.value);

watch(checked, (newValue) => {
  iobroker.wattPilot.gridDrawAllowance.setState(newValue, true);

  if (newValue) {
    iobroker.wattPilot.gridDrawAllowanceWatt.setState(iobroker.wattPilot.configuredGridDrawAllowanceWatt.value, true);
  } else {
    iobroker.wattPilot.gridDrawAllowanceWatt.setState(0, true);
  }
});

watch(
  () => iobroker.wattPilot.configuredGridDrawAllowanceWatt.value,
  (newValue) => {
    if (checked.value) {
      iobroker.wattPilot.gridDrawAllowanceWatt.setState(newValue, true);
    }
  },
);
</script>

<template>
  <p class="text-[10px] text-muted-foreground">Darf aus dem Netz gezogen werden bei Überschuss</p>
  <div class="flex gap-4 items-center">
    <InputIobroker
      :state="iobroker.wattPilot.configuredGridDrawAllowanceWatt"
      :unit="iobroker.wattPilot.configuredGridDrawAllowanceWatt.unit"
      class="w-40"
      :step="100"
    />
    <div>
      <Checkbox v-model:checked="checked" />
      <span class="ml-2 text-sm">Erlauben</span>
    </div>
  </div>
</template>
