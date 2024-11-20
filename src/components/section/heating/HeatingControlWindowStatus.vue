<script lang="ts" setup>
import { useIobrokerStore } from "@/store/iobrokerStore.ts";
import { window_close, window_open } from "@/assets";
import { onMounted } from "vue";

const { heating } = useIobrokerStore();

onMounted(() => {
  document
    .querySelectorAll("img[src='/vis.0/HeatingControl/images/fts_window_1w_open.svg']")
    .forEach((img) => {
      img.setAttribute("src", window_open);
    });
  document
    .querySelectorAll("img[src='/vis.0/HeatingControl/images/fts_window_1w.svg']")
    .forEach((img) => {
      img.setAttribute("src", window_close);
    });
});
</script>
<template>
  <div class="mx-1 p-1 bg-backgroundCards flex-1">
    <p>Fensterstatus</p>
    <div class="h-[14rem] overflow-auto">
      <span
        v-if="heating.heatingControl.openWindowCount?.val"
        :class="{ bg__animation: heating.heatingControl.openWindowCount?.val }"
      >
        {{ heating.heatingControl.openWindowCount?.val }} Fenster offen
      </span>
      <div v-html="heating.heatingControl.windowOpenHtmlTable?.val" />
    </div>
  </div>
</template>

<style scoped lang="postcss">
@keyframes backgroundAnimation {
  0% {
    background-color: white;
  }

  50% {
    background-color: red;
  }

  100% {
    background-color: white;
  }
}

.bg__animation {
  animation: backgroundAnimation 2s infinite;
}

:deep(img) {
  @apply w-12 h-8 p-1 px-3 bg-white;
}

:deep(.mdui-listitem) {
  @apply flex items-center text-xs space-x-2;
}

:deep(.mdui-red-bg) {
  @apply bg-red-600 text-white;
}
</style>
