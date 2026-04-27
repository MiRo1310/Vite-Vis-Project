<script setup lang="ts">
import { Button } from "@/components/shared/button/button.variants";
import { useMutation } from "@vue/apollo-composable";
import { RecipeCategoriesQuery } from "@/api/gql/graphql.ts";
import { computed, ref, watch } from "vue";
import { graphql } from "@/api/gql";
import Input from "../../ui/input/InputShadcn.vue";
import { isDefined } from "@vueuse/core";
import { useRecipeCategories } from "@/composables/querys/recipeCategories.ts";

const props = defineProps<{ result: RecipeCategoriesQuery["recipeCategories"] }>();

const update = defineModel<boolean>("update", { default: false });

const { mutate } = useMutation(
  graphql(`
    mutation addRecipeCategory($name: String!) {
      createRecipeCategory(dto: { name: $name }) {
        id
        name
      }
    }
  `),
  { refetchQueries: ["recipeCategories"], awaitRefetchQueries: true },
);

watch(update, (newVal) => {
  if (newVal) {
    update.value = false;
    addNewCategory();
  }
});

const newCategory = ref("");
const existInDb = ref(false);

async function addNewCategory(): Promise<void> {
  let result = null;
  if (newCategory.value.includes(",")) {
    const categoryArray = newCategory.value
      .split(",")
      .map((u) => u.trim())
      .filter((u) => u);
    for (const category of categoryArray) {
      if (props.result?.find((c) => c.name === category)) {
        existInDb.value = true;
        continue;
      }
      result = await mutate({ name: category });
    }
  } else {
    result = await mutate({ name: newCategory.value });
  }
  await useRecipeCategories().reload();

  if (result?.data) {
    newCategory.value = "";
    existInDb.value = false;
  }
}

const disabled = computed((): boolean => newCategory.value === "" || categoryExists.value);

const categoryExists = computed(() => isDefined(props.result?.find((c) => c.name === newCategory.value)));
</script>

<template>
  <div class="flex items-start gap-2">
    <div class="flex flex-col">
      <Input
        v-model:model-value="newCategory"
        :class="['w-60', { 'border-destructive': categoryExists || existInDb }]"
        placeholder="Kategorie hinzu, Komma separiert"
        @keyup.enter="addNewCategory"
        type="text"
      />
      <p v-if="categoryExists" class="text-sm font-medium text-destructive mt-2">Die Kategorie existiert schon</p>
    </div>
    <Button variant="outline" size="icon" icon="add" :disabled @click.prevent="addNewCategory" />
  </div>
</template>
