<template>
  <div class="card-simple">
    <slot />
  </div>
</template>

<style scoped lang="postcss">
.card-simple {
  @apply bg-white p-2 shadow-lg;
}
</style>
