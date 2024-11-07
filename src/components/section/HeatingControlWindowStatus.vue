<script lang="ts" setup>
import { useIobrokerStore } from "@/store/iobrokerStore";
import { window_open, window_close } from "@/assets";
import { onMounted } from "vue";

const { heating } = useIobrokerStore();

onMounted(() => {
    document
        .querySelectorAll("[src='/vis.0/HeatingControl/images/fts_window_1w_open.svg']")
        .forEach((img) => {
            img.setAttribute("src", window_open);
        });
    document
        .querySelectorAll("[src='/vis.0/HeatingControl/images/fts_window_1w.svg']")
        .forEach((img) => {
            img.setAttribute("src", window_close);
        });
});
</script>
<template>
    <div class="ml-4 border-2 h-48 overflow-auto flex-1 p-1">
        <p>Fensterstatus</p>
        <span v-if="heating.heatingControl.openWindowCount.val"
            :class="{ bg__animation: heating.heatingControl.openWindowCount.val }">
            {{ heating.heatingControl.openWindowCount.val }} Fenster offen
        </span>
        <div v-html="heating.heatingControl.windowOpenHtmlTable.val" />
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
    @apply w-4 h-4;
}

:deep(.mdui-listitem) {
    @apply flex items-center text-xs space-x-2;
}

:deep(.mdui-red-bg) {
    @apply bg-red-600 text-white;
}

:deep(img) {
    @apply ml-2;
}
</style>
