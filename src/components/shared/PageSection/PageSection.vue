<script lang="ts" setup>
const props = defineProps<{ class?: string }>()
</script>
<template>
    <div :class="['pt-2', props.class]">
        <slot />
    </div>
</template>
