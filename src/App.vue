<script setup lang="ts">
import DataTable from '@/components/DataTable.vue';
import { columns } from '@/components/columns.ts';
import { onMounted, ref } from 'vue';
import { loadScript, init, IOBROKER_ADMIN_PORT, IOBROKER_HOST } from '@/lib/iobroker-connecter';



onMounted(async () => {
  loadScript(`http://${IOBROKER_HOST}:${IOBROKER_ADMIN_PORT}/lib/js/socket.io.js`, init);
});

const data = [{ amount: 1000, user: "" }, { amount: 1000, user: "" }, { amount: 1000, user: "" }, { amount: 1000, user: "Michael" }]

</script>


<template>
  <div class="w-full h-[100vh] flex flex-row">
    <div class="left">

    </div>
    <div class="  w-full h-full">
      <div class="p-4">
        <DataTable :data="data" :columns="columns"></DataTable>
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.app--container {
  @apply flex flex-row
}

.left {
  @apply w-[19rem] bg-violet-950
}
</style>