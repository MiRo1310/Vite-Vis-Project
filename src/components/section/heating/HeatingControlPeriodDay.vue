<script lang="ts" setup>
import Select from "@/components/shared/select/Select.vue";
import { tempArray } from "@/lib/object.ts";
import { computed } from "vue";
import InputIobroker from "@/components/shared/input/InputIobroker.vue";
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";

const props = defineProps<{
  day: { val: string; label: string; index: number };
}>();
const { iobroker } = useIobrokerStore();

const activeClass = computed(() => (i: number) => {
  return i + props.day.index * 5 === iobroker.heatingTimeSlot.currentTimePeriod.val ? "bg-green-100! text-black" : "";
});
const heatingControl = computed(() => iobroker.heatingControlDay);
</script>

<template>
  <div class="mt-2 flex-1 bg-popover">
    <p class="text-center text-cardCustom-foreground mx-2">
      {{ day.label }}
    </p>

    <div class="text-center mb-1 text-xs flex text-cardCustom-text/70 justify-between px-6">
      <p>ab</p>
      <p>°C</p>
    </div>

    <div v-for="i in 5" :key="i" class="flex gap-2">
      <InputIobroker
        type="time"
        :state="heatingControl[day.val as keyof typeof heatingControl][String(i) as keyof (typeof heatingControl)['Mon']].time"
      />

      <Select
        :items="tempArray()"
        :model-value="heatingControl[day.val as keyof typeof heatingControl][String(i) as keyof (typeof heatingControl)['Mon']].temp?.val?.toString()"
        :class="[activeClass(i), 'h-full!  m-0!']"
        @update:model-value="
          heatingControl[day.val as keyof typeof heatingControl][String(i) as keyof (typeof heatingControl)['Mon']].temp.setState(
            $event?.toString() ?? '',
          )
        "
      />
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
