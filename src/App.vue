<script setup lang="ts">
import DataTable from '@/components/DataTable.vue';
import { columns } from '@/components/columns.ts';
import { Connection } from '@iobroker/socket-client';




// Konfigurationswerte
const IOBROKER_HOST = '192.168.1.81';
const IOBROKER_ADMIN_PORT = '8081';
const IOBROKER_WS_PORT = '8084';

const addScript = () => {
  const scriptElement = document.createElement('script');
  scriptElement.src = `http://${IOBROKER_HOST}:${IOBROKER_ADMIN_PORT}/lib/js/socket.io.js`;
  document.head.appendChild(scriptElement);
};

const init = async () => {
  const adminConnection = new Connection({
    protocol: 'ws',
    host: IOBROKER_HOST,
    port: IOBROKER_WS_PORT,
    admin5only: false,
    autoSubscribes: [],
  });

  await adminConnection.startSocket();
  await adminConnection.waitForFirstConnection();
  console.log(await adminConnection.getEnums());
  console.log(await adminConnection.getStates());
  adminConnection.subscribeStateAsync('0_userdata.0.Testdatenpunkte.Test', (id: string, state: any) => {
    console.log('State changed', id, state);
  });
};


addScript(); // Fügen Sie das Skript hinzu, wenn die Komponente initialisiert wird
init(); // Initialisieren Sie den Dienst


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