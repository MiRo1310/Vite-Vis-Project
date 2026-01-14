<script setup lang="ts">
import { Blinds } from "lucide-vue-next";
import { computed } from "vue";
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import { useRouter } from "vue-router";
import { Button } from "@/components/shared/button";

const iobrokerStore = useIobrokerStore();
const router = useRouter();

const handleWindowClick = () => {
  router.push({ path: "/fenster" });
};

const getWindowStyle = computed(() => {
  if (iobrokerStore.windowGlobal.fensterOffen?.val) {
    return "text-yellow-500";
  }
  return "text-green-500";
});
</script>
<template>
  <Button size="icon" @click="handleWindowClick">
    <Blinds :class="getWindowStyle" />
  </Button>
</template>
