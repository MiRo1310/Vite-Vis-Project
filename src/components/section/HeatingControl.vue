<script lang="ts" setup>
import { useIobrokerStore } from "@/store/iobrokerStore";
const { heating } = useIobrokerStore();
</script>
<template>
    {{ heating.heatingControl.profile }}
    {{ heating.heatingControl.room }}
</template>
