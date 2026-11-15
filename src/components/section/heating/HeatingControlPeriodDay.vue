<script lang="ts" setup>
import SelectComponent from "@/components/shared/select/SelectComponent.vue";
import { tempArray } from "@/lib/object.ts";
import { computed } from "vue";
import InputIobroker from "@/components/shared/input/InputIobroker.vue";
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";

const props = defineProps<{ showPeriod?: boolean; day: { val: string; label: string; index: number } }>();
const { iobroker } = useIobrokerStore();

const activeClass = computed(
  () => (i: number) =>
    i + props.day.index * 5 === iobroker.heatingTimeSlot.currentTimePeriod.val
      ? "border-2 border-green-500! text-green-500 bg-green-50 font-bold"
      : "",
);
const heatingControl = computed(() => iobroker.heatingControlDay);
</script>

<template>
  <div class="px-2 py-1 flex-1 bg-popover rounded-md">
    <p class="text-center text-cardCustom-foreground">
      {{ day.label }}
    </p>
    <div class="grid grid-cols-3 gap-1">
      <div class="col-span-2 flex flex-col items-center gap-1">
        <p class="text-xs">ab</p>

        <div v-for="i in 5" :key="i" class="flex items-center gap-1 w-full">
          <span v-if="showPeriod" class="text-xs">{{ i }}</span>
          <InputIobroker
            type="time"
            class="w-full!"
            :state="heatingControl[day.val as keyof typeof heatingControl][String(i) as keyof (typeof heatingControl)['Mon']].time"
          />
        </div>
      </div>

      <div class="col-span-1 flex flex-col items-center gap-1">
        <p class="text-xs">°C</p>

        <SelectComponent
          v-for="i in 5"
          :key="i"
          :items="tempArray()"
          class="w-full"
          :model-value="
            heatingControl[day.val as keyof typeof heatingControl][String(i) as keyof (typeof heatingControl)['Mon']].temp?.val?.toString()
          "
          :class="[activeClass(i), '']"
          @update:model-value="
            heatingControl[day.val as keyof typeof heatingControl][String(i) as keyof (typeof heatingControl)['Mon']].temp.setState(
              $event?.toString() ?? '',
            )
          "
        />
      </div>
    </div>

    <div class="text-center mb-1 flex text-cardCustom-text/70 justify-between px-6"></div>
  </div>
</template>
