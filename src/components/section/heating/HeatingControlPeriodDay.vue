<script lang="ts" setup>
import { Input } from "@/components/ui/input";
import Select from "@/components/shared/select/select.vue";
import { StoreValue, useIobrokerStore } from "@/store/iobrokerStore.ts";
import { tempArray } from "@/lib/object.ts";
import { computed } from "vue";
import { adminConnection } from "@/lib/iobroker/connecter-to-iobroker.ts";
import { useDynamicSubscribe } from "@/composables/dynamicSubscribe.ts";
import { IdToSubscribe } from "@/types.ts";
import { useTime } from "@/composables/time.ts";

const props = defineProps<{ day: { val: string; label: string }; }>();
const { heating, heatingTimeSlot } = useIobrokerStore();

const profile = computed(() => {
  return heating?.heatingControlProfile;
});

function updateData(id: string | undefined, value: string) {
  if (!id) {
    return;
  }
  adminConnection.value?.setState(id, { val: value, ack: false });
}

export interface HeatingTimeSlot {
  currentTimePeriod: StoreValue<number>;
}

const states: IdToSubscribe<HeatingTimeSlot>[] = [{
  objectNameInStore: "heatingTimeSlot",
  value: [
    { id: "heatingcontrol.0.vis.RoomValues.CurrentTimePeriod", firstKey: "currentTimePeriod" }
    // { id: "heatingcontrol.0.Rooms.Esszimmer.ActiveTimeSlot", firstKey: "Esszimmer" },
    // { id: "heatingcontrol.0.Rooms.Flur.ActiveTimeSlot", firstKey: "Flur" },
    // { id: "heatingcontrol.0.Rooms.Gäste WC.ActiveTimeSlot", firstKey: "Gäste WC" },
    // { id: "heatingcontrol.0.Rooms.Gästezimmer.ActiveTimeSlot", firstKey: "Gästezimmer" },
    // { id: "heatingcontrol.0.Rooms.Keller Michael.ActiveTimeSlot", firstKey: "Keller Michael" },
    // { id: "heatingcontrol.0.Rooms.Keller Waschen.ActiveTimeSlot", firstKey: "Keller Waschen" },
    // { id: "heatingcontrol.0.Rooms.Kinderzimmer.ActiveTimeSlot", firstKey: "Kinderzimmer" },
    // { id: "heatingcontrol.0.Rooms.Küche.ActiveTimeSlot", firstKey: "Küche" },
    // { id: "heatingcontrol.0.Rooms.Schlafzimmer.ActiveTimeSlot", firstKey: "Schlafzimmer" },
    // { id: "heatingcontrol.0.Rooms.Wohnzimmer.ActiveTimeSlot", firstKey: "Wohnzimmer" }

  ]
}];
useDynamicSubscribe(states);
const { weekday } = useTime();

const activeClass = computed(() => (i: number) => {
  return props.day.label === weekday.value && i === heatingTimeSlot.currentTimePeriod?.val ? "bg-green-100" : "";
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
          @update:selected="updateData(profile[`${day.val}.${i}.temp` as keyof typeof profile]?.id, $event.toString())"
        />
      </div>
    </div>
  </div>
</template>
<style scoped lang="postcss">
.day__container {
  @apply bg-accent pt-2;
}

.day__label {
  @apply text-center mb-2;
}

.values__container {
  @apply flex;
}

:deep(button[role="combobox"]) {
  @apply h-6 shadow-none border-2 border-t-0 border-x-0 rounded-none min-w-[4rem];
}

.day__input {
  @apply h-6 shadow-none border-2 border-t-0 border-x-0 rounded-none;
}
</style>
