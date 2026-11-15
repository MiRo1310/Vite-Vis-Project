<script setup lang="ts">
import { computed, ref, useTemplateRef } from "vue";
import { ArrowDown, ArrowUp, MoreVertical, Plus, Trash2 } from "@lucide/vue";
import { Button } from "@/components/ui/button";
import { InputShadcn } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import DialogConfirm from "@/components/shared/dialog/DialogConfirm.vue";
import IngredientRow from "@/components/section/recipe-editor/IngredientRow.vue";
import { type EditorProduct, useRecipeEditor } from "@/composables/recipeEditor.ts";
import { useSortableList } from "@/composables/sortableList.ts";
import { type DraftGroup, isEmptyIngredient } from "@/lib/recipe-editor.ts";

const props = defineProps<{
  group: DraftGroup;
  index: number;
  groupCount: number;
  allGroups: Array<{ key: string; label: string }>;
  products: EditorProduct[];
  recentIds: string[];
}>();
const emits = defineEmits<{ createProduct: [ingredientKey: string, name: string] }>();

const editor = useRecipeEditor();

const list = useTemplateRef<HTMLElement>("list");
useSortableList(list, (from, to) => editor.moveIngredient(props.group.key, from, to));

const otherGroups = computed(() => props.allGroups.filter((g) => g.key !== props.group.key));
const filledCount = computed(() => props.group.ingredients.filter((i) => !isEmptyIngredient(i)).length);

const confirmRemove = ref(false);
const requestRemove = () => {
  if (filledCount.value === 0 && !props.group.title.trim()) {
    editor.removeGroup(props.group.key);
    return;
  }
  confirmRemove.value = true;
};

const setTitle = (value: string | number | undefined) => {
  const group = editor.draft.value.groups.find((g) => g.key === props.group.key);
  if (group) {
    group.title = String(value ?? "");
  }
};
</script>

<template>
  <div class="flex flex-col gap-2" v-e2e="'recipe-ingredient-group'">
    <div class="flex items-center gap-2">
      <InputShadcn
        :model-value="group.title"
        type="text"
        :placeholder="groupCount > 1 ? `Gruppe ${index + 1}, z. B. Teig` : 'Gruppenname (optional), z. B. Teig'"
        aria-label="Gruppenname"
        class="h-10 rounded-xl font-semibold border-dashed bg-transparent"
        @update:model-value="setTitle"
      />
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button variant="ghost" size="icon-lg" class="rounded-full shrink-0" aria-label="Aktionen für Gruppe">
            <MoreVertical class="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" class="w-52">
          <DropdownMenuItem :disabled="index === 0" @select="editor.moveGroup(index, index - 1)"><ArrowUp class="h-4 w-4" /> Gruppe nach oben</DropdownMenuItem>
          <DropdownMenuItem :disabled="index >= groupCount - 1" @select="editor.moveGroup(index, index + 1)">
            <ArrowDown class="h-4 w-4" /> Gruppe nach unten
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem class="text-destructive focus:text-destructive" @select="requestRemove"><Trash2 class="h-4 w-4" /> Gruppe löschen</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>

    <div ref="list" class="flex flex-col gap-2">
      <IngredientRow
        v-for="(ingredient, i) in group.ingredients"
        :key="ingredient.key"
        :group-key="group.key"
        :ingredient
        :index="i"
        :count="group.ingredients.length"
        :other-groups
        :products
        :recent-ids="recentIds"
        @create-product="emits('createProduct', ingredient.key, $event)"
      />
    </div>

    <Button variant="outline" class="h-11 rounded-xl border-dashed self-start" v-e2e="'recipe-add-ingredient'" @click="editor.addIngredient(group.key)">
      <Plus class="h-4 w-4" /> Zutat
    </Button>

    <DialogConfirm
      v-model:dialog-open="confirmRemove"
      title="Gruppe löschen"
      :description="`Die Gruppe und ihre ${filledCount} Zutat(en) werden beim Speichern entfernt.`"
      variant="destructive"
      @update:confirm="editor.removeGroup(group.key)"
    />
  </div>
</template>
