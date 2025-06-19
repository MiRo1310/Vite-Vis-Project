<script lang="ts" setup>
defineProps({
  value: {
    type: Object as () => string[],
    required: true,
  },
});
</script>

<template>
  <ul>
    <template v-for="item in value" :key="item">
      <li v-if="item" class="list-disc ml-6">
        {{ item }}
      </li>
    </template>
  </ul>
</template>
