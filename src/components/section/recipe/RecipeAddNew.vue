<script setup lang="ts">
import { Button } from "@/components/shared/button";
import { Plus } from "lucide-vue-next";
import { routes } from "@/router/routes.ts";
</script>

<template>
  <RouterLink :to="{ name: routes.newRecipe.name, params: { id: 'new' } }">
    <Button as="div" variant="outline" size="icon">
      <Plus />
    </Button>
  </RouterLink>
</template>
