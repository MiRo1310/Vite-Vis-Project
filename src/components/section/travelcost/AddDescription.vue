<script setup lang="ts">
import { ref } from "vue";
import { Button } from "@/components/shared/button";
import { useMutation } from "@vue/apollo-composable";
import { graphql } from "@/api/gql";
import { useToast } from "@/components/ui/toast";
import { Textarea } from "@/components/ui/textarea";

const { toast } = useToast();

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

  mutate({
    text: text.value,
  });
  toast({
    title: "Die Beschreibung wurde hinzugefügt",
  });
  clearInputs();
};
</script>

<template>
  <div class="add-description">
    <Textarea placeholder="Beschreibung" v-model:model-value="text" class="add-description__textarea" />
    <Button icon="add" variant="outline" size="icon" @click="addDescriptionHandler" />
  </div>
</template>

<style scoped lang="scss">
.add-description {
  @apply my-4 flex gap-4 flex-wrap;

  &__input {
    @apply w-[40rem];
  }

  &__textarea {
    @apply h-24;
  }
}
</style>
