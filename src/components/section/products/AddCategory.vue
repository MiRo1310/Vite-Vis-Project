<script setup lang="ts">
import { Button } from "@/components/shared/button";
import { useMutation } from "@vue/apollo-composable";
import { ErrorCode, GetCategoriesQuery } from "@/api/gql/graphql";
import { computed, ref, watch } from "vue";
import { graphql } from "@/api/gql";
import Input from "../../ui/input/InputShadcn.vue";
import { isDefined } from "@vueuse/core";

const props = defineProps<{ result: GetCategoriesQuery["productCategories"] }>();

const update = defineModel<boolean>("update", { default: false });

const { mutate } = useMutation(
  graphql(`
    mutation addCategory($name: String!) {
      createProductCategory(dto: { name: $name }) {
        data {
          id
          name
        }
        errorCode
        isError
      }
    }
  `),
  { refetchQueries: ["GetCategories", "productCategories"] },
);

watch(update, (newVal) => {
  if (newVal) {
    update.value = false;
    addNewCategory();
  }
});

const newCategory = ref("");
const existInDb = ref(false);

async function addNewCategory() {
  if (!newCategory.value) return;
  const result = await mutate({ name: newCategory.value });

  if (result?.data) {
    newCategory.value = "";
    existInDb.value = false;
  }

  if (result?.data?.createProductCategory.errorCode == ErrorCode.Exist) {
    existInDb.value = true;
  }
}

const disabled = computed((): boolean => newCategory.value === "" || categoryExists.value);

const categoryExists = computed(() => isDefined(props.result?.find((c) => c.name === newCategory.value)));
</script>

<template>
  <div class="add-category">
    <div class="add-category__input-wrapper">
      <Input
        v-model:model-value="newCategory"
        :class="['w-60', { 'border-destructive': categoryExists || existInDb }]"
        placeholder="Kategorie hinzu oder ändern"
        @update:model-value="categoryExists = false"
        @keyup.enter="addNewCategory"
        type="text"
      />
      <p v-if="categoryExists" class="add-category__warning">Die Kategorie existiert schon</p>
    </div>
    <Button variant="outline" size="icon" icon="add" :disabled @click.prevent="addNewCategory" />
  </div>
</template>

<style scoped lang="scss">
.add-category {
  @apply flex items-start gap-2;

  &__input-wrapper {
    @apply flex flex-col;
  }

  &__warning {
    @apply text-[0.8rem] font-medium text-destructive mt-2;
  }
}
</style>
