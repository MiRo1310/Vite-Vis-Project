<script setup lang="ts">
import { ref } from "vue";
import { Input } from "@/components/ui/input";
import ProductAddCategory from "@/components/section/products/ProductAddCategory.vue";
import ProductRenameCategory from "@/components/section/products/ProductRenameCategory.vue";
import ProductDeleteCategory from "@/components/section/products/ProductDeleteCategory.vue";

withDefaults(defineProps<{ id?: string }>(), { id: "" });
const emits = defineEmits(["update:removeCategory"]);

const newCategory = ref("");

const categoryExists = ref(false);
</script>

<template>
  <div class="category__action_wrapper">
    <div class="flex space-x-2">
      <div>
        <Input
          v-model:model-value="newCategory"
          :class="{ 'border-2  border-accent w-80 ': true, 'border-destructive': categoryExists }"
          placeholder="Kategorie hinzu oder ändern"
          @update:model-value="categoryExists = false"
        />
        <p v-if="categoryExists" class="text-[0.8rem] font-medium text-destructive mt-2">Die Kategorie existiert schon</p>
      </div>
      <ProductAddCategory v-model:category-exists="categoryExists" v-model:new-category="newCategory" />
      <ProductRenameCategory :id v-model:new-category="newCategory" />
    </div>
    <ProductDeleteCategory :id @update:remove-category="emits('update:removeCategory')" />
  </div>
</template>

<style scoped lang="postcss">
.category__action_wrapper {
  @apply flex-1 flex justify-between space-x-2 mt-8 mx-2;
}
</style>
