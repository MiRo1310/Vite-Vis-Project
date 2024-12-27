<script setup lang="ts">
import { Input } from "@/components/ui/input";
import Select, { SelectOption } from "@/components/shared/select/select.vue";
import { colors } from "@/config/colors.ts";

const selected = defineModel<SelectOption | undefined>("selected");
const inputValue = defineModel<string>("inputValue");
const emit = defineEmits(["update:inputs"]);

function update() {
  emit("update:inputs", { input: inputValue.value, select: selected.value });
}
</script>

<template>
  <Input v-model:model-value="inputValue" @update:model-value="update" />
  <Select
    v-model:selected-obj="selected" :items="colors"
    :selected="selected?.label||selected?.val"
    :class="['w-36 rounded-lg', `${selected?.class}`]"
    @update:selected-obj="update"
  />
</template>
