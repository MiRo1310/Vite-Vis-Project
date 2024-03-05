<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue';

import { Home } from 'lucide-vue-next';

const buttons = [
    {
        icon: Home,
        text: 'Home'
    }
]
</script>

<template>
    <div class="m-2 w-full">
        <Button v-for="(button, index) in buttons" variant="outline" class="w-full button--nav" :key="index">
            <component :is="button.icon" class="w-4 h-4" /><span class="ml-2">{{ button.text }}</span>
        </Button>
    </div>

</template>

<style lang="postcss">
.button--nav {
    @apply justify-start
}
</style>