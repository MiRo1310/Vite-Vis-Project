<script setup lang="ts">
import { Button } from "@/components/shared/button";
import { Pencil } from "lucide-vue-next";
import { useMutation } from "@vue/apollo-composable";
import { renameCategory } from "@/api/mutation/renameCategory";
import { productCategories } from "@/api/query/products";
import { computed } from "vue";
import { useProductCategories } from "@/composables/querys/productCategories";

const props = defineProps<{ id?: string }>();
const { mutate } = useMutation(renameCategory, { refetchQueries: [productCategories] });
const newCategory = defineModel<string>("newCategory");
const { getCategoryIdByName } = useProductCategories();

const rename = async () => {
  if (disabled.value) return;

  await mutate({ id: props.id || "", name: newCategory.value || "" });
  newCategory.value = "";
};

const disabled = computed(() => {
  return !props.id || !newCategory.value || [getCategoryIdByName("Allgemein")].includes(props.id);
});
</script>
<template>
  <Button variant="outline" size="icon" :disabled="disabled" @click.prevent="rename">
    <Pencil />
  </Button>
</template>
