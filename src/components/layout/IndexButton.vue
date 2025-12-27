<script setup lang="ts">
import NavigationButton from "@/components/layout/NavigationButton.vue";
import { homeNavigation } from "@/config/navigation.ts";
</script>

<template>
  <NavigationButton :navigation="homeNavigation" />
</template>
