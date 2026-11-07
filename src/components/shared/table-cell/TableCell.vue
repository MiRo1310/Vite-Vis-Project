<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue";
import BoolIcon from "@/components/shared/table-cell/BoolIcon.vue";
import DateTimeText from "@/components/shared/table-cell/DateTimeText.vue";
import DateText from "@/components/shared/table-cell/DateText.vue";
import TimeText from "@/components/shared/table-cell/TimeText.vue";
import NumberText from "@/components/shared/table-cell/NumberText.vue";
import { type TableCellClass, type TableCellType } from "@/lib/table.ts";
import PreCode from "@/components/shared/table-cell/PreCode.vue";

export type StringOrNumber = string | number;

const props = defineProps<{
  value: string | number | boolean | null | undefined;
  class?: HTMLAttributes["class"];
  type: TableCellType;
  unit?: string;
  reverse?: boolean;
  decimals?: number;
  cellClass?: TableCellClass<any>;
  original: any;
}>();

const cellClass = computed(() => `text-muted-foreground ${props.cellClass?.(props.original) ?? ""}`);
</script>

<template>
  <div :class="props.class" :data-type="type">
    <BoolIcon v-if="type === 'bool'" :value="reverse ? (!value as boolean) : (value as boolean)" />
    <DateTimeText v-else-if="type === 'datetime'" :value="value as string" :cell-class />
    <DateText v-else-if="type === 'date'" :value="value as string" :cell-class />
    <TimeText v-else-if="type === 'time'" :value="value as string" :cell-class />
    <NumberText v-else-if="type === 'number'" :unit="unit" :value="value as StringOrNumber" :cell-class :decimals />
    <PreCode v-else-if="type === 'preCode'" :value="value as string" :cell-class />
    <p v-else :class="cellClass">
      {{ value }}
    </p>
  </div>
</template>
