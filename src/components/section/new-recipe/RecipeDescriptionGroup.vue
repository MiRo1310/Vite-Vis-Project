<script setup lang="ts">
import FormInput from "@/components/shared/form/FormInput.vue";
import FormTextarea from "@/components/shared/form/FormTextarea.vue";
import { RecipeDescriptionCreateOrUpdateDtoInput } from "@/api/gql/graphql";

const props = defineProps<{ description: RecipeDescriptionCreateOrUpdateDtoInput }>();

const descriptions = defineModel<RecipeDescriptionCreateOrUpdateDtoInput[]>("descriptions", { default: [] });

const updateValue = (val: string | undefined, target: "header" | "text") => {
  const updateDescription = descriptions.value.find((el) => el.position === props.description.position);
  if (updateDescription && val) {
    updateDescription[target] = val;
  }
};
</script>

<template>
  <FormInput
    v-if="description"
    :model-value="description?.header ?? ''"
    placeholder="Hier kannst du eine Überschrift hinzufügen"
    :name="`header-${description.position}`"
    @update:model-value="updateValue($event, 'header')"
  />
  <FormTextarea
    v-if="description"
    :model-value="description?.text"
    placeholder="Hier kannst du Text hinzufügen"
    :name="`textarea-${description.position}`"
    onfocus="textareaFocus = true"
    onfocusout="textareaFocus=false"
    class-text-area="h-32"
    @update:model-value="updateValue($event, 'text')"
  />
</template>
