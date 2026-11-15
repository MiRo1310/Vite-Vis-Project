<script setup lang="ts">
import { computed, type FunctionalComponent, nextTick, ref } from "vue";
import { Check, Pencil, Plus, X } from "@lucide/vue";
import { Button } from "@/components/ui/button";
import { InputShadcn } from "@/components/ui/input";
import DialogConfirm from "@/components/shared/dialog/DialogConfirm.vue";
import EmptyState from "@/components/shared/recipe/EmptyState.vue";
import { type MasterDataCrud, type MasterDataItem } from "@/composables/recipeMasterData.ts";
import { filterNewNames, getCategoryColor, parseNameList } from "@/lib/recipe.ts";
import { removeMultipleSpaces } from "@/lib/string.ts";
import { recipeAccentClasses, type RecipeAccentKey } from "@/constants/recipe.ts";

const props = withDefaults(
  defineProps<{
    crud: MasterDataCrud;
    /** Einzahl, z. B. „Einheit“ */
    itemLabel: string;
    /** Mehrzahl, z. B. „Einheiten“ */
    itemsLabel: string;
    placeholder: string;
    icon: FunctionalComponent;
    accent?: RecipeAccentKey;
    /** Jede Zeile bekommt ihre Kategorie-Farbe statt der festen Akzentfarbe */
    colorByName?: boolean;
    e2e: string;
  }>(),
  { accent: "primary", colorByName: false },
);

const items = computed(() => props.crud.items.value);

// --- Anlegen ---
const newInput = ref("");
const saving = ref(false);
const recentlyAdded = ref<Set<string>>(new Set());

const parsedNames = computed(() => parseNameList(newInput.value));
const newNames = computed(() =>
  filterNewNames(
    parsedNames.value,
    items.value.map((item) => item.name),
  ),
);
const existingNames = computed(() => parsedNames.value.filter((name) => !newNames.value.includes(name)));

const add = async () => {
  if (!newNames.value.length || saving.value) {
    return;
  }
  saving.value = true;
  const added = [...newNames.value];
  try {
    await props.crud.add(added);
    newInput.value = "";
    recentlyAdded.value = new Set(added.map((name) => name.toLowerCase()));
    setTimeout(() => {
      recentlyAdded.value = new Set();
    }, 1800);
  } finally {
    saving.value = false;
  }
};

const isRecentlyAdded = (item: MasterDataItem): boolean => recentlyAdded.value.has(item.name.toLowerCase());

// --- Umbenennen ---
const editingId = ref<string | null>(null);
const editName = ref("");
const editWrapper = ref<HTMLElement[] | null>(null);

const editNameTaken = computed(() => {
  const name = removeMultipleSpaces(editName.value).toLowerCase();
  return items.value.some((item) => item.id !== editingId.value && item.name.toLowerCase() === name);
});

const startEdit = async (item: MasterDataItem) => {
  editingId.value = item.id;
  editName.value = item.name;
  await nextTick();
  editWrapper.value?.[0]?.querySelector("input")?.focus();
};

const cancelEdit = () => {
  editingId.value = null;
  editName.value = "";
};

const saveEdit = async (item: MasterDataItem) => {
  const name = removeMultipleSpaces(editName.value);
  if (!name || name === item.name || editNameTaken.value) {
    cancelEdit();
    return;
  }
  await props.crud.rename(item.id, name);
  cancelEdit();
};

// --- Löschen ---
const deleteTarget = ref<MasterDataItem | null>(null);
const deleteDialogOpen = computed({
  get: () => deleteTarget.value !== null,
  set: (open: boolean) => {
    if (!open) {
      deleteTarget.value = null;
    }
  },
});

const confirmDelete = async () => {
  const target = deleteTarget.value;
  if (!target) {
    return;
  }
  await props.crud.remove(target.id);
};

const colorOf = (item: MasterDataItem): RecipeAccentKey => (props.colorByName ? getCategoryColor(item.name) : props.accent);
</script>

<template>
  <div class="flex flex-col gap-4 h-full min-h-0">
    <!-- Anlegen -->
    <div class="rounded-2xl border border-border/60 bg-card p-3 md:p-4 shrink-0">
      <form class="flex gap-2" @submit.prevent="add">
        <div class="flex-1 min-w-0">
          <InputShadcn v-model="newInput" type="text" :placeholder class="h-11 rounded-xl text-base md:text-sm" :e2e="`${e2e}-input`" />
        </div>
        <Button
          type="submit"
          class="h-11 rounded-xl px-4 shrink-0"
          :class="recipeAccentClasses[accent].solid"
          :disabled="!newNames.length || saving"
          v-e2e="`${e2e}-add`"
        >
          <Plus class="h-4 w-4" />
          <span class="hidden sm:inline">Hinzufügen</span>
        </Button>
      </form>
      <p class="text-xs text-muted-foreground mt-2">Tipp: Mehrere auf einmal mit Komma trennen.</p>

      <!-- Vorschau der Eingabe -->
      <div v-if="parsedNames.length" class="flex flex-wrap gap-1.5 mt-3">
        <span
          v-for="name in newNames"
          :key="`new-${name}`"
          :class="['inline-flex items-center gap-1 rounded-full px-2.5 h-7 text-xs font-medium', recipeAccentClasses[colorByName ? getCategoryColor(name) : accent].soft]"
        >
          <Plus class="h-3 w-3" />{{ name }}
        </span>
        <span
          v-for="name in existingNames"
          :key="`old-${name}`"
          class="inline-flex items-center rounded-full px-2.5 h-7 text-xs text-muted-foreground bg-muted line-through"
          :title="`${itemLabel} gibt es schon`"
        >
          {{ name }}
        </span>
      </div>
    </div>

    <!-- Liste -->
    <div class="flex-1 min-h-0 overflow-y-auto pb-2">
      <p v-if="items.length" class="text-xs text-muted-foreground uppercase tracking-wide mb-2">{{ items.length }} {{ itemsLabel }}</p>

      <div v-if="items.length" class="flex flex-wrap gap-2">
        <template v-for="item in items" :key="item.id">
          <!-- Bearbeiten -->
          <form
            v-if="editingId === item.id"
            class="inline-flex items-center gap-1 rounded-full border-2 pl-1 pr-1 h-11 bg-background"
            :class="recipeAccentClasses[colorOf(item)].border"
            @submit.prevent="saveEdit(item)"
            @keydown.esc.prevent="cancelEdit"
          >
            <div ref="editWrapper" class="w-40">
              <InputShadcn v-model="editName" type="text" class="h-8 border-0 shadow-none focus-visible:ring-0" :e2e="`${e2e}-edit-input`" />
            </div>
            <Button type="submit" size="icon-sm" variant="ghost" class="rounded-full" :disabled="editNameTaken" aria-label="Speichern">
              <Check class="h-4 w-4" />
            </Button>
            <Button type="button" size="icon-sm" variant="ghost" class="rounded-full" aria-label="Abbrechen" @click="cancelEdit">
              <X class="h-4 w-4" />
            </Button>
          </form>

          <!-- Anzeige -->
          <div
            v-else
            class="group inline-flex items-center gap-1 rounded-full h-11 pl-1.5 pr-1 transition-all duration-300"
            :class="[recipeAccentClasses[colorOf(item)].soft, isRecentlyAdded(item) ? 'ring-2 ring-offset-2 ring-offset-background ring-current scale-105' : '']"
            v-e2e="`${e2e}-item`"
          >
            <button
              type="button"
              class="inline-flex items-center gap-2 h-full pl-1.5 pr-1 rounded-full font-medium text-sm"
              :title="`${itemLabel} umbenennen`"
              @click="startEdit(item)"
            >
              <span :class="['h-2.5 w-2.5 rounded-full', recipeAccentClasses[colorOf(item)].solid]" />
              {{ item.name }}
              <Pencil class="h-3 w-3 opacity-0 group-hover:opacity-60 transition-opacity" />
            </button>
            <Button
              type="button"
              size="icon-sm"
              variant="ghost"
              class="rounded-full hover:bg-background/60"
              :aria-label="`${item.name} löschen`"
              v-e2e="`${e2e}-remove`"
              @click="deleteTarget = item"
            >
              <X class="h-4 w-4" />
            </Button>
          </div>
        </template>
      </div>

      <EmptyState v-else-if="!crud.loading.value" :icon :accent :title="`Noch keine ${itemsLabel}`" :description="`Leg oben deine erste ${itemLabel} an.`" />
    </div>

    <DialogConfirm
      v-model:dialog-open="deleteDialogOpen"
      title="Löschen"
      :description="`„${deleteTarget?.name}“ wirklich löschen?`"
      variant="destructive"
      @update:confirm="confirmDelete"
    />
  </div>
</template>
