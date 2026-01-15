import { adminConnection } from "@/lib/connecter-to-iobroker.ts";
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import { RoomItems } from "@/types/types.ts";

const { heatingControl } = useIobrokerStore();

export function updateRoomInHeatingControl(val: RoomItems | null) {
  const id = heatingControl.room?.id;
  if (!id || val === null) {
    return;
  }
  adminConnection?.setState(id, val);
}

export const roomNames: RoomItems[] = [
  "Bad",
  "Flur",
  "Gäste WC",
  "Kinderzimmer",
  "Küche",
  "Schlafzimmer",
  "Wohnzimmer",
  "Esszimmer",
  "Gästezimmer",
  "Keller Michael",
  "Keller Waschen",
];
