<script setup lang="ts">
import { Blinds } from "lucide-vue-next";
import { computed } from "vue";
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import { useRouter } from "vue-router";
import { Button } from "@/components/shared/button/button.variants";
import { routes } from "@/router/routes.ts";
import { getStoreValBoolean } from "@/lib/object.ts";

const { iobroker } = useIobrokerStore();
const router = useRouter();

const handleWindowClick = () => {
  router.push({ path: routes.window.path });
};

const getWindowStyle = computed(() => {
  if (getStoreValBoolean(iobroker.windowGlobal?.fensterOffen)) {
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
