<script setup lang='ts'>
import { Button } from '@/components/ui/button';
import { useIobrokerStore } from '@/store/iobrokerStore';
import { storeToRefs } from 'pinia';
import { getID } from '@/lib/utilities';
import { adminConnection } from '@/lib/iobroker-connecter';
const iobrokerStore = useIobrokerStore();
const { idsToControl } = storeToRefs<any>(iobrokerStore)
const props = defineProps({
    id: {
        type: String,
        required: true
    }
})

const handleClick = (i: number) => {
    const id = getID("", props.id, idsToControl.value)
    if (adminConnection.value)
        adminConnection.value.setState(id, 100 - (i - 1) * 20)
}
</script>
<template>
    <div class=" flex justify-between">
        <Button v-for="i in 6" class="mx-1 w-10 h-6 text-xs" :size="'sm'" @click="handleClick(i)" :key="i">
            {{ 100 - (i - 1) * 20 }}%
        </Button>
    </div>
</template>
