<script lang="ts" setup>
import { useIobrokerStore } from "@/store/iobrokerStore.ts";

const { heatingControl } = useIobrokerStore();
</script>
<template>
  <div class="w-full bg-color__default p-1 my-1 mr-1 container__table" v-html="heatingControl.visRoomStates?.val" />
</template>

<style lang="postcss">
.container__table table {
  @apply w-full text-sm;
}

.mdui-green-bg {
  @apply bg-green-600 text-white;
}

.mdui-red-bg {
  @apply bg-red-600 text-white;
}
</style>
