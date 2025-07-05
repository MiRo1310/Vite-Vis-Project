<script lang="ts" setup>
import { InputShadcn } from "@/components/ui/input";
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
  return i + props.day.index * 5 === heatingTimeSlot.currentTimePeriod?.val ? "bg-green-100" : "bg-white";
});
</script>
<template>
  <div class="day__container">
    <p class="day__label">
      {{ day.label }}
    </p>
    <div class="day__content">
      <div>
        <p class="day__section-label">ab</p>
        <div class="day__input-wrapper">
          <InputIobroker
            v-for="i in 5"
            :key="i"
            type="time"
            color="white"
            :state="heatingControl[`${day.val}.${i}.time` as keyof typeof heatingControl] as StoreValue<number>"
          />
        </div>
      </div>
      <div>
        <p class="day__section-label">°C</p>
        <Select
          v-for="i in 5"
          :key="i"
          :items="tempArray()"
          :selected="heatingControl[`${day.val}.${i}.temp` as keyof typeof heatingControl]?.val?.toString()"
          :class="['p-0', activeClass(i)]"
          @update:selected="updateData(heatingControl[`${day.val}.${i}.temp` as keyof typeof heatingControl]?.id, $event?.toString() ?? '')"
        />
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.day {
  &__container {
    @apply bg-color__default pt-2 flex-1 mb-1;
  }

  &__label {
    @apply text-center mb-1 bg-white mx-2;
  }

  &__content {
    @apply flex justify-center mb-1 space-x-1;
  }

  &__section-label {
    @apply text-center mb-1;
  }

  &__input-wrapper {
    @apply flex flex-col gap-[2px];
  }
}

:deep(button[role="combobox"]) {
  @apply h-6 shadow-none border-2 border-t-0 border-x-0 rounded-none min-w-[4rem] mt-1;
}
</style>
