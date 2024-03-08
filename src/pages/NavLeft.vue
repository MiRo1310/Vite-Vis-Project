<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue';

import { Home, Blinds, LampCeiling, Plug, Sun, Heater, PlugZap, WashingMachine, Cctv } from 'lucide-vue-next';

const buttons = [
    {
        icon: Home,
        text: 'Home',
        link: "/"
    }, {
        icon: Blinds,
        text: 'Rolladen Fenster',
        link: "/rolladen"

    }, {
        icon: LampCeiling,
        text: 'Licht',
        link: "/licht"
    }, {
        icon: Plug,
        text: 'Steckdosen',
        link: "/steckdosen"

    }, {
        icon: Sun,
        text: 'Wetter',
        link: "/wetter"
    }, {
        icon: Heater,
        text: 'Heizung',
        link: "/heizung"
    }, {
        icon: PlugZap,
        text: 'PV',
        link: "/pv"
    }, {
        icon: WashingMachine,
        text: 'Geräte',
        link: "/geraete"
    }, {
        icon: Cctv,
        text: 'Sicherheit',
        link: "/sicherheit"
    },
]
</script>

<template>
    <div class="p-2 w-full">
        <router-link v-for="(button, index) in buttons" :to="button.link" :key="index">
            <Button variant="outline" class=" button--nav">
                <component :is="button.icon" class="w-4 h-4 " /><span class="ml-2">{{ button.text }}</span>
            </Button></router-link>

    </div>

</template>

<style lang="postcss">
.button--nav {
    @apply justify-start w-full mb-2
}
</style>