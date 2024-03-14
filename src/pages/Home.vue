<script setup lang="ts">
import Trash from '@/components/Trash.vue';
import ShoppingList from '@/components/ShoppingList.vue';

import ButtonListRight from '@/components/ButtonListRight.vue';

</script>

<template>
  <div class="h-full w-full flex  ">

    <div class="flex-1">

      <ShoppingList class="w-auto max-w-[25rem] card m-1 " />
      <Trash class="card m-1 mt-2" />
    </div>
    <div class="w-52 flex-wrap  h-full mr-auto flex justify-end ">
      <ButtonListRight></ButtonListRight>
    </div>
  </div>
</template>
<style lang="postcss" scoped>
.card {
  @apply bg-white bg-opacity-90;
}
</style>
```