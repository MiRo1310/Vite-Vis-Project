<script setup lang="ts">
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import Button from "@/components/shared/button/Button.vue";
import { UserRoundSearch } from "lucide-vue-next";

const { iobroker } = useIobrokerStore();
</script>

<template>
  <Button class="text-accent-foreground/70 h-full max-h-20 flex-1" @click="iobroker.holiday.urlaubAktiv.toggle()">
    <div class="flex gap-2">
      <UserRoundSearch class="size-4" />
      <span> {{ iobroker.holiday.urlaubAktiv.mapped }}</span>
    </div>
  </Button>
</template>
