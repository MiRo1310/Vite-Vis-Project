import { AdminConnection } from "@iobroker/socket-client";
import { ref } from "vue";
import { useIobrokerStore } from "@/store/iobrokerStore";
import { idToSubscribe } from "./idsToSubscribe";

// Konfigurationswerte
export const IOBROKER_HOST = "192.168.1.81";
export const IOBROKER_ADMIN_PORT = "8081";
const IOBROKER_WS_PORT = "8084";

let iobrokerStore: any;
document.addEventListener("DOMContentLoaded", () => {
  iobrokerStore = useIobrokerStore();
});

export const adminConnection = ref<AdminConnection>();

export function loadScript(src: string, callback: any) {
  const script = document.createElement("script");
  script.src = src;
  script.onload = () => callback();
  document.body.appendChild(script);
}

export async function init() {
  //
  adminConnection.value = new AdminConnection({
    protocol: "ws",
    host: IOBROKER_HOST,
    port: IOBROKER_WS_PORT,
    admin5only: false,
    autoSubscribes: [],
  });

  if (adminConnection.value) {
    await adminConnection.value.startSocket();
    await adminConnection.value.waitForFirstConnection();
    // console.log(await adminConnection.value.getEnums());
    // console.log(await adminConnection.value.getStates());
    idToSubscribe.forEach((entry) => {
      if (adminConnection.value) {
        adminConnection.value.subscribeStateAsync(entry.id, (id: string, state: any) => {
          console.log(id);
          let value = state.val;
          if (!value && !value === false) {
            value = null;
          }

          iobrokerStore.setValues(entry.name, entry.key || null, value, entry.subKey || null, entry.saveId || false, id);
        });
      }
    });
  }
}
