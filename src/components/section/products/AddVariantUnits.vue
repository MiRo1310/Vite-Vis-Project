<script setup lang="ts">
import Button from "@/components/shared/button/Button.vue";
import { onMounted, ref } from "vue";
import FormInput from "@/components/shared/form/FormInput.vue";
import { InputOptions } from "@/components/shared/input/Input.vue";
import { removeProductUnit } from "@/api/mutation/removeProductUnit";
import { useMutation } from "@vue/apollo-composable";
import { ProductsQuery, ProductUnitCreateOrUpdateDtoInput } from "@/api/gql/graphql";

type Units = ProductUnitCreateOrUpdateDtoInput[];

const props = defineProps<{ options: InputOptions[]; data: NonNullable<ProductsQuery["products"][number]>["productUnits"]; defaultUnit: string }>();

const { mutate } = useMutation(removeProductUnit);

const unitVariants = defineModel<Units>("unitVariants", { default: [] });

const variants = ref<Units>([]);

onMounted(() => {
  if (props.data.length > 0) {
    variants.value = props.data
      .filter((variant) => !variant.defaultUnit)
      .map((variant) => ({ id: variant.id, unit: variant.unit, amount: variant.amount, defaultUnit: 0 })) as ProductUnitCreateOrUpdateDtoInput[];
  }
});

const addVariant = () => {
  variants.value.push({ unit: "", amount: 0, defaultUnit: 0 });
};

const updateValue = (index: number, param: "amount" | "unit", val?: string | number) => {
  const obj = variants.value[index];
  if (!val) {
    return;
  }
  if (param === "amount") {
    obj.amount = parseFloat(val.toString());
  } else {
    obj.unit = val.toString();
  }
  unitVariants.value = variants.value;
};

const deleteVariant = async ({ id, index }: { id?: string | null; index: number }) => {
  if (id) {
    await mutate({ id });
  }
  variants.value.splice(index, 1);
  unitVariants.value = variants.value;
};
</script>

<template>
  <div class="flex items-center space-x-2">
    <Button variant="outline" icon="add" size="icon" @click.prevent="addVariant" />
    <p>Eine Variante hinzufügen</p>
  </div>
  <div class="w-full items-center mt-2">
    <div v-for="(unitVariant, index) in variants" :key="index" class="flex space-x-2 items-center">
      <FormInput
        :label="`${index === 0 ? 'Menge' : ''}`"
        name="amountVariant"
        type="number"
        :step="0.1"
        :model-value="unitVariant?.amount?.toString()"
        @update:model-value="updateValue(index, 'amount', $event)"
      />
      <span class="pr-4 font-bold">
        {{ defaultUnit }}
        <span class="text-xs font-normal">/ pro</span>
      </span>
      <FormInput
        :label="`${index === 0 ? 'Einheit' : ''}`"
        name="unitVariant"
        type="text"
        :model-value="unitVariant?.unit?.toString()"
        :options
        options-id="units"
        @update:model-value="updateValue(index, 'unit', $event)"
      />
      <Button icon="remove" size="icon" variant="outline" class="mt-4" @click.prevent="deleteVariant({ id: unitVariant?.id, index: index })" />
    </div>
  </div>
</template>
