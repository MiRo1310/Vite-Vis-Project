<script setup lang="ts">
import { Input } from "@/components/ui/input";
import Select, { SelectOption } from "@/components/shared/select/select.vue";
import { colors } from "@/config/colors.ts";
import { Button } from "@/components/shared/button";
import { Trash2 } from "lucide-vue-next";

const props = defineProps<{
  index: number
}>();

const selected = defineModel<SelectOption | undefined>("selected");
const inputValue = defineModel<string>("inputValue");
const emit = defineEmits(["update:inputs", "update:delete"]);

function update() {
  emit("update:inputs", { input: inputValue.value, select: selected.value, index: props.index });
}
</script>

<template>
  <Input v-model:model-value="inputValue" placeholder="Suche nach diesem Text" @update:model-value="update" />
  <Select
    v-model:selected-obj="selected" :items="colors"
    :selected="selected?.label||selected?.val"
    :class="['w-36 rounded-lg', `${selected?.class}`]"
    :disbale-hover="true"
    @update:selected-obj="update"
  />
  <Button variant="outline" size="icon" @click="emit('update:delete', index)">
    <Trash2 />
  </Button>
</template>
