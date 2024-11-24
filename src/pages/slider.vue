<script setup lang="ts">

import { Card, CardContent } from "@/components/shared/card";
import { onMounted, ref } from "vue";

const valueMax = ref(5000);
const valueMin = ref(0);

const useLogarithmicSlider = () => {
  let rangeSum = 0;
  let unitValue = 0;
  let minRange = 0;
  let maxRange = 0;
  let maxRangeSlider = 0;
  let logarithmic = false;
  let minValueToUseLogarithmic = 0;

  function init(el: HTMLInputElement | null, options?: {
    minRangeValue?: number,
    logarithmic?: boolean,
    minValueToUseLogarithmic?: number
  }) {
    const maxRangeValue = Number(el?.closest(".range-slider")?.attributes.getNamedItem("data-range-max")?.value);

    maxRangeSlider = Number(el?.attributes.getNamedItem("max")?.value);

    handleValueIsSmallerThanMaxRange(el, maxRangeValue);
    rangeSum = getSum(maxRangeSlider);
    unitValue = (maxRangeValue - (options?.minRangeValue || 0)) / getSum(maxRangeSlider);
    minRange = options?.minRangeValue || 0;
    maxRange = maxRangeValue - (options?.minRangeValue || 0);

    logarithmic = options?.logarithmic || false;
    minValueToUseLogarithmic = options?.minValueToUseLogarithmic || 2500;

    return {
      init, inputValue, sliderValue, rangeSum, unitValue
    };
  }

  function handleValueIsSmallerThanMaxRange(el: HTMLInputElement | null, maxRangeValue: number) {
    if (Number(maxRangeValue) < Number(maxRangeSlider)) {
      el?.setAttribute("max", (maxRangeValue.toString() || "100"));
      maxRangeSlider = maxRangeValue;
    }
  }

  const inputValue = (rangeValue: number) => useLogarithmic() ? getLogarithmicInputVal(rangeValue) : getLinearInputVal(rangeValue);
  const sliderValue = (inputValue: number) => useLogarithmic() ? getLogarithmicSliderVal(inputValue) : getLinearSliderVal(inputValue);

  const calcLastIndexFromSum = (S: number): number => Math.floor((-1 + Math.sqrt(1 + 8 * S)) / 2);
  const getSum = (n: number) => n * (n + 1) / 2;

  const getLogarithmicInputVal = (rangeValue: number) => Math.ceil((maxRange / rangeSum * getSum(rangeValue)) + minRange);
  const getLogarithmicSliderVal = (inputValue: number) => calcLastIndexFromSum((inputValue - minRange) / unitValue);
  const getLinearInputVal = (rangeValue: number) => Math.ceil((rangeValue * maxRange / maxRangeSlider) + minRange);
  const getLinearSliderVal = (inputValue: number) => (inputValue - minRange) * maxRangeSlider / maxRange;

  function useLogarithmic() {
    if (maxRange > minValueToUseLogarithmic) {
      return logarithmic;
    }
    return false;
  }

  return { init };
};

const inputValueMin = ref(0);
const inputValueMax = ref(0);
const sliderValueMin = ref(0);
const sliderValueMax = ref(0);
onMounted(() => {
  const inputMinEl = document.getElementById("min-slider") as HTMLInputElement;
  const inputMaxEl = document.getElementById("max-slider") as HTMLInputElement;

  const options = {
    minRangeValue: 0,
    logarithmic: false,
    minValueToUseLogarithmic: 2000
  };
  const logs1 = useLogarithmicSlider().init(inputMinEl, options);
  const logs2 = useLogarithmicSlider().init(inputMaxEl, options);

  inputMinEl?.addEventListener("input", () => {
    valueMin.value = Number(inputMinEl?.value);

    inputValueMin.value = logs1.inputValue(valueMin.value);
    sliderValueMin.value = logs1.sliderValue(inputValueMin.value);
  });

  inputMaxEl?.addEventListener("input", () => {
    valueMax.value = Number(inputMaxEl?.value);

    inputValueMax.value = logs2.inputValue(valueMax.value);
    sliderValueMax.value = logs2.sliderValue(inputValueMax.value);
  });


});
</script>

<template>
  <Card>
    <CardContent>
      <div
        class="range-slider" data-logarithmic data-range-min="0"
        data-range-max="5000"
      >
        <input
          id="min-slider" type="range" min="0" max="225"
          value="0"
        >
        <input
          id="max-slider" type="range" min="0" max="225"
          value="225"
        >
        <div class="slider-track" />
      </div>
      <div class="mt-10">
        <p>ValueMin: {{ inputValueMin }}</p>
        <p>ValueMax: {{ inputValueMax }}</p>

        <p>Value direkt Slider: {{ valueMin }}</p>
        <p>Value direkt Slider: {{ valueMax }}</p>

        <p>ValueSlider: {{ sliderValueMin }}</p>
        <p>ValueSlider: {{ sliderValueMax }}</p>
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

</style>