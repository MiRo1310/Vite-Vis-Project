<script setup lang="ts">
import { computed } from "vue";
import { useMutation } from "@vue/apollo-composable";
import { Trash } from "lucide-vue-next";
import { Button } from "@/components/shared/button";
import { useProductCategories } from "@/composables/querys/productCategories";
import { graphql } from "@/api/gql";

const props = defineProps<{ id?: string }>();
const emits = defineEmits(["update:removeCategory"]);

const { mutate } = useMutation(
  graphql(`
    mutation removeCategory($id: UUID!) {
      removeProductCategory(id: $id)
    }
  `),
  { refetchQueries: ["productCategories"] },
);
const { getCategoryIdByName } = useProductCategories();

async function removeCategoryById() {
  if (!props.id) {return;}

  await mutate({ id: props.id });
  emits("update:removeCategory");
}

const disableDeleteButton = computed(() => {
  return !props.id || [getCategoryIdByName("Allgemein")].includes(props.id);
});
</script>

<template>
  <div class="flex space-x-2">
    <p class="text-muted-foreground mt-2">Die Kategorie löschen</p>
    <Button variant="outline" size="icon" class="mr-12" :disabled="disableDeleteButton" @click.prevent="removeCategoryById">
      <Trash />
    </Button>
  </div>
</template>
