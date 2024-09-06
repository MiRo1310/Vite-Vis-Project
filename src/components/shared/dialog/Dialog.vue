<script setup lang="ts">
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { watchEffect, ref } from 'vue';

const props = defineProps({
    open: Boolean,
})
const emit = defineEmits(['update:open'])

const localOpen = ref(false)

watchEffect(() => {
    localOpen.value = props.open;
});
const closeDialog = () => {
    emit('update:open', false)
}
</script>

<template>
    <Dialog v-model:open="localOpen" @update:open="emit('update:open', $event)
        ">
        <DialogTrigger>
            <slot name="trigger" />
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                    <slot name="title" />
                </DialogTitle>
                <DialogDescription>
                    <slot name="description" />
                </DialogDescription>
            </DialogHeader>

            <DialogFooter @click="closeDialog">
                <slot name="footer" />
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>