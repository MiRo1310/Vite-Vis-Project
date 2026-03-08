<script setup lang="ts">
import { Button } from "@/components/shared/button";

import { Logger } from "@/lib/logger.ts";
import { IRecipeDescriptionCreateOrUpdate } from "@/components/section/new-recipe/index.ts";

const props = defineProps<{ description: IRecipeDescriptionCreateOrUpdate }>();

const descriptions = defineModel<IRecipeDescriptionCreateOrUpdate[]>("descriptions", { default: [] });

const descriptionsToDelete = defineModel<string[]>("descriptionsToDelete", { default: [] });

const removeDescription = () => {
  const { id = null } = props.description;
  if (id) {
    Logger("Removing description with id:", { value: id, useDebugMode: false });
    descriptionsToDelete.value.push(id);
    descriptions.value = descriptions.value.filter((d) => d.id !== id);
  }
};
</script>

<template>
  <Button v-if="descriptions.length > 1" size="icon" variant="outline" icon="remove" @click.prevent="removeDescription" />
</template>
