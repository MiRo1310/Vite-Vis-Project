<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue';

import { Home, Blinds, LampCeiling, Plug, Sun, Heater, PlugZap, WashingMachine, Cctv } from 'lucide-vue-next';

const buttons = [
    {
        icon: Home,
        text: 'Home'
    }, {
        icon: Blinds,
        text: 'Rolladen Fenster'
    }, {
        icon: LampCeiling,
        text: 'Licht'
    }, {
        icon: Plug,
        text: 'Steckdosen'
    }, {
        icon: Sun,
        text: 'Wetter'
    }, {
        icon: Heater,
        text: 'Heizung'
    }, {
        icon: PlugZap,
        text: 'PV'
    }, {
        icon: WashingMachine,
        text: 'Geräte'
    }, {
        icon: Cctv,
        text: 'Sicherheit'
    },
]
</script>

<template>
    <div class="p-2 w-full">
        <Button v-for="(button, index) in buttons" variant="outline" class=" button--nav" :key="index">
            <component :is="button.icon" class="w-4 h-4 " /><span class="ml-2">{{ button.text }}</span>
        </Button>
    </div>

</template>

<style lang="postcss">
.button--nav {
    @apply justify-start w-full mb-2
}
</style>