<script lang="ts" setup>
import { Checkbox } from "@/components/ui/checkbox";
import Select from "@/components/shared/select/Select.vue";
import { adminConnection } from "@/lib/connecter-to-iobroker.ts";
import { InputShadcn } from "@/components/ui/input";
import { SelectOption } from "@/types/types.ts";

export interface RowHeatingConfig {
  checkbox: { id: string | undefined; val: boolean | undefined };
  titleCheckbox: string;
  titleSelect: string;
  input?: {
    id: string | undefined;
    val: string | undefined;
    textBehind: string;
  };
  select: {
    items: SelectOption[];
    selected: string | undefined;
    placeholder?: string;
    id: string | undefined;
  };
}

defineProps<{ row: RowHeatingConfig }>();

const updateData = (val: string | number | boolean | undefined, id: string | undefined) => {
  if (!id) {
    return;
  }
  adminConnection?.setState(id, val);
};
</script>

<template>
  <div class="flex justify-between w-[24rem]">
    <div class="flex items-center">
      <Checkbox :checked="row.checkbox.val" @update:checked="updateData($event, row.checkbox?.id)" />
      <p class="ml-2 text-xs">{{ row.titleCheckbox }}</p>
    </div>
    <div class="flex items-center justify-end gap-2 flex-1">
      <p class="text-xs">{{ row.titleSelect }}</p>
      <span v-if="row.input" class="flex items-center">
        <InputShadcn :model-value="row.input.val" type="time" class="h-6 text-xs pb-7! mb-1" @update:model-value="updateData($event, row.input.id)" />
        <span class="ml-1 text-xs">{{ row.input.textBehind }}</span>
      </span>
      <div class="w-18">
        <Select
          :items="row.select.items"
          :model-value="row.select.selected"
          :placeholder="row.select.placeholder || ''"
          border="bottom"
          class="w-full"
          @update:model-value="updateData(parseInt($event ?? ''), row.select.id)"
        />
      </div>
    </div>
  </div>
</template>
