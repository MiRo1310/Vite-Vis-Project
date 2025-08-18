<template>
  <div class="card-simple">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.card-simple {
  @apply bg-white p-2 shadow-lg h-full;
}
</style>
