<script setup lang="ts">
import { InputShadcn } from "@/components/ui/input";
import { Button } from "@/components/shared/button";
import { useMutation } from "@vue/apollo-composable";
import { ref } from "vue";
import { graphql } from "@/api/gql";

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
  if (!unit.value) return;
  mutate({ name: unit.value });
  unit.value = "";
};

const unit = ref("");
</script>

<template>
  <div class="add-unit">
    <InputShadcn type="text" placeholder="Gib eine Einheit ein" class="add-unit__input" v-model:model-value="unit" />
    <Button variant="outline" size="icon" icon="add" @click="addUnit" />
  </div>
</template>

<style scoped lang="scss">
.add-unit {
  @apply mt-4 flex gap-2;

  &__input {
    @apply w-60;
  }
}
</style>
