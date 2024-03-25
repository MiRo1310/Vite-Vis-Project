<script setup lang='ts'>
import { Button } from '@/components/ui/button';


import { adminConnection } from '@/lib/iobroker-connecter';
import { notSubscribedIds } from '@/lib/idsNotSubscribed';


const props = defineProps({
    id: {
        type: String,
        required: true
    }
})

const handleClick = (i: number) => {
    const arrayOfIds = props.id.split(",").map((id) => id.trim());
    const id = notSubscribedIds[arrayOfIds[0]]["shutterPosition"]
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
