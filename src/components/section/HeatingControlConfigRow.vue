<script lang="ts" setup>
import { Checkbox } from "@/components/ui/checkbox";
import Select, { SelectItem } from "@/components/shared/select/select.vue";
import { adminConnection } from "@/lib/iobroker/connecter-to-iobroker";
import Input from "../ui/input/Input.vue";

export interface RowHeatingConfig {
    checkbox: { id: string; val: boolean };
    titleCheckbox: string;
    titleSelect: string;
    input?: { id: string; val: string; textBehind: string };
    select: { items: SelectItem[]; selected: string; placeholder?: string; id: string };
}

defineProps<{ row: RowHeatingConfig }>();

const updateData = (val: string | number | boolean, id: string) => {
    adminConnection.value?.setState(id, val);
};
</script>

<template>
    <span class="flex justify-between w-[24rem]">
        <span class="flex items-center">
            <Checkbox :checked="row.checkbox.val" @update:checked="updateData($event, row.checkbox.id)" />
            <p class="ml-4">{{ row.titleCheckbox }}</p>
        </span>
        <span class="flex items-center">
            <p class="mr-4 text-xs">{{ row.titleSelect }}</p>
            <span v-if="row.input" class="flex mr-4">
                <Input :model-value="row.input.val" @update:model-value="updateData($event, row.input.id)"
                    class="h-6 shadow-none border-2 border-t-0 text-xs border-x-0 rounded-none w-10 px-1" />
                <span>{{ row.input.textBehind }}</span>
            </span>
            <Select :items="row.select.items" :selected="row.select.selected"
                :placeholder="row.select.placeholder || ''"
                @update:selected="updateData(parseInt($event), row.select.id)" />
        </span>
    </span>
</template>
<style scoped lang="postcss">
:deep(button[role="combobox"]) {
    @apply h-6 shadow-none border-2 border-t-0 border-x-0 rounded-none min-w-[4rem];
}
</style>
