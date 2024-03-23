<script setup lang='ts'>
import { computed, ref } from 'vue';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import FensterOpenClose from '@/components/FensterOpenClose.vue';
import { useIobrokerStore } from '@/store/iobrokerStore';
import { storeToRefs } from 'pinia';
const iobrokerStore = useIobrokerStore();
const { fenster, rolladen } = storeToRefs<any>(iobrokerStore)
const props = defineProps({
    shutter: {
        type: Boolean,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    }, id2: {
        type: String,
        required: false
    }
})
const shutterPosition = ref(0)

const getIsWindowOpen = computed(() => {
    const arrayOfIds = props.id.split(',').map(id => id.trim())
    const value = fenster.value?.[arrayOfIds[0]]?.[arrayOfIds[1]]
    if (!value && value != false) {
        return undefined
    }
    return value
})
const getSecondIsWindowOpen = computed(() => {
    if (!props.id2) return false
    const arrayOfIds = props.id2.split(',').map(id => id.trim())
    const value = fenster.value?.[arrayOfIds[0]]?.[arrayOfIds[1]]
    if (!value && value != false) {
        return undefined
    }
    return value
})
const getShutterPosition = computed(() => {
    const arrayOfIds = props.id.split(',').map(id => id.trim())
    const value = rolladen.value?.[arrayOfIds[0]]?.[arrayOfIds[1]]
    if (!value && value != 0) {
        return "n/a "
    }
    shutterPosition.value = value
    return value
})
const getShutterImage = computed(() => {

    if (shutterPosition.value === 0) {
        return "/blinds2_double_100.png"
    }
    else if (shutterPosition.value <= 10) {
        return "/blinds2_double_90.png"
    } else if (shutterPosition.value <= 20) {
        return "/blinds2_double_80.png"
    } else if (shutterPosition.value <= 30) {
        return "/blinds2_double_70.png"
    } else if (shutterPosition.value <= 40) {
        return "/blinds2_double_60.png"
    } else if (shutterPosition.value <= 50) {
        return "/blinds2_double_50.png"
    } else if (shutterPosition.value <= 60) {
        return "/blinds2_double_40.png"
    } else if (shutterPosition.value <= 70) {
        return "/blinds2_double_30.png"
    } else if (shutterPosition.value <= 80) {
        return "/blinds2_double_20.png"
    } else if (shutterPosition.value <= 90) {
        return "/blinds2_double_10.png"
    } else
        return "/blinds2_double_0.png"
})

</script>
<template>
    <Card class="w-[20rem] m-1 relative">
        <CardHeader class="pb-0 pt-2 px-2">
            <CardTitle class="flex ">
                <p>{{ props.title }}</p>
            </CardTitle>
        </CardHeader>
        <CardContent class="px-2 pb-2">
            <div class="flex items-center justify-between">
                <div class=" flex">
                    <div>
                        <img v-show="getIsWindowOpen" class="w-8 h-6 mt-1" src="/window_open.png" alt="FensterAufZu">
                        <img v-show="!getIsWindowOpen" class="w-8 h-6 mt-1" src="/window_closed.png" alt="FensterAufZu">
                    </div>
                    <div v-if="props.id2">
                        <img v-show="getSecondIsWindowOpen" class="w-8 h-6 mt-1" src="/window_open.png"
                            alt="FensterAufZu">
                        <img v-show="!getSecondIsWindowOpen" class="w-8 h-6 mt-1" src="/window_closed.png"
                            alt="FensterAufZu">
                    </div>
                </div>

                <FensterOpenClose v-if="!props.shutter" :window-open="getIsWindowOpen" />
            </div>
            <div v-if="props.shutter">
                <div class="flex">
                    <img class="window--img" :src="getShutterImage" alt="FensterRollade">
                    <div class=" w-full">
                        <FensterOpenClose :window-open="getIsWindowOpen" />
                        <p class="text-[0.6rem] mt-1 ml-3"
                            :class="getShutterPosition === 'n/a ' ? 'text-red-500 animate-bounce' : ''">
                            Rollade {{ getShutterPosition }}% offen
                        </p>

                        <div class="absolute top-2 right-2">
                            <div class="flex items-center space-x-2 ">
                                <div class="w-11">
                                    <Switch />
                                    <p class="text-[0.5rem]">
                                        Auto runter
                                    </p>
                                </div>
                                <p><Input type="time" /></p>
                            </div>
                            <div class="flex items-center space-x-2 mt-2">
                                <div class="w-11">
                                    <Switch />
                                    <p class="text-[0.5rem]">
                                        Auto hoch
                                    </p>
                                </div>
                                <p><Input type="time" /></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class=" flex justify-between">
                    <Button class="window--button" :size="'sm'">
                        100%
                    </Button>
                    <Button class="window--button" :size="'sm'">
                        80%
                    </Button>
                    <Button class="window--button" :size="'sm'">
                        60%
                    </Button>
                    <Button class="window--button" :size="'sm'">
                        40%
                    </Button>
                    <Button class="window--button" :size="'sm'">
                        20%
                    </Button>
                    <Button class="window--button" :size="'sm'">
                        0%
                    </Button>
                </div>
            </div>
        </CardContent>
    </Card>
</template>
<style lang='postcss' scoped>
.window--button {
    @apply mx-1 w-10 h-6 text-xs;
}

.window--img {
    @apply w-8 h-12;
}

.window--img-openClose {
    @apply w-8 h-6 mt-1;
}
</style>