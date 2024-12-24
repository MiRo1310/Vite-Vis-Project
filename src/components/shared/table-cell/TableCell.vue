<script setup lang="ts">
import { PropType } from "vue";
import BoolIcon from "@/components/shared/table-cell/BoolIcon.vue";
import DateTimeText from "@/components/shared/table-cell/DateTimeText.vue";
import DateText from "@/components/shared/table-cell/DateText.vue";
import TimeText from "@/components/shared/table-cell/TimeText.vue";
import NumberText from "@/components/shared/table-cell/NumberText.vue";

export type StringOrNumber = string | number;
export type TableCellType = "bool" | "datetime" | "date" | "time" | "number" | "text";

const props = defineProps({
  value: {
    type: [String, Number, Boolean, null] as PropType<boolean | number | string | null>,
    default: null
  },
  class: {
    type: String,
    default: ""
  },
  type: {
    type: String as PropType<TableCellType>,
    required: false,
    default: "text"
  },
  unit: {
    type: String,
    default: null
  }

});
</script>

<template>
  <div :class="props.class">
    <BoolIcon v-if="type === 'bool'" :value="value as boolean" />
    <DateTimeText v-else-if="type === 'datetime'" :value="value as string" />
    <DateText v-else-if="type === 'date'" :value="value as string" />
    <TimeText v-else-if="type === 'time'" :value="value as string" />
    <NumberText
      v-else-if="type === 'number'"
      :unit="unit"
      :value="value as StringOrNumber"
    />
    <p v-else class="text-muted-foreground">
      {{ value }}
    </p>
  </div>
</template>
