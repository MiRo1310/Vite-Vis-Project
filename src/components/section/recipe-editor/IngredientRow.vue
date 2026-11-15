<script setup lang="ts">
import { computed, ref } from "vue";
import { ArrowDown, ArrowUp, FolderInput, GripVertical, MoreVertical, StickyNote, Trash2, X } from "@lucide/vue";
import { Button } from "@/components/ui/button";
import { InputShadcn } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuIconItem,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import NumberField from "@/components/shared/recipe/NumberField.vue";
import ProductCombobox from "@/components/section/recipe-editor/ProductCombobox.vue";
import { type EditorProduct, useRecipeEditor } from "@/composables/recipeEditor.ts";
import { type DraftIngredient } from "@/lib/recipe-editor.ts";

const props = defineProps<{
  groupKey: string;
  ingredient: DraftIngredient;
  index: number;
  count: number;
  /** Andere Gruppen als Ziel für „Verschieben nach“ */
  otherGroups: Array<{ key: string; label: string }>;
  products: EditorProduct[];
  recentIds: string[];
}>();
const emits = defineEmits<{ createProduct: [name: string] }>();

const editor = useRecipeEditor();

const product = computed(() => props.products.find((p) => p.id === props.ingredient.productId));
const units = computed(() => product.value?.productUnits ?? []);
const noteOpen = ref(!!props.ingredient.description);

/** Notiz leeren und Feld ausblenden */
const removeNote = () => {
  update({ description: "" });
  noteOpen.value = false;
};

const errorOf = (field: keyof DraftIngredient) => editor.visibleErrors.value[`ingredient.${props.ingredient.key}.${field}`];
const productError = computed(() => errorOf("productId"));
const amountError = computed(() => errorOf("amount"));
const unitError = computed(() => errorOf("activeUnitId"));

const update = (patch: Partial<Omit<DraftIngredient, "key" | "id">>) => {
  editor.updateIngredient(props.groupKey, props.ingredient.key, patch);
};

const amount = computed({
  get: () => props.ingredient.amount,
  set: (value: number | null) => update({ amount: value }),
});
</script>

<template>
  <div class="rounded-xl border border-border/60 bg-card p-2 md:p-2.5 flex gap-1.5 md:gap-2 items-start" v-e2e="'recipe-ingredient-row'">
    <!-- Ziehen (Desktop) -->
    <button
      type="button"
      data-drag-handle
      class="hidden md:flex h-11 w-6 shrink-0 items-center justify-center text-muted-foreground/60 hover:text-foreground cursor-grab active:cursor-grabbing"
      aria-label="Zutat verschieben"
    >
      <GripVertical class="h-4 w-4" />
    </button>

    <div class="flex-1 min-w-0 grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:grid-cols-[minmax(0,1fr)_6.5rem_9rem] gap-2">
      <div class="col-span-2 md:col-span-1">
        <ProductCombobox
          :product-id="ingredient.productId"
          :products
          :recent-ids="recentIds"
          :invalid="!!productError"
          @select="editor.selectProduct(groupKey, ingredient.key, $event)"
          @create="emits('createProduct', $event)"
        />
        <p v-if="productError" class="text-xs text-destructive mt-1">{{ productError }}</p>
      </div>

      <div>
        <NumberField
          v-model="amount"
          :min="0"
          placeholder="Menge"
          aria-label="Menge"
          :invalid="!!amountError"
          class="h-11 rounded-xl text-base md:text-sm"
          e2e="recipe-ingredient-amount"
        />
        <p v-if="amountError" class="text-xs text-destructive mt-1">{{ amountError }}</p>
      </div>

      <div>
        <Select
          :model-value="ingredient.activeUnitId || undefined"
          :disabled="!units.length"
          @update:model-value="update({ activeUnitId: String($event ?? '') })"
        >
          <SelectTrigger
            class="w-full h-11! rounded-xl"
            :aria-invalid="!!unitError || undefined"
            aria-label="Einheit"
            v-e2e="'recipe-ingredient-unit'"
          >
            <SelectValue :placeholder="product ? 'Einheit' : '–'" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem v-for="unit in units" :key="unit.id" :value="unit.id">{{ unit.unit }}</SelectItem>
          </SelectContent>
        </Select>
        <p v-if="unitError" class="text-xs text-destructive mt-1">{{ unitError }}</p>
      </div>

      <div v-if="noteOpen" class="col-span-2 md:col-span-3 relative">
        <InputShadcn
          :model-value="ingredient.description"
          type="text"
          placeholder="Notiz, z. B. „fein gehackt“"
          aria-label="Notiz"
          class="h-10 rounded-xl pr-10"
          e2e="recipe-ingredient-note"
          @update:model-value="update({ description: String($event ?? '') })"
        />
        <button
          type="button"
          class="absolute right-1 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full flex items-center justify-center text-muted-foreground hover:bg-accent hover:text-foreground"
          aria-label="Notiz entfernen"
          title="Notiz entfernen"
          v-e2e="'recipe-ingredient-note-remove'"
          @click="removeNote"
        >
          <X class="h-4 w-4" />
        </button>
      </div>
    </div>

    <!-- Aktionen -->
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button variant="ghost" size="icon-lg" class="rounded-full shrink-0 -mr-1" aria-label="Aktionen für Zutat">
          <MoreVertical class="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" class="w-56">
        <DropdownMenuIconItem :icon="ArrowUp" :disabled="index === 0" @select="editor.moveIngredient(groupKey, index, index - 1)">Nach oben</DropdownMenuIconItem>
        <DropdownMenuIconItem :icon="ArrowDown" :disabled="index >= count - 1" @select="editor.moveIngredient(groupKey, index, index + 1)">
          Nach unten
        </DropdownMenuIconItem>
        <DropdownMenuIconItem v-if="!noteOpen" :icon="StickyNote" @select="noteOpen = true">Notiz hinzufügen</DropdownMenuIconItem>
        <DropdownMenuIconItem v-else :icon="StickyNote" @select="removeNote">Notiz entfernen</DropdownMenuIconItem>
        <DropdownMenuSub v-if="otherGroups.length">
          <DropdownMenuSubTrigger><FolderInput class="h-4 w-4 shrink-0" /> In Gruppe verschieben</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem
              v-for="group in otherGroups"
              :key="group.key"
              @select="editor.moveIngredientToGroup(groupKey, ingredient.key, group.key)"
            >
              {{ group.label }}
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuIconItem :icon="Trash2" variant="destructive" @select="editor.removeIngredient(groupKey, ingredient.key)">Entfernen</DropdownMenuIconItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</template>
