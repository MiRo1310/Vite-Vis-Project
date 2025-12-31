<script lang="ts" setup>
import { useIobrokerStore } from "@/store/iobrokerStore.ts";

const { heatingControl } = useIobrokerStore();
</script>
<template>
  <div class="w-full bg-color__default p-1 my-1 mr-1 container__table" v-html="heatingControl.visRoomStates?.val" />
</template>

<style lang="scss">
.container__table table {
  width: 100%;
  font-size: 0.8rem;
}

.mdui-green-bg {
  color: white;
  background-color: #16a34a;
}

.mdui-red-bg {
  color: white;
  background-color: #dc2626;
}
</style>
