<script setup lang="ts">
import { InputShadcn } from "@/components/ui/input";
import { Button } from "@/components/shared/button";
import { useMutation } from "@vue/apollo-composable";
import { computed, ref } from "vue";
import { graphql } from "@/api/gql";
import { isDefined } from "@vueuse/core";
import { refetchQueryUnits, useUnits } from "@/composables/querys/units.ts";

const { result } = useUnits();

const { mutate } = useMutation(
  graphql(`
    mutation CreateUnit($name: String!) {
      createUnit(dto: { name: $name }) {
        name
      }
    }
  `),
);

const addUnit = async () => {
  if (!newUnit.value || unitExists.value) {
    return;
  }

  const unitArray = newUnit.value
    .split(",")
    .map((u) => u.trim())
    .filter((u) => u);

  unitArray.forEach((unit, index) => {
    if (result.value?.units?.find((c) => c.name === unit)) {
      return;
    }
    mutate({ name: unit }, index === unitArray.length - 1 ? { refetchQueries: [refetchQueryUnits] } : undefined);
  });

  newUnit.value = "";
};

const unitExists = computed(() => isDefined(result.value?.units?.find((c) => c.name === newUnit.value)));
const newUnit = ref("");
</script>

<template>
  <div class="flex gap-2">
    <div class="flex flex-col">
      <InputShadcn
        type="text"
        @keydown.enter="addUnit"
        placeholder="Gib eine Einheit ein, Komma separiert"
        class="w-70"
        v-model:model-value="newUnit"
      />
      <p v-if="unitExists" class="text-sm font-medium text-destructive mt-2">Die Einheit existiert schon</p>
    </div>
    <Button variant="outline" size="icon" icon="add" @click="addUnit" />
  </div>
</template>
