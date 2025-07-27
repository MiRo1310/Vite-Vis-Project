<script setup lang="ts">
import Sheet from "@/components/shared/Sheet.vue";
import NavActionsShoppingList from "@/components/layout/NavActionsShoppingList.vue";
import ButtonCard from "@/components/shared/ButtonCard.vue";
import { Pickaxe } from "lucide-vue-next";
import { useIobrokerStore } from "@/store/iobrokerStore.ts";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import Badge from "@/components/shared/badge/Badge.vue";
import { stringToJSON } from "@/lib/string.ts";
import { AlexaList } from "@/types/types.ts";

const { alexaLists } = storeToRefs(useIobrokerStore());

const totoList = computed(() => {
  return stringToJSON<AlexaList[]>(alexaLists.value.michaelsTodoList?.val);
});
</script>
<template>
  <Sheet styling="light" :show-footer="false">
    <template #trigger>
      <ButtonCard :icon="Pickaxe" class="text-accent-foreground/70" class-card="mt-2 ml-1">
        <template #icon>
          <p class="absolute top-7">
            <Badge :value="totoList?.length" />
          </p>
        </template>
      </ButtonCard>
    </template>
    <template #title>
      <p>Michaels Todos</p>
    </template>
    <template #content>
      <NavActionsShoppingList :list="totoList" />
    </template>
  </Sheet>
</template>
