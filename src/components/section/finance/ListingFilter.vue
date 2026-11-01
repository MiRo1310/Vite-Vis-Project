<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Button } from "@/components/shared/button/button.variants";
import { typedStorage } from "@/lib/local-storage.ts";

const startYear = 2025;
const countYearButtons = ref(1);
const activeYear = defineModel<number>("activeYear", { default: new Date().getFullYear() });

onMounted(() => {
  const date = new Date();
  const currentYear = date.getFullYear();
  countYearButtons.value = currentYear - startYear + 1;

  loadFromLocalStorage();
});

const loadFromLocalStorage = () => {
  const active = typedStorage.getItem("activeYear");
  const years = Array.from({ length: countYearButtons.value }, (_, i) => startYear + i);
  if (active && years.some((y) => active === y)) {
    activeYear.value = active;
  }
};

const updateYear = (year: number) => {
  activeYear.value = year;
  typedStorage.setItem("activeYear", year);
};
</script>

<template>
  <div class="flex flex-wrap gap-2 mb-2">
    <Button
      v-for="i in countYearButtons"
      :key="i"
      :variant="activeYear === startYear + i - 1 ? 'default' : 'outline'"
      @click="updateYear(startYear + i - 1)"
    >
      {{ startYear + i - 1 }}
    </Button>
  </div>
</template>
