import { useLazyQuery } from "@vue/apollo-composable";
import { computed, onMounted } from "vue";
import { getSelectableOptions } from "@/composables/querys/options";
import { getIdByName, getNameById } from "@/components/section/new-recipe/utils";
import { SelectOption } from "@/types/types";
import { graphql } from "@/api/gql";
import { InputOptions } from "@/components/shared/input/Input.vue";

let unitsFunction: null | ReturnType<typeof unitsComposable> = null;

export const useUnits = () => {
  if (!unitsFunction) {
    unitsFunction = unitsComposable();
  }
  return unitsFunction;
};

const unitsComposable = () => {
  const { load, result, refetch } = useLazyQuery(
    graphql(`
      query Units {
        units {
          id
          name
        }
      }
    `),
  );

  onMounted(async () => {
    await load();
  });

  const selectableOptions = computed((): SelectOption[] => getSelectableOptions(result.value?.units));

  const isResult = computed(() => result.value?.units?.length && result.value.units.length > 0);
  const length = computed(() => result.value?.units?.length);

  const getUnitNameById = (id: string): string => computed(() => getNameById(id, result.value?.units)).value;
  const getUnitIdByName = (name: string): string => computed(() => getIdByName(name, result.value?.units)).value;
  const getOptions = computed(
    (): InputOptions[] => result.value?.units.filter((unit) => unit.id && unit.name).map((unit) => ({ id: unit.id, name: unit.name })) ?? [],
  );

  return { selectableOptions, getUnitNameById, getUnitIdByName, getOptions, isResult, length, refetch };
};
