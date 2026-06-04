import { InfoTypes } from "@/components/shared/card/InfoCard.vue";
import { routes } from "@/router/routes.ts";
import { activeStatus } from "@/composables/status.ts";
import { getStoreValBoolean, getStoreValNumber } from "@/lib/object.ts";
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import { computed } from "vue";

const { iobroker } = useIobrokerStore();

const modus = computed(() => {
  const pool = iobroker.pool;
  switch (getStoreValNumber(pool?.mode)) {
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
  const pool = iobroker.pool;
  return {
    route: routes.heatPump.path,
    listing: [
      { title: "Wärmepumpe", ...activeStatus.value(getStoreValBoolean(pool?.heaterState)) },
      { title: "Wärmepumpe Silent", ...activeStatus.value(getStoreValBoolean(pool?.silent)) },
      { title: "Wärmepumpe Modus", value: modus.value },
      { title: "Wärmepumpe Bezug", value: getStoreValNumber(pool?.consumption).toFixed(2), unit: "W" },
      { title: "Wärmepumpe In", value: getStoreValNumber(pool?.tempIn), unit: "°C", valueClass: "text-blue-200" },
      { title: "Wärmepumpe Out", value: getStoreValNumber(pool?.tempOut), unit: "°C", valueClass: "text-orange-200" },
      { title: "Wärmepumpe Soll", value: getStoreValNumber(pool?.tempSet), unit: "°C" },
    ],
  };
});
