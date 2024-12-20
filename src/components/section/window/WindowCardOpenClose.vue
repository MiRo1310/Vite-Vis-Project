<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps<{ windowOpen: boolean | undefined | null }>();

const isWindowOpen = ref(false);
const noValue = ref<boolean | undefined>(false);

watch(() => props.windowOpen, (value) => {
  if (typeof value !== "boolean") {
    noValue.value = true;
    return;
  }
  noValue.value = false;
  isWindowOpen.value = value;
}, { immediate: true });

</script>
<template>
  <p
    v-if="!!noValue"
    class="text text-red-500 ml-3 animate-bounce"
  >
    No Value
  </p>
  <div v-else>
    <p
      v-show="isWindowOpen"
      class="text text-red-500"
    >
      Fenster ist offen
    </p>
    <p
      v-show="!isWindowOpen"
      class="text text-green-500"
    >
      Fenster ist geschlossen
    </p>
  </div>
</template>
