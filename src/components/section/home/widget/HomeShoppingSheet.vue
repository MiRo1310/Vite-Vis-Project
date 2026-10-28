<script setup lang="ts">
import { ShoppingBag } from "lucide-vue-next";
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import { computed } from "vue";
import AlexaListTableSheet from "@/components/shared/alexa-list/AlexaListTableSheet.vue";

const { iobroker } = useIobrokerStore();

const shoppinglist = computed(() => iobroker.alexaLists.shoppingListActive.parsed([]));
</script>

<template>
  <AlexaListTableSheet title="Einkaufsliste" :list="shoppinglist" :icon="ShoppingBag" />
</template>
