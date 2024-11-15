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
import { HTMLAttributes } from "vue";

const selected = defineModel<string>("selected");

export interface SelectOption {
  val: string;
  label: string;
}

defineProps<{
  placeholder?: string;
  items: SelectOption[];
  label?: string;
  class?: HTMLAttributes["class"];
}>();
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
          <SelectItem v-for="(item, index) in items" :key="index" :value="item.val">
            {{ item.label }}
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  </div>
</template>
