<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps<{
  windowOpen: boolean | undefined | null;
  door: boolean;
}>();

const isWindowOpen = ref(false);
const noValue = ref<boolean | undefined>(false);

watch(
  () => props.windowOpen,
  (value) => {
    if (typeof value !== "boolean") {
      noValue.value = true;
      return;
    }
    noValue.value = false;
    isWindowOpen.value = value;
  },
  { immediate: true },
);
</script>
<template>
  <p v-if="!!noValue" class="text-destructive ml-3 animate-bounce">No Value</p>
  <div v-else>
    <p v-show="isWindowOpen" class="text-destructive text-white text-xs inline-block px-1 rounded-sm ml-1 bg-destructive">
      {{ door ? "Die Tür" : "Das Fenster" }} ist offen
    </p>
    <p v-show="!isWindowOpen" class="text-white text-xs inline-block px-1 rounded-sm ml-1 bg-green-600">
      {{ door ? "Die Tür" : "Das Fenster" }} ist geschlossen
    </p>
  </div>
</template>
