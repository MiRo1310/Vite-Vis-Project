import { computed } from "vue";
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import Enbw from "@/data/enbw.ts";

const { iobroker } = useIobrokerStore();

export const priceKW = 0.32;

export const wpElectricityPrices = computed(() => {
  return ((iobroker.wattPilot.totalCharging.value / 1000 - iobroker.wattPilot.totalChargingFromGrid.value) * priceKW).toFixed(2);
});

export const wpElectricityGridPrice = computed(() => (iobroker.wattPilot.totalChargingFromGrid.value * priceKW).toFixed(2));

export const wpPricePerHundredKm = computed((): string => {
  const totalChargingEnergyStation = Enbw.totalPrice.price;
  const priceGrid = parseFloat(wpElectricityGridPrice.value);
  const km = iobroker.car.odometer.value;
  if (km === 0) {
    return "0";
  }

  return ((totalChargingEnergyStation + priceGrid) / (km / 100)).toFixed(2);
});
