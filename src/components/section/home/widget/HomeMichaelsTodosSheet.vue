<script setup lang="ts">
import { Pickaxe } from "lucide-vue-next";
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import { computed } from "vue";
import AlexaListTableSheet from "@/components/shared/alexa-list/AlexaListTableSheet.vue";

const { iobroker } = useIobrokerStore();

const totoList = computed(() => iobroker.alexaLists.michaelsTodoList.parsed([]));
</script>
<template>
  <AlexaListTableSheet title="Michis Todo" :list="totoList" :icon="Pickaxe" />
</template>
