<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { HTMLAttributes, watchEffect } from "vue";

const props = defineProps<{
  placeholder?: string;
  items: SelectOption[];
  label?: string;
  class?: HTMLAttributes["class"];
  disbaleHover?: boolean
}>();

const selected = defineModel<string>("selected");
const selectedObj = defineModel<SelectOption>("selectedObj");

watchEffect(() => {
  if (selected.value) {
    selectedObj.value = props.items.find((item) => item.val === selected.value);
  }
});

export interface SelectOption {
  val: string;
  label?: string;
  class?: HTMLAttributes["class"];
}

function getFocusClass(item: SelectOption) {
  let string = "";
  item?.class?.split(" ").forEach((cl: string) => string += `focus:${cl} `);

  return string;
}

</script>

<template>
  <div :class="$props.class">
    <Select v-model:model-value="selected">
      <SelectTrigger>
        <SelectValue :placeholder="placeholder" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel v-if="label">
            {{ label }}
          </SelectLabel>
          <SelectItem
            v-for="(item, index) in items" :key="index" :value="item.val"
            :class="{[`${item?.class} border-2 border-${item?.class || 'accent'}`]:true, [`${getFocusClass(item)} focus:border-black focus:border-2`]:disbaleHover}"
          >
            {{ item.label || item.val }}
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  </div>
</template>
