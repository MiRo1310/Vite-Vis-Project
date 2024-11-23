<script setup lang="ts">

import { Card, CardContent } from "@/components/shared/card";
import { ref } from "vue";

const valueMax = ref(5000);
const valueMin = ref(0);

const useLogarithmicSlider = () => {
  let rangeSum = 0;
  let unitValue = 0;
  let maxRange = 0;

  function getSum(range: number) {
    // Gaußsche Summenformel
    return range * (range + 1) / 2;
  }

  // MaxRangeSlider: 100 so every step will be 1, MaxRangeValue: 5000 is the max price for example
  function init(maxRangeSlider: number, maxRangeValue: number, minRangeValue: number = 0) {
    rangeSum = getSum(maxRangeSlider);
    unitValue = maxRangeValue / getSum(maxRangeSlider);
    maxRange = maxRangeValue - minRangeValue;

    return {
      init, inputValue, sliderValue, rangeSum, unitValue
    };
  }

  const inputValue = (rangeValue: number) => Math.ceil(maxRange / rangeSum * getSum(rangeValue));
  const sliderValue = (inputValue: number) => calcLastIndexFromSum(inputValue / unitValue);
  const calcLastIndexFromSum = (S: number): number => Math.floor((-1 + Math.sqrt(1 + 8 * S)) / 2);

  return { init };
};


let logs1: null | any = null;
let logs2: null | any = null;

function updateInputMin($event: Event) {
  valueMin.value = Number(($event.target as HTMLInputElement).value);

  if (!logs1) {
    const maxvalue = ($event.target as HTMLInputElement).attributes.getNamedItem("data-range-max")?.value;
    const maxRangeSlider = ($event.target as HTMLInputElement).attributes.getNamedItem("max")?.value;
    logs1 = useLogarithmicSlider().init(Number(maxRangeSlider), Number(maxvalue));
  }
  inputValueMin.value = logs1.inputValue(valueMin.value);
}

function updateInputMax($event: Event) {
  valueMax.value = Number(($event.target as HTMLInputElement).value);

  if (!logs2) {
    const maxvalue = ($event.target as HTMLInputElement).attributes.getNamedItem("data-range-max")?.value;
    const maxRangeSlider = ($event.target as HTMLInputElement).attributes.getNamedItem("max")?.value;
    logs2 = useLogarithmicSlider().init(Number(maxRangeSlider), Number(maxvalue));
  }

  inputValueMax.value = logs2.inputValue(valueMax.value);
}

const inputValueMin = ref(0);
const inputValueMax = ref(5000);


</script>

<template>
  <Card>
    <CardContent>
      <div class="range-slider" data-logarithmic>
        <input
          id="min-slider" type="range" min="0" max="225"
          data-range-min="0"
          data-range-max="5000"
          value="0" @input="updateInputMin"
        >
        <input
          id="max-slider" type="range" min="0" max="225"
          data-range-min="0"
          data-range-max="5000"
          value="225" @input="updateInputMax"
        >
        <div class="slider-track" />
      </div>
      <div class="mt-10">
        <p>ValueMin: {{ inputValueMin }}</p>
        <p>ValueMax: {{ inputValueMax }}</p>
      </div>
    </CardContent>
  </Card>
</template>

<style scoped lang="postcss">
.range-slider {
  position: relative;
  width: 300px;
  margin: 50px auto;
}

.range-slider input[type="range"] {
  position: absolute;
  width: 100%;
  pointer-events: none;
  -webkit-appearance: none;
  appearance: none;
  background: none;
}

.range-slider input[type="range"]::-webkit-slider-thumb {
  pointer-events: auto;
  position: relative;
  z-index: 2;
  height: 15px;
  width: 15px;
  margin-top: -7px;
  border-radius: 50%;
  background: #007bff;
  cursor: pointer;
  -webkit-appearance: none;
}

.range-slider .slider-track {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  height: 5px;
  background: #ddd;
  width: 100%;
  z-index: 1;
}

.range-slider .slider-track:before {
  content: '';
  position: absolute;
  height: 100%;
  background: #007bff;
  z-index: 2;
}

.range-values {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
</style>