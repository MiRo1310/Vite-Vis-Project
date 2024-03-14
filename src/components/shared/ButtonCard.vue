<script setup lang='ts'>

import {
    Card,
    CardTitle,
} from '@/components/ui/card'


const props = defineProps({
    icon: {
        type: [Object, Function],
        default: null
    },
    title: {
        type: String,
        default: ''
    },
    class: {
        type: String,
        default: ''
    }
})
const emit = defineEmits(['click'])
const handleClick = () => {
    emit('click')
}
</script>
<template>
    <Card class="w-24 h-24 m-1 cursor-pointer border border-black shadow-2xl hover:bg-white hover:bg-opacity-15 "
        @click="handleClick">
        <CardTitle class="m-2 h-8 text-center">{{ props.title }}</CardTitle>
        <component :is="props.icon" class="w-10 h-10 mx-auto" :class="props.class" />
    </Card>
</template>
