<script setup lang="ts">
import { Button } from "@/components/shared/button";
import { Plus } from "lucide-vue-next";
</script>

<template>
  <RouterLink :to="{ name: 'new-recipe', params: { id: 'new' } }">
    <Button as="div" variant="outline" size="icon">
      <Plus />
    </Button>
  </RouterLink>
</template>
