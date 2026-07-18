<script setup lang="ts">
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { type HTMLAttributes, watchEffect } from "vue";
import { type SelectOption } from "@/types/types.ts";
import { getVariantsClasses } from "@/composables/variants-classes.ts";

const props = defineProps<{
  placeholder?: string;
  items: SelectOption[];
  label?: string;
  class?: HTMLAttributes["class"];
  disableHover?: boolean;
  disabled?: boolean;
  e2e?: string;
  // eslint-disable-next-line vue/no-unused-properties
  border?: keyof (typeof variants)["border"];
}>();

const itemE2e = (item: SelectOption): string | undefined => (props.e2e ? `${props.e2e}-${item.label}` : undefined);

const modelValue = defineModel<string>("modelValue", {
  get: (m) => {
    if (!m) {
      return "";
    }
    return (
      props.items.find((v) => v.id === m)?.value ??
      props.items.find((v) => v.label === m)?.value ??
      props.items.find((v) => v.value === m)?.value ??
      ""
    );
  },
  set: (v) => {
    const found = props.items.find((i) => i.id === v || i.value === v || i.label === v);
    if (found) {
      return found.id ?? found.value;
    } else {
      return v;
    }
  },
});
const selectedObj = defineModel<SelectOption>("selectedObj");

watchEffect(() => {
  if (modelValue.value) {
    selectedObj.value = props.items.find((item) => item.value === modelValue.value);
  }
});

function getFocusClass(item: SelectOption) {
  let string = "";
  if (typeof item.class === "string") {
    item.class.split(" ").forEach((cl: string) => (string += `focus:${cl} `));
  }
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
  <Select v-model="modelValue" :disabled>
    <SelectTrigger v-e2e="e2e" :class="[getVariantsClasses(variants, props), $props.class]">
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
          v-e2e="itemE2e(item)"
          :class="[
            `border-${item?.class || 'accent'}`,

            {
              [`${getFocusClass(item)} focus:border-black focus:border-2`]: disableHover,
            },
            item.class,
          ]"
        >
          {{ item.label || item.value }}
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>
