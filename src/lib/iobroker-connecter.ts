import { Connection } from "@iobroker/socket-client";
import { ref } from "vue";

// import { useIobrokerStore } from "@/store/iobrokerStore";

// Konfigurationswerte
export const IOBROKER_HOST = "192.168.1.81";
export const IOBROKER_ADMIN_PORT = "8081";
const IOBROKER_WS_PORT = "8084";


interface SocketObject {
  [key: string]: any;
}

export let adminConnection = ref<null | SocketObject>(null);
export function loadScript(src: string, callback: any) {
  let script = document.createElement("script");
  script.src = src;
  script.onload = () => callback();
  document.body.appendChild(script);
}

export async function init() {
  adminConnection.value = new Connection({
    protocol: "ws",
    host: IOBROKER_HOST,
    port: IOBROKER_WS_PORT,
    admin5only: false,
    autoSubscribes: [],
  });
  if (adminConnection.value) {
    await adminConnection.value.startSocket();
    await adminConnection.value.waitForFirstConnection();
    console.log(await adminConnection.value.getEnums());
    console.log(await adminConnection.value.getStates());
    // adminConnection.value.subscribeStateAsync("0_userdata.0.Testdatenpunkte.Test", (id: string, state: any) => {
    //   console.log("State changed", id, state);

    //   iobrokerStore.setTest(state.val);
    //   console.log(iobrokerStore.getTest);
    //   console.log(state.val);
    // });
  }
}
