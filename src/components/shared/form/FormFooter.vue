<script setup lang="ts">
import { Button } from "@/components/shared/button";

const emits = defineEmits(["update:close"]);
</script>

<template>
  <div class="flex justify-end space-x-2">
    <Button variant="outline" type="button" @click.prevent.stop="emits('update:close')">Abbrechen</Button>
    <Button type="submit">Speichern</Button>
  </div>
</template>
