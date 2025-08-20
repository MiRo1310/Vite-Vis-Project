<script setup lang="ts">
import { Input } from "@/components/shared/input";
import { ref } from "vue";
import { Button } from "@/components/shared/button";
import { useMutation } from "@vue/apollo-composable";
import { graphql } from "@/api/gql";

const { mutate } = useMutation(
  graphql(`
    mutation AddDescription($text: String!) {
      createDescription(text: $text) {
        text
      }
    }
  `),
  { refetchQueries: ["Descriptions"] },
);

const text = ref<string>();

const clearInputs = () => {
  text.value = "";
};

const addDescriptionHandler = () => {
  if (!text.value) {
    return;
  }
  console.log(text.value);
  mutate({
    text: text.value,
  });
  clearInputs();
};
</script>

<template>
  <div class="add-description">
    <Input type="text" placeholder="Beschreibung" v-model:model-value="text" class="add-description__input" />

    <Button icon="add" variant="outline" size="icon" @click="addDescriptionHandler" />
  </div>
</template>

<style scoped lang="scss">
.add-description {
  @apply my-4 flex gap-4 flex-wrap;

  &__input {
    @apply w-[40rem];
  }
}
</style>
