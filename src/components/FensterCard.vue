<script setup lang='ts'>
import { ref } from 'vue';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import FensterOpenClose from '@/components/FensterOpenClose.vue';
const windowOpen = ref(false)
const props = defineProps({
    shutter: {
        type: Boolean,
        required: true
    }
})

</script>
<template>
    <Card class="w-[20rem] m-1 relative">
        <CardHeader class="pb-0 pt-2 px-2">
            <CardTitle class="flex ">
                <p>Fenster Wohnzimmer</p>
            </CardTitle>
        </CardHeader>
        <CardContent class="px-2 pb-2">
            <div class="flex items-center justify-between">
                <img class="w-8 h-6 mt-1" src="/window_open.png" alt="FensterAufZu">
                <FensterOpenClose v-if="!props.shutter" :window-open="windowOpen" />
            </div>
            <div v-if="props.shutter">
                <div class="flex">
                    <img class="window--img" src="/blinds2_double_100.png" alt="FensterRollade">
                    <div class=" w-full">
                        <p class="text-[0.6rem] mt-1 ml-3">
                            Rollade 100% zu
                        </p>
                        <FensterOpenClose :window-open="windowOpen" />
                        <div class="absolute top-2 right-2">
                            <div class="flex items-center space-x-2">
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