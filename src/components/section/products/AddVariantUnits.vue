<script setup lang="ts">
import Button from "@/components/shared/button/Button.vue";
import { onMounted, ref } from "vue";
import { GetProductByIdQuery, ProductUnitCreateOrUpdateDtoInput } from "@/api/gql/graphql";
import { Label } from "@/components/ui/label";
import { InputOption } from "@/types/types.ts";
import FormInput from "@/components/shared/form/FormInput.vue";
import FormInputOptions from "@/components/shared/form/FormInputOptions.vue";
import { TForm } from "@/components/section/new-recipe";

type TUnit = ProductUnitCreateOrUpdateDtoInput & { index: number; isDefault?: boolean };

type Units = TUnit[];

const props = defineProps<{
  unitOptions: InputOption[];
  productUnits: NonNullable<GetProductByIdQuery["product"]>["productUnits"];
  defaultUnit: string;
  form: TForm;
}>();

const productUnitsToRemove = defineModel<string[]>("productUnitsToRemove", { default: () => [] });

const variants = ref<Units>([]);

onMounted(() => {
  variants.value = props.productUnits.map((variant, index) => ({
    id: variant.id,
    unit: variant.unit,
    amount: variant.amount ?? 0,
    isDefault: variant.isDefault,
    index,
  }));
});

const addVariant = () => {
  variants.value.push({ unit: "", amount: 0, index: props.productUnits.length });
};

const deleteVariant = async ({ unitVariant, index }: { unitVariant: TUnit; index: number }) => {
  if (unitVariant?.id) {
    productUnitsToRemove.value.push(unitVariant.id);
  }

  props.form.setFieldValue(
    "productUnits",
    props.form.values.productUnits.filter((_: any, i: number) => i !== index),
  );
  variants.value.splice(index, 1);
};
</script>

<template>
  <div class="flex items-center space-x-2">
    <Button variant="outline" icon="add" size="icon" @click.prevent="addVariant" />
    <p>Eine Variante hinzufügen</p>
  </div>
  <div class="w-full items-center mt-2">
    <div v-for="(unitVariant, index) in variants" :key="index" class="flex gap-2 items-center">
      <template v-if="!unitVariant.isDefault">
        <Label class="flex flex-col gap-2">
          <span>
            Menge -
            <span class="pr-4 font-bold text-xs whitespace-nowrap">
              {{ defaultUnit }}
              <span class="text-xs font-normal">/ pro</span>
            </span>
          </span>
          <FormInput :name="`productUnits.${index}.amount`" type="number" :step="0.1" />
        </Label>

        <Label class="flex flex-col gap-2">
          <span>Einheit</span>
          <FormInputOptions :name="`productUnits.${index}.unit`" :options="unitOptions" options-id="units" always-return-name />
        </Label>

        <Button icon="remove" size="icon" variant="outline" class="mt-3 shrink-0" @click.prevent="deleteVariant({ unitVariant, index })" />
      </template>
    </div>
  </div>
</template>
