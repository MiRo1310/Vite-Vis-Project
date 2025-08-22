<script setup lang="ts">
import FormInput from "@/components/shared/form/FormInput.vue";
import FormTextarea from "@/components/shared/form/FormTextarea.vue";
import { translation } from "@/lib/translation";
import { RecipeDescriptionCreateOrUpdateDtoInput } from "@/api/gql/graphql";
import { getElementByPosition } from "@/components/section/new-recipe/utils";
import { computed } from "vue";

const props = defineProps<{ index: number }>();

const descriptions = defineModel<RecipeDescriptionCreateOrUpdateDtoInput[]>("descriptions", { default: [] });

const description = computed((): RecipeDescriptionCreateOrUpdateDtoInput | undefined => getElementByPosition(props.index, descriptions.value));

const updateValue = (val: string | undefined, target: keyof RecipeDescriptionCreateOrUpdateDtoInput) => {
  const el = getElementByPosition(props.index, descriptions.value);
  if (el && val) {
    if (target === "header") {
      el.header = val;
    } else if (target === "text") {
      el.text = val;
    }
  }
};
</script>

<template>
  <FormInput
    v-if="description"
    :model-value="description?.header ?? ''"
    :placeholder="translation('addRecipe.headerTextarea')"
    :name="`header-${index}`"
    @update:model-value="updateValue($event, 'header')"
  />
  <FormTextarea
    v-if="description"
    :model-value="description?.text"
    :placeholder="translation('addRecipe.textarea')"
    :name="`textarea-${index}`"
    onfocus="textareaFocus = true"
    onfocusout="textareaFocus=false"
    class-text-area="h-32"
    @update:model-value="updateValue($event, 'text')"
  />
</template>
