<script lang="ts" setup>
import { CardTitle } from '@/components/ui/card';

const props = defineProps({
    class: {
        type: String,
        default: ''
    }
})
</script>
<template>
    <CardTitle :class="['text-accent-foreground/50 text-lg font-bold', props.class]">
        <slot />
    </CardTitle>
</template>
