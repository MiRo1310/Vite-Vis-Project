<script lang="ts" setup>
import Select from "@/components/shared/select/select.vue";
import { StoreValue, useIobrokerStore } from "@/store/iobrokerStore.ts";
import { tempArray } from "@/lib/object.ts";
import { computed } from "vue";
import { adminConnection } from "@/lib/connecter-to-iobroker.ts";
import { useDynamicSubscribe } from "@/composables/dynamicSubscribe.ts";
import { IdToSubscribe } from "@/types/types.ts";
import InputIobroker from "@/components/shared/input/InputIobroker.vue";

const props = defineProps<{
  day: { val: string; label: string; index: number };
}>();
const { heatingControl, heatingTimeSlot } = useIobrokerStore();

function updateData(id: string | undefined, value: string) {
  if (!id) {
    return;
  }
  adminConnection?.setState(id, { val: value, ack: false });
}

export interface HeatingTimeSlot {
  currentTimePeriod: StoreValue<number>;
}

const states: IdToSubscribe<HeatingTimeSlot>[] = [
  {
    storeFolder: "heatingTimeSlot",
    value: [
      {
        id: "heatingcontrol.0.vis.RoomValues.CurrentTimePeriod",
        key: "currentTimePeriod",
      },
    ],
  },
];
useDynamicSubscribe(states);

const activeClass = computed(() => (i: number) => {
  return i + props.day.index * 5 === heatingTimeSlot.currentTimePeriod?.val ? "bg-green-100 text-black" : "";
});
</script>

<template>
  <div class="mt-2 flex-1 bg-popover">
    <p class="text-center text-cardCustom-foreground mx-2">
      {{ day.label }}
    </p>
    <div class="flex justify-center gap-1">
      <div>
        <div class="text-center mb-1 text-xs flex text-cardCustom-text/70 justify-between px-6">
          <p>ab</p>
          <p>°C</p>
        </div>
        <div v-for="i in 5" :key="i" class="flex justify-center items-center gap-2">
          <div class="flex flex-col gap-1.25 bg-background/50">
            <InputIobroker type="time" :state="heatingControl[`${day.val}.${i}.time` as keyof typeof heatingControl] as StoreValue<number>" />
          </div>
          <div class="flex flex-col gap-1.25 bg-background/50">
            <Select
              :items="tempArray()"
              :model-value="heatingControl[`${day.val}.${i}.temp` as keyof typeof heatingControl]?.val?.toString()"
              :class="[activeClass(i)]"
              @update:model-value="updateData(heatingControl[`${day.val}.${i}.temp` as keyof typeof heatingControl]?.id, $event?.toString() ?? '')"
            />
          </div>
        </div>
      </div>
      <div></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
:deep(button[role="combobox"]) {
  height: 1.5rem;
  box-shadow: none;
  border-style: solid;
  border-width: 0 0 2px 0;
  border-radius: 0;
  min-width: 4rem;
  margin-top: 0.25rem;
}
</style>
