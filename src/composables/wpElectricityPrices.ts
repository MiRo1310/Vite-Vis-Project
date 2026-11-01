import { computed } from "vue";
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import Enbw from "@/data/enbw.ts";
import { calcGridCost, calcPricePer100Km, calcSurplusSavings } from "@/lib/wattPilot.ts";

const { iobroker } = useIobrokerStore();

export const priceKW = 0.32;

export const wpElectricityPrices = computed(() =>
  calcSurplusSavings(iobroker.wattPilot.totalCharging.value, iobroker.wattPilot.totalChargingFromGrid.value, priceKW),
);

export const wpElectricityGridPrice = computed(() => calcGridCost(iobroker.wattPilot.totalChargingFromGrid.value, priceKW));

export const wpPricePerHundredKm = computed(() =>
  calcPricePer100Km(Enbw.totalPrice.price, parseFloat(wpElectricityGridPrice.value), iobroker.car.odometer.value),
);
