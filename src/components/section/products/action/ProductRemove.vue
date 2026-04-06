<script setup lang="ts">
import { Button } from "@/components/shared/button";
import DialogConfirm from "@/components/shared/dialog/DialogConfirm.vue";
import { ref } from "vue";
import { useMutation } from "@vue/apollo-composable";
import { graphql } from "@/api/gql";
import { useRouter } from "vue-router";
import { routes } from "@/router/routes.ts";

const props = defineProps<{ id: string }>();
const router = useRouter();
const { mutate } = useMutation(
  graphql(`
    mutation removeProduct($id: UUID!) {
      removeProduct(id: $id) {
        errorCode
        isError
      }
    }
  `),
);

const remove = async () => {
  if (!props.id) {
    return;
  }
  await mutate({ id: props.id });
  await router.push({ name: routes.recipeProducts.name });
};

const dialogOpen = ref(false);
</script>

<template>
  <Button variant="outline" size="icon" icon="remove" @click.prevent="dialogOpen = true" />
  <DialogConfirm v-model:dialog-open="dialogOpen" title="Soll das Produkt wirklich gelöscht werden?" @update:confirm="remove" />
</template>
