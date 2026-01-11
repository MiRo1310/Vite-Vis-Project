<script setup lang="ts">
import { InputShadcn } from "@/components/ui/input";
import Select from "@/components/shared/select/Select.vue";
import { colors } from "@/config/colors.ts";
import { Button } from "@/components/shared/button";
import { Trash2 } from "lucide-vue-next";
import { SelectOption } from "@/types/types.ts";

const props = defineProps<{
  index: number;
}>();

const selected = defineModel<SelectOption | undefined>("selected");
const inputValue = defineModel<string>("inputValue");
const emit = defineEmits(["update:inputs", "update:delete"]);

function update() {
  emit("update:inputs", {
    input: inputValue.value,
    select: selected.value,
    index: props.index,
  });
}
</script>

<template>
  <InputShadcn v-model:model-value="inputValue" placeholder="Suche nach diesem Text" @update:model-value="update" type="text" />
  <Select
    v-model:selected-obj="selected"
    :items="colors"
    :selected="selected?.label || selected?.value"
    :class="['w-36 rounded-lg', `${selected?.class} text-black`]"
    :disable-hover="true"
    @update:selected-obj="update"
  />
  <Button variant="outline" size="icon" @click="emit('update:delete', index)">
    <Trash2 />
  </Button>
</template>
