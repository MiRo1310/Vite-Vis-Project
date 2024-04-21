<script setup lang='ts'>
import { PropType } from 'vue'
import IconRepresenter from '@/components/valueProcessor/processor/IconRepresenter.vue'
const props = defineProps({
    icon: {
        type: String,
        required: false,
        default:""
    },
    value: {
        type: [String, Number, Boolean] as PropType<string | number | boolean>,
        required: true
    },
    unit: {
        type: String,
        required: false,
        default: ""
    }
})
</script>
<template>
  <IconRepresenter :icon="props.icon" :value="props.value" />
  <ValueRepresenter :value="props.value" :unit="props.unit" />
</template>
<style lang='postcss' scoped>

</style>