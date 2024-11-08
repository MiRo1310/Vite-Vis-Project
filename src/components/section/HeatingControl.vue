<script lang="ts" setup>
import HeatingControlConfig from "./HeatingControlConfig.vue";
import HeatingControlHeader from "./HeatingControlHeader.vue";
import HeatingControlPeriod from "./HeatingControlPeriod.vue";
import HeatingControlRoom from "./HeatingControlRoom.vue";
import HeatingControlRoomStatus from "./HeatingControlRoomStatus.vue";
import HeatingControlWindowStatus from "./HeatingControlWindowStatus.vue";


</script>
<template>
    <HeatingControlHeader />
    <div class="grid grid-cols-12 -mx-4">
        <div class="col-span-8 mt-6 flex flex-wrap">
            <HeatingControlConfig />
            <HeatingControlWindowStatus />
            <HeatingControlRoomStatus />
        </div>
        <HeatingControlRoom class="mt-6 col-span-4 bg-accent mb-1" />
    </div>
    <HeatingControlPeriod />
</template>
<style scoped lang="postcss"></style>
