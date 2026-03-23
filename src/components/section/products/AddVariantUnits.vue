<script setup lang="ts">
import Button from "@/components/shared/button/Button.vue";
import { onMounted, ref } from "vue";
import { InputOption } from "@/components/shared/input/Input.vue";
import { useMutation } from "@vue/apollo-composable";
import { GetProductByIdQuery, ProductUnitCreateOrUpdateDtoInput } from "@/api/gql/graphql";
import { graphql } from "@/api/gql";
import { Input } from "@/components/shared/input";
import { Label } from "@/components/ui/label";

type Units = ProductUnitCreateOrUpdateDtoInput[];

const props = defineProps<{ options: InputOption[]; data: NonNullable<GetProductByIdQuery["product"]>["productUnits"]; defaultUnit: string }>();

const { mutate } = useMutation(
  graphql(`
    mutation removeProductUnit($id: UUID!) {
      removeProductUnit(id: $id)
    }
  `),
);

const unitVariants = defineModel<ProductUnitCreateOrUpdateDtoInput[]>("unitVariants", { default: [] });

const variants = ref<Units>([]);

onMounted(() => {
  if (props.data.length > 0) {
    variants.value = props.data
      .filter((variant) => !variant.isDefault)
      .map((variant) => ({ id: variant.id, unit: variant.unit, amount: variant.amount })) as ProductUnitCreateOrUpdateDtoInput[];
  }
});

const addVariant = () => {
  variants.value.push({ unit: "", amount: 0 });
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
    <div v-for="(unitVariant, index) in variants" :key="index" class="flex gap-2 items-center">
      <Label class="flex flex-col gap-2">
        <span>{{ index === 0 ? "Menge" : "" }}</span>
        <Input type="number" :step="0.1" :model-value="unitVariant?.amount?.toString()" @update:model-value="updateValue(index, 'amount', $event)" />
      </Label>
      <span class="pr-4 font-bold">
        {{ defaultUnit }}
        <span class="text-xs font-normal">/ pro</span>
      </span>
      <Label class="flex flex-col gap-2">
        <span class="mb-1">{{ index === 0 ? "Einheit" : "" }}</span>
        <Input :model-value="unitVariant?.unit?.toString()" :options options-id="units" @update:model-value="updateValue(index, 'unit', $event)" />
      </Label>
      <Button
        icon="remove"
        size="icon"
        variant="outline"
        :class="index === 0 ? 'mt-6' : 'mt-3'"
        @click.prevent="deleteVariant({ id: unitVariant?.id, index: index })"
      />
    </div>
  </div>
</template>
