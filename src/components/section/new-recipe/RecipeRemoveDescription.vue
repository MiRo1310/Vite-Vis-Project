<script setup lang="ts">
import { Button } from "@/components/shared/button";

import { Logger } from "@/lib/logger.ts";
import { IRecipeDescriptionCreateOrUpdate } from "@/components/section/new-recipe/index.ts";
import { isDefined } from "@vueuse/core";

const props = defineProps<{ description: IRecipeDescriptionCreateOrUpdate }>();

const descriptions = defineModel<IRecipeDescriptionCreateOrUpdate[]>("descriptions", { default: [] });

const descriptionsToDelete = defineModel<string[]>("descriptionsToDelete", { default: [] });

const removeDescription = () => {
  const { id = null, positionByCreate } = props.description;
  if (isDefined(positionByCreate)) {
    if (id) {
      Logger("Removing description with id:", { value: id, useDebugMode: false });
      descriptionsToDelete.value.push(id);
    }
    const copy = [...descriptions.value];

    descriptions.value = copy.filter((d) => d.positionByCreate !== positionByCreate);
  }
};
</script>

<template>
  <Button v-if="descriptions.length > 1" size="icon" variant="outline" icon="remove" @click.prevent="removeDescription" />
</template>
