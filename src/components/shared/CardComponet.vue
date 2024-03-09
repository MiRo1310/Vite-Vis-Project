<script setup lang="ts">
import { defineProps } from "vue";
const props = defineProps({
    title: {
        type: String,
        default: "",
    },
    icon: {
        type: String,
        default: "",
    },
    label: {
        type: String,
        default: "",
    },
});
</script>
<template>
  <div class="h-full">
    <div class="container--card-wrapper">
      <div class="container--card">
        <div class="container--card-head">
          <span
            v-if="props.icon"
            class="material-icons-outlined container--card-head-icon"
          >{{ props.icon
          }}</span>
          <div class="w-full">
            <h1 class="container--card-head-title">
              {{ props.title }}
            </h1>
            <p class="container--card-head-label">
              {{ props.label }}
            </p>
          </div>
          <div class="text-right mr-4 height--center justify-end">
            <slot name="headRight" />
          </div>
        </div>
        <div class="w-[98%] ml-auto mr-auto border-b" />
        <div class="container--card-content">
          <slot name="content" />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="postcss">
* {
    box-sizing: border-box;
}

.height--center {
    @apply flex items-center;
}

.container--card-wrapper {
    @apply w-full drop-shadow-xl h-full overflow-auto;
}

.container--card {
    @apply bg-white rounded-2xl h-full flex flex-col border;
}

.container--card-head {
    @apply flex items-center pt-2 h-20 w-full;
}

.container--card-head-title {
    @apply min-h-7 text-4xl no-underline ml-4 inline-block;
}

.container--card-head-label {
    @apply text-lg ml-4;
}

.container--card-content {
    @apply mx-4 mt-4 drop-shadow-xl rounded-xl flex-grow flex-shrink m-4 overflow-hidden box-border;
}

.container--card-head-icon {
    @apply text-6xl ml-6;
}
</style>
