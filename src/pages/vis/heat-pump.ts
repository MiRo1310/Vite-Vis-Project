import { type InfoTypes } from "@/components/shared/card/InfoCard.vue";
import { routes } from "@/router/routes.ts";
import { activeStatus } from "@/composables/status.ts";
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import { computed } from "vue";

const { iobroker } = useIobrokerStore();

const modus = computed(() => {
  switch (iobroker.pool.mode.value) {
    case 0:
      return "Kühlen";
    case 1:
      return "Heizen";
    case 2:
      return "Auto";
    default:
      return "Inaktiv";
  }
});

export const heatPumpValues = computed((): InfoTypes => {
  return {
    route: routes.heatPump.path,
    listing: [
      { title: "Wärmepumpe", ...activeStatus.value(iobroker.pool.heaterState.value) },
      { title: "Wärmepumpe Silent", ...activeStatus.value(iobroker.pool.silent.value) },
      { title: "Wärmepumpe Modus", value: modus.value },
      { title: "Wärmepumpe Bezug", value: iobroker.pool.consumption.value.toFixed(2), unit: "W" },
      { title: "Wärmepumpe In", value: iobroker.pool.tempIn.value, unit: "°C", valueClass: "text-blue-200" },
      { title: "Wärmepumpe Out", value: iobroker.pool.tempOut.value, unit: "°C", valueClass: "text-orange-200" },
      { title: "Wärmepumpe Soll", value: iobroker.pool.tempSet.value, unit: "°C" },
    ],
  };
});
