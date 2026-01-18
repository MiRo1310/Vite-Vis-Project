<script setup lang="ts">
import Sheet from "@/components/shared/Sheet.vue";
import NavActionsShoppingList from "@/components/section/home/NavActionsShoppingList.vue";
import { Pickaxe } from "lucide-vue-next";
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import Badge from "@/components/shared/badge/Badge.vue";
import { AlexaList } from "@/types/types.ts";
import { Button } from "@/components/shared/button";
import { toJSON } from "@michaelroling/ts-library";
import { getValString } from "@/lib/object.ts";

const { alexaLists } = storeToRefs(useIobrokerStore());

const totoList = computed(() => {
  return toJSON<AlexaList[]>(getValString(alexaLists.value.michaelsTodoList)).json ?? [];
});
</script>
<template>
  <Sheet :show-footer="false">
    <template #trigger>
      <Button>
        Michis Todos
        <Pickaxe class="ml-2" />

        <Badge class="ml-2" :value="totoList?.length" />
      </Button>
    </template>
    <template #title>
      <p>Michis Todos</p>
    </template>
    <template #content>
      <NavActionsShoppingList :list="totoList" />
    </template>
  </Sheet>
</template>
