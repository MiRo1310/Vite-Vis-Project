<script setup lang="ts">
defineProps<{ isTimeToWarn: boolean, getOpenWindows: number, infos: any }>();
</script>
<template>
  <div class="card__shadow mt-2">
    <div
      v-for="(info, index) in infos" :key="index" :class="{
        'info__row': true,
        'animate-bounce': isTimeToWarn && getOpenWindows > 0 && info.bounce,

      }"
    >
      <p>{{ info.title }}</p>
      <p class="ml-3 mr-4">
        {{ info.value }} <span class="w-1 inline-block">{{ info.unit }} </span>
      </p>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.info__row {
  @apply flex justify-between items-center text-accent-foreground/50 font-bold space-y-1
}

.card__shadow {
  @apply bg-white p-2 shadow-lg
}

</style>