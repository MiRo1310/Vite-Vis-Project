<script setup lang="ts">
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { HTMLAttributes, watchEffect } from "vue";
import { SelectOption } from "@/types/types.ts";
import { getVariantsClasses } from "@/composables/variants-classes.ts";

const props = defineProps<{
  placeholder?: string;
  items: SelectOption[];
  label?: string;
  class?: HTMLAttributes["class"];
  disableHover?: boolean;
  // eslint-disable-next-line vue/no-unused-properties
  border?: keyof (typeof variants)["border"];
}>();

const modelValue = defineModel<string>("modelValue");
const selectedObj = defineModel<SelectOption>("selectedObj");

watchEffect(() => {
  if (modelValue.value) {
    selectedObj.value = props.items.find((item) => item.value === modelValue.value);
  }
});

function getFocusClass(item: SelectOption) {
  let string = "";
  item?.class?.split(" ").forEach((cl: string) => (string += `focus:${cl} `));

  return string;
}

const variants = {
  border: {
    default: "",
    bottom: "h-6 min-w-16 rounded-none border-0 border-b-2 border-b-accent focus:border-b-2 focus:border-b-black shadow-none ring-0 focus:ring-0",
  },
};
</script>

<template>
  <Select v-model="modelValue">
    <SelectTrigger :class="[getVariantsClasses(variants, props), $props.class]">
      <SelectValue :placeholder="placeholder" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel v-if="label">
          {{ label }}
        </SelectLabel>
        <SelectItem
          v-for="(item, index) in items"
          :key="index"
          :value="item.value"
          :class="{
            [`${item?.class} border-${item?.class || 'accent'}`]: true,
            [`${getFocusClass(item)} focus:border-black focus:border-2`]: disableHover,
          }"
        >
          {{ item.label || item.value }}
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>
