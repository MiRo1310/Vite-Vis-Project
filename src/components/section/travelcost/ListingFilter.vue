<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Button } from "@/components/shared/button";

const startYear = 2024;
const countYearButtons = ref(1);
const activeYear = defineModel<number>("activeYear", { default: new Date().getFullYear() });

onMounted(() => {
  const date = new Date();
  const currentYear = date.getFullYear();
  countYearButtons.value = currentYear - startYear + 1;

  loadFromLocalStorage();
});

const saveToLocalStorage = () => {
  localStorage.setItem("activeYear", String(activeYear.value));
};

const loadFromLocalStorage = () => {
  const active = localStorage.getItem("activeYear");
  if (active && active !== "") {
    activeYear.value = parseInt(active, 10);
  }
};

const updateYear = (year: number) => {
  activeYear.value = year;
  saveToLocalStorage();
};
</script>

<template>
  <div class="listing-filter">
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

<style scoped lang="scss">
.listing-filter {
  @apply flex flex-wrap gap-2 mb-2;
}
</style>
