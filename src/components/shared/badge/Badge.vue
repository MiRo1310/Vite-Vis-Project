<script lang="ts" setup>
defineProps({
    value: {
        type: Number,
        required: true
    }
})
</script>
<template>
    <span
        class="border-2 border-accent-foreground/50 h-5 min-w-5 px-1 text-xs font-bold bg-blue-200 inline-block  rounded-full  mx-auto text-center align-middle leading-4">
        {{ value }}
    </span>
</template>