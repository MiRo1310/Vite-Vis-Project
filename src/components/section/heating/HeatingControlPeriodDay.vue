<script lang="ts" setup>
import { Input } from "@/components/ui/input";
import Select from "@/components/shared/select/select.vue";
import { StoreValue, useIobrokerStore } from "@/store/iobrokerStore.ts";
import { tempArray } from "@/lib/object.ts";
import { computed } from "vue";
import { adminConnection } from "@/lib/connecter-to-iobroker.ts";
import { useDynamicSubscribe } from "@/composables/dynamicSubscribe.ts";
import { IdToSubscribe } from "@/types/types.ts";

const props = defineProps<{ day: { val: string; label: string, index: number }; }>();
const { heating, heatingTimeSlot } = useIobrokerStore();

const profile = computed(() => {
  return heating?.heatingControlProfile;
});

function updateData(id: string | undefined, value: string) {
  if (!id) {
    return;
  }

  adminConnection?.setState(id, { val: value, ack: false });
}

export interface HeatingTimeSlot {
  currentTimePeriod: StoreValue<number>;
}

const states: IdToSubscribe<HeatingTimeSlot>[] = [{
  objectNameInStore: "heatingTimeSlot",
  value: [
    { id: "heatingcontrol.0.vis.RoomValues.CurrentTimePeriod", firstKey: "currentTimePeriod" }
  ]
}];
useDynamicSubscribe(states);

const activeClass = computed(() => (i: number) => {
  return (((i) + props.day.index * 5) === heatingTimeSlot.currentTimePeriod?.val) ? "bg-green-100" : "bg-white";
});
</script>
<template>
  <div class="day__container">
    <p class="day__label">
      {{ day.label }}
    </p>
    <div class="values__container">
      <div>
        <p class="text-center mb-2">
          ab
        </p>
        <Input
          v-for="i in 5" :key="i" type="time"
          :model-value="profile[`${day.val}.${i}.time` as keyof typeof profile]?.val"
          :class="['day__input', activeClass(i)]"
          @update:model-value="updateData(profile[`${day.val}.${i}.time` as keyof typeof profile]?.id, $event.toString())"
        />
      </div>
      <div>
        <p class="text-center mb-2">
          °C
        </p>
        <Select
          v-for="i in 5" :key="i" :items="tempArray()"
          :selected="profile[`${day.val}.${i}.temp` as keyof typeof profile]?.val?.toString()"
          :class="['p-0', activeClass(i)]"
          @update:selected="updateData(profile[`${day.val}.${i}.temp` as keyof typeof profile]?.id, $event?.toString()??'')"
        />
      </div>
    </div>
  </div>
</template>
<style scoped lang="postcss">
.day__container {
  @apply bg-color__default pt-2 flex-1 mb-1;
}

.day__label {
  @apply text-center mb-3;
}

.values__container {
  @apply flex justify-center mb-1 space-x-1;
}

:deep(button[role="combobox"]) {
  @apply h-6 shadow-none border-2 border-t-0 border-x-0 rounded-none min-w-[4rem] mt-1;
}

.day__input {
  @apply h-6 shadow-none border-2 border-t-0 border-x-0 rounded-none mt-1;
}
</style>
