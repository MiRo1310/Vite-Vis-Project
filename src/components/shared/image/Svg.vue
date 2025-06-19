<script setup lang="ts">
import * as icons from "@/assets/img/svg";

const props = defineProps<{ name: keyof typeof icons }>();

// README - This is a dynamic import of the SVG icons. Add all svg to the assets/img/svg folder and import them in the index.ts file. Then you can use them in the components.
const icon = () => {
  const iconName = props.name as keyof typeof icons;
  return icons[iconName];
};
</script>

<template>
  <component :is="icon()" />
</template>
