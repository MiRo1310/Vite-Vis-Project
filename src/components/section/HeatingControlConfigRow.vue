<script lang="ts" setup>
import { Checkbox } from "@/components/ui/checkbox";
import Select, { SelectItem } from "@/components/shared/select/select.vue";
import { adminConnection } from "@/lib/iobroker/connecter-to-iobroker";

export interface RowHeatingConfig {
    checkbox: { id: string; val: boolean };
    titleCheckbox: string;
    titleSelect: string;
    select: { items: SelectItem[]; selected: string; placeholder?: string; id: string };
}

defineProps<{ row: RowHeatingConfig }>();

const updateData = (val: string | number | boolean, id: string) => {
    adminConnection.value?.setState(id, val);
};
</script>

<template>
    <Checkbox :checked="row.checkbox.val" @update:checked="updateData($event, row.checkbox.id)" />
    <p>{{ row.titleCheckbox }}</p>
    <p>{{ row.titleSelect }}</p>
    <Select :items="row.select.items" :selected="row.select.selected" :placeholder="row.select.placeholder || ''"
        @update:selected="updateData(parseInt($event), row.select.id)" />
</template>
<style scoped lang="postcss">
:deep(button) {
    @apply h-6 shadow-none border-2 border-t-0 border-x-0 rounded-none;
}
</style>
