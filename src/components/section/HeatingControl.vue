<script lang="ts" setup>
import HeatingControlHeader from "./HeatingControlHeader.vue";
import HeatingControlConfig from "./HeatingControlConfig.vue";
import HeatingControlWindowStatus from "./HeatingControlWindowStatus.vue";
import HeatingControlRoom from "./HeatingControlRoom.vue";
import HeatingControlRoomStatus from "./HeatingControlRoomStatus.vue";
import HeatingControlPeriod from "./HeatingControlPeriod.vue";
</script>
<template>
    <HeatingControlHeader />
    <div class="grid grid-cols-12">
        <div class="col-span-8 mt-6 flex flex-wrap">
            <HeatingControlConfig />
            <HeatingControlWindowStatus />
            <HeatingControlRoomStatus />
        </div>
        <HeatingControlRoom class="mt-6 col-span-4" />
    </div>
    <HeatingControlPeriod />
</template>
<style scoped lang="postcss"></style>
