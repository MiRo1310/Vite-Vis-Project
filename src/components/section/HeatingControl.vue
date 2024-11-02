<script lang="ts" setup>
import HeatingControlHeader from "./HeatingControlHeader.vue";
import HeatingControlConfig from "./HeatingControlConfig.vue";
import HeatingControlWindowStatus from "./HeatingControlWindowStatus.vue";
import HeatingControlRoomStatus from "./HeatingControlRoomStatus.vue";
</script>
<template>
    <HeatingControlHeader />
    <div class="mt-6">
        <HeatingControlConfig />
        <HeatingControlWindowStatus />
        <HeatingControlRoomStatus />
    </div>
</template>
