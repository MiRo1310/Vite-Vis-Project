<script setup lang="ts">
import { InputShadcn } from "@/components/ui/input";
import { Button } from "@/components/shared/button";
import { useMutation } from "@vue/apollo-composable";
import { computed, ref } from "vue";
import { graphql } from "@/api/gql";
import { GetUnitsQuery } from "@/api/gql/graphql.ts";
import { isDefined } from "@vueuse/core";

const props = defineProps<{ units: GetUnitsQuery["units"] }>();

const { mutate } = useMutation(
  graphql(`
    mutation CreateUnit($name: String!) {
      createUnit(dto: { name: $name }) {
        name
      }
    }
  `),
  { refetchQueries: ["GetUnits"] },
);

const addUnit = () => {
  if (!newUnit.value || unitExists) {
    return;
  }

  mutate({ name: newUnit.value });
  newUnit.value = "";
};
const unitExists = computed(() => isDefined(props.units?.find((c) => c.name === newUnit.value)));
const newUnit = ref("");
</script>

<template>
  <div class="flex gap-2">
    <div class="flex flex-col">
      <InputShadcn type="text" @keydown.enter="addUnit" placeholder="Gib eine Einheit ein" class="w-60" v-model:model-value="newUnit" />
      <p v-if="unitExists" class="text-[0.8rem] font-medium text-destructive mt-2">Die Einheit existiert schon</p>
    </div>
    <Button variant="outline" size="icon" icon="add" @click="addUnit" />
  </div>
</template>
