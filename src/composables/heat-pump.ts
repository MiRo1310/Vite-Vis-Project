import { type InfoTypes } from "@/components/shared/card/InfoCard.vue";
import { routes } from "@/router/routes.ts";
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import { computed } from "vue";

const { iobroker } = useIobrokerStore();

export const wpModus = computed(() => {
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

export const status = (val: boolean) => {
  return { value: val ? "An" : "Aus", valueClass: val ? "text-green-200" : "text-red-200" };
};

export const heatPumpValues = computed((): InfoTypes => {
  return {
    route: routes.heatPump.path,
    listing: [
      { title: "Wärmepumpe", ...status(iobroker.pool.heaterState.value) },
      { title: "Wärmepumpe Silent", ...status(iobroker.pool.silent.value) },
      { title: "Wärmepumpe Modus", value: wpModus.value },
      { title: "Wärmepumpe Bezug", value: iobroker.pool.consumption.value.toFixed(2), unit: "W" },
      { title: "Wärmepumpe In", value: iobroker.pool.tempIn.value, unit: "°C", valueClass: "text-blue-200" },
      { title: "Wärmepumpe Out", value: iobroker.pool.tempOut.value, unit: "°C", valueClass: "text-orange-200" },
      { title: "Wärmepumpe Soll", value: iobroker.pool.tempSet.value, unit: "°C" },
    ],
  };
});
