<script setup lang="ts">
import Button from "@/components/shared/button/Button.vue";
import { X } from "lucide-vue-next";
import { usePwaUpdateSingleton } from "@/composables/pwaUpdate.ts";
import { ref } from "vue";

const { applyUpdate, updateAvailable } = usePwaUpdateSingleton;
const hideButton = ref(false);
</script>

<template>
  <div v-if="updateAvailable && !hideButton" class="absolute top-2 left-2 right-2 z-1000">
    <Button variant="blue" size="full" @click="applyUpdate">Update vorhanden !!! Klicke zum aktualisieren </Button>
    <Button variant="ghost" class="absolute right-0 top-0" @click="hideButton = true"><X /></Button>
  </div>
</template>
