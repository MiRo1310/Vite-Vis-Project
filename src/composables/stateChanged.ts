import { computed, ref } from "vue";

type TComparisonValue = unknown;

/**
 * A composable to track if a form has changed from its initial state. It allows you to set a default value and then check if the current value has changed compared to that default value.
 * The comparison is done by converting the values to strings using JSON.stringify, which means it can handle complex objects as well.
 */
export const useStateChanged = () => {
  const comparisonString = ref("");

  const setInitialValue = (value: TComparisonValue) => {
    comparisonString.value = valueAsString(value);
  };
  const valueAsString = (value: TComparisonValue) => JSON.stringify(value);

  const stateChanged = computed(() => (value: TComparisonValue) => {
    return valueAsString(value) !== comparisonString.value;
  });

  return { stateChanged, setInitialValue };
};
