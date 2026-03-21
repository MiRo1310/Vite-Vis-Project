<script setup lang="ts">
import DialogConfirm from "@/components/shared/dialog/DialogConfirm.vue";
import { ref } from "vue";
import { useMutation } from "@vue/apollo-composable";
import { graphql } from "@/api/gql";
import { useRouter } from "vue-router";
import { routes } from "@/router/routes.ts";

const open = ref(false);

const props = defineProps<{ recipeId?: string }>();

const { mutate } = useMutation(
  graphql(`
    mutation removeRecipe($id: UUID!) {
      removeRecipe(id: $id)
    }
  `),
);
const router = useRouter();

const removeRecipe = async () => {
  if (!props.recipeId) {
    return;
  }
  const result = await mutate({ id: props.recipeId });
  if (result) {
    await router.push({ name: routes.recipes.name });
  }
};
</script>

<template>
  <DialogConfirm
    title="Rezept löschen"
    description="Bist du sicher das du das Rezept löschen möchtest? Dieser Vorgang kann nicht rückgängig gemacht werden."
    variant="destructive"
    v-model:dialog-open="open"
    @update:confirm="removeRecipe"
  />

  <div @click.prevent.stop="open = true">
    <slot />
  </div>
</template>
