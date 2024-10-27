<script setup lang="ts">
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
const selected = defineModel<string>("selected");

defineProps<{
    placeholder: string;
    items: { val: string; label: string }[];
    label?: string;
}>();
</script>

<template>
    <Select v-model:model-value="selected">
        <SelectTrigger>
            <SelectValue :placeholder="placeholder" />
        </SelectTrigger>
        <SelectContent>
            <SelectGroup>
                <SelectLabel v-if="label">{label}</SelectLabel>
                <SelectItem v-for="(item, index) in items" :key="index" :value="item.val">
                    {{ item.label }}
                </SelectItem>
            </SelectGroup>
        </SelectContent>
    </Select>
</template>
